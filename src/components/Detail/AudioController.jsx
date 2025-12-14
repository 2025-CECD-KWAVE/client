import { useRef, useState, useEffect } from "react";
import {
    ControllerWrapper,
    TitleRow,
    ControlButton,
    IconImage,
    VoicePanel,
    VoiceButton,
    VoiceImage,
    LoadingImage,
    ControlRow,
    LogWrapper,
    LoadingOverlay,
} from "./AudioControllerStyle";

import playIcon from "../../assets/play.png";
import pauseIcon from "../../assets/pause.png";
import spinnerIcon from "../../assets/spinner.gif";
import chaewonImg from "../../assets/chaewon.webp";
import jonggukImg from "../../assets/jongguk.webp";
import winterImg from "../../assets/winter.jpg";
import iuImg from "../../assets/iu.webp";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const VOICE_LABELS = {
    chaewon: "AI 채원",
    jongguk: "AI 종국",
    winter: "AI 윈터",
    iu: "AI 아이유",
};

const VOICE_ID_MAP = {
    chaewon: "Z0OdZXiRr0rnqYIAcBJs",
    jongguk: "eyllFuqDDENgrMbwK2Jd",
    winter: "8gHitixlyzLQynjV84pz",
    iu: "8pGFzBe81kbIbAMBZVXq",
};

const STORAGE_KEY = "audioControllerState";

function chunkText(text, maxLen = 150) {
    const clean = text.replace(/\([^)]*\)/g, "").trim();
    if (!clean) return [];
    const sentences = clean.split(/(?<=[.!?。？！])\s+|\n+/).filter(Boolean);
    const chunks = [];
    let buf = "";
    for (const s of sentences) {
        if (!buf) {
            buf = s;
            continue;
        }
        if ((buf + " " + s).length <= maxLen) {
            buf = buf + " " + s;
        } else {
            chunks.push(buf.trim());
            buf = s;
        }
    }
    if (buf.trim()) chunks.push(buf.trim());
    const finalChunks = [];
    for (const c of chunks) {
        if (c.length <= maxLen) finalChunks.push(c);
        else {
            for (let i = 0; i < c.length; i += maxLen) finalChunks.push(c.slice(i, i + maxLen));
        }
    }
    return finalChunks;
}

async function runWithConcurrency(taskFactories, concurrency = 4) {
    let i = 0;
    const results = new Array(taskFactories.length);
    async function worker() {
        while (i < taskFactories.length) {
            const idx = i++;
            results[idx] = await taskFactories[idx]();
        }
    }
    const workers = Array.from({ length: Math.min(concurrency, taskFactories.length) }, worker);
    await Promise.all(workers);
    return results;
}

export default function AudioController({ text, hidden }) {
    const [selectedVoice, setSelectedVoice] = useState("chaewon");
    const [logMessages, setLogMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const abortRef = useRef(null);
    const isStoppedRef = useRef(false);

    const chunksRef = useRef([]);
    const blobsRef = useRef([]);
    const waitersRef = useRef([]);
    const playLoopPromiseRef = useRef(null);

    const playingAudioRef = useRef(null);
    const playingUrlRef = useRef(null);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return;
            const parsed = JSON.parse(saved);
            if (parsed.selectedVoice) setSelectedVoice(parsed.selectedVoice);
            if (Array.isArray(parsed.logMessages)) setLogMessages(parsed.logMessages);
        } catch (e) {
            console.error("AudioController load state error:", e);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    selectedVoice,
                    logMessages,
                })
            );
        } catch (e) {
            console.error("AudioController save state error:", e);
        }
    }, [selectedVoice, logMessages]);

    const cleanupAudio = ({ keepLoading = false } = {}) => {
        isStoppedRef.current = true;

        if (abortRef.current) {
            abortRef.current.abort();
            abortRef.current = null;
        }

        if (playingAudioRef.current) {
            playingAudioRef.current.onended = null;
            playingAudioRef.current.pause();
            playingAudioRef.current.src = "";
            playingAudioRef.current = null;
        }

        if (playingUrlRef.current) {
            URL.revokeObjectURL(playingUrlRef.current);
            playingUrlRef.current = null;
        }

        chunksRef.current = [];
        blobsRef.current = [];
        waitersRef.current = [];
        playLoopPromiseRef.current = null;

        setIsPlaying(false);
        if (!keepLoading) setIsLoading(false);
    };

    const fetchChunkAudio = async ({ voiceId, chunkTextValue, signal }) => {
        const res = await fetch(`${API_BASE_URL}/api/voice`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ voiceId, text: chunkTextValue }),
            signal,
        });
        if (!res.ok) throw new Error("오디오 요청 실패");
        const arrayBuffer = await res.arrayBuffer();
        return new Blob([arrayBuffer], { type: "audio/mpeg" });
    };

    const waitForBlob = (idx) => {
        const existing = blobsRef.current[idx];
        if (existing) return Promise.resolve(existing);
        return new Promise((resolve, reject) => {
            waitersRef.current[idx] = { resolve, reject };
        });
    };

    const playBlob = async (blob) => {
        if (isStoppedRef.current) return;

        if (playingAudioRef.current) {
            playingAudioRef.current.onended = null;
            playingAudioRef.current.pause();
            playingAudioRef.current.src = "";
            playingAudioRef.current = null;
        }
        if (playingUrlRef.current) {
            URL.revokeObjectURL(playingUrlRef.current);
            playingUrlRef.current = null;
        }

        const url = URL.createObjectURL(blob);
        playingUrlRef.current = url;
        const audio = new Audio(url);
        playingAudioRef.current = audio;

        await audio.play();
        setIsPlaying(true);

        await new Promise((resolve) => {
            audio.onended = resolve;
        });
    };

    const startPlayLoopOnce = (total) => {
        if (playLoopPromiseRef.current) return playLoopPromiseRef.current;

        playLoopPromiseRef.current = (async () => {
            for (let i = 0; i < total; i++) {
                if (isStoppedRef.current) return;
                const blob = await waitForBlob(i);
                if (isStoppedRef.current) return;
                await playBlob(blob);
            }
            if (!isStoppedRef.current) {
                setIsPlaying(false);
                setIsLoading(false);
                setLogMessages(["재생 완료"]);
            }
        })();

        return playLoopPromiseRef.current;
    };

    const startStreamingPlayback = async () => {
        setLogMessages([]);
        setIsLoading(true);
        cleanupAudio({ keepLoading: true });
        isStoppedRef.current = false;

        const chunks = chunkText(text, 150);
        if (chunks.length === 0) {
            setIsLoading(false);
            setLogMessages(["읽을 텍스트가 없습니다."]);
            return;
        }

        chunksRef.current = chunks;
        blobsRef.current = new Array(chunks.length);
        waitersRef.current = new Array(chunks.length);

        const controller = new AbortController();
        abortRef.current = controller;

        setLogMessages([`총 ${chunks.length}개 조각으로 합성 중...`]);

        const voiceId = VOICE_ID_MAP[selectedVoice];

        startPlayLoopOnce(chunks.length);

        const taskFactories = chunks.map((c, idx) => async () => {
            const blob = await fetchChunkAudio({
                voiceId,
                chunkTextValue: c,
                signal: controller.signal,
            });

            blobsRef.current[idx] = blob;
            const waiter = waitersRef.current[idx];
            if (waiter?.resolve) waiter.resolve(blob);

            if (idx === 0) {
                setIsLoading(false);
                setLogMessages(["합성 시작! 재생을 시작합니다."]);
            }

            return true;
        });

        try {
            await runWithConcurrency(taskFactories, 4);
        } catch (e) {
            if (e?.name === "AbortError") return;
            console.error("AudioController error:", e);
            cleanupAudio();
            setLogMessages(["오디오 재생 중 오류가 발생했습니다."]);
        }
    };

    const handlePlayPause = async () => {
        try {
            if (!text || text.length === 0 || isLoading) return;

            if (!playingAudioRef.current && !isPlaying) {
                await startStreamingPlayback();
                return;
            }

            if (playingAudioRef.current) {
                if (playingAudioRef.current.paused) {
                    await playingAudioRef.current.play();
                    setIsPlaying(true);
                } else {
                    playingAudioRef.current.pause();
                    setIsPlaying(false);
                }
            }
        } catch (err) {
            console.error("AudioController error:", err);
            cleanupAudio();
            setIsLoading(false);
            setLogMessages(["오디오 재생 중 오류가 발생했습니다."]);
        }
    };

    const handleSelectVoice = (voiceKey) => {
        setSelectedVoice(voiceKey);
        cleanupAudio();
        setLogMessages([]);
    };

    return (
        <ControllerWrapper hidden={hidden}>
            {isLoading && (
                <LoadingOverlay>
                    <LoadingImage src={spinnerIcon} />
                </LoadingOverlay>
            )}

            <TitleRow>
                {isLoading || isPlaying
                    ? `Reading : ${VOICE_LABELS[selectedVoice] ?? "AI Voice"}`
                    : "Choose Your AI K-POP Voice"}
            </TitleRow>

            <ControlRow>
                <ControlButton onClick={handlePlayPause} disabled={isLoading}>
                    <IconImage src={isPlaying ? pauseIcon : playIcon} isPlay={!isPlaying} />
                </ControlButton>

                <VoicePanel>
                    <VoiceButton active={selectedVoice === "chaewon"} onClick={() => handleSelectVoice("chaewon")}>
                        <VoiceImage src={chaewonImg} />
                        AI 채원
                    </VoiceButton>

                    <VoiceButton active={selectedVoice === "jongguk"} onClick={() => handleSelectVoice("jongguk")}>
                        <VoiceImage src={jonggukImg} />
                        AI 종국
                    </VoiceButton>

                    <VoiceButton active={selectedVoice === "winter"} onClick={() => handleSelectVoice("winter")}>
                        <VoiceImage src={winterImg} />
                        AI 윈터
                    </VoiceButton>

                    <VoiceButton active={selectedVoice === "iu"} onClick={() => handleSelectVoice("iu")}>
                        <VoiceImage src={iuImg} />
                        AI 아이유
                    </VoiceButton>
                </VoicePanel>
            </ControlRow>

            <LogWrapper></LogWrapper>
        </ControllerWrapper>
    );
}
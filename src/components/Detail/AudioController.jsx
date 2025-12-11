import { useRef, useState, useEffect } from 'react';
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
    LoadingOverlay
} from './AudioControllerStyle';

import playIcon from '../../assets/play.png';
import pauseIcon from '../../assets/pause.png';
import spinnerIcon from '../../assets/spinner.gif';
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

export default function AudioController({ text, hidden }) {
    const [selectedVoice, setSelectedVoice] = useState("chaewon");
    const [logMessages, setLogMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);
    const audioUrlRef = useRef(null);

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
            const stateToSave = {
                selectedVoice,
                logMessages,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (e) {
            console.error("AudioController save state error:", e);
        }
    }, [selectedVoice, logMessages]);

    const cleanupAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current);
            audioUrlRef.current = null;
        }
        setIsPlaying(false);
    };

    const fetchAndCreateAudio = async () => {
        setIsLoading(true);
        setLogMessages([]);
        cleanupAudio();

        const cleanText = text.replace(/\([^)]*\)/g, "").trim();
        if (!cleanText) {
            setIsLoading(false);
            setLogMessages(["읽을 텍스트가 없습니다."]);
            return;
        }

        const response = await fetch(`${API_BASE_URL}/api/voice`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                voiceId: VOICE_ID_MAP[selectedVoice],
                text: cleanText
            })
        });

        if (!response.ok) {
            setIsLoading(false);
            throw new Error("오디오 요청 실패");
        }

        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        audioUrlRef.current = url;

        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
            setIsPlaying(false);
        };

        setIsLoading(false);
        setLogMessages(["합성 완료! 재생을 시작합니다."]);

        await audio.play();
        setIsPlaying(true);
    };

    const handlePlayPause = async () => {
        try {
            if (!text || text.length === 0 || isLoading) return;

            if (!audioRef.current) {
                await fetchAndCreateAudio();
                return;
            }

            if (audioRef.current.paused) {
                await audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
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
                    <IconImage
                        src={isPlaying ? pauseIcon : playIcon}
                        isPlay={!isPlaying}
                    />
                </ControlButton>

                <VoicePanel>
                    <VoiceButton
                        active={selectedVoice === "chaewon"}
                        onClick={() => handleSelectVoice("chaewon")}
                    >
                        <VoiceImage src={chaewonImg} />
                        AI 채원
                    </VoiceButton>

                    <VoiceButton
                        active={selectedVoice === "jongguk"}
                        onClick={() => handleSelectVoice("jongguk")}
                    >
                        <VoiceImage src={jonggukImg} />
                        AI 종국
                    </VoiceButton>

                    <VoiceButton
                        active={selectedVoice === "winter"}
                        onClick={() => handleSelectVoice("winter")}
                    >
                        <VoiceImage src={winterImg} />
                        AI 윈터
                    </VoiceButton>

                    <VoiceButton
                        active={selectedVoice === "iu"}
                        onClick={() => handleSelectVoice("iu")}
                    >
                        <VoiceImage src={iuImg} />
                        AI 아이유
                    </VoiceButton>
                </VoicePanel>
            </ControlRow>

            <LogWrapper>
                {logMessages.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                ))}
            </LogWrapper>
        </ControllerWrapper>
    );
}

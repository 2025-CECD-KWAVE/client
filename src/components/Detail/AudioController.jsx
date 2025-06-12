import { useRef, useState } from 'react';
import {
    ControllerWrapper,
    TitleRow,
    ControlButton,
    IconImage,
    MainWrapper,
    LoadingImage
} from './AudioControllerStyle';

import playIcon from '../../assets/play.png';
import loadingIcon from '../../assets/loading.gif';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AudioController({ text }) {
    const [logMessages, setLogMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chunkIndexRef = useRef(1);
    const readerRef = useRef(null);
    const audioContextRef = useRef(null);

    const detectLanguage = (text) => {
        const hasKorean = /[가-힣]/.test(text);
        const hasJapaneseKana = /[ぁ-ゔァ-ヴー々〆〤]/.test(text); // 히라가나+가타카나
        const hasChineseHan = /[\u4E00-\u9FFF]/.test(text); // CJK 한자
        const hasEnglish = /[a-zA-Z]/.test(text);

        if (hasKorean) return '한국어';
        if (hasJapaneseKana) return '일본어';
        if (hasChineseHan) return '중국어';
        if (hasEnglish) return '영어';
        return '한국어'; // 기본값
    };


    const handlePlay = async () => {
        if (isLoading) {
            readerRef.current?.cancel();
            audioContextRef.current?.close();
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setLogMessages([]);
        chunkIndexRef.current = 1;

        try {
            const language = detectLanguage(text);

            const response = await fetch(`${API_BASE_URL}/api/voice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    language,
                    text
                })
            });

            if (!response.ok || !response.body) {
                throw new Error('오디오 요청 실패');
            }

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const reader = response.body.getReader();
            readerRef.current = reader;
            audioContextRef.current = audioContext;

            let buffer = new Uint8Array(0);
            const delimiter = new TextEncoder().encode("\n--END--\n");
            const queue = [];
            let isPlaying = false;

            const playNextChunk = () => {
                if (queue.length === 0) {
                    isPlaying = false;
                    setIsLoading(false);
                    return;
                }

                isPlaying = true;
                const audioBuffer = queue.shift();
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
                source.start();
                source.onended = () => playNextChunk();
            };

            const readLoop = async () => {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const newBuffer = new Uint8Array(buffer.length + value.length);
                    newBuffer.set(buffer);
                    newBuffer.set(value, buffer.length);
                    buffer = newBuffer;

                    let delimiterIndex;
                    while ((delimiterIndex = indexOfSubarray(buffer, delimiter)) !== -1) {
                        const chunk = buffer.slice(0, delimiterIndex);
                        buffer = buffer.slice(delimiterIndex + delimiter.length);

                        try {
                            const audioBuffer = await audioContext.decodeAudioData(chunk.buffer.slice(0));
                            queue.push(audioBuffer);

                            const index = chunkIndexRef.current++;
                            setLogMessages(prev => [...prev.slice(-1), `${index}번 문단 합성 완료!`]);

                            if (!isPlaying) playNextChunk();
                        } catch (e) {
                            console.error('오디오 디코딩 실패:', e);
                        }
                    }
                }
            };

            readLoop();

        } catch (err) {
            console.error('오디오 재생 오류:', err);
            setIsLoading(false);
        }
    };

    const indexOfSubarray = (buffer, subarray) => {
        for (let i = 0; i <= buffer.length - subarray.length; i++) {
            let match = true;
            for (let j = 0; j < subarray.length; j++) {
                if (buffer[i + j] !== subarray[j]) {
                    match = false;
                    break;
                }
            }
            if (match) return i;
        }
        return -1;
    };

    return (
        <ControllerWrapper>
            <TitleRow>
                <span>
                    {isLoading
                        ? 'Currently Reading the News : IU'
                        : 'Experience the News in a K-POP Voice'}
                </span>
            </TitleRow>

            <MainWrapper>
                <ControlButton onClick={handlePlay}>
                    {isLoading ? (
                        <LoadingImage src={loadingIcon} alt="loading" />
                    ) : (
                        <IconImage src={playIcon} alt="play" />
                    )}
                </ControlButton>
                <div style={{ padding: '8px 20px', fontSize: '14px', color: '#00E52E' }}>
                    {logMessages.map((msg, idx) => (
                        <div key={idx}>{msg}</div>
                    ))}
                </div>
            </MainWrapper>
        </ControllerWrapper>
    );
}

import {
    ControllerWrapper,
    TitleRow,
    ProgressBar,
    Controls,
    ControlButton,
    IconImage
} from './AudioControllerStyle';

import prevIcon from '../../assets/prev.png';
import playIcon from '../../assets/play.png';
import nextIcon from '../../assets/next.png';

export default function AudioController() {
    const handlePlay = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/voice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    language: '한국어',
                    text: '가수 아이유가 세 번째 리메이크 앨범 꽃갈피 셋으로 주요 음원차트를 휩쓸었습니다. 타이틀곡 네버 엔딩 스토리는 어제(28일) 멜론 핫100 등 음원차트 1위에 올랐고, 수록곡 역시 순위권에 진입하며 뜨거운 반응을 얻었습니다.\n\n또 영화 8월의 크리스마스를 오마주한 네버 엔딩 스토리의 뮤직비디오는 공개 7시간 만에 조회수 100만 회를 돌파하며 인기 급상승 음악 1위를 차지했습니다.'
                })
            });

            if (!response.ok || !response.body) {
                throw new Error('오디오 요청 실패');
            }

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const reader = response.body.getReader();
            let buffer = new Uint8Array(0);
            const delimiter = new TextEncoder().encode("\n--END--\n");

            const queue = [];
            let isPlaying = false;

            const playNextChunk = () => {
                if (queue.length === 0) {
                    isPlaying = false;
                    return;
                }

                isPlaying = true;
                const audioBuffer = queue.shift();
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
                source.start();
                source.onended = () => {
                    playNextChunk(); // 다음 chunk 재생
                };
            };

            const readLoop = async () => {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        console.log('✅ 전체 스트림 수신 완료');
                        break;
                    }

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
                            if (!isPlaying) {
                                playNextChunk();
                            }
                        } catch (e) {
                            console.error('🔴 오디오 디코딩 실패:', e);
                        }
                    }
                }
            };

            readLoop();

        } catch (err) {
            console.error('오디오 재생 오류:', err);
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
                <span>Currently Playing : BTS IU</span>
            </TitleRow>
            <ProgressBar />
            <Controls>
                <ControlButton>
                    <IconImage src={prevIcon} alt="prev" />
                </ControlButton>
                <ControlButton onClick={handlePlay}>
                    <IconImage src={playIcon} alt="play" />
                </ControlButton>
                <ControlButton>
                    <IconImage src={nextIcon} alt="next" />
                </ControlButton>
            </Controls>
        </ControllerWrapper>
    );
}

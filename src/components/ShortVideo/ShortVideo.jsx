import React, { useEffect, useRef, useState } from "react";

import {
    Container,
    Header,
    VideoWrapper,
    Thumbnail,
    VideoElement,
    ContentWrapper,
    VideoTitle,
    TimeText,
    GuideText,
    VoicePanel,
    VoiceButton,
    VoiceImage
} from "./ShortVideoStyle";

import chaewonImg from "../../assets/chaewon.webp";
import jonggukImg from "../../assets/jongguk.webp";

import concertChaewon from "../../assets/chaewon_concert/final_output.mp4";
import concertJongguk from "../../assets/jongguk_concert/final_output.mp4";

import awardChaewon from "../../assets/jongguk_award/final_output.mp4";
import awardJongguk from "../../assets/jongguk_award/final_output.mp4";

export default function ShortVideo() {
    const containerRef = useRef(null);
    const [selectedVoice, setSelectedVoice] = useState("chaewon");

    const videoList = [
        {
            title: "효린, 'KEY' 특별 게스트는? 랄랄→임한별 '기대 폭발'",
            time: "3시간 전",
            srcChaewon: concertChaewon,
            srcJongguk: concertJongguk,
        },
        {
            title: "MMA2025 1차 라인업 공개...아이브·플레이브·보이넥스트도어·라이즈",
            time: "1시간 전",
            srcChaewon: awardChaewon,
            srcJongguk: awardJongguk,
        }
    ];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        let startTime = 0;

        const onPointerDown = (e) => {
            isDragging = true;
            startY = e.clientY;
            startTime = Date.now();
        };

        const onPointerMove = (e) => {
            if (!isDragging) return;
            currentY = e.clientY;
        };

        const onPointerUp = () => {
            if (!isDragging) return;

            const delta = currentY - startY;
            const timeDiff = Date.now() - startTime;

            const threshold = 140; // 이동 최소 거리 증가
            const minSwipeTime = 120; // 너무 빠른 클릭은 스와이프 취급하지 않음

            // 클릭으로 판단 → 아무것도 하지 않음
            if (Math.abs(delta) < threshold || timeDiff < minSwipeTime) {
                isDragging = false;
                startY = 0;
                currentY = 0;
                return;
            }

            // 스와이프 판단
            if (delta > threshold) {
                container.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
            } else if (delta < -threshold) {
                container.scrollBy({ top: window.innerHeight, behavior: "smooth" });
            }

            isDragging = false;
            startY = 0;
            currentY = 0;
        };

        container.addEventListener("pointerdown", onPointerDown);
        container.addEventListener("pointermove", onPointerMove);
        container.addEventListener("pointerup", onPointerUp);
        container.addEventListener("pointerleave", onPointerUp);

        return () => {
            container.removeEventListener("pointerdown", onPointerDown);
            container.removeEventListener("pointermove", onPointerMove);
            container.removeEventListener("pointerup", onPointerUp);
            container.removeEventListener("pointerleave", onPointerUp);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                height: "100vh",
                overflowY: "scroll",
                scrollSnapType: "y mandatory",
                touchAction: "none",
            }}
        >
            {videoList.map((item, idx) => (
                <VideoCard
                    key={idx}
                    item={item}
                    selectedVoice={selectedVoice}
                    setSelectedVoice={setSelectedVoice}
                />
            ))}
        </div>
    );
}

function VideoCard({ item, selectedVoice, setSelectedVoice }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const selectedSrc =
        selectedVoice === "chaewon" ? item.srcChaewon : item.srcJongguk;

    useEffect(() => {
        const video = document.createElement("video");
        video.src = selectedSrc;
        video.currentTime = 1;

        video.addEventListener("loadeddata", () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            setThumbnail(canvas.toDataURL());
        });
    }, [selectedSrc]);

    return (
        <section
            style={{
                height: "100vh",
                scrollSnapAlign: "start",
                overflow: "hidden",
                background: "#fff",
            }}
        >
            <Container>

                <Header>Short Video</Header>

                <VideoWrapper onClick={() => setIsPlaying(true)}>
                    {!isPlaying && <Thumbnail src={thumbnail} />}
                    {isPlaying && <VideoElement src={selectedSrc} autoPlay controls />}
                </VideoWrapper>

                <ContentWrapper>

                    <VoicePanel>
                        <VoiceButton
                            active={selectedVoice === "chaewon"}
                            onClick={() => setSelectedVoice("chaewon")}
                        >
                            <VoiceImage src={chaewonImg} />
                            AI 채원
                        </VoiceButton>

                        <VoiceButton
                            active={selectedVoice === "jongguk"}
                            onClick={() => setSelectedVoice("jongguk")}
                        >
                            <VoiceImage src={jonggukImg} />
                            AI 종국
                        </VoiceButton>
                    </VoicePanel>

                    <VideoTitle>{item.title}</VideoTitle>
                    <TimeText>{item.time}</TimeText>


                </ContentWrapper>

            </Container>
        </section>
    );
}

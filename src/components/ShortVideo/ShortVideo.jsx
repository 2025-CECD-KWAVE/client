import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import winterImg from "../../assets/winter.jpg";
import iuImg from "../../assets/iu.webp";

import concertChaewon from "../../assets/concert/chaewon.mp4";
import concertJongguk from "../../assets/concert/jongguk.mp4";

import awardJongguk from "../../assets/award/jongguk.mp4";

import minaChaewon from "../../assets/mina/chaewon.mp4";
import minaJongguk from "../../assets/mina/jongguk.mp4";
import minaWinter from "../../assets/mina/winter.mp4";
import minaIu from "../../assets/mina/iu.mp4";

import sullhyunChaewon from "../../assets/sullhyun/chaewon.mp4";
import sullhyunJongguk from "../../assets/sullhyun/jongguk.mp4";
import sullhyunWinter from "../../assets/sullhyun/winter.mp4";
import sullhyunIu from "../../assets/sullhyun/iu.mp4";

import weiChaewon from "../../assets/wei/chaewon.mp4";
import weiJongguk from "../../assets/wei/jongguk.mp4";
import weiWinter from "../../assets/wei/winter.mp4";
import weiIu from "../../assets/wei/iu.mp4";

export default function ShortVideo() {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const videoList = [
        {
            title: "트와이스 미나, 오늘은 패션모델! [포토]",
            time: "30분 전",
            srcChaewon: minaChaewon,
            srcJongguk: minaJongguk,
            srcWinter: minaWinter,
            srcIu: minaIu,
        },
        {
            title: "설현, 더프레젠트컴퍼니와 전속 계약…안효섭·신세경과 한솥밥",
            time: "2시간 전",
            srcChaewon: sullhyunChaewon,
            srcJongguk: sullhyunJongguk,
            srcWinter: sullhyunWinter,
            srcIu: sullhyunIu,
        },
        {
            title: "[ET포토] 위아이, '엔딩에서 발산나는 존재감'",
            time: "4시간 전",
            srcChaewon: weiChaewon,
            srcJongguk: weiJongguk,
            srcWinter: weiWinter,
            srcIu: weiIu,
        },
        {
            title: "효린, 'KEY' 특별 게스트는? 랄랄→임한별 '기대 폭발'",
            time: "3시간 전",
            srcChaewon: concertChaewon,
            srcJongguk: concertJongguk,
        },
        {
            title: "MMA2025 1차 라인업 공개...아이브·플레이브·보이넥스트도어·라이즈",
            time: "1시간 전",
            srcJongguk: awardJongguk,
        },
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
            const threshold = 140;
            const minSwipeTime = 120;

            if (Math.abs(delta) < threshold || timeDiff < minSwipeTime) {
                isDragging = false;
                startY = 0;
                currentY = 0;
                return;
            }

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

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const goToDetail = () => {
        navigate("/short");
    };

    return (
        <>
            <Header>Short Video</Header>
            <div
                ref={containerRef}
                style={{
                    height: "100vh",
                    overflowY: "scroll",
                    scrollSnapType: "y mandatory",
                    position: "relative",
                    touchAction: "none",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {videoList.map((item, idx) => (
                    <VideoCard
                        key={idx}
                        item={item}
                        goToDetail={goToDetail}
                    />
                ))}
            </div>
        </>
    );
}

function VideoCard({ item, goToDetail }) {
    const [selectedVoice, setSelectedVoice] = useState("chaewon");
    const [thumbnail, setThumbnail] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const getSrcForVoice = (videoItem, voiceKey) => {
        const map = {
            chaewon: "srcChaewon",
            jongguk: "srcJongguk",
            winter: "srcWinter",
            iu: "srcIu",
        };
        const key = map[voiceKey];
        if (key && videoItem[key]) return videoItem[key];
        return (
            videoItem.srcChaewon ||
            videoItem.srcJongguk ||
            videoItem.srcWinter ||
            videoItem.srcIu
        );
    };

    const selectedSrc = getSrcForVoice(item, selectedVoice);

    useEffect(() => {
        const video = document.createElement("video");
        video.src = selectedSrc;
        video.currentTime = 1;

        const onLoaded = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            setThumbnail(canvas.toDataURL());
        };

        video.addEventListener("loadeddata", onLoaded);

        return () => {
            video.removeEventListener("loadeddata", onLoaded);
        };
    }, [selectedSrc]);

    return (
        <section
            style={{
                minHeight: "calc(100vh - 56px)",
                height: "auto",
                scrollSnapAlign: "start",
                overflow: "hidden",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Container>
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

                        <VoiceButton
                            active={selectedVoice === "winter"}
                            onClick={() => setSelectedVoice("winter")}
                        >
                            <VoiceImage src={winterImg} />
                            AI 윈터
                        </VoiceButton>

                        <VoiceButton
                            active={selectedVoice === "iu"}
                            onClick={() => setSelectedVoice("iu")}
                        >
                            <VoiceImage src={iuImg} />
                            AI 아이유
                        </VoiceButton>
                    </VoicePanel>

                    <VideoTitle>{item.title}</VideoTitle>
                    <TimeText>{item.time}</TimeText>
                    <GuideText>AI 보이스로 생성된 영상입니다</GuideText>
                </ContentWrapper>
            </Container>
        </section>
    );
}
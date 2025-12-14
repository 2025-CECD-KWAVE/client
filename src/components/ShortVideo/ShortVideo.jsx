import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    ProfileRow,
    ProfileAvatar,
    ProfileRing,
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
    const location = useLocation();

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
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        const container = containerRef.current;
        if (!container) return;

        requestAnimationFrame(() => {
            container.scrollTo({ top: 0, left: 0, behavior: "auto" });
        });
    }, [location.pathname]);

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
            currentY = e.clientY;
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
                return;
            }

            const step = container.clientHeight;

            container.scrollBy({
                top: delta > 0 ? -step : step,
                behavior: "smooth",
            });

            isDragging = false;
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
                    height: "calc(100dvh - 56px)",
                    overflowY: "scroll",
                    scrollSnapType: "y mandatory",
                    position: "relative",
                    touchAction: "pan-y",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    background: "#000",
                }}
            >
                {videoList.map((item, idx) => (
                    <VideoCard key={idx} item={item} goToDetail={goToDetail} />
                ))}
            </div>
        </>
    );
}

function VideoCard({ item, goToDetail }) {
    const [selectedVoice, setSelectedVoice] = useState("chaewon");
    const [thumbnail, setThumbnail] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const profiles = [
        { key: "chaewon", img: chaewonImg, label: "AI 채원", src: item.srcChaewon },
        { key: "jongguk", img: jonggukImg, label: "AI 종국", src: item.srcJongguk },
        { key: "winter", img: winterImg, label: "AI 윈터", src: item.srcWinter },
        { key: "iu", img: iuImg, label: "AI 아이유", src: item.srcIu },
    ].filter((p) => Boolean(p.src));

    useEffect(() => {
        if (!profiles.some((p) => p.key === selectedVoice)) {
            setSelectedVoice(profiles[0]?.key ?? "chaewon");
        }
    }, [item]);

    const selectedSrc =
        profiles.find((p) => p.key === selectedVoice)?.src || profiles[0]?.src;

    useEffect(() => {
        setIsPlaying(false);
    }, [selectedSrc]);

    useEffect(() => {
        if (!selectedSrc) return;

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
                height: "calc(100dvh - 56px)",
                scrollSnapAlign: "start",
                overflow: "hidden",
                background: "#000",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Container>
                <VideoWrapper onClick={() => setIsPlaying(true)}>
                    {!isPlaying && thumbnail && <Thumbnail src={thumbnail} />}
                    {isPlaying && <VideoElement src={selectedSrc} autoPlay controls />}
                </VideoWrapper>

                <ContentWrapper>
                    {profiles.length > 0 && (
                        <ProfileRow>
                            {profiles.map((p) => (
                                <ProfileAvatar
                                    key={p.key}
                                    aria-pressed={selectedVoice === p.key}
                                    onClick={() => setSelectedVoice(p.key)}
                                >
                                    <ProfileRing $active={selectedVoice === p.key} />
                                    <img src={p.img} alt={p.label} />
                                </ProfileAvatar>
                            ))}
                        </ProfileRow>
                    )}

                    <VideoTitle>{item.title}</VideoTitle>
                    <TimeText>{item.time}</TimeText>
                    <GuideText>AI 보이스로 생성된 영상입니다</GuideText>
                </ContentWrapper>
            </Container>
        </section>
    );
}







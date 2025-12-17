import React, { useEffect, useMemo, useRef, useState } from "react";
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
    const [activeIndex, setActiveIndex] = useState(0);

    const videoList = useMemo(
        () => [
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
                title: "효린, 'KEY' 특별 게스트는?",
                time: "3시간 전",
                srcChaewon: concertChaewon,
                srcJongguk: concertJongguk,
            },
            {
                title: "MMA2025 1차 라인업 공개",
                time: "1시간 전",
                srcJongguk: awardJongguk,
            },
        ],
        []
    );

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        const container = containerRef.current;
        if (!container) return;

        container.scrollTo({ top: 0, behavior: "auto" });
    }, [location.pathname]);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    useEffect(() => {
        const root = containerRef.current;
        if (!root) return;

        const sections = Array.from(root.querySelectorAll("section"));

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const idx = sections.indexOf(entry.target);
                    if (idx !== -1) setActiveIndex(idx);
                }
            },
            { root, threshold: 0.6 }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [videoList.length]);

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
                    background: "#000",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {videoList.map((item, idx) => (
                    <VideoCard key={idx} item={item} active={idx === activeIndex} />
                ))}
            </div>
        </>
    );
}

function VideoCard({ item, active }) {
    const [selectedVoice, setSelectedVoice] = useState("chaewon");
    const [thumbnail, setThumbnail] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const profiles = useMemo(
        () =>
            [
                { key: "chaewon", img: chaewonImg, src: item.srcChaewon },
                { key: "jongguk", img: jonggukImg, src: item.srcJongguk },
                { key: "winter", img: winterImg, src: item.srcWinter },
                { key: "iu", img: iuImg, src: item.srcIu },
            ].filter((p) => p.src),
        [item]
    );

    useEffect(() => {
        if (!profiles.some((p) => p.key === selectedVoice)) {
            setSelectedVoice(profiles[0]?.key);
        }
    }, [profiles, selectedVoice]);

    const selectedSrc =
        profiles.find((p) => p.key === selectedVoice)?.src || profiles[0]?.src;

    useEffect(() => {
        setIsPlaying(false);
    }, [selectedSrc, active]);

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
            ctx.drawImage(video, 0, 0);
            setThumbnail(canvas.toDataURL());
        };

        video.addEventListener("loadeddata", onLoaded);
        return () => video.removeEventListener("loadeddata", onLoaded);
    }, [selectedSrc]);

    return (
        <section
            style={{
                height: "calc(100dvh - 56px)",
                scrollSnapAlign: "start",
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
                                    <img src={p.img} alt="" />
                                </ProfileAvatar>
                            ))}
                        </ProfileRow>
                    )}
                    <GuideText>Choose your AI Voice</GuideText>
                    <VideoTitle>{item.title}</VideoTitle>
                    <TimeText>{item.time}</TimeText>
                </ContentWrapper>
            </Container>
        </section>
    );
}

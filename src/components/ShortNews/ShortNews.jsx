import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../../api";

import {
    Container,
    Header,
    Thumbnail,
    ContentWrapper,
    NewsTitle,
    TimeText,
    Body,
    OriginalButton,
} from "./ShortNewsStyle";

import placeholder1 from "../../assets/placeholder1.png";
import placeholder2 from "../../assets/placeholder2.png";
import placeholder3 from "../../assets/placeholder3.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APP_BASE = import.meta.env.VITE_APP_BASE || import.meta.env.APP_BASE;

export default function ShortNews() {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const placeholders = [placeholder1, placeholder2, placeholder3];
    const getRandomPlaceholder = () =>
        placeholders[Math.floor(Math.random() * placeholders.length)];

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");

        const fetchNotLoggedIn = async () => {
            try {
                const res = await apiFetch(`${API_BASE_URL}/api/news/list`);
                const data = await res.json();

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                        ? data.data
                        : [];

                const mapped = list.slice(0, 10).map((item) => ({
                    id: item.newsId,
                    title: item.title,
                    body: item.summary,
                    time: item.timeAgo,
                    thumbnail: item.thumbnailUrl || getRandomPlaceholder(),
                }));

                setItems(mapped);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchLoggedIn = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/news-recommend/news`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                    body: JSON.stringify({
                        page: 0,
                        size: 10,
                    }),
                });

                const result = await response.json();
                const ids = result.newsIds?.map((n) => n.newsId) || [];

                if (ids.length === 0) {
                    setItems([]);
                    return;
                }

                const detailResponse = await apiFetch(`${API_BASE_URL}/api/news/list`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                    body: JSON.stringify({ ids }),
                });

                const detailData = await detailResponse.json();
                const list = Array.isArray(detailData) ? detailData : [];

                const mapped = list.slice(0, 10).map((item) => ({
                    id: item.newsId,
                    title: item.title,
                    body: item.summary,
                    time: item.timeAgo,
                    thumbnail: item.thumbnailUrl || getRandomPlaceholder(),
                }));

                setItems(mapped);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        if (!token) fetchNotLoggedIn();
        else fetchLoggedIn();
    }, []);

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
            const threshold = 80;
            const minSwipeTime = 80;

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

    if (isLoading) {
        return <div style={{ height: "100dvh", background: "#e0e0e0" }} />;
    }

    const goToDetail = (newsId) => {
        if (!newsId) return;
        navigate(`/detail?id=${encodeURIComponent(newsId)}`);
    };

    return (
        <>
            <Header>Short News</Header>
            <div
                ref={containerRef}
                className="shorts-container"
                style={{
                    height: "calc(100dvh - 56px)",
                    overflowY: "scroll",
                    scrollSnapType: "y mandatory",
                    position: "relative",
                    touchAction: "pan-y",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    background: "#fff",
                }}
            >
                {items.map((data, i) => (
                    <section
                        key={i}
                        style={{
                            height: "calc(100dvh - 56px)",
                            scrollSnapAlign: "start",
                            overflow: "hidden",
                            background: "#fff",
                            display: "flex",
                            flexDirection: "column",
                            position: "relative",
                        }}
                    >
                        <Container>
                            <Thumbnail
                                src={data.thumbnail}
                                alt="thumbnail"
                                onError={(e) => {
                                    e.currentTarget.src = getRandomPlaceholder();
                                }}
                            />
                            <ContentWrapper>
                                <NewsTitle>{data.title}</NewsTitle>
                                <TimeText>{data.time}</TimeText>
                                <Body>{data.body}</Body>
                            </ContentWrapper>
                        </Container>

                        <OriginalButton onClick={() => goToDetail(data.id)}>
                            View Original
                        </OriginalButton>
                    </section>

                ))}
            </div>
        </>
    );
}
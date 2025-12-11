import React, { useEffect, useRef, useState } from "react";

import {
    Container,
    Header,
    Thumbnail,
    ContentWrapper,
    NewsTitle,
    TimeText,
    Body,
    OriginalButton
} from "./ShortNewsStyle";

import placeholder1 from "../../assets/placeholder1.png";
import placeholder2 from "../../assets/placeholder2.png";
import placeholder3 from "../../assets/placeholder3.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ShortNews() {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const containerRef = useRef(null);

    const placeholders = [placeholder1, placeholder2, placeholder3];
    const getRandomPlaceholder = () =>
        placeholders[Math.floor(Math.random() * placeholders.length)];

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");

        const fetchNotLoggedIn = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/news/list`);
                const data = await res.json();

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                        ? data.data
                        : [];

                const mapped = list.slice(0, 10).map(item => ({
                    id: item.newsId || item.news_id,
                    title: item.title,
                    body: item.summary,
                    time: item.timeAgo,
                    thumbnail: item.thumbnailUrl || getRandomPlaceholder()
                }));

                setItems(mapped);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchLoggedIn = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/news-recommend/news`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${token}`,
                        },
                        body: JSON.stringify({ page: 0, size: 10 }),
                    }
                );

                const result = await response.json();
                const ids = result.newsIds?.map(n => n.newsId) || [];

                if (ids.length === 0) {
                    setItems([]);
                    return;
                }

                const detailResponse = await fetch(
                    `${API_BASE_URL}/api/news/list`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${token}`,
                        },
                        body: JSON.stringify({ ids }),
                    }
                );

                const detailData = await detailResponse.json();
                const list = Array.isArray(detailData) ? detailData : [];

                const mapped = list.slice(0, 10).map(item => ({
                    id: item.newsId || item.news_id,
                    title: item.title,
                    body: item.summary,
                    time: item.timeAgo,
                    thumbnail: item.thumbnailUrl || getRandomPlaceholder()
                }));

                setItems(mapped);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (!token) fetchNotLoggedIn();
        else fetchLoggedIn();
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        const onPointerDown = (e) => {
            isDragging = true;
            startY = e.clientY;
        };

        const onPointerMove = (e) => {
            if (!isDragging) return;
            currentY = e.clientY;
        };

        const onPointerUp = () => {
            if (!isDragging) return;
            const delta = currentY - startY;
            const threshold = 80;

            if (delta > threshold) {
                container.scrollBy({
                    top: -window.innerHeight,
                    behavior: "smooth",
                });
            } else if (delta < -threshold) {
                container.scrollBy({
                    top: window.innerHeight,
                    behavior: "smooth",
                });
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

    if (isLoading) {
        return <div style={{ height: "100vh", background: "#e0e0e0" }} />;
    }

    return (
        <div
            ref={containerRef}
            className="shorts-container"
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
            {items.map((data, i) => (
                <section
                    key={data.id || i}
                    style={{
                        height: "100vh",
                        scrollSnapAlign: "start",
                        overflow: "hidden",
                        background: "#fff",
                    }}
                >
                    <Container>
                        <Header>Short News</Header>
                        <Thumbnail
                            src={data.thumbnail}
                            alt="thumbnail"
                        />
                        <ContentWrapper>
                            <NewsTitle>{data.title}</NewsTitle>
                            <TimeText>{data.time}</TimeText>
                            <Body>{data.body}</Body>

                            <OriginalButton
                                onClick={() =>
                                    window.location.href =
                                    `http://localhost:5173/detail?id=${data.id}`
                                }
                            >
                                원문보기
                            </OriginalButton>
                        </ContentWrapper>
                    </Container>
                </section>
            ))}
        </div>
    );
}

import React, { useEffect, useRef, useState } from "react";
import defaultThumbnail from "../../assets/sample.webp";

import {
    Container,
    Header,
    Thumbnail,
    ContentWrapper,
    NewsTitle,
    TimeText,
    Body,
} from "./ShortNewsStyle";

export default function ShortNews() {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const containerRef = useRef(null);

    const mockNews = {
        title: "aespa Wraps Up Promotions, Renews Their Prime with 'Dirty Work'",
        body: `Aespa will release their new single Dirty Work on the 27th, including English and instrumental versions.
The song is a hip-hop dance track featuring synth bass and cool vocal melodies.
Its lyrics carry an empowering message with a chill and stylish vocal vibe.`,
        time: "1 hour ago",
        thumbnail: defaultThumbnail,
    };

    useEffect(() => {
        setTimeout(() => {
            setItems([mockNews, mockNews, mockNews, mockNews]);
            setIsLoading(false);
        }, 800);
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
                    key={i}
                    style={{
                        height: "100vh",
                        scrollSnapAlign: "start",
                        overflow: "hidden",
                        background: "#fff",
                    }}
                >
                    <Container>
                        <Header>Short News</Header>
                        <Thumbnail src={data.thumbnail} alt="thumbnail" />
                        <ContentWrapper>
                            <NewsTitle>{data.title}</NewsTitle>
                            <TimeText>{data.time}</TimeText>
                            <Body>{data.body}</Body>
                        </ContentWrapper>
                    </Container>
                </section>
            ))}
        </div>
    );
}
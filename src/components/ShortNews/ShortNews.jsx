import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
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
const PAGE_SIZE = 10;

export default function ShortNews() {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const containerRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const tokenRef = useRef(localStorage.getItem("jwtToken"));
    const fetchingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const pageRef = useRef(0);

    const placeholders = useMemo(() => [placeholder1, placeholder2, placeholder3], []);
    const getRandomPlaceholder = useCallback(
        () => placeholders[Math.floor(Math.random() * placeholders.length)],
        [placeholders]
    );

    useEffect(() => {
        hasMoreRef.current = hasMore;
    }, [hasMore]);

    const mapItem = useCallback(
        (item) => ({
            id: item.newsId,
            title: item.title,
            body: item.summary,
            time: item.timeAgo,
            thumbnail: item.thumbnailUrl || getRandomPlaceholder(),
        }),
        [getRandomPlaceholder]
    );

    const loadPage = useCallback(
        async (nextPage) => {
            if (fetchingRef.current || !hasMoreRef.current) return;

            fetchingRef.current = true;
            setIsFetchingMore(true);

            try {
                const token = tokenRef.current;

                if (!token) {
                    const res = await apiFetch(
                        `${API_BASE_URL}/api/news/list?page=${nextPage}&size=${PAGE_SIZE}`
                    );
                    const data = await res.json();

                    const list = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
                    const mapped = list.map(mapItem);

                    setItems((prev) => (nextPage === 0 ? mapped : [...prev, ...mapped]));

                    if (mapped.length < PAGE_SIZE) setHasMore(false);
                    pageRef.current = nextPage;
                    return;
                }

                const recRes = await fetch(`${API_BASE_URL}/api/news-recommend/news`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                    body: JSON.stringify({ page: nextPage, size: PAGE_SIZE }),
                });

                const recData = await recRes.json();
                const ids = recData.newsIds?.map((n) => n.newsId) || [];

                if (ids.length === 0) {
                    setHasMore(false);
                    pageRef.current = nextPage;
                    return;
                }

                const detailRes = await apiFetch(`${API_BASE_URL}/api/news/list`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                    body: JSON.stringify({ ids }),
                });

                const detailData = await detailRes.json();
                const list = Array.isArray(detailData) ? detailData : [];
                const byId = new Map(list.map((x) => [x.newsId, x]));
                const ordered = ids.map((id) => byId.get(id)).filter(Boolean);
                const mapped = ordered.map(mapItem);

                setItems((prev) => {
                    if (nextPage === 0) return mapped;
                    const seen = new Set(prev.map((x) => x.id));
                    const merged = [...prev];
                    for (const it of mapped) {
                        if (!seen.has(it.id)) merged.push(it);
                    }
                    return merged;
                });

                if (ids.length < PAGE_SIZE) setHasMore(false);
                pageRef.current = nextPage;
            } catch (e) {
                console.error(e);
            } finally {
                fetchingRef.current = false;
                setIsFetchingMore(false);
                setIsLoading(false);
            }
        },
        [mapItem]
    );

    useEffect(() => {
        setIsLoading(true);
        setItems([]);
        setHasMore(true);
        hasMoreRef.current = true;
        pageRef.current = 0;
        loadPage(0);
    }, [loadPage]);

    useLayoutEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

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

    const lastSectionRef = useRef(null);

    useEffect(() => {
        const root = containerRef.current;
        const target = lastSectionRef.current;
        if (!root || !target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry?.isIntersecting) return;
                if (fetchingRef.current || !hasMoreRef.current) return;
                loadPage(pageRef.current + 1);
            },
            { root, threshold: 0.6 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [items.length, loadPage]);

    const goToDetail = (newsId) => {
        if (!newsId) return;
        navigate(`/detail?id=${encodeURIComponent(newsId)}`);
    };

    if (isLoading) {
        return <div style={{ height: "100dvh", background: "#e0e0e0" }} />;
    }

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
                {items.map((data, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <section
                            key={`${data.id ?? i}-${i}`}
                            ref={isLast ? lastSectionRef : null}
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

                            <OriginalButton onClick={() => goToDetail(data.id)}>View Original</OriginalButton>
                        </section>
                    );
                })}

                {isFetchingMore && <div style={{ padding: 16, textAlign: "center" }}>Loading...</div>}
            </div>
        </>
    );
}
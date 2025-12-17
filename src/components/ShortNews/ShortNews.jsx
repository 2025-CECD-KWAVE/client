import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = useNavigate();
    const containerRef = useRef(null);
    const lastSectionRef = useRef(null);

    const tokenRef = useRef(localStorage.getItem("jwtToken"));
    const pageRef = useRef(0);
    const fetchingRef = useRef(false);
    const hasMoreRef = useRef(true);

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

    const fetchList = useCallback(
        async (page) => {
            const token = tokenRef.current;

            if (!token) {
                const res = await apiFetch(
                    `${API_BASE_URL}/api/news/list?page=${page}&size=${PAGE_SIZE}`
                );
                const data = await res.json();
                const list = Array.isArray(data) ? data : data?.data ?? [];
                return list.map(mapItem);
            }

            const recRes = await fetch(`${API_BASE_URL}/api/news-recommend/news`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify({ page, size: PAGE_SIZE }),
            });

            const recData = await recRes.json();
            const ids = recData?.newsIds?.map((n) => n.newsId) || [];
            if (ids.length === 0) return [];

            const detailRes = await apiFetch(`${API_BASE_URL}/api/news/list`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify({ ids }),
            });

            const detailData = await detailRes.json();
            const byId = new Map(detailData.map((x) => [x.newsId, x]));
            return ids.map((id) => byId.get(id)).filter(Boolean).map(mapItem);
        },
        [mapItem]
    );

    const loadPage = useCallback(
        async (nextPage) => {
            if (fetchingRef.current || !hasMoreRef.current) return;

            fetchingRef.current = true;
            setIsFetchingMore(true);

            try {
                const mapped = await fetchList(nextPage);

                setItems((prev) => {
                    if (nextPage === 0) return mapped;
                    const seen = new Set(prev.map((x) => x.id));
                    const merged = [...prev];
                    for (const it of mapped) {
                        if (!seen.has(it.id)) merged.push(it);
                    }
                    return merged;
                });

                if (mapped.length < PAGE_SIZE) setHasMore(false);
                pageRef.current = nextPage;
            } finally {
                fetchingRef.current = false;
                setIsFetchingMore(false);
                setIsLoading(false);
            }
        },
        [fetchList]
    );

    useEffect(() => {
        setIsLoading(true);
        setItems([]);
        setHasMore(true);
        hasMoreRef.current = true;
        pageRef.current = 0;
        setActiveIndex(0);
        loadPage(0);
    }, [loadPage]);

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

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

        const indexObserver = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const idx = sections.indexOf(entry.target);
                    if (idx !== -1) setActiveIndex(idx);
                }
            },
            { root, threshold: 0.6 }
        );

        sections.forEach((s) => indexObserver.observe(s));
        return () => indexObserver.disconnect();
    }, [items.length]);

    useEffect(() => {
        const root = containerRef.current;
        const target = lastSectionRef.current;
        if (!root || !target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                if (fetchingRef.current || !hasMoreRef.current) return;
                loadPage(pageRef.current + 1);
            },
            { root, threshold: 0.6 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [items.length, loadPage]);

    const goToDetail = (id) => {
        navigate(`/detail?id=${encodeURIComponent(id)}`);
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
                    background: "#fff",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {items.map((data, i) => {
                    const isLast = i === items.length - 1;

                    return (
                        <section
                            key={data.id ?? i}
                            ref={isLast ? lastSectionRef : null}
                            style={{
                                height: "calc(100dvh - 56px)",
                                scrollSnapAlign: "start",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Container>
                                <Thumbnail
                                    src={data.thumbnail}
                                    onError={(e) => (e.currentTarget.src = getRandomPlaceholder())}
                                />
                                <ContentWrapper>
                                    <NewsTitle>{data.title}</NewsTitle>
                                    <TimeText>{data.time}</TimeText>
                                    <Body>{data.body}</Body>
                                </ContentWrapper>
                                <OriginalButton onClick={() => goToDetail(data.id)}>
                                    View Original
                                </OriginalButton>
                            </Container>
                        </section>
                    );
                })}

                {isFetchingMore && (
                    <div style={{ padding: 16, textAlign: "center" }}>Loading...</div>
                )}
            </div>
        </>
    );
}

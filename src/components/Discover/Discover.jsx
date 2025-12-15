import React, { useEffect, useState, useRef, useCallback } from "react";
import RecommendationCard from "../Main/RecommendationCard";
import sampleImg from "../../assets/placeholder1.png";
import { apiFetch } from "../../api";

import {
    SkeletonCardContainer,
    SkeletonThumbnail,
    SkeletonText,
    SkeletonMeta,
} from "../Main/RecommendationCardStyle";

import {
    SectionWrapper,
    SectionTitle,
    Keyword,
    SearchWrapper,
    SearchInput,
    SearchIconImg,
} from "./DiscoverStyle";

import searchIcon from "../../assets/search.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Discover() {
    const [newsList, setNewsList] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");
    const loader = useRef(null);

    const fetchNews = useCallback(async () => {
        if (searchKeyword) return;

        setLoading(true);
        try {
            const response = await apiFetch(`${API_BASE_URL}/api/news/list?page=${page}`);
            if (!response.ok) throw new Error();

            const data = await response.json();
            if (data.length < 10) setHasMore(false);

            const mapped = data.map((item) => ({
                title: item.title,
                time: item.timeAgo || "방금 전",
                provider: item.provider || "언론사",
                imageSrc: item.thumbnailUrl || sampleImg,
                newsId: item.newsId,
            }));

            setNewsList((prev) => [...prev, ...mapped]);
        } catch {
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [page, searchKeyword]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const runSearch = async () => {
        if (!searchKeyword.trim()) return;

        setLoading(true);
        setHasMore(false);
        setPage(0);
        setNewsList([]);

        try {
            const res = await apiFetch(
                `${API_BASE_URL}/api/search?query=${encodeURIComponent(searchKeyword)}&page=0&size=20`
            );

            const data = await res.json();

            const sortedResults = (data.results || []).sort((a, b) => b.relevance - a.relevance);
            const ids = sortedResults.map((r) => r.newsId);

            if (ids.length === 0) {
                setNewsList([]);
                return;
            }

            const detailRes = await apiFetch(`${API_BASE_URL}/api/news/list`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids }),
            });

            const detailData = await detailRes.json();

            const detailMap = new Map(detailData.map((x) => [x.newsId, x]));
            const ordered = ids.map((id) => detailMap.get(id)).filter(Boolean);

            const mapped = ordered.map((item) => ({
                title: item.title,
                time: item.timeAgo || "방금 전",
                provider: item.provider || "언론사",
                imageSrc: item.thumbnailUrl || sampleImg,
                newsId: item.newsId,
            }));

            setNewsList(mapped);
        } catch {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchKeyword) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1);
            }
        });

        if (loader.current) observer.observe(loader.current);
        return () => loader.current && observer.unobserve(loader.current);
    }, [hasMore, searchKeyword]);

    return (
        <SectionWrapper>
            <SearchWrapper>
                <SearchIconImg
                    src={searchIcon}
                    alt="search"
                    onClick={runSearch}
                    style={{ cursor: "pointer" }}
                />

                <SearchInput
                    placeholder="검색어를 입력하세요…"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && runSearch()}
                />
            </SearchWrapper>

            <SectionTitle>
                Discover More<Keyword> News</Keyword>
            </SectionTitle>

            {newsList.map((item, idx) => (
                <RecommendationCard
                    key={idx}
                    title={item.title}
                    time={item.time}
                    provider={item.provider}
                    imageSrc={item.imageSrc}
                    newsId={item.newsId}
                />
            ))}

            {loading &&
                Array.from({ length: 5 }).map((_, idx) => (
                    <SkeletonCardContainer key={`skeleton-${idx}`}>
                        <SkeletonThumbnail />
                        <div style={{ flex: 1 }}>
                            <SkeletonText style={{ width: "80%" }} />
                            <SkeletonText style={{ width: "60%" }} />
                            <SkeletonMeta>
                                <SkeletonText style={{ width: "30%" }} />
                                <SkeletonText style={{ width: "20%" }} />
                            </SkeletonMeta>
                        </div>
                    </SkeletonCardContainer>
                ))}

            {!searchKeyword && hasMore && <div ref={loader} style={{ height: "100px" }} />}
        </SectionWrapper>
    );
}

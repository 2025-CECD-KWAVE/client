import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendationCard from '../Main/RecommendationCard';
import styled from 'styled-components';
import sampleImg from '../../assets/sample.webp';

// SkeletonCard 추가
import {
    SkeletonCardContainer,
    SkeletonThumbnail,
    SkeletonText,
    SkeletonMeta
} from '../Main/RecommendationCardStyle';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SectionWrapper = styled.div`
  margin-top: 32px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 0 16px 12px;
  margin-left: 16px;
`;

const Keyword = styled.span`
  color: #4a42f4;
  font-weight: bold;
`;

export default function Discover() {
    const [newsList, setNewsList] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const loader = useRef(null);
    const navigate = useNavigate();

    const fetchNews = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/news/list?page=${page}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            if (data.length < 10) setHasMore(false);

            const mapped = data.map(item => ({
                title: item.title,
                time: item.timeAgo || '방금 전',
                imageSrc: item.thumbnailUrl || sampleImg,
                newsId: item.newsId
            }));

            setNewsList(prev => [...prev, ...mapped]);
        } catch (error) {
            console.error('뉴스 목록 불러오기 실패:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });

        if (loader.current) observer.observe(loader.current);
        return () => loader.current && observer.unobserve(loader.current);
    }, [hasMore]);

    return (
        <SectionWrapper>
            <SectionTitle>
                Discover More<Keyword> News</Keyword>
            </SectionTitle>

            {newsList.map((item, idx) => (
                <div
                    key={idx}
                    onClick={() => navigate(`/detail?id=${item.newsId}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <RecommendationCard
                        title={item.title}
                        time={item.time}
                        imageSrc={item.imageSrc}
                        newsId={item.newsId}
                    />
                </div>
            ))}

            {loading &&
                Array.from({ length: 5 }).map((_, idx) => (
                    <SkeletonCardContainer key={`skeleton-${idx}`}>
                        <SkeletonThumbnail />
                        <div style={{ flex: 1 }}>
                            <SkeletonText style={{ width: '80%' }} />
                            <SkeletonText style={{ width: '60%' }} />
                            <SkeletonMeta>
                                <SkeletonText style={{ width: '30%' }} />
                                <SkeletonText style={{ width: '20%' }} />
                            </SkeletonMeta>
                        </div>
                    </SkeletonCardContainer>
                ))
            }

            {hasMore && <div ref={loader} style={{ height: '100px' }} />}
        </SectionWrapper>
    );
}

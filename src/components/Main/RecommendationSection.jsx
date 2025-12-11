import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendationCard from './RecommendationCard';
import styled from 'styled-components';
import { apiFetch } from "../../api";

import placeholder1 from '../../assets/placeholder1.png';
import placeholder2 from '../../assets/placeholder2.png';
import placeholder3 from '../../assets/placeholder3.png';

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

export default function RecommendationSection() {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const placeholders = [placeholder1, placeholder2, placeholder3];
    const getRandomPlaceholder = () =>
        placeholders[Math.floor(Math.random() * placeholders.length)];

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            setIsLoggedIn(false);

            const fetchLatestNews = async () => {
                try {
                    const response = await apiFetch(`${API_BASE_URL}/api/news/list`);
                    const result = await response.json();

                    const list = Array.isArray(result)
                        ? result
                        : Array.isArray(result.data)
                            ? result.data
                            : [];

                    const mapped = list.slice(5).map(item => ({
                        title: item.title,
                        time: item.timeAgo || '방금 전',
                        imageSrc: item.thumbnailUrl || getRandomPlaceholder(),
                        newsId: item.newsId,
                        provider: item.provider || 'Unknown'
                    }));

                    setRecommendations(mapped);
                } catch (err) {
                    console.error('뉴스 불러오기 실패:', err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchLatestNews();
            return;
        }

        const fetchRecommendations = async () => {
            try {
                const response = await apiFetch(`${API_BASE_URL}/api/news-recommend/news`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                    body: JSON.stringify({
                        page: 0,
                        size: 20
                    }),
                });

                if (!response.ok) {
                    throw new Error(`추천 API 실패: ${response.status}`);
                }

                const result = await response.json();
                const newsIds = result.newsIds?.map(n => n.newsId) || [];

                if (newsIds.length === 0) {
                    setRecommendations([]);
                    return;
                }

                const detailResponse = await apiFetch(`${API_BASE_URL}/api/news/list`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ids: newsIds }),
                });

                if (!detailResponse.ok) {
                    throw new Error(`뉴스 상세 API 실패: ${detailResponse.status}`);
                }

                const detailData = await detailResponse.json();
                const list = Array.isArray(detailData) ? detailData : [];

                const mapped = list.map(item => ({
                    title: item.title,
                    time: item.timeAgo || '방금 전',
                    imageSrc: item.thumbnailUrl || getRandomPlaceholder(),
                    newsId: item.newsId,
                    provider: item.provider || 'Unknown',
                }));

                setRecommendations(mapped);
            } catch (error) {
                console.error('추천 뉴스 불러오기 실패:', error);

                localStorage.removeItem('jwtToken');
                setIsLoggedIn(false);

                window.location.reload();
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <SectionWrapper>
            <SectionTitle>
                Recommendation for : <Keyword>K-Culture</Keyword>
            </SectionTitle>

            {isLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                    <RecommendationCard key={idx} loading />
                ))
            ) : (
                recommendations.map((item, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(`/detail?id=${item.newsId}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <RecommendationCard
                            title={item.title}
                            time={item.time}
                            provider={item.provider}
                            imageSrc={item.imageSrc}
                            newsId={item.newsId}
                        />
                    </div>
                ))
            )}
        </SectionWrapper>
    );
}
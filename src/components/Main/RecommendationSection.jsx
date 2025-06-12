import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendationCard from './RecommendationCard';
import styled from 'styled-components';
import sampleImg from '../../assets/sample.webp';

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

const Message = styled.div`
  padding: 20px;
  font-size: 18px;
  color: #4a42f4;
  font-weight: bold;
  margin-left: 16px;
`;

export default function RecommendationSection() {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            setIsLoggedIn(false);
            setIsLoading(false);
            return;
        }

        const fetchRecommendations = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/recommend`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                const mapped = (data.recommendedNews || []).map(item => ({
                    title: item.title,
                    time: item.timeAgo || '방금 전',
                    imageSrc: item.thumbnailUrl || sampleImg,
                    newsId: item.newsId
                }));

                setRecommendations(mapped);
            } catch (error) {
                console.error('추천 뉴스 불러오기 실패:', error);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <SectionWrapper>
            <SectionTitle>
                Recommendation for : <Keyword>문화 &gt; 방송_연예</Keyword>
            </SectionTitle>

            {!isLoggedIn ? (
                <Message>로그인 후에 맞춤형 뉴스를 추천 받아보세요</Message>
            ) : isLoading ? (
                // ✅ Skeleton 3개 보여주기
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
                            imageSrc={item.imageSrc}
                            newsId={item.newsId}
                        />
                    </div>
                ))
            )}
        </SectionWrapper>
    );
}

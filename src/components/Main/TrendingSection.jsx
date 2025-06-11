import { useRef, useState, useEffect } from 'react';
import MainNewsCard from './MainNewsCard';
import sampleImg from '../../assets/sample.webp';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import {
    TrendingContainer,
    SectionTitle,
    CardSlider,
    CardWrapper,
    IndicatorContainer,
    IndicatorDot
} from './TrendiongSectionStyle';

export default function TrendingSection() {
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cards, setCards] = useState([]);

    // 뉴스 불러오기
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/news/list`);
                const data = await response.json();

                const newsCards = data.map(item => ({
                    title: item.title,
                    imageSrc: item.thumbnailUrl ? item.thumbnailUrl : sampleImg,
                    newsId: item.newsId
                }));

                setCards(newsCards);
            } catch (err) {
                console.error('뉴스 불러오기 실패:', err);
            }
        };

        fetchNews();
    }, []);

    const handleScroll = () => {
        const scrollLeft = sliderRef.current.scrollLeft;
        const cardWidth = 400 + 16; // 카드 너비 + gap
        const index = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(index);
    };

    return (
        <TrendingContainer>
            <SectionTitle>Trending Now</SectionTitle>
            <CardSlider ref={sliderRef} onScroll={handleScroll}>
                {cards.map((card, index) => (
                    <CardWrapper
                        key={index}
                        onClick={() => {
                            const cardWidth = 400 + 16;
                            const slider = sliderRef.current;
                            if (!slider) return;

                            const sliderCenter = slider.clientWidth / 2;
                            const scrollTo = index * cardWidth - sliderCenter + cardWidth / 2;

                            slider.scrollTo({
                                left: scrollTo < 0 ? 0 : scrollTo,
                                behavior: 'smooth',
                            });

                            setCurrentIndex(index);
                        }}
                    >
                        <MainNewsCard
                            imageSrc={card.imageSrc}
                            title={card.title}
                            newsId={card.newsId}
                        />
                    </CardWrapper>
                ))}
            </CardSlider>

            <IndicatorContainer>
                {cards.map((_, index) => (
                    <IndicatorDot key={index} active={index === currentIndex} />
                ))}
            </IndicatorContainer>
        </TrendingContainer>
    );
}

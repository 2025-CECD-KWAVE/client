import { useRef, useState } from 'react';
import MainNewsCard from './MainNewsCard';
import sampleImg from '../../assets/sample.webp';

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

    const cards = [
        { title: 'IU is coming with “Three Flower Petals” IU is coming with “Three Flower Petals IU is coming with “Three Flower Petals', source: '마이데일리', imageSrc: sampleImg },
        { title: '또 다른 뉴스 제목1', source: '뉴스1', imageSrc: sampleImg },
        { title: '트렌드 카드 예시2', source: '중앙일보', imageSrc: sampleImg },
        { title: '트렌드 카드 예시3', source: '중앙일보', imageSrc: sampleImg },
        { title: '트렌드 카드 예시4', source: '중앙일보', imageSrc: sampleImg }
    ];

    const handleScroll = () => {
        const scrollLeft = sliderRef.current.scrollLeft;
        const cardWidth = 400 + 16; // 카드 너비 + gap 값
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
                            const cardWidth = 400 + 16; // 카드 + gap
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
                            source={card.source}
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
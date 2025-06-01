import React from 'react';
import RecommendationCard from './RecommendationCard';
import styled from 'styled-components';
import sampleImg from '../../assets/sample.webp';

const SectionWrapper = styled.div`
  margin-top: 32px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 0 16px 12px;
  margin-left : 16px;
`;

const Keyword = styled.span`
  color: #4a42f4;
  font-weight: bold;
`;

export default function RecommendationSection() {
    const list = [
        {
            title: `"준비된 MC" 성한빈, 담당 PD도 놀랐다…"댄서 이름 다 외워"`,
            source: '마이데일리',
            time: '1시간 전',
            imageSrc: sampleImg,
        },
        {
            title: `“믿기지 않아”..‘옥씨부인전’ 최정우 갑작스러운 별세`,
            source: '스타투데이',
            time: '1시간 전',
            imageSrc: sampleImg,
        },
        {
            title: `'이 별에 필요한' 김태리·홍경, 목소리 연기로 호흡`,
            source: '스타투데이',
            time: '1시간 전',
            imageSrc: sampleImg,
        },
        {
            title: `'이 별에 필요한' 김태리·홍경, 목소리 연기로 호흡`,
            source: '스타투데이',
            time: '1시간 전',
            imageSrc: sampleImg,
        },
        {
            title: `'이 별에 필요한' 김태리·홍경, 목소리 연기로 호흡`,
            source: '스타투데이',
            time: '1시간 전',
            imageSrc: sampleImg,
        }
    ];

    return (
        <SectionWrapper>
            <SectionTitle>
                Recommendation : <Keyword>문화 &gt; 방송_연예</Keyword>
            </SectionTitle>
            {list.map((item, idx) => (
                <RecommendationCard key={idx} {...item} />
            ))}
        </SectionWrapper>
    );
}
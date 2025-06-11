// RecommendationCard.jsx
import {
    CardContainer,
    Thumbnail,
    Content,
    Title,
    MetaInfo,
    Source,
    Time,
} from './RecommendationCardStyle';

import { useNavigate } from 'react-router-dom';

export default function RecommendationCard({ imageSrc, title, source, time, newsId }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detail?id=${newsId}`);
    };

    return (
        <CardContainer onClick={handleClick}>
            <Thumbnail src={imageSrc} alt="썸네일" />
            <Content>
                <Title>{title}</Title>
                <MetaInfo>
                    <Source>{source}</Source>
                    <Time>{time}</Time>
                </MetaInfo>
            </Content>
        </CardContainer>
    );
}

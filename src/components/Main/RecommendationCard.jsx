import {
    CardContainer,
    Thumbnail,
    Content,
    Title,
    MetaInfo,
    Source,
    Time,
} from './RecommendationCardStyle';

export default function RecommendationCard({ imageSrc, title, source, time }) {
    return (
        <CardContainer>
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
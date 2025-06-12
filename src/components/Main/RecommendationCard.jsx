import {
    CardContainer,
    Thumbnail,
    Content,
    Title,
    MetaInfo,
    Source,
    Time,
    SkeletonThumbnail,
    SkeletonText,
    SkeletonMeta
} from './RecommendationCardStyle';

import { useNavigate } from 'react-router-dom';

export default function RecommendationCard({ imageSrc, title, source, time, newsId, loading = false }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!loading) {
            navigate(`/detail?id=${newsId}`);
        }
    };

    return (
        <CardContainer onClick={handleClick} style={{ cursor: loading ? 'default' : 'pointer' }}>
            {loading ? (
                <>
                    <SkeletonThumbnail />
                    <Content>
                        <SkeletonText style={{ width: '80%' }} />
                        <SkeletonMeta>
                            <SkeletonText style={{ width: '30%' }} />
                            <SkeletonText style={{ width: '20%' }} />
                        </SkeletonMeta>
                    </Content>
                </>
            ) : (
                <>
                    <Thumbnail src={imageSrc} alt="썸네일" />
                    <Content>
                        <Title>{title}</Title>
                        <MetaInfo>
                            <Source>{source}</Source>
                            <Time>{time}</Time>
                        </MetaInfo>
                    </Content>
                </>
            )}
        </CardContainer>
    );
}

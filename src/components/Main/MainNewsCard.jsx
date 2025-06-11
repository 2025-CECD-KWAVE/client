import {
    CardContainer,
    CardImage,
    Overlay,
    Title,
    Source,
} from './MainNewsCardStyle';

import { useNavigate } from 'react-router-dom';

export default function MainNewsCard({ imageSrc, title, source, newsId }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detail?id=${newsId}`);
    };

    return (
        <CardContainer >
            <CardImage src={imageSrc} alt="news" />
            <Overlay>
                <Title onClick={handleClick}>{title}</Title>
                <Source>{source}</Source>
            </Overlay>
        </CardContainer>
    );
}

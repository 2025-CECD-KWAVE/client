import {
    CardContainer,
    CardImage,
    Overlay,
    Title,
    Source,
} from './MainNewsCardStyle';

export default function MainNewsCard({ imageSrc, title, source }) {
    return (
        <CardContainer>
            <CardImage src={imageSrc} alt="news" />
            <Overlay>
                <Title>{title}</Title>
                <Source>{source}</Source>
            </Overlay>
        </CardContainer>
    );
}

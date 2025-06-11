import volumeIcon from '../../assets/volume.png';
import defaultThumbnail from '../../assets/sample.webp'; // 기본 이미지 추가
import { useState, useEffect } from 'react';
import {
    Wrapper,
    TitleRow,
    Title,
    VolumeIcon,
    Meta,
    Body,
    MetaWrapper,
    Thumbnail
} from './NewsDetailStyle';
import AudioController from './AudioController';
import { useSearchParams } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NewsDetail() {
    const [searchParams] = useSearchParams();
    const newsId = searchParams.get('id');

    const [showController, setShowController] = useState(false);
    const [title, setTitle] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishedAt, setPublishedAt] = useState('');
    const [body, setBody] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState(defaultThumbnail);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/news/${newsId}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                const publishedTime = data.publishedAt;
                const formattedDate = publishedTime
                    ? `${publishedTime[0]}-${String(publishedTime[1]).padStart(2, '0')}-${String(publishedTime[2]).padStart(2, '0')} ${String(publishedTime[3]).padStart(2, '0')}:${String(publishedTime[4]).padStart(2, '0')}`
                    : 'unknown';

                setTitle(data.title || '제목 없음');
                setPublisher(data.provider || 'unknown');
                setPublishedAt(formattedDate);
                setBody(data.content || '내용이 없습니다.');

                if (data.imageUrls && data.imageUrls.length > 0) {
                    setThumbnailUrl(data.imageUrls[0]);
                } else {
                    setThumbnailUrl(defaultThumbnail);
                }

            } catch (err) {
                console.error('뉴스 상세 불러오기 실패:', err);
            }
        };

        if (newsId) {
            fetchNewsDetail();
        }
    }, [newsId]);

    return (
        <div>
            <Thumbnail src={thumbnailUrl} alt="뉴스 썸네일" />
            <Wrapper>
                <TitleRow>
                    <Title>{title}</Title>
                </TitleRow>
                <MetaWrapper>
                    <VolumeIcon
                        src={volumeIcon}
                        alt="sound"
                        onClick={() => setShowController(prev => !prev)}
                        style={{ cursor: 'pointer' }}
                    />
                    {showController && <AudioController text={body.replace(/([.!?])\s+/g, '$1\n\n')} />}
                    <Meta>
                        <div>{publisher}</div>
                        <div>{publishedAt}</div>
                    </Meta>
                </MetaWrapper>

                <Body>{body}</Body>
            </Wrapper>
        </div>

    );
}

import volumeIcon from '../../assets/volume.png';
import defaultThumbnail from '../../assets/placeholder1.png';
import backIcon from '../../assets/back.png';
import { useState, useEffect } from 'react';
import {
    Wrapper,
    TitleRow,
    Title,
    VolumeIcon,
    Meta,
    Body,
    MetaWrapper,
    Thumbnail,
    SkeletonThumbnail,
    SkeletonTitle,
    SkeletonMeta,
    SkeletonBody,
    ThumbnailWrapper,
    BackButton,
    LikeButton,
    LikeIcon,
    MetaRight
} from './NewsDetailStyle';
import AudioController from './AudioController';
import { useSearchParams } from 'react-router-dom';
import { apiFetch } from '../../api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NewsDetail() {
    const [searchParams] = useSearchParams();
    const newsId = searchParams.get('id');

    const [showController, setShowController] = useState(false);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishedAt, setPublishedAt] = useState('');
    const [body, setBody] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const response = await apiFetch(`${API_BASE_URL}/api/news/${newsId}`);

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
                    setThumbnailUrl('');
                }

                if (typeof data.liked === 'boolean') {
                    setLiked(data.liked);
                }
            } catch (err) {
                console.error('뉴스 상세 불러오기 실패:', err);
            } finally {
                setLoading(false);
            }
        };

        if (newsId) {
            fetchNewsDetail();
        }
    }, [newsId]);

    if (loading) {
        return (
            <div>
                <SkeletonThumbnail />
                <Wrapper>
                    <SkeletonTitle />
                    <SkeletonMeta />
                    <SkeletonMeta />
                    <SkeletonBody />
                    <SkeletonBody />
                    <SkeletonBody />
                </Wrapper>
            </div>
        );
    }

    const processedBodyForTts = body.replace(/([.!?])\s+/g, '$1\n\n');

    const handleBack = () => {
        window.history.back();
    };

    const toggleLike = () => {
        setLiked(prev => !prev);
    };

    return (
        <div>
            <ThumbnailWrapper>
                <Thumbnail src={thumbnailUrl || defaultThumbnail} alt="뉴스 썸네일" />
                <BackButton src={backIcon} alt="back" onClick={handleBack} />
            </ThumbnailWrapper>

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
                    <AudioController text={processedBodyForTts} hidden={!showController} />

                    <MetaRight>
                        <Meta>
                            <div>{publisher}</div>
                            <div>{publishedAt}</div>
                        </Meta>

                        <LikeButton
                            type="button"
                            aria-pressed={liked}
                            aria-label={liked ? '좋아요 취소' : '좋아요'}
                            onClick={toggleLike}
                        >
                            <LikeIcon
                                $active={liked}
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                {liked ? (
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                ) : (
                                    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3z" />
                                )}
                            </LikeIcon>
                        </LikeButton>
                    </MetaRight>
                </MetaWrapper>

                <Body>{body}</Body>
            </Wrapper>
        </div>
    );
}
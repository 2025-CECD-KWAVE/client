import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0 16px;
  border-radius: 10px;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const VolumeIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export const MetaWrapper = styled.div`
  display: flex;
  padding: 10px;
  margin-top: 14px;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

export const MetaRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

export const LikeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  outline: none;
  box-shadow: none;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;

  &:focus,
  &:focus-visible,
  &:active {
    outline: none;
    box-shadow: none;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const LikeIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: ${({ $active }) => ($active ? '#ff3b30' : 'none')};
  stroke: ${({ $active }) => ($active ? '#ff3b30' : '#9aa0a6')};
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
`;


export const Body = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin-top: 16px;
  white-space: pre-wrap;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  margin-bottom: 10px;
`;

export const BackButton = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 22px;
  height: 22px;
  cursor: pointer;
  z-index: 1;
`;

export const SkeletonBox = styled.div`
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

export const SkeletonThumbnail = styled.div`
  width: 100%;
  height: 500px;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  object-fit: cover;
`;

export const SkeletonTitle = styled(SkeletonBox)`
  height: 24px;
  margin-bottom: 8px;
  width: 60%;
  align-self: flex-end;
`;

export const SkeletonMeta = styled(SkeletonBox)`
  height: 14px;
  width: 30%;
  margin-top: 4px;
  align-self: flex-end;
`;

export const SkeletonBody = styled(SkeletonBox)`
  height: 14px;
  width: 100%;
  margin: 8px 0;
`;
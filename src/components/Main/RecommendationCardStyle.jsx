import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

export const SkeletonCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border-radius: 12px;
  margin: 8px 16px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const CardContainer = styled.div`
  display: flex;
  background-color: #f8f8fc;
  border-radius: 16px;
  padding: 12px;
  margin: 8px 16px;
  align-items: center;
  transition: 0.25s ease;

  &:hover {
    background-color: #f0ecff;
    box-shadow: 0 4px 12px rgba(105, 80, 255, 0.25);
    transform: translateY(-2px);
  }
`;

export const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 12px;
`;

export const Content = styled.div`
  flex: 1;
  position: relative;
  min-height: 70px;   
  padding-bottom: 1px; 
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;

  display: -webkit-box;
  -webkit-line-clamp: 2;     /* 최대 3줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MetaInfo = styled.div`
  display: flex;
  position: absolute;
  align-items: center;       
  font-size: 12px;
  color: #666;
  bottom: 0;
  right: 0;
  left:0;
`;

export const Source = styled.span`
  color: #6b4eff;
  font-weight: 500;
  margin-left: 2px;
`;

export const Time = styled.span`
  color: #6b4eff;
  margin-left: auto;       
`;

export const SkeletonThumbnail = styled.div`
  width: 100px;
  height: 80px;
  margin-right: 12px;
  border-radius: 4px;
  background: #e0e0e0;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const SkeletonText = styled.div`
  height: 16px;
  border-radius: 4px;
  background: #e0e0e0;
  margin-bottom: 8px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const SkeletonMeta = styled.div`
  display: flex;
  gap: 10px;
`;

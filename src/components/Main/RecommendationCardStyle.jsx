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
`;

export const Thumbnail = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 12px;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
`;

export const Source = styled.span`
  color: #6b4eff;
  font-weight: 500;
`;

export const Time = styled.span`
  color: #888;
`;

// 🟦 Skeleton styles
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
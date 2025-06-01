import styled from 'styled-components';

export const CardContainer = styled.div`
  position: relative;
  width: 400px;
  height: 260px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  height: 80px;
  width: 100%;
  padding: 32px;
  background: rgba(0, 0, 0, 0.35);
  color: white;
  display: flex;

  align-items: center;
  font-size: 14px;
  box-sizing: border-box;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  width: 300px;
  display: -webkit-box;
  -webkit-line-clamp: 2;         
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  line-height: 1.4;               
`;

export const Source = styled.div`
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 12px;
  opacity: 0.85;
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  height: 100%;
  
`;

export const Header = styled.h1`
  position: sticky;
  top: 0;
  z-index: 10;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 16px 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 360px;
  max-height: 360px;
  object-fit: cover;
`;

export const ContentWrapper = styled.div`
  padding: 20px 16px 40px;
  display: flex;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
`;

export const NewsTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: right;
`;

export const TimeText = styled.span`
  font-size: 12px;
  color: #4b74ff;
  margin-left: auto;
  display: block;
  text-align: right;
`;

export const Body = styled.p`
  margin-top: 16px;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 60px;
`;

export const OriginalButton = styled.button`
  margin-top: auto;
  align-self: center;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #463fd4;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom:20px;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;
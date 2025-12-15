import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
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
  height: 430px;
  object-fit: cover;
`;

export const ContentWrapper = styled.div`
  padding: 20px 16px 120px;
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
`;

export const OriginalButton = styled.button`
  position: absolute;
  right: 16px;
  bottom: 120px;

  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background-color: #463fd4;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.98);
  }
`;
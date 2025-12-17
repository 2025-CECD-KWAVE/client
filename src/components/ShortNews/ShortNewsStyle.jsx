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
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 14px 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 370px;
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
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 11px;
  text-align: right;
`;

export const TimeText = styled.span`
  font-size: 11px;
  color: #4b74ff;
  margin-left: auto;
  display: block;
  text-align: right;
`;

export const Body = styled.p`
  margin-top: 14px;
  font-size: 12.5px;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
  flex: 1;
`;

export const OriginalButton = styled.button`
  position: absolute;
  right: 14px;
  bottom: 100px;

  padding: 9px 16px;
  border-radius: 999px;
  border: none;
  background-color: #463fd4;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.98);
  }
`;
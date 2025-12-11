import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

export const Header = styled.h1`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 10px;
`;

export const ContentWrapper = styled.div`
  margin-top: 16px;
`;

export const NewsTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
`;

export const TimeText = styled.div`
  font-size: 13px;
  color: #888;
  margin-bottom: 10px;
`;

export const Body = styled.p`
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
  margin-bottom: 20px;
`;

export const OriginalButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #1976d2;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;
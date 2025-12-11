import styled from "styled-components";

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
  height: 56px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  line-height: 56px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  height: 360px;
  max-height: 520px;
  background: #000;
  overflow: hidden;
  margin-top: 80px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContentWrapper = styled.div`
  padding: 20px 16px 40px;
  display: flex;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
`;

export const VoicePanel = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 6px;
  gap: 12px;
`;

export const VoiceButton = styled.button`
  background: ${(p) => (p.active ? "#ece7ff" : "#ffffff")};
  border: ${(p) => (p.active ? "2px solid #6b5bff" : "1px solid #ccc")};
  width: 70px;
  height: 85px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 11px;
  color: ${(p) => (p.active ? "#6b5bff" : "#555")};
  transition: 0.15s ease;
`;

export const VoiceImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 6px;
`;

export const TimeText = styled.div`
  font-size: 13px;
  color: #4b74ff;
  text-align: right;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const GuideText = styled.div`
  font-size: 13px;
  color: #666;
  text-align: right;
`;

export const VideoTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-top: 12px;
  margin-bottom: 8px;
  color: #111;
  text-align: right;
`;
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #000;
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
  margin-top: 135px;
  margin-bottom: 135px;
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
  padding: 0px 16px 48px;
  display: flex;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
  align-items: flex-end;
  text-align: right;
  background: #fbfbfbff;
  border-radius: 15px;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
`;

export const ProfileRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 16px;
  justify-content: flex-end;
`;

export const ProfileAvatar = styled.button`
  position: relative;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 999px;
  overflow: hidden;

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

  img {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    object-fit: cover;
    display: block;
  }
`;

export const ProfileRing = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  pointer-events: none;

  box-shadow: ${({ $active }) =>
    $active ? "0 0 0 3px #463fd4 inset" : "none"};
`;

export const VideoTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-top: 12px;
  margin-bottom: 8px;
  color: #000000ff;
  text-align: right;
`;

export const TimeText = styled.div`
  font-size: 13px;
  color: #5d5d5dff;
  margin-top: 8px;
  margin-bottom: 4px;
  text-align: right;
`;

export const GuideText = styled.div`
  font-size: 13px;
  color: #515151ff;
  text-align: right;
`;

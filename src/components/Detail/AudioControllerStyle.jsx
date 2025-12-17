import styled from 'styled-components';

export const IconImage = styled.img`
  width: 18px;
  height: 18px;
  transform: ${({ isPlay }) => (isPlay ? "scale(0.9)" : "scale(1)")};
  transition: transform 0.1s ease;
`;

export const MainWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const ControllerWrapper = styled.div`
  position: absolute;
  top: 400px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  min-height: 100px;
  padding: 12px 16px 4px 16px;
  background: white;
  border-radius: 22px;
  border: 2px solid #D9CCFF;
  box-shadow: 0 4px 14px rgba(122, 92, 255, 0.15);
  z-index: 10;
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  flex-direction: column;
  gap: 9px;
  box-sizing: border-box;
  overflow: hidden;
`;

export const TitleRow = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 13px;
  text-align: left;
  margin-top: 2px;
  margin-left: 10px;
  margin-bottom: 6px;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  &:focus {
    outline: none;
  }
`;

export const LoadingImage = styled.img`
  width: 34px;
  height: 34px;
`;

export const VoicePanel = styled.div`
  display: flex;
  gap: 4px;
`;

export const VoiceButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 3px 3px 36px 3px;
  width: 63px;
  height: 72px;
  border-radius: 14px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  box-sizing: border-box;
  border: ${({ active }) => (active ? "2px solid #7A5CFF" : "1px solid #DDD")};
  background: ${({ active }) => (active ? "#F3EEFF" : "#FFFFFF")};
  transition: 0.2s;
  outline: none;
  &:focus {
    outline: none;
  }
  &:hover {
    transform: translateY(-1px);
  }
`;

export const VoiceImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  object-fit: cover;
  margin-bottom: 2px;
`;

export const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  justify-content: flex-start;
`;

export const LogWrapper = styled.div`
  font-size: 11px;
  color: #00E52E;
  min-height: 14px;
  text-align: left;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;
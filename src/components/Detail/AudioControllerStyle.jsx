import styled from 'styled-components';

export const IconImage = styled.img`
  width: 32px;
  height: 32px;
`;

export const MainWrapper = styled.div`
  display: flex;
  gap:25px;
`;

export const ControllerWrapper = styled.div`
  position: absolute;
  top: 430px; // 필요에 따라 조정
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 95px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.01);  // 데스크탑에서 틀 느낌
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  z-index: 10;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 8px;
  margin-left: 16px;
`;


export const Controls = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const LoadingImage = styled.img`
  width: 48px;
  height: 48px;
`;
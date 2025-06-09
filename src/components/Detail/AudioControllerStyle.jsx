import styled from 'styled-components';

export const IconImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export const ControllerWrapper = styled.div`
  position: absolute;
  top: 620px; // 필요에 따라 조정
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background: white;
  border-radius: 24px;
  border: 1px solid #333;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  z-index: 10;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: linear-gradient(to right, #f66 30%, #ccc 30%);
  border-radius: 3px;
  margin-bottom: 8px;
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
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalBox = styled.div`
  width: 260px;
  max-height: 420px;       
  background: white;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const ButtonScrollArea = styled.div`
  width: 100%;
  max-height: 260px;     /* 버튼 영역 자체 높이 제한 */
  overflow-y: auto;
  margin-bottom: 16px;
  padding-right: 4px;

  /* 스크롤바 스타일(선택) */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c7c7c7;
    border-radius: 6px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  margin-bottom: 10px;
  border-radius: 8px;
  border: none;
  background: #f5f5f8;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s ease;

  &:hover {
    background: #ececff;
  }
`;

export const CloseButton = styled(Button)`
  background: #ddd;
  margin-top: auto; 
  margin-bottom: 0;

  &:hover {
    background: #ccc;
  }
`;

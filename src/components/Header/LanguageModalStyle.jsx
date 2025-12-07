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
  background: white;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
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
  margin-top: 10px;

  &:hover {
    background: #ccc;
  }
`;

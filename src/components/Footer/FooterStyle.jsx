import styled from 'styled-components';

export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50.5%;
  transform: translateX(-50%);
  width: 500px;
  background-color: white;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  overflow: hidden;
  z-index: 100;
`;

export const FooterInner = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 16px;
`;

export const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 56px;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  z-index: 1;
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 999px;
  background-color: #463fd4;
  color: #fff;
  transition: background-color 0.3s;
`;

export const IconImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
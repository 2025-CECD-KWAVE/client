import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;   
  min-height: 100vh;  
  width: 100vw;
  background-color: #f5f5f5; 
`;

export const AppWrapper = styled.div`
  width: 450px;
  max-width: 1000px;     // 모바일 기준 너비
  position: relative;
  background-color: #fff;
  
  padding-bottom: 70px;
  
  min-height: 100vh;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);  // 데스크탑에서 틀 느낌
`;
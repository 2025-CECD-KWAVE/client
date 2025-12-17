import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-color: #ffffff;
  gap: 36px;
`;

export const LogoImage = styled.img`
  width: 160px;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
  max-width: 300px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: #000;
  margin-bottom: 3px;
`;

export const Input = styled.input`
  padding: 12px;
  margin-bottom: 14px;
  border: none;
  border-radius: 10px;
  background-color: #d0c7ff;
  font-size: 14px;
`;

export const Button = styled.button`
  background-color: #4b39ef;
  color: white;
  font-size: 14px;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 16px;
`;

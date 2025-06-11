// src/pages/LoginStyle.jsx
import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-color: #ffffff;
  gap: 40px;
`;

export const LogoImage = styled.img`
  width: 180px;
  margin-bottom: 32px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 300px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #000;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  padding: 12px;
  margin-bottom: 16px;
  border: none;
  border-radius: 10px;
  background-color: #d0c7ff;
  font-size: 16px;
`;

export const Button = styled.button`
  background-color: #4b39ef;
  color: white;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 16px;
`;

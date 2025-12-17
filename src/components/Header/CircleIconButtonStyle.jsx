import styled from 'styled-components';

export const Button = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 6px solid #F7F6F9;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    background-color: #faf7ff; 
    box-shadow: 0 4px 10px rgba(74, 66, 244, 0.18); 
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
  }
`;

export const IconImage = styled.img`
  width: 50%;
  height: 50%;
  object-fit: contain;
`;
import styled from 'styled-components';

export const SectionWrapper = styled.div`
  margin-top: 20px;
`;

export const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 0 16px 12px;
  margin-left: 16px;
`;

export const Keyword = styled.span`
  color: #4a42f4;
  font-weight: bold;
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 20px 20px 20px;
`;

export const SearchInput = styled.input`
  width: 80%;
  padding: 10px 40px 10px 20px;
  border-radius: 12px;
  border: 1px solid #e5e6eb;
  background: #fafafa;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    background: white;
    border-color: #4a42f4;
    box-shadow: 0 0 0 3px rgba(74, 66, 244, 0.15);
  }
`;

export const SearchIconImg = styled.img`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  opacity: 0.6;
  pointer-events: auto;
  cursor: pointer;
`;
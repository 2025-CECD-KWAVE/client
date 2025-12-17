import styled, { css } from 'styled-components';

export const TrendingContainer = styled.div`
  margin-top: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 12px;
  margin-left: 28px;
`;

export const CardSlider = styled.div`
  display: flex;
  overflow-x: auto;
  margin-left: 18px;
  margin-right: 20px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 12px;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CardWrapper = styled.div`
  scroll-snap-align: center;
  flex-shrink: 0;
`;

export const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7px;
  gap: 5px;
`;


export const IndicatorDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ccc;
  transition: background-color 0.3s ease;

  ${({ $active }) =>
    $active &&
    css`
      background-color: #4a42f4;
    `}
`;
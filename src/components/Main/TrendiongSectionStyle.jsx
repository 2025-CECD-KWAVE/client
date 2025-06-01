import styled from 'styled-components'

export const TrendingContainer = styled.div`
  margin-top: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 12px;
  margin-left: 32px;
`;

export const CardSlider = styled.div`
  display: flex;
  overflow-x: auto;
  margin-left: 20px;
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
  margin-top: 8px;
  gap: 6px;
`;

export const IndicatorDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#333' : '#ccc')};
  transition: background-color 0.3s;
`;
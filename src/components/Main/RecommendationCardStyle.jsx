import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  background-color: #f8f8fc;
  border-radius: 16px;
  padding: 12px;
  margin: 8px 16px;
  align-items: center;
`;

export const Thumbnail = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 12px;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
`;

export const Source = styled.span`
  color: #6b4eff;
  font-weight: 500;
`;

export const Time = styled.span`
  color: #888;
`;
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0 16px;
  border-radius : 10px;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const VolumeIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export const MetaWrapper = styled.div`
    display: flex;
    padding: 10px;
    justify-content: space-between;
`

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

export const Body = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin-top: 16px;
  white-space: pre-wrap;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 500px; /* 원하는 높이 설정 */
  object-fit: cover;
  margin-bottom: 10px;
`;

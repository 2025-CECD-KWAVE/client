import styled from 'styled-components';


export const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 0;
`;


export const Header = styled.h1`
font-size: 16px;
font-weight: bold;
text-align: center;
margin: 20px 0;
`;


export const Thumbnail = styled.img`
width: 100%;
height: 360px;
max-height: 520px;
object-fit: cover;
`;


export const ContentWrapper = styled.div`
padding: 20px 16px 40px;
`;


export const NewsTitle = styled.h2`
font-size: 18px;
font-weight: 600;
margin-bottom: 12px;
text-align: right;
`;


export const TimeText = styled.span`
font-size: 12px;
color: #4b74ff;
margin-left: auto;
display: block;
text-align: right;
`;


export const Body = styled.p`
margin-top: 16px;
font-size: 14px;
line-height: 1.6;
color: #333;
white-space: pre-wrap;
`;
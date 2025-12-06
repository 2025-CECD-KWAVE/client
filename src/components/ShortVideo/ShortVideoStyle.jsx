import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Header = styled.h1`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
`;

export const VideoWrapper = styled.div`
    width: 100%;
    height: 360px;
    max-height: 520px;
    background: #000;
    overflow: hidden;
`;

export const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
`;

export const VideoElement = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const ContentWrapper = styled.div`
    position: relative;
    padding: 20px 16px 40px;
`;

/* 버튼은 그대로 우측에 둔다 */
export const VoicePanel = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 6px;
    gap: 12px;
`;

export const VoiceButton = styled.button`
    background: ${(p) => (p.active ? "#ece7ff" : "#ffffff")};
    border: ${(p) => (p.active ? "2px solid #6b5bff" : "1px solid #ccc")};
    width: 70px;
    height: 85px;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 11px;
    color: ${(p) => (p.active ? "#6b5bff" : "#555")};
    transition: 0.15s ease;
`;

export const VoiceImage = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 6px;
`;

/* 시간과 안내 문구를 버튼 아래에 우측 정렬로 배치 */
export const RightTextGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 12px;
`;

export const TimeText = styled.div`
    font-size: 13px;
    color: #4b74ff;
    text-align: right;
    margin-bottom: 4px;
`;

export const GuideText = styled.div`
    font-size: 13px;
    color: #666;
    text-align: right;
`;

export const VideoTitle = styled.h2`
    font-size: 18px;
    font-weight: 700;
    margin-top: 12px;
    margin-bottom: 8px;
    color: #111;
`;

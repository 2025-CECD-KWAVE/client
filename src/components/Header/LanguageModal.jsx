import {
    Overlay,
    ModalBox,
    Title,
    Button,
    CloseButton
} from "./LanguageModalStyle";

export default function LanguageModal({ onClose }) {

    const handleSelect = (langCode) => {

        localStorage.setItem("Accepted-Language", langCode);
        onClose();

        window.location.reload();
    };

    return (
        <Overlay onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <Title>언어 선택</Title>

                <Button onClick={() => handleSelect("KO")}>한국어</Button>
                <Button onClick={() => handleSelect("en-US")}>English</Button>
                <Button onClick={() => handleSelect("ZH-HANS")}>中文</Button>

                <CloseButton onClick={onClose}>닫기</CloseButton>
            </ModalBox>
        </Overlay>
    );
}
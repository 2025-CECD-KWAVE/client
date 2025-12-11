import {
    Overlay,
    ModalBox,
    Title,
    Button,
    CloseButton,
    ButtonScrollArea
} from "./LanguageModalStyle";

export default function LanguageModal({ onClose }) {

    const LANGUAGES = [
        { code: "AR", label: "Arabic" },
        { code: "BG", label: "Bulgarian" },
        { code: "CS", label: "Czech" },
        { code: "DA", label: "Danish" },
        { code: "DE", label: "German" },
        { code: "EL", label: "Greek" },
        { code: "EN-GB", label: "English (British)" },
        { code: "EN-US", label: "English (American)" },
        { code: "ES", label: "Spanish" },
        { code: "ET", label: "Estonian" },
        { code: "FI", label: "Finnish" },
        { code: "FR", label: "French" },
        { code: "HU", label: "Hungarian" },
        { code: "ID", label: "Indonesian" },
        { code: "IT", label: "Italian" },
        { code: "JA", label: "Japanese" },
        { code: "KO", label: "Korean" },
        { code: "LT", label: "Lithuanian" },
        { code: "LV", label: "Latvian" },
        { code: "NB", label: "Norwegian Bokmål" },
        { code: "NL", label: "Dutch" },
        { code: "PL", label: "Polish" },
        { code: "PT-BR", label: "Portuguese (Brazilian)" },
        { code: "PT-PT", label: "Portuguese (Europe)" },
        { code: "RO", label: "Romanian" },
        { code: "RU", label: "Russian" },
        { code: "SK", label: "Slovak" },
        { code: "SL", label: "Slovenian" },
        { code: "SV", label: "Swedish" },
        { code: "TR", label: "Turkish" },
        { code: "UK", label: "Ukrainian" },
        { code: "ZH-HANS", label: "Chinese (Simplified)" },
        { code: "ZH-HANT", label: "Chinese (Traditional)" },
    ];

    const handleSelect = (langCode) => {
        localStorage.setItem("Accepted-Language", langCode);
        onClose();
        window.location.reload();
    };

    return (
        <Overlay onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <Title>언어 선택</Title>

                <ButtonScrollArea>
                    {LANGUAGES.map((lang) => (
                        <Button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                        >
                            {lang.label}
                        </Button>
                    ))}
                </ButtonScrollArea>

                <CloseButton onClick={onClose}>닫기</CloseButton>
            </ModalBox>
        </Overlay>
    );
}

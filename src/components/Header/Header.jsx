import CircleIconButton from './CircleIconButton';
import { HeaderContainer, RightButtonGroup } from './HeaderStyle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import languageIcon from '../../assets/language.png';
import searchIcon from '../../assets/search.png';

import LanguageModal from './LanguageModal';

export default function Header() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <HeaderContainer>
                <CircleIconButton
                    iconSrc={languageIcon}
                    onClick={() => setOpenModal(true)}
                />

                <RightButtonGroup>
                    <CircleIconButton
                        iconSrc={searchIcon}
                        onClick={() => navigate('/discover')}
                    />
                </RightButtonGroup>
            </HeaderContainer>

            {/* 언어 선택 모달 */}
            {openModal && <LanguageModal onClose={() => setOpenModal(false)} />}
        </>
    );
}

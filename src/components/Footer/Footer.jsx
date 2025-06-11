import { useNavigate } from 'react-router-dom';
import {
    FooterContainer,
    FooterInner,
    FooterItem,
    IconWrapper,
    Label,
    IconImage
} from './FooterStyle';

import globeIcon from '../../assets/language.png';
import bookmarkIcon from '../../assets/bookmark.png';
import userIcon from '../../assets/person.png';

export default function Footer() {
    const navigate = useNavigate();

    return (
        <FooterContainer>
            <FooterInner>
                <FooterItem onClick={() => navigate('/')}>
                    <Label>Home</Label>
                </FooterItem>

                <FooterItem onClick={() => navigate('/discover')}>
                    <IconWrapper>
                        <IconImage src={globeIcon} alt="Globe" />
                    </IconWrapper>
                </FooterItem>

                <FooterItem>
                    <IconWrapper>
                        <IconImage src={bookmarkIcon} alt="Bookmark" />
                    </IconWrapper>
                </FooterItem>

                <FooterItem onClick={() => navigate('/signin')}>
                    <IconWrapper>
                        <IconImage src={userIcon} alt="User" />
                    </IconWrapper>
                </FooterItem>
            </FooterInner>
        </FooterContainer>
    );
}

import { useNavigate } from 'react-router-dom';
import {
    FooterContainer,
    FooterInner,
    FooterItem,
    IconWrapper,
    Label,
    IconImage
} from './FooterStyle';

import fireIcon from '../../assets/fire.png';
import videoIcon from '../../assets/clapperboard.png';
import userIcon from '../../assets/person.png';
import globeIcon from '../../assets/language.png';

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

                <FooterItem onClick={() => navigate('/short')}>
                    <IconWrapper>
                        <IconImage src={fireIcon} alt="Fire" />
                    </IconWrapper>
                </FooterItem>

                <FooterItem onClick={() => navigate('/video')}>
                    <IconWrapper>
                        <IconImage src={videoIcon} alt="videos" />
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

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
    return (
        <FooterContainer>
            <FooterInner>
                <FooterItem>
                    <Label>Home</Label>
                </FooterItem>

                <FooterItem>
                    <IconWrapper>
                        <IconImage src={globeIcon} alt="Globe" />
                    </IconWrapper>
                </FooterItem>

                <FooterItem>
                    <IconWrapper>
                        <IconImage src={bookmarkIcon} alt="Bookmark" />
                    </IconWrapper>
                </FooterItem>

                <FooterItem>
                    <IconWrapper>
                        <IconImage src={userIcon} alt="User" />
                    </IconWrapper>
                </FooterItem>
            </FooterInner>
        </FooterContainer>
    );
}

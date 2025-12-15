import { useNavigate, useLocation } from "react-router-dom";
import {
    FooterContainer,
    FooterInner,
    FooterItem,
    IconWrapper,
    Label,
    IconImage
} from "./FooterStyle";

import fireIcon from "../../assets/fire.png";
import videoIcon from "../../assets/clapperboard.png";
import userIcon from "../../assets/person.png";
import globeIcon from "../../assets/language.png";

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <FooterContainer>
            <FooterInner>
                <FooterItem onClick={() => navigate("/")}>
                    <Label>Home</Label>
                </FooterItem>

                <FooterItem onClick={() => navigate("/discover")}>
                    <IconWrapper active={isActive("/discover")}>
                        <IconImage src={globeIcon} alt="Globe" />
                    </IconWrapper>
                </FooterItem>

                <FooterItem onClick={() => navigate("/short")}>
                    <IconWrapper active={isActive("/short")}>
                        <IconImage src={fireIcon} alt="Fire" />
                    </IconWrapper>
                </FooterItem>

                <FooterItem onClick={() => navigate("/video")}>
                    <IconWrapper active={isActive("/video")}>
                        <IconImage src={videoIcon} alt="videos" />
                    </IconWrapper>
                </FooterItem>

                <FooterItem onClick={() => navigate("/signin")}>
                    <IconWrapper active={isActive("/signin")}>
                        <IconImage src={userIcon} alt="User" />
                    </IconWrapper>
                </FooterItem>
            </FooterInner>
        </FooterContainer>
    );
}
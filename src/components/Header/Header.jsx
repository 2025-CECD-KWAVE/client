import CircleIconButton from './CircleIconButton';
import { HeaderContainer, RightButtonGroup } from './HeaderStyle';

import menuIcon from '../../assets/menu.png';
import searchIcon from '../../assets/search.png';
import notificationIcon from '../../assets/notifications.png';

export default function Header() {
    return (
        <HeaderContainer>
            <CircleIconButton iconSrc={menuIcon} onClick={() => alert('메뉴 클릭')} />
            <RightButtonGroup>
                <CircleIconButton iconSrc={searchIcon} onClick={() => alert('검색 클릭')} />
                <CircleIconButton iconSrc={notificationIcon} onClick={() => alert('알림 클릭')} />
            </RightButtonGroup>
        </HeaderContainer>
    );
}
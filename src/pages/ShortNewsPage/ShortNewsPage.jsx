import Footer from '../../components/Footer/Footer';
import ShortNews from '../../components/ShortNews/ShortNews';
import { Root, AppWrapper } from '../../components/Layout/AppWrapper';

export default function ShortNewsPage() {
    return (
        <Root>
            <AppWrapper>
                <ShortNews></ShortNews>
                <Footer></Footer>
            </AppWrapper>
        </Root>
    );
}
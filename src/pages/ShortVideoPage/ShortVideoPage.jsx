import Footer from '../../components/Footer/Footer';
import { Root, AppWrapper } from '../../components/Layout/AppWrapper';
import ShortVideo from '../../components/ShortVideo/ShortVideo';

export default function ShortVideoPage() {
    return (
        <Root>
            <AppWrapper>
                <ShortVideo />
                <Footer />
            </AppWrapper>
        </Root>
    );
}
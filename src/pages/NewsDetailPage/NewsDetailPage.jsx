import Footer from '../../components/Footer/Footer';
import NewsDetail from '../../components/Detail/NewsDetail';
import NewsImage from '../../components/Detail/NewsImage';
import { Root, AppWrapper } from '../../components/Layout/AppWrapper';

export default function NewsDetailPage() {
    return (
        <Root>
            <AppWrapper>
                <NewsImage></NewsImage>
                <NewsDetail></NewsDetail>
                <Footer></Footer>
            </AppWrapper>
        </Root>
    );
}
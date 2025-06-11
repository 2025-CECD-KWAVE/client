import Header from '../../components/Header/Header';
import { Root, AppWrapper } from '../../components/Layout/AppWrapper';
import Footer from '../../components/Footer/Footer';
import Discover from '../../components/Discover/Discover';

export default function Main() {
    return (
        <Root>
            <AppWrapper>
                <Header></Header>
                <Discover></Discover>
                <Footer></Footer>
            </AppWrapper>
        </Root>
    );
}
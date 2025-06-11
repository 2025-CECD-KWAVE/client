import Footer from '../../components/Footer/Footer';
import { Root, AppWrapper } from '../../components/Layout/AppWrapper';
import Login from '../../components/Login/Login';

export default function LoginPage() {
    return (
        <Root>
            <AppWrapper>
                <Login></Login>
                <Footer></Footer>
            </AppWrapper>
        </Root>
    );
}
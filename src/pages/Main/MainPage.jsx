import Header from '../../components/Header/Header';
import TrendingSection from '../../components/Main/TrendingSection'
import { Root, AppWrapper } from '../../components/Layout/AppWrapper';
import RecommendationSection from '../../components/Main/RecommendationSection';
import Footer from '../../components/Footer/Footer';

export default function Main() {
  return (
    <Root>
      <AppWrapper>
        <Header></Header>
        <TrendingSection></TrendingSection>
        <RecommendationSection></RecommendationSection>
        <Footer></Footer>
      </AppWrapper>
    </Root>
  );
}
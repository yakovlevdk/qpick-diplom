import { MainPageBanner } from "./components/main-page-banner/main-page-banner";
import { MainPageOriginalSection } from "./components/main-page-section-original/main-page-section-original";
import { MainPageOriginalSectionReview } from "./components/main-page-section-review/main-page-section-review";
import "./main.scss";
export const MainPage: React.FC = () => {

  return (
    <div className="main-page">
      <MainPageBanner />
      <MainPageOriginalSection />
      <MainPageOriginalSectionReview />
    </div>
  );
};

import { CourseCardCompact } from './components/CourseCardCompact';
import { CourseCardFeatured } from './components/CourseCardFeatured';
import { CourseCardHorizontal } from './components/CourseCardHorizontal';
import { CourseCardCarousel } from './components/CourseCardCarousel';
import { CourseCardPremium } from './components/CourseCardPremium';
import ClaudePage from "./pages/ClaudePage";


return (
  <Routes>
    {/* ORIGINAL PAGE */}
    <Route path="/" element={
      <>
        {/* KEEP YOUR EXISTING UI EXACTLY HERE */}
      </>
    } />

    {/* NEW LAB */}
    <Route path="/ui-course-cards" element={<UICourseCards />} />
    <Route path="/ui-course-cards/featured" element={<FeaturedPage />} />
    <Route path="/ui-course-cards/compact" element={<CompactPage />} />
    <Route path="/ui-course-cards/horizontal" element={<HorizontalPage />} />
    <Route path="/ui-course-cards/carousel" element={<CarouselPage />} />
    <Route path="/ui-course-cards/premium" element={<PremiumPage />} />
    <Route path="/ui-course-cards/claude" element={<ClaudePage />} />
  </Routes>
);
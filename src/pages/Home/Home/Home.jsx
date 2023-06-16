import ExtraSection from "../ExtraSection/ExtraSection";
import PopularClassesSection from "../PopularClassesSection/PopularClassesSection";
import PopularInstructorSection from "../PopularInstructorSection/PopularInstructorSection";
import TopSlider from "../TopSlider/TopSlider";

const Home = () => {
    return (
        <div>
            <TopSlider></TopSlider>
            <PopularClassesSection></PopularClassesSection>
            <PopularInstructorSection></PopularInstructorSection>
            <ExtraSection></ExtraSection>

        </div>
    );
};

export default Home;
import BannerMain from "./components/BannerMain";
import QuestionsSection from "./components/QuestionsSection";
import SpecializedServices from "./components/SpecializedServices";

const HomePage = () => {
    
    return(<>
        <div className="flex flex-col w-full h-full">
            <BannerMain />
            <QuestionsSection />
            <SpecializedServices />
        </div>
    </>)
}

export default HomePage;
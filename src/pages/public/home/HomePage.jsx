import BannerMain from "./components/BannerMain";
import GuaranteedResults from "./components/GuaranteedResults";
import QuestionsSection from "./components/QuestionsSection";
import RegulatoryCurrent from "./components/RegulatoryCurrent";
import SpecializedServices from "./components/SpecializedServices";

const HomePage = () => {
    
    return(<>
        <div className="flex flex-col w-full h-full">
            <BannerMain />
            <QuestionsSection />
            <SpecializedServices />
            <GuaranteedResults />
            <RegulatoryCurrent />
        </div>
    </>)
}

export default HomePage;
import BannerMain from "./components/BannerMain";
import QuestionsSection from "./components/QuestionsSection";

const HomePage = () => {
    
    return(<>
        <div className="flex flex-col w-full h-full">
            <BannerMain />
            <QuestionsSection />
        </div>
    </>)
}

export default HomePage;
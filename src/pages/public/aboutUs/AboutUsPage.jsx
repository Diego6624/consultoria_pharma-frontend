import BannerMain from "./components/BannerMain";
import OurHistory from "./components/OurHistory";
import OurValues from "./components/OurValues";
import VisionMision from "./components/VisionMision";
import WorkExperts from "./components/WorkExperts";

const AboutUsPage = () => {
    return(<>
        <div className="flex flex-col w-full h-full">
            <BannerMain />
            <OurHistory />
            <VisionMision />
            <OurValues />
            <WorkExperts />
        </div>
    </>);
};

export default AboutUsPage;
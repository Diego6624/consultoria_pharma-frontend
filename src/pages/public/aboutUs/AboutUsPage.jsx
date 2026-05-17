import BannerMain from "./components/BannerMain";
import OurHistory from "./components/OurHistory";
import VisionMision from "./components/VisionMision";

const AboutUsPage = () => {
    return(<>
        <div className="flex flex-col w-full h-full">
            <BannerMain />
            <OurHistory />
            <VisionMision />
        </div>
    </>);
};

export default AboutUsPage;
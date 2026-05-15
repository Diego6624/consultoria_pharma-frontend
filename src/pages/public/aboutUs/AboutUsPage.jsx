import BannerMain from "./components/BannerMain";
import OurHistory from "./components/OurHistory";

const AboutUsPage = () => {
    return(<>
        <div className="flex flex-col w-full h-full">
            <BannerMain />
            <OurHistory />
        </div>
    </>);
};

export default AboutUsPage;
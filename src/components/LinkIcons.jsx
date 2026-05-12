import { Link } from "react-router-dom";

const LinkIcons = ({navigate, socialIcon, bg, hoverBg, hoverText}) => {
    return (<>
        <div className="w-auto">
            <Link to={navigate} className={`flex items-center justify-center p-2 rounded-full 
                bg-[${bg}] hover:bg-[${hoverBg}] w-min text-white hover:text-[${hoverText}]`}
            >
                {socialIcon}
            </Link>
        </div>
    </>);
};

export default LinkIcons;
import { Link } from "react-router-dom";

const LinkIcons = ({navigate, socialIcon}) => {
    return (<>
        <div className="flex items-center justify-center p-2">
            <Link to={navigate} className="text-[#0DB3DE] hover:text-[#005F8B]">
                {socialIcon}
            </Link>
        </div>
    </>);
};

export default LinkIcons;
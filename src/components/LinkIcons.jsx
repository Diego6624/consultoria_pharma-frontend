import { Link } from "react-router-dom";

const LinkIcons = ({ navigate, socialIcon, ariaLabel, bg, hoverBg, hoverText }) => {
    return (
        <div
            className="flex items-center justify-centerrounded-full rounded-full w-min text-white transition-colors duration-300"
            style={{ backgroundColor: bg }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverBg;
                e.currentTarget.style.color = hoverText;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = bg;
                e.currentTarget.style.color = "white";
            }}
        >
            <Link to={navigate} aria-label={ariaLabel} className="p-2">
                {socialIcon}
            </Link>
        </div>
    );
};

export default LinkIcons;

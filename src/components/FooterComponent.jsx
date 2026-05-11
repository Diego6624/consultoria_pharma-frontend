import { Facebook } from "@mui/icons-material";
import LinkIcons from "./LinkIcons";

const FooterComponent = () => {
    return (<>
        <div className="flex flex-col mt-auto w-full gap-2 px-10 py-4">
            {/* Footer Content */}
            <div>
                {/* Description & Social Networks */}
                <div>
                    {/* Description */}
                    <div>
                        {/* Image */}
                        <img src="" alt="" />
                        <div>

                        </div>
                    </div>
                    <div>
                        <LinkIcons
                            socialIcon={<Facebook />}
                            navigate={""}
                        />
                    </div>
                </div>
                {/* Options */}
                <div>

                </div>
                {/* Map */}
                <div>

                </div>
            </div>
            {/* Divider */}
            <hr className="border-gray-400" />
            {/* Copyright & Policies */}
            <div className="flex justify-between">
                <p>© 2025 Consultoría YL Pharma. Todos los derechos reservados.</p>
                <p>Políticas de privacidad</p>
            </div>
        </div>
    </>);
};

export default FooterComponent;
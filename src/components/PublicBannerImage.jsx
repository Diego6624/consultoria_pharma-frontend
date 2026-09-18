import { useState } from "react";
import { motion } from "framer-motion";

export default function PublicBannerImage({
    src,
    alt = "",
    className = "",
    imageClassName = "",
}) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={`absolute inset-0 overflow-hidden bg-slate-900 ${className}`}
            aria-hidden="true"
        >
            {!loaded ? (
                <div className="absolute inset-0 animate-pulse bg-slate-800" />
            ) : null}

            <motion.img
                src={src}
                alt={alt}
                width="1920"
                height="1080"
                fetchPriority="high"
                decoding="async"
                onLoad={() => setLoaded(true)}
                onError={(event) => {
                    event.currentTarget.style.display = "none";
                }}
                className={`h-full w-full object-cover transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                } ${imageClassName}`}
                initial={{ opacity: 0, y: -40 }}
                animate={{
                    opacity: loaded ? 1 : 0,
                    y: loaded ? 0 : -40,
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
            />
        </div>
    );
}
import { useState } from "react";
import { motion } from "framer-motion";

export default function PublicBannerImage({
    src,
    mobileSrc,
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

            <picture>
                {mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} /> : null}
                <motion.img
                    src={src}
                    alt={alt}
                    width="1920"
                    height="1080"
                    sizes="100vw"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    onError={(event) => {
                        event.currentTarget.style.display = "none";
                    }}
                    className={`h-full w-full object-cover ${imageClassName}`}
                    initial={false}
                />
            </picture>
        </div>
    );
}

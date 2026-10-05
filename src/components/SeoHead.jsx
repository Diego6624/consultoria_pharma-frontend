import { useEffect } from "react";

const DEFAULT_IMAGE = "/images/logo.webp";

function upsertMeta(name, content) {
  let element = document.head.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertProperty(property, content) {
  let element = document.head.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let element = document.head.querySelector(`script#${id}`);
  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function removeJsonLd(id) {
  document.head.querySelector(`script#${id}`)?.remove();
}

export default function SeoHead({
  title,
  description,
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
  structuredData,
}) {
  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    const absoluteImage = new URL(image, window.location.origin).href;
    const absoluteLogo = new URL(DEFAULT_IMAGE, window.location.origin).href;

    document.title = title;
    upsertMeta("description", description);
    upsertMeta("robots", noIndex ? "noindex,nofollow" : "index,follow");
    upsertProperty("og:title", title);
    upsertProperty("og:description", description);
    upsertProperty("og:type", type);
    upsertProperty("og:url", canonicalUrl);
    upsertProperty("og:site_name", "Consultoría YL Pharma");
    upsertProperty("og:image", absoluteImage);
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", absoluteImage);
    upsertLink("canonical", canonicalUrl);

    upsertJsonLd("seo-organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Consultoría YL Pharma",
      url: window.location.origin,
      logo: absoluteLogo,
      description: "Consultoría y asesoría farmacéutica especializada en regulación sanitaria, calidad y cumplimiento normativo en Perú.",
    });

    if (structuredData) {
      upsertJsonLd("seo-page", structuredData);
    }

    return () => {
      if (structuredData) removeJsonLd("seo-page");
    };
  }, [description, image, noIndex, structuredData, title, type]);

  return null;
}

const SITE_NAME = "Consultoría YL Pharma";
const DEFAULT_DESCRIPTION = "Consultoría y asesoría farmacéutica especializada en regulación sanitaria, calidad y cumplimiento normativo en Perú.";

const pageMetadata = {
  "/": { title: "Consultoría YL Pharma | Asesoría Farmacéutica", description: DEFAULT_DESCRIPTION, type: "website" },
  "/aboutUs": { title: "Nosotros | Consultoría YL Pharma", description: "Conoce a Consultoría YL Pharma y nuestro enfoque de asesoría farmacéutica, regulación sanitaria y calidad.", type: "website" },
  "/services": { title: "Servicios Farmacéuticos | Consultoría YL Pharma", description: "Conoce nuestros servicios de consultoría y asesoría farmacéutica para regulación sanitaria, calidad y cumplimiento normativo.", type: "website" },
  "/news": { title: "Noticias Farmacéuticas | Consultoría YL Pharma", description: "Noticias, análisis y novedades sobre regulación sanitaria y el sector farmacéutico en Perú.", type: "website" },
  "/consultation": { title: "Agendar Asesoría | Consultoría YL Pharma", description: "Contáctanos para recibir asesoría farmacéutica personalizada sobre regulación sanitaria, calidad y cumplimiento normativo.", type: "website" },
};

export function getPageMetadata(pathname) {
  if (pathname.startsWith("/admin") || pathname === "/login") {
    return { title: `${SITE_NAME} | Administración`, description: "Área privada de administración.", noIndex: true };
  }
  if (pathname.startsWith("/news/")) {
    return { title: `Noticia | ${SITE_NAME}`, description: "Lee las últimas noticias y novedades del sector farmacéutico.", type: "article" };
  }
  if (pathname.startsWith("/services/")) {
    return { title: `Servicio Farmacéutico | ${SITE_NAME}`, description: "Conoce este servicio de consultoría y asesoría farmacéutica.", type: "article" };
  }
  return pageMetadata[pathname] || pageMetadata["/"];
}

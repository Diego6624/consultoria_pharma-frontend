const SITE_URL = "https://consultoriapharma.vercel.app";
const API_URL = process.env.SITEMAP_API_URL?.replace(/\/+$/, "");

const staticUrls = [
  "/",
  "/aboutUs",
  "/services",
  "/news",
  "/consultation",
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function fetchAll(path) {
  const items = [];
  const size = 100;

  for (let page = 0; page < 50; page += 1) {
    const response = await fetch(`${API_URL}${path}?page=${page}&size=${size}`);
    if (!response.ok) throw new Error(`Sitemap API returned ${response.status}`);

    const payload = await response.json();
    const content = Array.isArray(payload) ? payload : payload.content;
    if (!Array.isArray(content)) break;
    items.push(...content);

    if (Array.isArray(payload) || payload.last || content.length < size) break;
  }

  return items;
}

function toUrlEntry(path, lastmod) {
  const lastmodTag = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : "";
  return `<url><loc>${escapeXml(`${SITE_URL}${path}`)}</loc>${lastmodTag}</url>`;
}

export default async function handler(request, response) {
  const urls = [...staticUrls.map((path) => toUrlEntry(path))];

  try {
    const [news, services] = await Promise.all([
      fetchAll("/api/public/noticias"),
      fetchAll("/api/public/servicios"),
    ]);

    const dynamicUrls = [
      ...news
        .filter((item) => item?.slug)
        .map((item) => toUrlEntry(`/news/${encodeURIComponent(item.slug)}`, item.fechaPublicacion)),
      ...services
        .filter((item) => item?.slug)
        .map((item) => toUrlEntry(`/services/${encodeURIComponent(item.slug)}`, item.updatedAt || item.createdAt)),
    ];
    urls.push(...dynamicUrls);
  } catch (error) {
    console.error("Unable to build dynamic sitemap", error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
  response
    .status(200)
    .setHeader("Content-Type", "application/xml; charset=utf-8")
    .setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400")
    .send(xml);
}

import DOMPurify from "dompurify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function sanitizeHtml(value = "") {
  return DOMPurify.sanitize(value, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed"],
    FORBID_ATTR: ["onerror", "onclick", "onload", "style"],
  });
}

export function sanitizeText(value = "") {
  return DOMPurify.sanitize(String(value), { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

export function getImageUrl(value) {
  if (!value) return "";
  if (/^(https?:|blob:)/i.test(value)) return value;
  if (!/^\/?[a-z0-9_./-]+$/i.test(value)) return "";
  return `${API_BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("es-PE");
}

export function pageCount(page, fallbackSize = 10) {
  if (page?.totalPages != null) return page.totalPages;
  return Math.ceil((page?.totalElements || 0) / (page?.size || fallbackSize));
}

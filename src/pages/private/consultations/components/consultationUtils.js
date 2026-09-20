export function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?";
}

export function relativeDate(value) {
  const date = new Date(value);
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / 86400000);

  if (Number.isNaN(date.getTime())) return "Fecha inválida";
  if (days <= 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  if (days < 14) return "Hace 1 semana";

  return `Hace ${Math.floor(days / 7)} semanas`;
}

export function csvValue(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

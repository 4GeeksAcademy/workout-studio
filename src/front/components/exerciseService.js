// src/components/exerciseService.js
const BASE = "https://exercisedb.p.rapidapi.com";
const EQUIPMENTS = ["machine", "assisted", "leverage machine", "sled machine", "smith machine"];

const headers = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
  "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
};

export async function fetchMachineExercises() {
  // Trae varias categorías “de máquina” en paralelo y deduplica
  const results = await Promise.all(
    EQUIPMENTS.map(async (eq) => {
      try {
        const res = await fetch(`${BASE}/exercises/equipment/${encodeURIComponent(eq)}`, {
          headers,
          cache: "no-store",
        });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      } catch {
        return [];
      }
    })
  );

  let merged = results.flat();
  if (!merged.length) {
    // Fallback
    const res = await fetch(`${BASE}/exercises?equipment=machine`, { headers, cache: "no-store" });
    merged = res.ok ? await res.json() : [];
  }

  // Deduplicar por id o por name+target si no hay id
  const seen = new Set();
  return merged.filter((x) => {
    const key = x.id ?? `${(x.name || "").toLowerCase()}-${(x.target || "").toLowerCase()}`;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

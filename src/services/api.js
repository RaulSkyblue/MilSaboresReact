// src/services/api.js

const API_BASE = "http://localhost:8080";

export async function fetchProductos() {
  try {
    const res = await fetch(`${API_BASE}/api/productos`);
    if (!res.ok) throw new Error("Error al obtener productos");
    return await res.json();
  } catch (err) {
    console.error("API ERROR:", err);
    return [];
  }
}

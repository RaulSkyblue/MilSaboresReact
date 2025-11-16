const API_BASE = 'http://localhost:8080/api/carrito'

export async function agregarAlCarrito(item) {
  const response = await fetch(`${API_BASE}/agregar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  })
  if (!response.ok) throw new Error('Error al agregar al carrito')
  return response.json()
}

export async function obtenerCarrito(usuarioId) {
  const response = await fetch(`${API_BASE}/usuario/${usuarioId}`)
  if (!response.ok) throw new Error('Error al obtener carrito')
  return response.json()
}

export async function actualizarCantidad(itemId, cantidad) {
  const response = await fetch(`${API_BASE}/actualizar/${itemId}?cantidad=${cantidad}`, {
    method: 'PUT'
  })
  if (!response.ok) throw new Error('Error al actualizar cantidad')
}

export async function eliminarItem(itemId) {
  const response = await fetch(`${API_BASE}/eliminar/${itemId}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Error al eliminar item')
}

export async function vaciarCarrito(usuarioId) {
  const response = await fetch(`${API_BASE}/vaciar/${usuarioId}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Error al vaciar carrito')
}
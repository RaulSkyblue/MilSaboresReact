import './index.css'
import { useState, useEffect } from 'react'
import { fetchProductos } from './services/api' // <-- ruta corregida

export default function Productos() {
  const [PRODUCTS, setPRODUCTS] = useState([])
  const [filtro, setFiltro] = useState("")
  const [cantidades, setCantidades] = useState({})
  const [tamanos, setTamanos] = useState({})
  const [carrito, setCarrito] = useState([])
  const [mensaje, setMensaje] = useState("")

  // ← CARGA DE PRODUCTOS DESDE EL BACKEND
  useEffect(() => {
    fetchProductos().then(data => setPRODUCTS(data))
  }, [])

  const cambiarCantidad = (code, oper) => {
    setCantidades(prev => {
      const actual = prev[code] || 1
      const nueva = oper === "+" ? actual + 1 : Math.max(1, actual - 1)
      return { ...prev, [code]: nueva }
    })
  }

  const cambiarTamano = (code, tamano) => {
    setTamanos(prev => ({ ...prev, [code]: tamano }))
  }

  const agregarCarrito = (product) => {
    const [code] = product
    const cantidad = cantidades[code] || 1
    const tamano = tamanos[code] || "Mediana"

    setCarrito(prev => [...prev, { product, cantidad, tamano }])

    setMensaje(`✓ ${product[2]} (${tamano}) agregado al carrito`)
    setTimeout(() => setMensaje(""), 2000)
  }

  const productosFiltrados = filtro
    ? PRODUCTS.filter(p => p[1] === filtro)
    : PRODUCTS

  return (
    <section id="productos" className="container app-content">
      <div className="py-3">
        <h2>Productos</h2>
        <p>Catálogo — selecciona un producto para ver más detalles.</p>

        <select
          className="product-filter"
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {[...new Set(PRODUCTS.map(p => p[1]))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {mensaje && <div className="alert-success">{mensaje}</div>}

      <div className="products-grid">
        {productosFiltrados.map(([code, category, name, price, image]) => (
          <article className="product-card" key={code} role="article">
            <header className="product-card-header">
              <div className="product-code">{code}</div>
              <div className="product-category">{category}</div>
            </header>

            {image && (
              <div className="product-image-container">
                <img 
                  src={image} 
                  alt={name} 
                  className="product-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML =
                      '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f3f4f6;color:#6b7280;font-size:0.875rem;">Sin imagen</div>';
                  }}
                />
              </div>
            )}

            <main className="product-card-body">
              <h3 className="product-name">{name}</h3>

              <div className="size-selector">
                <label>Tamaño:</label>
                <select
                  value={tamanos[code] || "Mediana"}
                  onChange={(e) => cambiarTamano(code, e.target.value)}
                >
                  <option value="Chica">Chica</option>
                  <option value="Mediana">Mediana</option>
                  <option value="Grande">Grande</option>
                </select>
              </div>

              <div className="quantity-controls">
                <button onClick={() => cambiarCantidad(code, "-")}>−</button>
                <span>{cantidades[code] || 1}</span>
                <button onClick={() => cambiarCantidad(code, "+")}>+</button>
              </div>
            </main>

            <footer className="product-card-footer">
              <div className="product-price">{price}</div>

              <button
                className="add-cart-btn"
                onClick={() => agregarCarrito([code, category, name, price, image])}
              >
                Agregar al carrito
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}

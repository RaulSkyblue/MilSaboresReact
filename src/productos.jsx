import './index.css'
import { useState } from 'react'

const PRODUCTS = [
  ['TC001','Tortas Cuadradas','Torta Cuadrada de Chocolate','$45.000 CLP','/img/torta cuandrada de chocolate.jpg'],
  ['TC002','Tortas Cuadradas','Torta Cuadrada de Frutas','$50.000 CLP','/img/Torta Cuadrada de Frutas.jpg'],
  ['TT001','Tortas Circulares','Torta Circular de Vainilla','$40.000 CLP','/img/Torta Circular de Vainilla.jpg'],
  ['TT002','Tortas Circulares','Torta Circular de Manjar','$42.000 CLP','/img/Torta Circular de Manjar.jpg'],
  ['PI001','Postres Individuales','Mousse de Chocolate','$5.000 CLP','/img/Mousse de Chocolate.jpg'],
  ['PI002','Postres Individuales','Tiramisú Clásico','$5.500 CLP','/img/Tiramisú Clásico.jpg'],
  ['PSA001','Productos Sin Azúcar','Torta Sin Azúcar de Naranja','$48.000 CLP','/img/Torta Sin Azúcar de Naranja.jpg'],
  ['PSA002','Productos Sin Azúcar','Cheesecake Sin Azúcar','$47.000 CLP','/img/Cheesecake Sin Azúcar.jpg'],
  ['PT001','Pastelería Tradicional','Empanada de Manzana','$3.000 CLP','/img/Empanada de Manzana.jpg'],
  ['PT002','Pastelería Tradicional','Tarta de Santiago','$6.000 CLP','/img/Tarta de Santiago.jpg'],
  ['PG001','Productos Sin Gluten','Brownie Sin Gluten','$4.000 CLP','/img/Brownie Sin Gluten.jpg'],
  ['PG002','Productos Sin Gluten','Pan Sin Gluten','$3.500 CLP','/img/Pan Sin Gluten.jpg'],
  ['PV001','Productos Vegana','Torta Vegana de Chocolate','$50.000 CLP','/img/Torta-Vegana-de Chocolate.jpg'],
  ['PV002','Productos Vegana','Galletas Veganas de Avena','$4.500 CLP','/img/Galletas Veganas de Avena.jpg'],
  ['TE001','Tortas Especiales','Torta Especial de Cumpleaños','$55.000 CLP','/img/Torta Especial de Cumpleaños.jpg'],
  ['TE002','Tortas Especiales','Torta Especial de Boda','$60.000 CLP','/img/Torta Especial de Boda.jpg']
]

export default function Productos() {
  const [filtro, setFiltro] = useState("")
  const [cantidades, setCantidades] = useState({})
  const [tamanos, setTamanos] = useState({})     // ← tamaño por producto
  const [carrito, setCarrito] = useState([])
  const [mensaje, setMensaje] = useState("")

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
    <section id="productos" class="container app-content">
      <div class="py-3">
        <h2>Productos</h2>
        <p>Catálogo — selecciona un producto para ver más detalles.</p>

        <select
          class="product-filter"
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {[...new Set(PRODUCTS.map(p => p[1]))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {mensaje && <div class="alert-success">{mensaje}</div>}

      <div class="products-grid">
        {productosFiltrados.map(([code, category, name, price, image]) => (
          <article class="product-card" key={code} role="article">
            <header class="product-card-header">
              <div class="product-code">{code}</div>
              <div class="product-category">{category}</div>
            </header>

            {image && (
              <div class="product-image-container">
                <img 
                  src={image} 
                  alt={name} 
                  class="product-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f3f4f6;color:#6b7280;font-size:0.875rem;">Sin imagen</div>';
                  }}
                />
              </div>
            )}

            <main class="product-card-body">
              <h3 class="product-name">{name}</h3>

              {/* SELECTOR DE TAMAÑO */}
              <div class="size-selector">
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

              <div class="quantity-controls">
                <button onClick={() => cambiarCantidad(code, "-")}>−</button>
                <span>{cantidades[code] || 1}</span>
                <button onClick={() => cambiarCantidad(code, "+")}>+</button>
              </div>
            </main>

            <footer class="product-card-footer">
              <div class="product-price">{price}</div>

              <button
                class="add-cart-btn"
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
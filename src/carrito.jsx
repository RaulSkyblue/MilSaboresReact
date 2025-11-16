import './index.css'
import { useState, useEffect } from 'react'
import { obtenerCarrito, actualizarCantidad, eliminarItem, vaciarCarrito } from './services/carritoApi'

export default function Carrito() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState("")

  const usuarioId = 1 // ID fijo para pruebas

  // Cargar carrito al montar el componente
  useEffect(() => {
    cargarCarrito()
  }, [])

  const cargarCarrito = async () => {
    try {
      setLoading(true)
      const data = await obtenerCarrito(usuarioId)
      setItems(data)
    } catch (err) {
      console.error('Error al cargar carrito:', err)
      setError('Error al cargar el carrito')
    } finally {
      setLoading(false)
    }
  }

  const handleActualizarCantidad = async (itemId, cantidadActual, operacion) => {
    try {
      const nuevaCantidad = operacion === '+' 
        ? cantidadActual + 1 
        : Math.max(1, cantidadActual - 1)
      
      await actualizarCantidad(itemId, nuevaCantidad)
      await cargarCarrito() // Recargar carrito
      
      setMensaje('Cantidad actualizada')
      setTimeout(() => setMensaje(""), 2000)
    } catch (err) {
      setError('Error al actualizar cantidad')
      setTimeout(() => setError(""), 2000)
    }
  }

  const handleEliminar = async (itemId) => {
    if (!confirm('¿Eliminar este producto del carrito?')) return
    
    try {
      await eliminarItem(itemId)
      await cargarCarrito()
      
      setMensaje('Producto eliminado del carrito')
      setTimeout(() => setMensaje(""), 2000)
    } catch (err) {
      setError('Error al eliminar producto')
      setTimeout(() => setError(""), 2000)
    }
  }

  const handleVaciarCarrito = async () => {
    if (!confirm('¿Vaciar todo el carrito?')) return
    
    try {
      await vaciarCarrito(usuarioId)
      await cargarCarrito()
      
      setMensaje('Carrito vaciado')
      setTimeout(() => setMensaje(""), 2000)
    } catch (err) {
      setError('Error al vaciar carrito')
      setTimeout(() => setError(""), 2000)
    }
  }

  const calcularTotal = () => {
    return items.reduce((total, item) => {
      // Extraer el número del precio (ej: "$45.000 CLP" -> 45000)
      const precio = parseInt(item.productoPrecio.replace(/[^0-9]/g, ''))
      return total + (precio * item.cantidad)
    }, 0)
  }

  const formatearPrecio = (numero) => {
    return `$${numero.toLocaleString('es-CL')} CLP`
  }

  if (loading) {
    return (
      <section id="carrito" className="container app-content">
        <div className="py-5">
          <h2>Carrito de compra</h2>
          <p>Cargando carrito...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="carrito" className="container app-content">
      <div className="py-3">
        <h2>Carrito de compra</h2>
        
        {mensaje && <div className="alert-success">{mensaje}</div>}
        {error && <div className="alert-error">{error}</div>}

        {items.length === 0 ? (
          <div className="carrito-vacio">
            <p>Tu carrito está vacío</p>
            <a href="#productos" className="btn-primary">Ver productos</a>
          </div>
        ) : (
          <>
            <div className="carrito-header">
              <p>Tienes {items.length} producto(s) en tu carrito</p>
              <button onClick={handleVaciarCarrito} className="btn-danger">
                Vaciar carrito
              </button>
            </div>

            <div className="carrito-items">
              {items.map(item => (
                <article key={item.id} className="carrito-item">
                  <div className="carrito-item-image">
                    {item.productoImagen ? (
                      <img 
                        src={item.productoImagen} 
                        alt={item.productoNombre}
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="no-image">Sin imagen</div>
                    )}
                  </div>

                  <div className="carrito-item-info">
                    <h3>{item.productoNombre}</h3>
                    <p className="item-categoria">{item.productoCategoria}</p>
                    <p className="item-code">Código: {item.productoCode}</p>
                    <p className="item-tamano">Tamaño: <strong>{item.tamano}</strong></p>
                  </div>

                  <div className="carrito-item-cantidad">
                    <button 
                      onClick={() => handleActualizarCantidad(item.id, item.cantidad, '-')}
                      className="btn-cantidad"
                    >
                      −
                    </button>
                    <span>{item.cantidad}</span>
                    <button 
                      onClick={() => handleActualizarCantidad(item.id, item.cantidad, '+')}
                      className="btn-cantidad"
                    >
                      +
                    </button>
                  </div>

                  <div className="carrito-item-precio">
                    <p className="precio-unitario">{item.productoPrecio}</p>
                    <p className="precio-total">
                      Total: {formatearPrecio(
                        parseInt(item.productoPrecio.replace(/[^0-9]/g, '')) * item.cantidad
                      )}
                    </p>
                  </div>

                  <div className="carrito-item-acciones">
                    <button 
                      onClick={() => handleEliminar(item.id)}
                      className="btn-eliminar"
                      title="Eliminar producto"
                    >
                      🗑️
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="carrito-resumen">
              <div className="resumen-content">
                <h3>Resumen de compra</h3>
                <div className="resumen-linea">
                  <span>Subtotal:</span>
                  <span>{formatearPrecio(calcularTotal())}</span>
                </div>
                <div className="resumen-linea total">
                  <span>Total:</span>
                  <span>{formatearPrecio(calcularTotal())}</span>
                </div>
                <button className="btn-finalizar">
                  Finalizar compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
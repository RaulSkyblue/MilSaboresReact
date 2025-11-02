import './index.css'

const PRODUCTS = [
  ['TC001','Tortas Cuadradas','Torta Cuadrada de Chocolate','$45.000 CLP'],
  ['TC002','Tortas Cuadradas','Torta Cuadrada de Frutas','$50.000 CLP'],
  ['TT001','Tortas Circulares','Torta Circular de Vainilla','$40.000 CLP'],
  ['TT002','Tortas Circulares','Torta Circular de Manjar','$42.000 CLP'],
  ['PI001','Postres Individuales','Mousse de Chocolate','$5.000 CLP'],
  ['PI002','Postres Individuales','Tiramisú Clásico','$5.500 CLP'],
  ['PSA001','Productos Sin Azúcar','Torta Sin Azúcar de Naranja','$48.000 CLP'],
  ['PSA002','Productos Sin Azúcar','Cheesecake Sin Azúcar','$47.000 CLP'],
  ['PT001','Pastelería Tradicional','Empanada de Manzana','$3.000 CLP'],
  ['PT002','Pastelería Tradicional','Tarta de Santiago','$6.000 CLP'],
  ['PG001','Productos Sin Gluten','Brownie Sin Gluten','$4.000 CLP'],
  ['PG002','Productos Sin Gluten','Pan Sin Gluten','$3.500 CLP'],
  ['PV001','Productos Vegana','Torta Vegana de Chocolate','$50.000 CLP'],
  ['PV002','Productos Vegana','Galletas Veganas de Avena','$4.500 CLP'],
  ['TE001','Tortas Especiales','Torta Especial de Cumpleaños','$55.000 CLP'],
  ['TE002','Tortas Especiales','Torta Especial de Boda','$60.000 CLP']
]

export default function Productos() {
  return (
    <section id="productos" class="container app-content">
      <div class="py-3">
        <h2>Productos</h2>
        <p>Catálogo — selecciona un producto para ver más detalles.</p>
      </div>

      <div class="products-grid">
        {PRODUCTS.map(([code, category, name, price]) => (
          <article class="product-card" key={code} role="article" aria-label={name}>
            <header class="product-card-header">
              <div class="product-code">{code}</div>
              <div class="product-category">{category}</div>
            </header>

            <main class="product-card-body">
              <h3 class="product-name">{name}</h3>
            </main>

            <footer class="product-card-footer">
              <div class="product-price">{price}</div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}

import './navBar.css'
import { FaUser } from "react-icons/fa";
import { useState, useRef, useEffect } from 'preact/hooks'

const PRODUCT_MENU = [
    { label: 'Todos los productos', hash: '#productos' },
    { label: 'Tortas Cuadradas', hash: '#productos/tortas-cuadradas' },
    { label: 'Tortas Circulares', hash: '#productos/tortas-circulares' },
    { label: 'Postres Individuales', hash: '#productos/postres-individuales' },
    { label: 'Productos Sin Azúcar', hash: '#productos/productos-sin-azucar' },
    { label: 'Pastelería Tradicional', hash: '#productos/pasteleria-tradicional' },
    { label: 'Productos Sin Gluten', hash: '#productos/productos-sin-gluten' },
    { label: 'Productos Vegana', hash: '#productos/productos-vegana' },
    { label: 'Tortas Especiales', hash: '#productos/tortas-especiales' },
    { label: 'Torta Especial', hash: '#productos/torta-especial' },
]

export default function NavBar() {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function onDocClick(e) {
            if (!dropdownRef.current) return
            if (!dropdownRef.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('click', onDocClick)
        return () => document.removeEventListener('click', onDocClick)
    }, [])

    function onToggle(e) {
        e.preventDefault()
        setOpen(v => !v)
    }

    function onItemClick() {
        setOpen(false)
    }

    return (<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#home">Inicio</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item dropdown" ref={dropdownRef}>
                    <a
                      class="nav-link dropdown-toggle"
                      href="#productos"
                      id="navbarDropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : 'false'}
                      onClick={onToggle}
                    >
                        Productos
                    </a>
                    <div class={`dropdown-menu ${open ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                      {PRODUCT_MENU.map(item => (
                        <a class="dropdown-item" href={item.hash} onClick={onItemClick}>{item.label}</a>
                      ))}
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#carrito">Carrito</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#contacto">Contacto</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <a class="nav-link p-0 mr-2 d-flex align-items-center" href="#login" title="Iniciar sesión" aria-label="Iniciar sesión">
                    <FaUser size={20} />
                </a>
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>)
}

import './navBar.css'
import { FaUser } from "react-icons/fa";

export default function NavBar() {
    return (<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#home">Inicio</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item dropdown">
                    {/* Make the Productos toggle navigate to #productos so the hash router activates */}
                    <a class="nav-link dropdown-toggle" href="#productos" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Productos
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#productos">Todos los productos</a>
                        <a class="dropdown-item" href="#catalogo">Catálogo</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#ofertas">Ofertas</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#carrito">Carrito</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#contacto">Contacto</a>
                </li>
                {}
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

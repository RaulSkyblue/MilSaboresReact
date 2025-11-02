import { render } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import './index.css'
import NavBar from './navBar.jsx'
import { StrictMode } from 'preact/compat'
import Home from './inicio.jsx'
import Productos from './productos.jsx'
import Carrito from './carrito.jsx'
import Contacto from './contacto.jsx'
import './app.css'
import Login from './login.jsx'
import logo from '../logo.png'

function Main() {
    const [tab, setTab] = useState('home');

    // Cambia la pestaña activa al hacer click en el navbar (hash)
    useEffect(() => {
        const onHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            setTab(hash || 'home');
        };
        window.addEventListener('hashchange', onHashChange);
        onHashChange();
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

        return (
            <>
                <header class="site-header">
                    <div class="logo-wrap text-center">
                        <img src={logo} alt="Logo" class="site-logo" />
                    </div>
                    <NavBar />
                </header>
                {tab === 'home' && <Home />}
                {tab === 'productos' && <Productos />}
                {tab === 'carrito' && <Carrito />}
                {tab === 'contacto' && <Contacto />}
                {tab === 'login' && <Login />}
            </>
        );
}

const root = document.getElementById('app');
render(
    <StrictMode>
        <Main />
    </StrictMode>,
    root
);

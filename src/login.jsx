import { useState } from 'preact/hooks'
import './index.css'

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email)
}

// Simple Chilean RUT-ish pattern: 7-8 digits, hyphen, verifier (digit or K)
function validateRut(rut) {
  return /^\d{7,8}-[\dKk]$/.test(rut)
}

export default function Login() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    telefono: '',
    direccion: '',
    correo: ''
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const err = {}
    if (!form.nombre.trim()) err.nombre = 'Nombre requerido'
    if (!form.apellido.trim()) err.apellido = 'Apellido requerido'
    if (!form.rut.trim()) err.rut = 'RUT requerido'
    else if (!validateRut(form.rut.trim())) err.rut = 'Formato RUT inválido (ej: 12345678-9 o 12345678-K)'
    if (!form.telefono.trim()) err.telefono = 'Teléfono requerido'
    else if (!/^[0-9+\s()-]{7,20}$/.test(form.telefono.trim())) err.telefono = 'Teléfono inválido'
    if (!form.direccion.trim()) err.direccion = 'Dirección requerida'
    if (!form.correo.trim()) err.correo = 'Correo requerido'
    else if (!validateEmail(form.correo.trim())) err.correo = 'Correo inválido'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess('')
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length === 0) {
      // save to localStorage (append to users array)
      try {
        const stored = JSON.parse(localStorage.getItem('users') || '[]')
        const user = { ...form, createdAt: new Date().toISOString() }
        stored.push(user)
        localStorage.setItem('users', JSON.stringify(stored))
        setSuccess('Registro guardado correctamente')
        setForm({ nombre: '', apellido: '', rut: '', telefono: '', direccion: '', correo: '' })
        setErrors({})
      } catch (errStorage) {
        setErrors({ general: 'Error al guardar en localStorage' })
      }
    }
  }

  return (
    <section id="login" class="container app-content">
      <div class="py-4">
        <h2>Registro de usuario</h2>
        <p>Ingrese sus datos básicos para registrarse.</p>

        <form onSubmit={handleSubmit} novalidate>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="nombre">Nombre</label>
              <input id="nombre" name="nombre" class="form-control" value={form.nombre} onInput={handleChange} />
              {errors.nombre && <small class="text-danger">{errors.nombre}</small>}
            </div>
            <div class="form-group col-md-6">
              <label for="apellido">Apellido</label>
              <input id="apellido" name="apellido" class="form-control" value={form.apellido} onInput={handleChange} />
              {errors.apellido && <small class="text-danger">{errors.apellido}</small>}
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="rut">RUT</label>
              <input id="rut" name="rut" class="form-control" placeholder="12345678-9" value={form.rut} onInput={handleChange} />
              {errors.rut && <small class="text-danger">{errors.rut}</small>}
            </div>
            <div class="form-group col-md-4">
              <label for="telefono">Teléfono</label>
              <input id="telefono" name="telefono" class="form-control" value={form.telefono} onInput={handleChange} />
              {errors.telefono && <small class="text-danger">{errors.telefono}</small>}
            </div>
            <div class="form-group col-md-4">
              <label for="correo">Correo electrónico</label>
              <input id="correo" name="correo" type="email" class="form-control" value={form.correo} onInput={handleChange} />
              {errors.correo && <small class="text-danger">{errors.correo}</small>}
            </div>
          </div>

          <div class="form-group">
            <label for="direccion">Dirección</label>
            <input id="direccion" name="direccion" class="form-control" value={form.direccion} onInput={handleChange} />
            {errors.direccion && <small class="text-danger">{errors.direccion}</small>}
          </div>

          {errors.general && <div class="alert alert-danger">{errors.general}</div>}
          {success && <div class="alert alert-success">{success}</div>}

          <button class="btn btn-primary" type="submit">Registrar</button>
        </form>
      </div>
    </section>
  )
}
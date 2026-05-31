const API_URL = 'https://tp4-grupo8-backend.onrender.com'

document.getElementById('agregar-profesor').addEventListener('submit', async (e) => {
  e.preventDefault()
  const body = {
    nombre: document.getElementById('nombre-agregar-profesor').value,
    apellido: document.getElementById('apellido-agregar-profesor').value,
    email: document.getElementById('email-agregar-profesor').value,
    especialidad: document.getElementById('especialidad-agregar-profesor').value
  }
  try {
    const res = await fetch(`${API_URL}/profesores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    alert(res.ok ? `Profesor creado. Legajo: ${data.legajo ?? JSON.stringify(data)}` : `Error: ${data.msg}`)
    if (res.ok) e.target.reset()
  } catch (err) {
    alert('No se pudo conectar con el servidor')
  }
})

document.getElementById('modificar-profesor').addEventListener('submit', async (e) => {
  e.preventDefault()
  const legajo = document.getElementById('legajo-modificar-profesor').value
  const body = {
    nombre: document.getElementById('nombre-modificar-profesor').value,
    apellido: document.getElementById('apellido-modificar-apellido').value,
    email: document.getElementById('email-modificar-profesor').value,
    especialidad: document.getElementById('especialidad-modificar-profesor').value
  }
  try {
    const res = await fetch(`${API_URL}/profesores/${legajo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    alert(res.ok ? 'Profesor modificado correctamente' : `Error: ${data.msg}`)
    if (res.ok) e.target.reset()
  } catch (err) {
    alert('No se pudo conectar con el servidor')
  }
})

document.getElementById('eliminar-profesor').addEventListener('submit', async (e) => {
  e.preventDefault()
  const legajo = document.getElementById('legajo-eliminar-profesor').value
  if (!confirm(`¿Eliminar profesor con legajo ${legajo}?`)) return
  try {
    const res = await fetch(`${API_URL}/profesores/${legajo}`, { method: 'DELETE' })
    const data = await res.json()
    alert(res.ok ? 'Profesor eliminado' : `Error: ${data.msg}`)
    if (res.ok) e.target.reset()
  } catch (err) {
    alert('No se pudo conectar con el servidor')
  }
})

document.getElementById('buscar-profesor').addEventListener('submit', async (e) => {
  e.preventDefault()
  const legajo = document.getElementById('legajo-buscar-profesor').value
  try {
    const res = await fetch(`${API_URL}/profesores/${legajo}`)
    const data = await res.json()
    alert(res.ok ? JSON.stringify(data, null, 2) : `Error: ${data.msg}`)
  } catch (err) {
    alert('No se pudo conectar con el servidor')
  }
})
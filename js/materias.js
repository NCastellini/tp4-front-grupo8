const API_URL = 'https://tp4-grupo8-backend.onrender.com'

document.getElementById('agregar-materia').addEventListener('submit', async (e) => {
  e.preventDefault()
  const body = {
    idMateria: document.getElementById('id-agregar-materia').value,
    nombre: document.getElementById('nombre-agregar-materia').value,
    cuatrimestre: Number(document.getElementById('cuatrimestre-agregar-materia').value)
  }
  try {
    const res = await fetch(`${API_URL}/materias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    alert(res.ok ? `Materia creada: ${JSON.stringify(data)}` : `Error: ${data.msg}`)
    if (res.ok) e.target.reset()
  } catch (err) {
    alert('No se pudo conectar con el servidor')
  }
})
 
document.getElementById('modificar-materia').addEventListener('submit', async (e) => {
  e.preventDefault()
  const id = document.getElementById('id-modificar-materia').value
  const body = {
    nombre: document.getElementById('nombre-modificar-materia').value,
    cuatrimestre: Number(document.getElementById('cuatrimestre-modificar-materia').value)
  }
  try {
    const res = await fetch(`${API_URL}/materias/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    alert(res.ok ? 'Materia modificada correctamente' : `Error: ${data.msg}`)
    if (res.ok) e.target.reset()
  } catch (err) {
    alert('No se pudo conectar con el servidor')
  }
})

document.getElementById('eliminar-materia').addEventListener('submit', async (e) => {
  e.preventDefault()
  const id = document.getElementById('id-eliminar-materia').value
  if (!confirm(`¿Eliminar materia con id ${id}?`)) return
  try {
    const res = await fetch(`${API_URL}/materias/${id}`, { method: 'DELETE' })
    const data = await res.json()
    alert(res.ok ? 'Materia eliminada' : `Error: ${data.msg}`)
    if (res.ok) e.target.reset()
  } catch (err) {
    alert('No se pudo conectar con el servidor')
  }
})

document.getElementById('buscar-materia').addEventListener('submit', async (e) => {
  e.preventDefault()
  const id = document.getElementById('id-buscar-materia').value
  try {
    const res = await fetch(`${API_URL}/materias/${id}`)
    const data = await res.json()
    alert(res.ok ? JSON.stringify(data, null, 2) : `Error: ${data.msg}`)
  } catch (err) {
    alert('No se pudo conectar con el servidor')
  }
})
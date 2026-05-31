const BASE_URL = 'https://tp4-grupo8-backend.onrender.com'

// agregar nota
document.getElementById('agregar-nota').addEventListener('submit', async (e) => {
  e.preventDefault()

  const legajo    = Number(document.getElementById('legajo-agregar-nota').value)
  const idMateria = document.getElementById('materia-agregar-nota').value.trim()
  const nota      = Number(document.getElementById('nota-agregar-nota').value)
  const fecha     = document.getElementById('fecha-agregar-nota').value

  try {
    const response = await fetch(`${BASE_URL}/notas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ legajo, idMateria, nota, fecha })
    })

    const data = await response.json()

    if (!response.ok) {
      alert(`Error: ${data.error || data.errors?.join(', ')}`)
      return
    }

    alert(`✅ ${data.msg}`)
    e.target.reset()
  } catch (error) {
    console.error('[ERROR] agregar nota:', error)
    alert('No se pudo conectar con el servidor.')
  }
})

// modificar nota por id
document.getElementById('modificar-nota').addEventListener('submit', async (e) => {
  e.preventDefault()

  const id    = Number(document.getElementById('id-modificar-nota').value)
  const nota  = Number(document.getElementById('nota-modificar-nota').value)
  const fecha = document.getElementById('fecha-modificar-nota').value

  try {
    const response = await fetch(`${BASE_URL}/notas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nota, fecha })
    })

    const data = await response.json()

    if (!response.ok) {
      alert(`Error: ${data.error || data.msg}`)
      return
    }

    alert(`✅ ${data.msg}`)
    e.target.reset()
  } catch (error) {
    console.error('[ERROR] modificar nota:', error)
    alert('No se pudo conectar con el servidor.')
  }
})

// eliminar nota por id
document.getElementById('eliminar-nota').addEventListener('submit', async (e) => {
  e.preventDefault()

  const id = Number(document.getElementById('id-eliminar-nota').value)

  const confirmar = confirm(`¿Seguro que querés eliminar la nota con id ${id}?`)
  if (!confirmar) return

  try {
    const response = await fetch(`${BASE_URL}/notas/${id}`, {
      method: 'DELETE'
    })

    const data = await response.json()

    if (!response.ok) {
      alert(`Error: ${data.error || data.msg}`)
      return
    }

    alert(`✅ ${data.msg}`)
    e.target.reset()
  } catch (error) {
    console.error('[ERROR] eliminar nota:', error)
    alert('No se pudo conectar con el servidor.')
  }
})

// buscar nota por id o traer todas las notas si no se ingresa id
document.getElementById('buscar-nota').addEventListener('submit', async (e) => {
  e.preventDefault()

  const id = document.getElementById('id-buscar-nota').value.trim()

  // Si no ingreso id, trae todas las notas
  const url = id ? `${BASE_URL}/notas/${id}` : `${BASE_URL}/notas`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      alert(`Error: ${data.error || data.msg}`)
      return
    }

    mostrarResultado(data)
  } catch (error) {
    console.error('[ERROR] buscar nota:', error)
    alert('No se pudo conectar con el servidor.')
  }
})

// simplemente muestra el resultado de la búsqueda en una tabla
const mostrarResultado = (data) => {
  const tablaAnterior = document.getElementById('tabla-notas')
  if (tablaAnterior) tablaAnterior.remove()

  const notas = Array.isArray(data) ? data : [data]

  if (notas.length === 0) {
    alert('No se encontraron notas.')
    return
  }

  const tabla = document.createElement('table')
  tabla.id = 'tabla-notas'
  tabla.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Legajo</th>
        <th>Materia</th>
        <th>Nota</th>
        <th>Fecha</th>
      </tr>
    </thead>
    <tbody>
      ${notas.map((n) => `
        <tr>
          <td>${n.id}</td>
          <td>${n.legajo}</td>
          <td>${n.idMateria}</td>
          <td>${n.nota}</td>
          <td>${n.fecha}</td>
        </tr>
      `).join('')}
    </tbody>
  `

  document.querySelector('main').appendChild(tabla)
}
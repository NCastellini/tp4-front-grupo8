const apiUrl = 'https://tp4-grupo8-backend.onrender.com/';

function renderizarTabla(alumnos) {
	const tabla = document.getElementById('tabla-alumnos');
	const seccionListado = document.getElementById('seccion-listado-alumnos');
	const tbody = document.createElement('tbody');

	if (!tabla) {
		return;
	}

	if (seccionListado) {
		seccionListado.hidden = false;
	}

	tabla.innerHTML = '<thead><tr><th>Legajo</th><th>Nombre</th><th>Apellido</th><th>Email</th></tr></thead>';

	if (alumnos.length === 0) {
		tbody.innerHTML = '<tr><td colspan="4">No hay alumnos para mostrar</td></tr>';
		tabla.appendChild(tbody);
		return;
	}

	alumnos.forEach((alumno) => {
		const fila = document.createElement('tr');
		fila.innerHTML = '<td>' + alumno.legajo + '</td>' +
			'<td>' + alumno.nombre + '</td>' +
			'<td>' + alumno.apellido + '</td>' +
			'<td>' + alumno.email + '</td>';
		tbody.appendChild(fila);
	});

	tabla.appendChild(tbody);
}

async function agregarAlumno(evento) {
	evento.preventDefault();

	const nuevoAlumno = {
		nombre: document.getElementById('nombre-agregar-alumno').value.trim(),
		apellido: document.getElementById('apellido-agregar-alumno').value.trim(),
		email: document.getElementById('email-agregar-alumno').value.trim(),
	};

	try {
		const response = await fetch(apiUrl + 'alumnos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(nuevoAlumno),
		});

		if (!response.ok) {
			throw new Error('No se pudo registrar el alumno.');
		}

		document.getElementById('agregar-alumno').reset();
		alert('Alumno registrado correctamente.');
	} catch (error) {
		alert(error.message);
	}
}

async function modificarAlumno(evento) {
	evento.preventDefault();

	const legajo = document.getElementById('legajo-modificar-alumno').value.trim();
	const alumnoActualizado = {
		nombre: document.getElementById('nombre-modificar-alumno').value.trim(),
		apellido: document.getElementById('apellido-modificar-alumno').value.trim(),
		email: document.getElementById('email-modificar-alumno').value.trim(),
	};

	try {
		const response = await fetch(apiUrl + 'alumnos/' + legajo, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(alumnoActualizado),
		});

		if (!response.ok) {
			throw new Error('No se pudo modificar el alumno.');
		}

		document.getElementById('modificar-alumno').reset();
		alert('Alumno ' + legajo + ' modificado correctamente.');
	} catch (error) {
		alert(error.message);
	}
}

async function eliminarAlumno(evento) {
	evento.preventDefault();

	const legajo = document.getElementById('legajo-eliminar-alumno').value.trim();

	try {
		const response = await fetch(apiUrl + 'alumnos/' + legajo, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error('No se pudo eliminar el alumno.');
		}

		document.getElementById('eliminar-alumno').reset();
		alert('Alumno ' + legajo + ' eliminado correctamente.');
	} catch (error) {
		alert(error.message);
	}
}

async function buscarAlumno(evento) {
	evento.preventDefault();

	const legajo = document.getElementById('legajo-buscar-alumno').value.trim();
	const seccionListado = document.getElementById('seccion-listado-alumnos');
	const tabla = document.getElementById('tabla-alumnos');

	if (!legajo) {
		if (seccionListado) {
			seccionListado.hidden = true;
		}

		if (tabla) {
			tabla.innerHTML = '<tbody><tr><td colspan="4">Buscá un legajo para ver el alumno</td></tr></tbody>';
		}

		alert('Ingresá un legajo para buscar.');
		return;
	}

	try {
		const response = await fetch(apiUrl + 'alumnos/' + legajo);
		const data = await response.json();
		const alumno = Array.isArray(data) ? data[0] : data;

		if (!response.ok) {
			throw new Error('No se pudo buscar el alumno.');
		}

		if (alumno) {
			renderizarTabla([alumno]);
			alert('Alumno encontrado.');
			return;
		}

		renderizarTabla([]);
		alert('No se encontró un alumno con ese legajo.');
	} catch (error) {
		renderizarTabla([]);
		alert(error.message);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('agregar-alumno')?.addEventListener('submit', agregarAlumno);
	document.getElementById('modificar-alumno')?.addEventListener('submit', modificarAlumno);
	document.getElementById('eliminar-alumno')?.addEventListener('submit', eliminarAlumno);
	document.getElementById('buscar-alumno')?.addEventListener('submit', buscarAlumno);
});

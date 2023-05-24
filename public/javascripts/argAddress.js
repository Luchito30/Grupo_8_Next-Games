document.addEventListener('DOMContentLoaded', async () => {
  try {
    const provincias = await obtenerProvincias();
    const selectProvincia = document.getElementById('province');
    const selectMunicipio = document.getElementById('municipio');
    const selectLocalidad = document.getElementById('localidad');

    const optionProvincia = document.createElement('option');
    const optionMunicipio = document.createElement('option');
    const optionLocalidad = document.createElement('option');
    optionProvincia.value = '';
    optionProvincia.text = 'Elige una provincia';
    optionMunicipio.value = '';
    optionMunicipio.text = 'Elige un municipio';
    optionLocalidad.value = '';
    optionLocalidad.text = 'Elige una localidad';
    selectProvincia.appendChild(optionProvincia);
    selectMunicipio.appendChild(optionMunicipio);
    selectLocalidad.appendChild(optionLocalidad);

    provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));
    provincias.forEach(provincia => {
      const option = document.createElement('option');
      option.value = provincia.nombre;
      option.text = provincia.nombre;
      selectProvincia.appendChild(option);
    });

    selectProvincia.addEventListener('change', async (event) => {
      const provinciaSeleccionada = event.target.value;

      selectMunicipio.innerHTML = '';
      selectLocalidad.innerHTML = '';
      const optionMunicipio = document.createElement('option');
      const optionLocalidad = document.createElement('option');
      optionMunicipio.value = '';
      optionMunicipio.text = 'Elige un Municipio';
      optionMunicipio.selected = true;
      optionLocalidad.value = '';
      optionLocalidad.text = 'Elige una Localidad';
      optionLocalidad.selected = true;
      selectMunicipio.appendChild(optionMunicipio);
      selectLocalidad.appendChild(optionLocalidad);

      if (provinciaSeleccionada !== '') {
        try {
          if (provinciaSeleccionada === 'Ciudad Autónoma de Buenos Aires') {
            const departamentosCABA = await obtenerDepartamentosCABA();
            departamentosCABA.sort((a, b) => a.nombre.localeCompare(b.nombre));
            departamentosCABA.forEach(departamento => {
              const option = document.createElement('option');
              option.value = departamento.nombre;
              option.text = departamento.nombre;
              selectMunicipio.appendChild(option);
            });
          } else {
            const departamentos = await obtenerDepartamentos(provinciaSeleccionada);
            departamentos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            departamentos.forEach(departamento => {
              const option = document.createElement('option');
              option.value = departamento.nombre;
              option.text = departamento.nombre;
              selectMunicipio.appendChild(option);
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });

    selectMunicipio.addEventListener('change', async (event) => {
      const municipioSeleccionado = event.target.value;
      const provinciaSeleccionada = selectProvincia.value;

      selectLocalidad.innerHTML = '';
      const optionLocalidad = document.createElement('option');
      optionLocalidad.value = '';
      optionLocalidad.text = 'Elige una Localidad';
      optionLocalidad.selected = true;
      selectLocalidad.appendChild(optionLocalidad);

      if (municipioSeleccionado !== '') {
        try {
          if (provinciaSeleccionada === 'Ciudad Autónoma de Buenos Aires') {
            const localidadesCABA = await obtenerLocalidadesCABA(municipioSeleccionado);
            localidadesCABA.sort((a, b) => a.nombre.localeCompare(b.nombre));
            localidadesCABA.forEach(localidad => {
              const option = document.createElement('option');
              option.value = localidad.nombre;
              option.text = localidad.nombre;
              selectLocalidad.appendChild(option);
            });
          } else {
            const localidades = await obtenerLocalidades(provinciaSeleccionada, municipioSeleccionado);
            localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));
            localidades.forEach(localidad => {
              const option = document.createElement('option');
              option.value = localidad.nombre;
              option.text = localidad.nombre;
              selectLocalidad.appendChild(option);
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
});

async function obtenerProvincias() {
  try {
    const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias');
    const data = await response.json();
    return data.provincias;
  } catch (error) {
    throw new Error('Ocurrió un error al obtener las provincias');
  }
}

async function obtenerMunicipios(provincia) {
  try {
    const response = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=250`);
    const data = await response.json();
    return data.municipios;
  } catch (error) {
    throw new Error('Ocurrió un error al obtener los municipios');
  }
}

async function obtenerDepartamentos(provincia) {
  try {
    const response = await fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${provincia}&max=250`);
    const data = await response.json();
    return data.departamentos;
  } catch (error) {
    throw new Error('Ocurrió un error al obtener los departamentos');
  }
}

async function obtenerDepartamentosCABA() {
  try {
    const response = await fetch('https://apis.datos.gob.ar/georef/api/departamentos?provincia=02&max=15');
    const data = await response.json();
    return data.departamentos;
  } catch (error) {
    throw new Error('Ocurrió un error al obtener los departamentos de la Ciudad Autónoma de Buenos Aires');
  }
}

async function obtenerLocalidades(provincia, ubicacion) {
  try {
    const response = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&departamento=${ubicacion}&max=250`);
    const data = await response.json();
    return data.localidades;
  } catch (error) {
    throw new Error('Ocurrió un error al obtener las localidades');
  }
}

async function obtenerLocalidadesCABA(departamentoId) {
  try {
    const response = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=02&departamento=${departamentoId}&max=250`);
    const data = await response.json();
    return data.localidades;
  } catch (error) {
    throw new Error('Ocurrió un error al obtener las localidades de la Ciudad Autónoma de Buenos Aires');
  }
}

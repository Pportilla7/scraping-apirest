const fs = require('node:fs')

function leerDatos() {
    try {
      const data = fs.readFileSync('noticias.json', 'utf-8');
      noticias = JSON.parse(data);
      return noticias;
    } catch (error) {
      console.error('Error al leer el archivo noticias.json:', error.message);
    }
  }
  
  // Guardar datos en el archivo JSON
  function guardarDatos(noticias) {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
  }

  module.exports={leerDatos,guardarDatos}
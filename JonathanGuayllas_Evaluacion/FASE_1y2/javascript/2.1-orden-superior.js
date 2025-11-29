// REQUISITO A: Closure - Función que retorna función (0.25 puntos)

/** * Crea un filtrador personalizado usando closures 
 * Retorna una función que puede usarse con Array.filter() 
 */
function crearFiltrador(criterio) {
  // Retornamos una nueva función.
  // Gracias al CLOSURE, esta función "recuerda" el objeto 'criterio'
  // aunque 'crearFiltrador' ya haya terminado de ejecutarse.
  
  return function(libro) { // esta funcion es el closure
    
    // 1. Filtrado por Categoría 
    // Verifica si existe la propiedad categoria en el objeto criterio
    if (criterio.categoria) {
        // true si coinciden exactamente las categorias
      return libro.categoria === criterio.categoria;
    }

    // 2. Filtrado por Año (Lógica con operador)
    // verifica que anio exista en la propiedad
    if (criterio.anio) {
      // Usamos switch para los diferentes casos posibles
      switch (criterio.operador) {
        case 'mayor': return libro.anio > criterio.anio;
        case 'menor': return libro.anio < criterio.anio;
        case 'igual': // cae al siguiente caso
        default:      return libro.anio === criterio.anio;
      }
    }

    // 3. Filtrado por Estado (Prestado/No prestado)
    // usamos hasOwnProperty porque prestado puede ser false
    // verifica que exista la propiedad
    if (criterio.hasOwnProperty('prestado')) {
        // si hay criterio válido 
        return libro.prestado === criterio.prestado;
    }

    return true; // Si no hay criterio válido, no filtramos nada
  };
}
 
// REQUISITO B: Función como parámetro (0.25 puntos)
// Es de orden superior porque recibe una función como parámetro
function procesarPrestamos(prestamos, estrategia) {
  // map() aplica la función 'estrategia' a cada elemento del array 
  // Retorna el array nuevo 
  return prestamos.map(estrategia);
}

// Datos de Prueba

const libros = [
  { id: 1, titulo: "Clean Code", categoria: "Programacion", anio: 2008, prestado: false },
  { id: 2, titulo: "Design Patterns", categoria: "Programacion", anio: 1994, prestado: true },
  { id: 3, titulo: "Calculus", categoria: "Matematicas", anio: 2010, prestado: false },
  { id: 4, titulo: "History", categoria: "Historia", anio: 2021, prestado: false }
];

const prestamos = [
  { id: 1, diasRetraso: 0, activo: true },
  { id: 2, diasRetraso: 5, activo: true }
];

console.log("--- PRUEBA REQUISITO A (Closures) ---");

// Creamos funciones especializadas "al vuelo"
const soloProgramacion = crearFiltrador({ categoria: "Programacion" });
const librosModernos = crearFiltrador({ anio: 2000, operador: "mayor" });

console.log("Libros de Programación:", libros.filter(soloProgramacion));
console.log("Libros > 2000:", libros.filter(librosModernos));


console.log("\n--- PRUEBA REQUISITO B (Estrategias) ---");

// Definimos dos estrategias diferentes
const estrategiaMulta = (prestamo) => {
    return prestamo.diasRetraso > 0 ? `Multa: $${prestamo.diasRetraso * 0.5}` : "Sin multa";
};

const estrategiaCorreo = (prestamo) => {
    return prestamo.diasRetraso > 0 ? "Email: Urgente devolver" : "Email: Gracias por su lectura";
};

// Inyectamos el comportamiento deseado
console.log("Reporte Financiero:", procesarPrestamos(prestamos, estrategiaMulta));
console.log("Acciones de Correo:", procesarPrestamos(prestamos, estrategiaCorreo));

/**
 * EXPLICACIÓN CONCEPTUAL:
 * * 1. Closure (Requisito A):
     Cuando ejecutamos `crearFiltrador({ categoria: "Programacion" })`, se crea un entorno
     donde la variable `criterio` queda "atrapada". La función que retorna tiene acceso
     a este entorno siempre, permitiendo crear configuraciones reutilizables.
 
* * 2. Higher-Order Function (Requisito B):
    `procesarPrestamos` no sabe que hacer con los datos, solo sabe como recorrerlos.
     La lógica de negocio (calcular dinero vs enviar correos) se inyecta desde fuera via `estrategia`.
     Esto desacopla la lógica de iteración de la lógica de negocio.
 */
/** * Sistema de recomendación de libros 
 * Recibe: lista de libros, perfil de usuario, y estadísticas de préstamos.
 * Retorna: Top 10 libros recomendados con su score calculado.
 */
function recomendarLibros(libros, usuario, historialPrestamos) {
  
  // 1: Filtrar por categorías favoritas del usuario
  // Solo pasan los libros cuya categoría está incluida en el array de gustos del usuario.
  const librosRelevantes = libros.filter(libro => 
    usuario.categoriasFavoritas.includes(libro.categoria)
  );

  // 2: Agregar score a cada libro
  // Transformo cada libro en un nuevo objeto que incluye el campo 'score'.
  const librosConScore = librosRelevantes.map(libro => {
    // a. Buscar historial de préstamos 
    const stats = historialPrestamos.find(h => h.libroId === libro.id);
    const cantidadPrestamos = stats ? stats.cantidad : 0;

    // b. Calcular componentes del score
    // - Popularidad: +1 punto por cada 10 préstamos 
    const puntajePopularidad = Math.floor(cantidadPrestamos / 10);
    
    // - Reciente: +2 puntos si es 2020 o superior
    const puntajeReciente = libro.anio >= 2020 ? 2 : 0;
    
    // - Rating: rating * 10
    const puntajeRating = (libro.rating || 0) * 10;

    // c. Retornar nuevo objeto (Inmutabilidad: usamos spread operator ...libro)
    return {
      ...libro,
      score: puntajePopularidad + puntajeReciente + puntajeRating,
      detallesScore: { popularidad: puntajePopularidad, reciente: puntajeReciente, rating: puntajeRating }
    };
  });

  // 3: Obtener top 10
  // Ordenar descendente por score y cortar los primeros 10.
  const top10 = librosConScore
  // b potivo = b, a negativo = a, 0 iguales
    .sort((a, b) => b.score - a.score) // Ordenar de mayor a menor
    .slice(0, 10);                     // Tomar los primeros 10

  return top10;
}


// DATOS DE PRUEBA


const usuario = {
  id: 1,
  categoriasFavoritas: ["Programacion", "Ciencia Ficcion"]
};

const historialPrestamos = [
  { libroId: 1, cantidad: 55 }, // 5 puntos popularidad
  { libroId: 2, cantidad: 12 }, // 1 punto popularidad
  { libroId: 3, cantidad: 5 },  // 0 puntos popularidad
  { libroId: 4, cantidad: 100 } // 10 puntos popularidad
];

const catalogoLibros = [
  { id: 1, titulo: "Clean Code", categoria: "Programacion", anio: 2008, rating: 4.8 }, 
  
  { id: 2, titulo: "Dune", categoria: "Ciencia Ficcion", anio: 1965, rating: 4.9 }, 
  
  { id: 3, titulo: "Project Hail Mary", categoria: "Ciencia Ficcion", anio: 2021, rating: 5.0 }, 
  
  { id: 4, titulo: "Cocina Facil", categoria: "Cocina", anio: 2020, rating: 4.0 }, 
  
  { id: 5, titulo: "Refactoring 2nd Ed", categoria: "Programacion", anio: 2020, rating: 4.7 }

];

// Ejecución
const recomendaciones = recomendarLibros(catalogoLibros, usuario, historialPrestamos);

console.log("--- LIBROS RECOMENDADOS (Top 10) ---");
recomendaciones.forEach((libro, index) => {
  console.log(`#${index + 1} Score: ${libro.score} | ${libro.titulo} (${libro.anio})`);
});
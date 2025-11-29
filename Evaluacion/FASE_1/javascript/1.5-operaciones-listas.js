/** Genera un reporte completo de la biblioteca 
    Usa SOLO: map, filter, reduce, sort, etc. 
 */

function generarReporteCompleto(libros, prestamos, usuarios) {
  return {
    
    // 1. Total de libros por categoría
    // Usamos reduce para transformar un array en un objeto acumulador que recorre cada elemento
    librosPorCategoria: libros.reduce((contador, libro) => {
      // Si la categoría existe en el acumulador, sumamos 1, si no, inicializamos en 1
      contador[libro.categoria] = (contador[libro.categoria] || 0) + 1;
      // retornamos el acumulador
      return contador;
    }, {}),

    // 2. Top 5 usuarios más activos
    // Estrategia: Mapear usuarios a un objeto con su conteo, ordenar y cortar
    usuariosMasActivos: usuarios
    // Transformo cada usuario en un objeto con información adicional
      .map(usuario => {
        // Cuento los préstamos para este usuario específico
        const totalPrestamos = prestamos.filter(p => p.usuarioId === usuario.id).length;
        // con filter creo un nuevo array que guarde solo los prestamos de ese usuario
        return { nombre: usuario.nombre, totalPrestamos };
      })
      // ordeno de mayor a menor (actividad)
      // b positivo = primero, a negativo = primero, 0 no hay cambios
      .sort((a, b) => b.totalPrestamos - a.totalPrestamos)
      .slice(0, 5), // Tomamos solo los 5 primeros del array ordenado

    // 3. Libros más prestados
    // Similar a la logica de los usuarios
    librosMasPrestados: libros
    // transformacion con conteo 
      .map(libro => {
        // filter devuelve un array pero solo con las veces que se ha prestado el libro
        const vecesPrestado = prestamos.filter(p => p.libroId === libro.id).length;
        // retorno para iterar
        return { id: libro.id, titulo: libro.titulo, vecesPrestado };
      })
      // ordenamos de mayor a menor
      // a negativo = primero, b positivo = negro, 0 no cambios
      .sort((a, b) => b.vecesPrestado - a.vecesPrestado) 
      .slice(0, 5), // Top 5

    // 4. Tasa de préstamos activos
    // Calulamos usando el tamaño de los arrays 
    tasaPrestamosActivos: prestamos.length === 0 ? 0 : 
    // convertimos a decimal, filter solo cuenta los prestamos activos (true) y redondeamos a 2 decimales 
    parseFloat((prestamos.filter(p => p.activo).length / prestamos.length).toFixed(2))

    };
}

//  Datos de prueba

const testLibros = [
  { id: 1, titulo: "Clean Code", categoria: "Programación" },
  { id: 2, titulo: "Calculus", categoria: "Matemáticas" },
  { id: 3, titulo: "Physics I", categoria: "Ciencias" },
  { id: 4, titulo: "Algorithms", categoria: "Programación" }
];

const testUsuarios = [
  { id: 101, nombre: "Alice" },
  { id: 102, nombre: "Bob" },
  { id: 103, nombre: "Charlie" }
];

const testPrestamos = [
  { id: 1, usuarioId: 101, libroId: 1, activo: false },
  { id: 2, usuarioId: 101, libroId: 2, activo: true }, 
  { id: 3, usuarioId: 102, libroId: 1, activo: false }, 
  { id: 4, usuarioId: 103, libroId: 3, activo: true }
];

// Ejecución
console.log(JSON.stringify(generarReporteCompleto(testLibros, testPrestamos, testUsuarios), null, 2));

/*
EXPLICACIÓN DE MÉTODOS USADOS:

1. .reduce(): Lo uso en 'librosPorCategoria' porque necesitamos reducir una lista de ítems a un solo valor (en este caso, un objeto {} que sirve de diccionario).
2. .map(): Usamos para transformar los datos originales (Usuario) a una nueva estructura que incluye datos calculados (Usuario + totalPrestamos).
3. .filter(): LO uso dentro de los mapas para contar ocurrencias (cuántas veces aparece un ID en la lista de préstamos).
4. .sort(): Ordena el array resultante basándose en una función de comparación (a - b).
5. .slice(): Recorta el array para obtener solo el "Top X en este caso 5".
*/
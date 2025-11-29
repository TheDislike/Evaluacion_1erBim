const libros = [
  { id: 1, titulo: "Clean Code", categoria: "Programacion", anio: 2008, prestado: false },
  { id: 2, titulo: "Design Patterns", categoria: "Programacion", anio: 1994, prestado: true },
  { id: 3, titulo: "Refactoring", categoria: "Programacion", anio: 1999, prestado: false },
  { id: 4, titulo: "Calculus", categoria: "Matematicas", anio: 2010, prestado: false }
];

// Implementación 1: Paradigma IMPERATIVO

// 1. Función para filtrar los libros
function filtrarLibrosImperativo(libros, categoria) {
  // Array vacio para guardar los resultados
  let resultado = [];
  // Recorro cada elemento del array con un for tradicional
  for (let i = 0; i < libros.length; i++) {
    // Condiciones: 1. Categoria igual al libro y que no este prestado (true)
    if (libros[i].categoria === categoria && !libros[i].prestado) {
      // Si cumple las condiciones se lo agrega al array como resultado   
      resultado.push(libros[i]);
    }
  }
  
  // 2. Funcion para ordenar de menor a mayor los libros
  // For que determina su duración por el numero de libros guardados en el array
  for (let i = 0; i < resultado.length; i++) {
    // For que empuja el elemento mas grande al final de la lista
    for (let j = 0; j < resultado.length - i - 1; j++) {
      // Comparamos el año del libro actual con el siguiente  
      if (resultado[j].anio > resultado[j + 1].anio) {
        // Mutación de variables (swap) - solo si estan en el orden incorrecto
        let reOrdenar = resultado[j]; // Guardo el valor actual (variable temporal)
        resultado[j] = resultado[j + 1]; // Muevo el siguiente al actual
        resultado[j + 1] = reOrdenar; // Movemos el actual al siguiente
      }
    }
  }
  // retornamos el array filtrado y ordenado
  return resultado;
}

// Implementación 2: Paradigma DECLARATIVO
function filtrarLibrosDeclarativo(libros, categoria) {
  return libros
  // filtadro declarativo (filter) crea un array con los elementos que cumplen la condicion
  // Usamos una funcion tipo flecha y si cumple las condiciones se guarda en el nuevo array
  .filter(libro => libro.categoria === categoria && !libro.prestado) 
  // sort ordena el array segun la comparacion (a - b)
  // si a - b es negativo: a va antes que b, de lo contrario b va antes que a y 0 no varia
  .sort((a, b) => a.anio - b.anio);
  // El array libros no se modifica ya que filter crea un array totalmente nuevo
  // y sort solo lo ordena al nuevo array (no modificamos el array original)
}

// Pruebas básicas
console.log("Imperativo:", filtrarLibrosImperativo(libros, "Programacion"));
console.log("Declarativo:", filtrarLibrosDeclarativo(libros, "Programacion"));

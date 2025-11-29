# Evaluación Programación Funcional - [Jonathan David Guayllas Guamán]

## Información del Estudiante
- **Nombre:** [Jonathan]
- **Cédula/ID:** [1105851529]
- **Fecha:** [28/11/2025]

## Instrucciones de Ejecución

### JavaScript
```bash
# Para ejecutar los archivos JavaScript:
# Fase 1: Fundamentos
node javascript/1.1-paradigmas.js
node javascript/1.3-funciones-puras.js
node javascript/1.5-operaciones-listas.js
# Fase 2: Aplicación
node javascript/2.1-orden-superior.js
node javascript/2.3-recomendaciones.js

### Scala
```bash
# Fase 1: Fundamentos
# Para ejecutar los archivos Scala:
scala-cli .\1.2-inmutabilidad.scala
scala-cli .\1.4-funciones-vs-metodos.scala
# Fase 2: Aplicación
scala-cli .\2.2-composicion.scala
scala-cli .\2.4-tuplas-analisis.scala

Ejemplo de Datos para Pruebas

Estos son los datos base utilizados en los ejercicios para verificar la lógica implementada.

JavaScript (const definitions)

const librosEjemplo = [
  { id: 1, titulo: "Functional Programming in JavaScript", autor: "Luis Atencio", categoria: "Programacion", anio: 2016, rating: 4.5, precio: 45.99 },
  { id: 2, titulo: "Scala for the Impatient", autor: "Cay Horstmann", categoria: "Programacion", anio: 2016, rating: 4.3, precio: 39.99 },
  { id: 3, titulo: "Clean Code", autor: "Robert Martin", categoria: "Programacion", anio: 2008, rating: 4.7, precio: 42.99 },
  { id: 4, titulo: "Introduction to Algorithms", autor: "Cormen", categoria: "Algoritmos", anio: 2009, rating: 4.6, precio: 89.99 }
];

const usuariosEjemplo = [
  { id: 1, nombre: "Israel Asanza", email: "iasanza@utpl.edu.ec", categoriasFavoritas: ["Programacion", "Matematicas"] },
  { id: 2, nombre: "Jorge Beltran", email: "jbeltran@utpl.edu.ec", categoriasFavoritas: ["Programacion", "Bases de Datos"] },
  { id: 3, nombre: "Andres Cuenca", email: "acuenca@utpl.edu.ec", categoriasFavoritas: ["Algoritmos", "Programacion"] },
  { id: 4, nombre: "Matthew Flores", email: "mflores@utpl.edu.ec", categoriasFavoritas: ["Programacion", "Arquitectura"] }
];

const prestamosEjemplo = [
  { id: 1, libroId: 1, usuarioId: 1, fechaPrestamo: "2024-01-15", fechaDevolucion: "2024-02-01", activo: false },
  { id: 2, libroId: 2, usuarioId: 1, fechaPrestamo: "2024-02-10", fechaDevolucion: null, activo: true },
  { id: 3, libroId: 3, usuarioId: 2, fechaPrestamo: "2024-01-20", fechaDevolucion: "2024-02-15", activo: false },
  { id: 4, libroId: 1, usuarioId: 3, fechaPrestamo: "2024-03-01", fechaDevolucion: null, activo: true }
];


Scala (case classes & List)

case class Libro(
  id: Int,
  titulo: String,
  autor: String,
  categoria: String,
  anio: Int,
  rating: Double,
  precio: Double
)

case class Usuario(
  id: Int,
  nombre: String,
  email: String,
  categoriasFavoritas: List[String]
)

case class Prestamo(
  id: Int,
  libroId: Int,
  usuarioId: Int,
  fechaPrestamo: String,
  fechaDevolucion: Option[String],
  activo: Boolean
)

// Ejemplos de datos
val libros = List(
  Libro(1, "Functional Programming in JavaScript", "Luis Atencio", "Programacion", 2016, 4.5, 45.99),
  Libro(2, "Scala for the Impatient", "Cay Horstmann", "Programacion", 2016, 4.3, 39.99),
  Libro(3, "Clean Code", "Robert Martin", "Programacion", 2008, 4.7, 42.99)
)

val usuarios = List(
  Usuario(1, "Israel Asanza", "iasanza@utpl.edu.ec", List("Programacion", "Matematicas")),
  Usuario(2, "Jorge Beltran", "jbeltran@utpl.edu.ec", List("Programacion", "Bases de Datos")),
  Usuario(3, "Andres Cuenca", "acuenca@utpl.edu.ec", List("Algoritmos", "Programacion")),
  Usuario(4, "Matthew Flores", "mflores@utpl.edu.ec", List("Programacion", "Arquitectura"))
)

val prestamos = List(
  Prestamo(1, 1, 1, "2024-01-15", Some("2024-02-01"), false),
  Prestamo(2, 2, 1, "2024-02-10", None, true),
  Prestamo(3, 3, 2, "2024-01-20", Some("2024-02-15"), false)
)

// Definición de la estructura de datos
case class Libro(
  id: Int,           // Identificador único del libro
  titulo: String,    // Nombre del libro
  autor: String,     // Nombre del autor
  categoria: String  // Categoría o género del libro
)  

// FORMA 1: Como método de una clase (Enfoque Orientado a Objetos)

class Biblioteca(libros: List[Libro]) {
  
  // Depende del ESTADO interno de la clase.
  // No necesita recibir la lista como parámetro porque ya la "tiene".

  def buscarPorAutor(autor: String): List[Libro] = {
    // accede al estado interno de la instancia
    libros.filter(libro => libro.autor == autor)
  }
}

// FORMA 2: Como función pura (Enfoque Funcional)
object FuncionesBiblioteca {
  // Necesita recibir explícitamente todos los datos sobre los que va a operar.
  // Es "Pura" porque no lee nada fuera de sus parámetros.
   
  def buscarPorAutor(libros: List[Libro], autor: String): List[Libro] = {
    // La función no tiene acceso a nada más que sus parámetros   
    libros.filter(libro => libro.autor == autor)
  }
}

object Main extends App {
  // Datos de prueba (lista inmutable)
  val libros = List(
    Libro(1, "Clean Code", "Robert Martin", "Programacion"),
    Libro(2, "Refactoring", "Martin Fowler", "Programacion"),
    Libro(3, "The Clean Coder", "Robert Martin", "Programacion")
  )

  // 1. Uso con método (Requiere instanciar la clase)
  val biblioteca = new Biblioteca(libros) // instancio el objeto
  val resultadoMetodo = biblioteca.buscarPorAutor("Robert Martin")
  
  println(s"Resultado Método: ${resultadoMetodo.length} libros encontrados.")

  // 2. Uso con función (Directo, sin instanciar estado)
  val resultadoFuncion = FuncionesBiblioteca.buscarPorAutor(libros, "Robert Martin")
  
  println(s"Resultado Función: ${resultadoFuncion.length} libros encontrados.")
}

/** 1. ¿Cuál es la diferencia conceptual?
    El método está acoplado al objeto, dependiendo su comportamiento del
    contexto ("this") y del estado interno que se le pasó al construir el objeto.
    La función pura está desacoplada. No tiene contexto ni "memoria". Trata los datos 
    simplemente como argumentos de entrada. La lógica es portable y no pertenece a una entidad.

    2. ¿Cuándo usar métodos vs funciones puras?
    Usar métodos cuando necesitemos encapsular y gestionar los estados
    o una configuración que no queremos llamarla cada vez.
    Usa funciones puras para la lógica de negocio, cálculos y transformaciones de datos. 

    3. ¿Cuál facilita más el testing y por qué?
    La funcion pura facilita más el testing.
    Razón: Para testear la función, solo se necesita pasar una lista y un string. 
    Para testear el método, primero debemos instanciar el objeto `Biblioteca`, configurar 
    su estado inicial, y luego llamar al método. Las funciones puras son más fáciles de aislar 
    porque no tienen efectos colaterales ni dependencias ocultas.
 */
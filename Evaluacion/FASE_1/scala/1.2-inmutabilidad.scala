case class Prestamo(
  id: Int,              // Identificador único del préstamo
  usuarioId: Int,       // ID del usuario que tomó prestado el libro
  libroId: Int,         // ID del libro que fue prestado
  activo: Boolean,      // true = libro prestado, false = devuelto
  fechaPrestamo: String // Fecha en que se realizó el préstamo
)

object GestionPrestamos {

  // Funcion devolver libro
  // prestamos: lista a no modificar, Id del prestamo que marcaremos como devuelto 
  def devolverLibro(prestamos: List[Prestamo], prestamoId: Int): List[Prestamo] = {
    // Usamos map para recorrer y transformar.
    // Si no, devolvemos el prestamo tal cual.
    prestamos.map { prestamo => // Crea una NUEVA lista sin modificar la original (inmutabilidad)
      // Si el ID coincide, creamos una COPIA con activo = false.
     // copy() crea una NUEVA instancia con los valores especificados cambiados
      if (prestamo.id == prestamoId) prestamo.copy(activo = false)
      // Si el Id no coincide devolvemos el prestamo sin modificar
      else prestamo
    }
  }

  def main(args: Array[String]): Unit = {
    // Datos de prueba
    val prestamos = List(
      Prestamo(1, 101, 201, true, "2024-01-15"),
      Prestamo(2, 102, 202, true, "2024-01-20")
    )
    // Esto crea una NUEVA lista, NO modifica la original
    val prestamosActu = devolverLibro(prestamos, 2)

    println("Originales (debe ser true): " + prestamos.find(_.id == 1).get.activo)
    println("Actualizados (debe ser false): " + prestamosActu.find(_.id == 2).get.activo)
  }
}
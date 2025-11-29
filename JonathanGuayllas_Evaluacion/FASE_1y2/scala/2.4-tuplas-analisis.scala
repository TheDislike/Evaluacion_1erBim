// Definición del modelo de datos
case class Prestamo(
  id: Int,
  libroId: Int,
  usuarioId: Int,
  fechaPrestamo: String,
  activo: Boolean
)

object AnalisisPrestamos {

  /** * Retorna estadísticas de un usuario usando tuplas 
   * Tupla: (totalPrestamos, prestamosActivos, promedioLibrosPorMes) 
   */
  def obtenerEstadisticasUsuario(
    prestamos: List[Prestamo],
    usuarioId: Int
  ): (Int, Int, Double) = {
    
    // 1. Filtrar los préstamos que pertenecen al usuario solicitado
    // Creando una sub-lista sobre la cual haremos los cálculos
    val prestamosUsuario = prestamos.filter(_.usuarioId == usuarioId)

    // 2. Calcular Total (Int)
    // El tamaño es el de la lista filtrada
    val totalPrestamos = prestamosUsuario.length

    // 3. Calcular Activos (Int)
    // Usamos count con un predicado (condición booleana)
    val prestamosActivos = prestamosUsuario.count(_.activo)

    // 4. Calcular Promedio por Mes (Double)
    // Lógica: Total préstamos / Cantidad de meses únicos en los que ha pedido libros
    
    // a. Extraemos solo el string "YYYY-MM" de la fecha (primeros 7 caracteres)
    val mesesUnicos = prestamosUsuario
      .map(_.fechaPrestamo.substring(0, 7)) 
      .distinct // Eliminamos duplicados para contar los meses reales
      .length

    // b. Cálculo seguro (evitar división por cero si es un usuario nuevo)
    val promedio = if (mesesUnicos == 0) 0.0 else totalPrestamos.toDouble / mesesUnicos

    // 5. Retornar la Tupla
    (totalPrestamos, prestamosActivos, promedio)
  }

  // Main

  def main(args: Array[String]): Unit = {
    // Datos de prueba 
    val prestamos = List(
      Prestamo(1, 101, 1, "2024-01-15", false), // Usuario 1, Enero
      Prestamo(2, 102, 1, "2024-02-10", true),  // Usuario 1, Febrero
      Prestamo(3, 103, 1, "2024-03-05", true),  // Usuario 1, Marzo
      Prestamo(4, 104, 1, "2024-03-20", false), // Usuario 1, Marzo (segundo préstamo en mismo mes)
      Prestamo(5, 201, 2, "2024-01-01", true)   // Usuario 2 (no debe contar)
    )

    // Ejecución para el usuario ID 1
    // Usamos "Pattern Matching" en la asignación para desestructurar la tupla directamente
    val (total, activos, promedio) = obtenerEstadisticasUsuario(prestamos, 1)

    println(s"--- Estadísticas Usuario 1 ---")
    println(s"Total Préstamos: $total")     // Esperado: 4
    println(s"Préstamos Activos: $activos") // Esperado: 2
    // Promedio: 4 préstamos divididos en 3 meses únicos (Ene, Feb, Mar) = 1.33...
    println(f"Promedio Mensual: $promedio%1.2f") 
  }
}

/**
 * EXPLICACIÓN TÉCNICA:
 * * 1. Tuplas `(Int, Int, Double)`: 
     En Scala, las tuplas son tipos de primera clase. Nos permiten agrupar datos heterogéneos 
     de forma rápida sin definir una clase `ResultadoEstadistica`. Son muy usados en 
     Programación Funcional para retornos muy complejos.
 
 * * 2. Operaciones usadas:
    `filter`: Para aislar los datos del usuario (pureza, no mutamos la lista original).
    `count`: Una forma sencilla de hacer filter + length.
    `map` + `distinct`: Patrón clásico para encontrar cardinalidad (cuántos elementos únicos existen).
 
 * * 3. Inmutabilidad:
     Todas las variables (`totalPrestamos`, `mesesUnicos`, etc.) son `val`, lo que significa 
     que son inmutables. El estado se calcula paso a paso mediante transformación de datos.
 */
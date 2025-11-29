import scala.math.BigDecimal

// Definición del modelo de datos
case class Libro(
  id: Int,
  titulo: String,
  precio: Double,
  descuento: Double = 0,
  impuesto: Double = 0
)

object CalculadoraPrecios {

  // 1. Definición de funciones de transformación (0.3 puntos)
  

  /**
   * Aplica 15% de descuento.
   * Actualiza el precio y guarda el valor del descuento aplicado.
   */
  val aplicarDescuento: Libro => Libro = libro => {
    // función que transforma Libro en Libro
    val valorDescuento = libro.precio * 0.15 // calcular descuento
    libro.copy( // copia los campos del objeto original y los sobrescribe
      precio = libro.precio - valorDescuento, // Nuevo precio con descuento
      descuento = valorDescuento  // Guardamos el descuento
    )
  }

  /**
   * Aplica 12% de IVA sobre el precio actual (que ya puede tener descuento).
   * Actualiza el precio sumando el impuesto.
   */
  val aplicarImpuesto: Libro => Libro = libro => {
    // TIPO: Libro => Libro
    // calculo del valor
    val valorImpuesto = libro.precio * 0.12
    libro.copy( // copia todos los campos del objeto 
      precio = libro.precio + valorImpuesto, // Sumamos el impuesto
      impuesto = valorImpuesto // Guardamos el iva
    )
  }

  /**
   * Redondea el precio final a 2 decimales.
   * Usamos BigDecimal para precisión financiera.
   */
  val redondearPrecio: Libro => Libro = libro => {
    // TIPO: Libro => Libro
    val precioRedondeado = BigDecimal(libro.precio) // big decimal, decimales exactos
      .setScale(2, BigDecimal.RoundingMode.HALF_UP)
      .toDouble // convierto a doble 
      // creo una nueva instancia con precio redondeado 
    libro.copy(precio = precioRedondeado)
  }

  // 2. Composición de funciones (0.4 puntos)
  
  /**
   * Pipeline de procesamiento:
   * Entrada -> [Descuento] -> [Impuesto] -> [Redondeo] -> Salida
   * 'andThen' ejecuta la primera función y pasa su resultado a la siguiente.
   */
  val procesarPrecioFinal: Libro => Libro = aplicarDescuento andThen aplicarImpuesto andThen redondearPrecio

  // Datos de prueba
  def main(args: Array[String]): Unit = {
    // Creao una lista de libros con precios originales
    val libros = List(
      Libro(1, "Clean Code", 45.99),
      Libro(2, "Refactoring", 39.99),
      Libro(3, "SICP", 55.00)
    )

    // --- APLICAR EL PIPELINE COMPLETO ---
    // .map() aplica la función compuesta a CADA libro de la lista
    // Resultado: NUEVA lista con todos los libros procesados
    val librosConPrecioFinal = libros.map(procesarPrecioFinal)

    println("--- Reporte de Precios Finales ---")
    // .foreach: itera sobre cada libro procesado para imprimirlo
    librosConPrecioFinal.foreach { l =>
      println(f"Titulo: ${l.titulo}%-15s | Final: $$${l.precio}%5.2f | Desc: $$${l.descuento}%5.2f | Iva: $$${l.impuesto}%5.2f")
    }
  }
}

/**
 * RESPUESTAS TEÓRICAS:
 * * 1. ¿Qué ventaja tiene la composición vs un solo método grande?
     Legibilidad y Modularidad: En lugar de tener una función `calcularTodo` gigante con 20 líneas de lógica mezclada, 
     tenemos 3 funciones pequeñas y claras. Cada una hace una sola cosa.
     Reutilización: Si mañana necesitamos calcular un precio sin impuesto para un cliente extranjero, 
     podemos componer `aplicarDescuento y redondearPrecio`, reutilizando las piezas sin reescribir código.
 * * 2. ¿Cómo facilita el testing?
     Aislamiento de Errores: Nos permite escribir tests unitarios para `aplicarDescuento` independientemente de `aplicarImpuesto`. 
     Si el cálculo final falla, sabemos exactamente en qué eslabón de la cadena está el error, en lugar de depurar 
     un bloque monolítico de código.
 */
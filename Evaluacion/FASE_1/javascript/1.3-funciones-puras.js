/** * Calcula días de retraso de un préstamo 
 * Función PURA: 
 * 1. Mismo input siempre da mismo output (Determinística)
 * 2. No modifica variables externas ni imprime en consola (Sin efectos secundarios)
 */

function calcularDiasRetraso(fechaPrestamo, fechaDevolucion, diasPermitidos) {
  // Convierto los argumentos a objetos Date internos
  const inicio = new Date(fechaPrestamo);
  const fin = new Date(fechaDevolucion);
  
  // Calculamos la diferencia en milisegundos (date - date = milisegundos)
  const diferenciaMs = fin - inicio;
  
  // Convierto a días: (1000ms * 60s * 60min * 24h)
  // Uso Math.ceil para redondear hacia arriba cualquier fracción de día
  const diferenciaDias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
  
  // El dia uno cuenta 
  const diasTotales = diferenciaDias + 1; 
  // Restao los días permitidos de los días totales
  const retraso = diasTotales - diasPermitidos;
  
  // Si el retraso es negativo (lo entregó antes), devolvemos 0
  return retraso > 0 ? retraso : 0;
}

/**Calculo la multa por días de retraso (0.50$ por dia)
 * Función PURA: Su resultado depende estrictamente del argumento 'diasRetraso'
 */
function calcularMulta(diasRetraso) {
  // Si es negativo o 0, no hay multa
  if (diasRetraso <= 0) return 0.0;
  // Multiplico los días de retraso por la tarifa fija de $0.50
  return diasRetraso * 0.50;
}

// Datos de prueba
const retraso = calcularDiasRetraso("2024-01-01", "2024-01-20", 14);
console.log(`Días de retraso: ${retraso}`);

const multa = calcularMulta(retraso);
console.log(`Multa a pagar: $${multa}`); 

/* 1. ¿Por qué estas funciones son puras?
  Determinismo: Si llamo a calcularDiasRetraso("2024-01-01", "2024-01-20", 14) 
  un millón de veces, siempre devolverá 6. No depende de nada cambiante.
  
  Transparencia Referencial: Se puede reemplazar la llamada a la función por 
  su valor resultante (6) y el programa seguiría funcionando igual.
  
  Sin Efectos Secundarios: No modifica variables globales.
  
  2. ¿Qué pasaría si usaras Date.now() dentro?
  La función dejaría de ser pura, se volvería "no determinística", ya que el resultado cambiaría dependiendo 
  del momento exacto (hora/minuto) en que se ejecute el código, rompiendo la regla de "mismo input = mismo output".
  
  3. Ventaja de funciones puras para testing:
  Son extremadamente fáciles de probar.
  Solo necesitas pasar argumentos y verificar el retorno.
  Los tests son aislados y no pueden fallar por culpa de un estado externo corrupto.
 */
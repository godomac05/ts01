# Proceso: pestañas Gastos, Evidencias, CFDI Traslado, Tracking, Manifiesto y Liquidación del Viaje

Complementa `20-viajes-formulario.md`. El formulario de **Tráfico → Viajes**
tiene, además de la pestaña Viaje/Solicitudes, estas otras pestañas:

## Pestaña Gastos

- Botón **Provision** (⚡): provisiona gastos estimados del viaje.
- Tabla principal de gastos (botón **Agregar**): Tipo V[iaje], Folio,
  Fecha, Opera[dor], Unidad, Conc[epto], Importe, Liquid[ado].
- **Comprobación Operador**: tabla de gastos que el operador comprueba
  (Concepto, Importe).
- **IAVE**: tabla de cargos de caseta importados con folio IAVE (columnas
  de fecha, última lectura, caseta, domicilio, hora, unidad, liquidado).
  Se relaciona con la plantilla y catálogo IAVE ya documentados en
  `40-plantillas-descargables.md` y `11-menu-navegacion-2.md`.
- **Prestamos**: tabla de préstamos aplicados al viaje/operador (Folio,
  Concepto, Fecha, Importe, Saldo).

## Pestaña Evidencias

- Botón **Anexar Evidencia** (⚡): sube un archivo/foto como evidencia.
- Tabla "Terminó/Terminado": Fecha, Documentador, Evidencia, Comentario —
  registra evidencia relacionada con marcar el viaje como terminado.
- Tabla "Evidencias": Fecha, Documento, Comentario, Documentador — bitácora
  general de evidencias anexadas al viaje (fotos de carga, firmas, etc.).

## Pestaña CFDI Traslado

Muestra el estatus y los datos del CFDI de Traslado (con Complemento Carta
Porte) generado para este viaje:

- **PDF Especial**: liga a una representación impresa alterna.
- **Archivos y Procesos**: Recuperar Folio CFDI, Descargar XML, Descargar
  PDF, Carta de Instrucciones.
- **Datos CFDI**: Serie, Folio, Version, Fecha y Hora, Fecha de Timbrado,
  Uuid, No. Certificado, Certificado del SAT, Mensaje de Error, **IdCCP**
  (identificador del Complemento Carta Porte) e IdCCP Relacionado, cfdi
  Sustituida Por / UUID Sustituido Por (cuando el CFDI se sustituyó por
  otro), Relacionado Por y Tipo Relación (ver `c_TipoRelacion` en
  `50-catalogos-cfdi-generales.md`).
- Secciones colapsables **Cancelación** y **UUID Relacionados**.

Si un usuario pregunta "¿dónde descargo el XML/PDF de mi Carta Porte?" o
"¿por qué mi CFDI no se ha timbrado?", esta es la pestaña a revisar — el
campo **Mensaje de Error** muestra el motivo si el timbrado falló.

## Pestaña Tracking

- Botones **Crear Tracking** y **Mapa Historial Tracking** (⚡, vista de
  mapa con la ruta registrada).
- **Fecha Hora Salida** / **Fecha Hora Llegada**, y **Tiempo Espera Carga
  Viaje** (texto libre).
- Tabla de puntos de tracking (botón **Agregar Nuevo**): Estatus,
  Docu[mentador], Fecha, Latitud, Longitud — cada fila es un punto de
  geolocalización registrado durante el viaje.

## Pestaña Manifiesto

Tabla simple del manifiesto asociado al viaje: XFolio, Creado, Peso Bruto.
Se relaciona con el catálogo **Manifiesto** (ver `11-menu-navegacion-2.md`)
y con la acción "Anexar Manifiesto" del menú de acciones del viaje.

## Pestaña Liquidación (liquidación del operador)

Esta pestaña calcula el resultado económico del viaje para el **operador**
(distinto del cobro al cliente, que se ve en Viaje/Solicitudes):

- **Desde / Hasta**, **Dias Laborados**, **Fecha**, **Estatus**.
- **Kms Cargado**, **Kms Vacio**, **Kms Recorridos**.
- **Comision Operador**: Sueldo Diario, Por Ruta, %Operador.
- **Conceptos Comprobado**: tabla Concepto, Recibio, Comprobo, Diferencia
  (compara lo que el operador recibió contra lo que comprobó con gastos).
- **Percepciones**: tabla Concepto, Importe (pagos adicionales al
  operador).
- **Impuestos**: tabla Concepto, Importe — impuestos/deducciones del
  operador, relacionado con la plantilla "Operadores - Impuestos" (ver
  `40-plantillas-descargables.md` y `11-menu-navegacion-2.md`, Liquidaciones
  → Nómina).
- **Diesel Tracto**: Diesel Vale, Diesel Consumido, Precio Litro, Diesel
  Descontar, Total Descontar, Km Inicial, Km Final, Kms Recorridos,
  Rendimiento, y la casilla **Cobrar Lts Operador** (si se le descuentan al
  operador los litros de diferencia).
- **Resultado Operador**: resumen final — Ingreso, Egreso, Saldo Operacion,
  %Saldo Operacion, Deposito, Prestamo, Notas Cargo, Combustible, Comb
  Faltante, IAVE, Comision Operador, Percepciones, Impuestos, Sueldo,
  Recibio, Comprobo, Diferencia. Este es el resultado que después se
  procesa con la acción "Procesar Liquidacion" del menú de acciones del
  viaje.

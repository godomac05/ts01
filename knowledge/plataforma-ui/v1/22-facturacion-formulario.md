# Proceso: pantalla de Facturación (generar/editar una factura)

Pantalla dentro de **Facturación → Facturacion**. Es muy parecida al
formulario de Viajes (`20-viajes-formulario.md`) porque comparten los
mismos datos de Carta Porte, Remitente/Destinatario y Partidas — de hecho
una factura normalmente **se genera a partir de uno o varios viajes** ya
capturados. Aquí solo se documentan los campos y acciones que son propios
de Facturación; para Emisor/Cargo A, Datos Generales Carta Porte,
Autotransporte, Remitente/Destinatario, Embalaje y Partidas, aplica lo ya
descrito en `20-viajes-formulario.md`.

## Lista de Facturas (consulta)

La pantalla **-Facturacion** muestra el listado con columnas: Fecha,
Factura, cfdiuuid (UUID del CFDI timbrado), Ticket, Impuesto, Retenido,
Total, Abonado, Saldo, Fecha Pago Abono. Las filas resaltadas en amarillo
indican facturas con saldo pendiente de cobro (Abonado menor al Total).

## Barra de acciones del formulario de Factura

- **Crear Factura**: inicia una factura nueva en blanco.
- **Factura-E**: variante para timbrar como factura electrónica (según el
  flujo específico de tu PAC/configuración).
- **Duplicar Factura**: copia la factura actual como base para una nueva.
- **Generar Viaje**: crea un viaje nuevo a partir de esta factura (flujo
  inverso al normal, cuando se factura primero y se documenta el viaje
  después).
- **Anexa Viajes**: liga uno o más viajes ya existentes a esta factura.
- **Traer Todos los Datos**: jala automáticamente los datos (remitente,
  destinatario, partidas, Carta Porte) desde el/los viaje(s) anexados,
  para no volver a capturarlos.
- Menú desplegable (▼): **Generar Abono** (crea el Complemento de Pago/REP
  de esta factura cuando se recibe un pago — ver
  `30-complemento-pago-rep.md`), Relacionar CFDi, Llevar Partidas a
  Remisiones, Agrega Correos, Validar Documento, Cambiar Folio, Importar
  XML Emb. WM 1/2, Cancelación Adm, Anexar Transfer.

Pestañas del formulario: **Factura**, Viajes (los viajes anexados a esta
factura), Transfer, Evidencias, Estado de Cuenta, Factura Electronica.

## Campos propios de Facturación (no están en el formulario de Viajes)

- **Dias Credito** y **Vence**: plazo de crédito otorgado al cliente y su
  fecha límite de pago — relevante para saber si corresponde método de
  pago **PPD** (a crédito) o **PUE** (contado), ver
  `50-catalogos-cfdi-generales.md`.
- **Correo** y **CC**: para el envío automático de la factura al cliente.
- **Anticipo**: casilla para marcar la factura como anticipo.
- **Fecha Revision**: fecha en que se revisó/validó la factura
  internamente antes de timbrar.
- **Información CFDi Global** (sección colapsable): datos para una factura
  global (agrupa varias operaciones con público en general), poco usual en
  transporte de carga.
- **A Cuenta Tercero** (sección colapsable): cuando la operación se
  factura a nombre y por cuenta de un tercero.

## Addendas (parte final de la pestaña Factura)

- **Addendas generales**: Tipo Documento, Referencia1, Referencia2,
  Addendas (catálogo de addenda a usar) y ocho campos libres **Add Campo A**
  a **Add Campo H**, para acomodar cualquier addenda que exija un cliente.
- **Addenda MABE**: bloque específico ya preconfigurado para clientes que
  exigen addenda MABE — Campo A a Campo F, Tipo, Descripcion y la casilla
  **Descuento**.
- Pie del formulario: **Documentador**, **Modifico**, **Modificado** (igual
  que en Viajes).

## Pestaña Viajes (dentro de Factura)

Tabla de los viajes anexados a esta factura: V[iaje], T[icket], F[echa],
U[nidad], D[estino], UUID, P[eso], F[lete], con botones **Ver**, **Editar**
y **Borrar** (desvincular ese viaje de la factura). Una factura puede
llevar más de un viaje anexado.

## Pestaña Transfer (dentro de Factura)

Tabla de transferencias/traspasos relacionados con esta factura: XFolio,
Creado, Cliente, Lugar S[alida], Destino, Costo.

## Pestaña Evidencias (dentro de Factura)

Igual patrón que en Viajes: botón **Anexar Evidencia** y tabla con Fecha,
Documentador, Evidencia, Comentario.

## Pestaña Estado de Cuenta (dentro de Factura)

Resume la situación de cobro de la factura:

- **Total**, **Abonado**, **Saldo** (Total menos Abonado).
- **Creado**, **Fecha Revision**, **Dias de Credito**, **Vence**, **Fecha
  Pago Abono**.
- Tabla de abonos/pagos recibidos: Abono, Fecha, Forma Pa[go] (ver
  `c_FormaPago`), Bancos, Importe, Comentario — cada fila aquí corresponde
  a un **Generar Abono** (Complemento de Pago/REP) aplicado a esta factura.

## Pestaña Factura Electrónica (dentro de Factura)

Es el equivalente, para la factura, de la pestaña "CFDI Traslado" del
formulario de Viajes (ver `21-viajes-otras-pestanas.md`) — aquí se ve el
estatus y los datos del CFDI de Ingreso/Pago ya timbrado:

- **Archivos y Procesos**: Re-Envío Archivos (PDF y XML) por Email,
  Descargar XML, Descargar PDF, Recuperar Folio CFDI.
- **Datos CFDi**: Serie, Folio, Version, **Timbró** (equivalente al estatus
  de timbrado), Fecha y Hora, Fecha de Timbrado, Uuid, No. Certificado,
  Certificado del SAT, Mensaje de Error, IdCCP e IdCCP Relacionado,
  Sustituida Por / UUID Sustituido Por, Tipo Relacion.
- **Cancelación**: Causa (motivo de cancelación conforme al catálogo del
  SAT), Canceló (usuario) y Cancelado (fecha/hora).
- **UUID Relacionado**: tabla con cfdiuuid Relacionado, XFolio y Tipo
  Relacion — historial de CFDIs relacionados con esta factura (por
  ejemplo, sus REP, sustituciones o notas de crédito).

Si un usuario pregunta "¿dónde descargo el XML/PDF de mi factura?", "¿por
qué no se timbró mi factura?" o "¿cómo cancelo una factura?", esta es la
pestaña a revisar.

## Ejemplo de consistencia con el viaje de origen

Cuando una factura se genera desde "Traer Todos los Datos", los campos de
Datos Generales Carta Porte, Remitente, Destinatario y Partidas quedan
idénticos a los del viaje (misma Ruta, mismo Remitente/Destinatario, misma
clave `78101800` en Partidas) — solo cambian los datos propios de la
factura (Emisor específico, Uso CFDI, Método/Forma de Pago, crédito, etc.).
El bloque de **Costos y totales** (Flete, Seguro, Carga, Descarga,
Recoleccion, Repartos, Demoras, Autopistas, Otros, ISR → Subtotal,
Descuentos, Impuesto, Retenido, Importe ISR, Total) y las **Notas**
(Instrucciones, Comentarios, Indicaciones) funcionan igual que en el
formulario de Viajes.

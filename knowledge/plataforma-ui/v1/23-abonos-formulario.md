# Proceso: pantalla de Abonos (Complemento de Pago / REP)

Pantalla dentro de **Cobranza → Abonos**. Es donde se registra un pago
recibido de un cliente y se genera su **Complemento de Pago (REP)** — ver
el concepto general en `30-complemento-pago-rep.md`. Se accede también
desde el botón **Generar Abono** del formulario de Facturación (ver
`22-facturacion-formulario.md`).

## Resultado de Abonos (consulta)

La pantalla **-Abonos** muestra el listado con columnas: Ab[ono] (folio,
prefijo "AB"), cfdiuuid, Cliente, Fe[cha], Subtotal, IVA, Retencion,
Tot[al], Completado, Comentarios, con botones **Ver** y **Editar**.

## Pestaña Abonos: datos generales del pago

- **Documentador**, **Fecha de Expedicion**, **Abono** (folio, ej. AB1),
  **Estatus** (Proceso, y otros estados conforme avanza), **Num Poliza**,
  **Fcha Vencimiento CSD**.
- **Cargo A**: Cliente, y las casillas **Anticipo** y **Devolución
  Mercancias**.
- **CFDi**: Uso CFDI, Método de Pago, Forma de Pago — mismos catálogos del
  SAT que en Factura/Viajes (ver `50-catalogos-cfdi-generales.md`). En un
  REP, la Forma de Pago capturada aquí es la que realmente usó el cliente
  para pagar (transferencia, efectivo, etc.), no necesariamente la misma
  forma de pago "por definir" de la factura original.
- **Pagos**: Fecha de Pago, Moneda, Tipo Cambio, Objeto Impuesto, Cuenta
  Bancaria (a qué cuenta de la empresa entró el pago), Numero Operacion
  (referencia bancaria).
- **Factoraje**: casillas Factoraje1/Factoraje2 y Cliente Factoraje, para
  cuando el cobro se gestiona a través de una empresa de factoraje.
- **A Cuenta Terceros**: casilla ACuenta Terceros y Cliente A Cuenta
  Terceros, cuando el pago se recibe a cuenta de un tercero.

## Facturas relacionadas al abono

Tabla con las facturas que este abono está pagando: Fac[tura], For[ma],
Imp[orte], Apli[cado] (fecha), Tip[o], con botones Ver/Editar/**Remover**.
Un mismo abono puede pagar (parcial o totalmente) una o varias facturas —
por eso un REP puede llevar más de un "DoctoRelacionado" (ver
`30-complemento-pago-rep.md`).

Debajo, dos columnas de totales — **DR** (lo pendiente del/los documento(s)
relacionado(s): Total IVA, Total Retencion, Total ISR, Total Subtotal,
Total Importe) y **Abono** (lo que efectivamente cubre este pago: Total
IVA2, Total Retencion2, Total ISR2, Total Subtotal2, Total Importe2) — y
las casillas **Tasa Cero**, **Exento** y **Totales Editables**.

## Notas y Addendas

Igual patrón que en Factura: **Notas** (Comentarios), **Addendas**
generales (Addendas, Add Campo A-F) y **Addenda MABE** (Campo A-F). Pie:
Documentador, Modifico, Modificado.

## Barra de acciones de Abonos

- **Anexar Facturas**: agrega más facturas a pagar con este mismo abono.
- **Cambiar Retenedor**: cambia el cliente al que pertenece el abono.
- **Relacionar CFDi**: liga este REP con otro CFDI relacionado.
- **Timbrar Pago**: timbra el Complemento de Pago (⚡, aparece cuando el
  abono ya está listo para generar su CFDI).
- **Depositar en Banco**: registra el depósito bancario de este abono.
- **Remover Partidas** / **Actualizar Partidas**: quita o refresca las
  partidas relacionadas.
- **Cancelación**: cancela el abono/REP.

## Pestaña eFactura (dentro de Abonos)

Igual estructura que "Factura Electrónica" en el formulario de Factura
(ver `22-facturacion-formulario.md`), pero para el CFDI del REP:

- **Complemento de Pago**: Recuperar Folio CFDI, Re-Envío Archivos (PDF y
  XML) por Email, Descargar XML, Descargar PDF.
- **Datos CFDi**: Serie, Folio, Version, Fecha y Hora, Fecha de Timbrado,
  UUID, No. Certificado, Mensaje de Error, Sustituida Por, UUID Sustituido
  Por, Tipo Relacion, Relacionado Por.
- **UUID Relacionados**: tabla con cfdiuuid Relacionado y XFolio.
- **Cancelación**: Causa Cancelacion, Se Canceló, Canceló.

**Ejemplo real de mensaje de error visto en esta pantalla:**
`CFDI301: XML mal formado: cvc-complex-type.4: Attribute 'FormaDePagoP'
must appear on element 'pago20:Pago'.` — significa que al timbrar el REP
faltó capturar la **Forma de Pago** en alguno de los pagos del complemento;
hay que revisar ese campo antes de reintentar el timbrado.

## Pestaña Evidencias (dentro de Abonos)

Botón **Agregar Evidencias** y tabla Fecha, Documentador, Evidencia,
Comentario — mismo patrón que en Viajes y Facturación.

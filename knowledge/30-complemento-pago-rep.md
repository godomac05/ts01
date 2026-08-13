# Complemento de Pago (REP) — CFDI tipo Pago

## Qué es el REP

El Recibo Electrónico de Pago (REP) es un CFDI de tipo **Pago (P)** que
incorpora el Complemento de Pago. Se usa para documentar cuándo efectivamente
se cobra o se paga un comprobante que fue emitido bajo el método de pago
**PPD (Pago en Parcialidades o Diferido)**.

## Cuándo se debe emitir un REP

- Cuando un CFDI de Ingreso se emitió con método de pago **PPD**, es decir,
  el pago no se recibió al momento de facturar (a crédito, en parcialidades,
  o se desconocía la forma de pago en ese momento).
- Cada vez que se recibe un pago (total o parcial) relacionado con ese CFDI,
  se debe emitir un REP correspondiente a ese pago.
- Si un CFDI se pagó de contado y se conoce la forma de pago desde el
  momento de la emisión, se usa método de pago **PUE (Pago en una sola
  Exhibición)** y **no se requiere REP** — el pago ya queda documentado en el
  CFDI original.

## Estructura general del Complemento de Pago

- **DoctoRelacionado**: referencia al CFDI (o CFDIs) que se están pagando —
  incluye el UUID del comprobante relacionado, el monto del pago aplicado a
  ese documento, el saldo anterior y el saldo insoluto después del pago.
- **Datos del pago**: fecha de pago, forma de pago (transferencia, cheque,
  tarjeta, etc.), moneda, y el monto total del pago.
- Un mismo REP puede relacionar **varios documentos** si un solo pago cubre
  varias facturas pendientes del mismo receptor.

## Plazo para emitir el REP

Como regla general (sujeta a cambios en la Resolución Miscelánea Fiscal
vigente), el REP debe emitirse a más tardar el **quinto día natural del mes
siguiente** a aquel en que se recibió el pago. Por ejemplo, un pago recibido
el 20 de marzo normalmente debería quedar documentado con su REP a más
tardar el 5 de abril. **Este plazo ha cambiado en años anteriores; confirma
la regla vigente antes de tomar decisiones sobre cumplimiento.**

## Errores comunes relacionados con REP

- **Relacionar un CFDI que ya fue pagado en su totalidad** (el sistema debe
  validar el saldo insoluto antes de generar un nuevo REP).
- **Confundir método de pago PUE con PPD** al emitir el CFDI original, lo
  que genera la obligación (o la omisión indebida) de emitir REP.
- **Omitir la moneda o el tipo de cambio** cuando el pago se realiza en
  moneda distinta a la del CFDI original.
- **No emitir el REP dentro del plazo**, lo cual puede generar
  observaciones del SAT sobre el cumplimiento de las obligaciones fiscales
  del contribuyente.

## Relación con Carta Porte

El Complemento de Pago (REP) es independiente del Complemento Carta Porte:
uno documenta el pago de un CFDI, el otro documenta el traslado de
mercancías. Un mismo comprobante normalmente no lleva ambos complementos al
mismo tiempo — un CFDI de Ingreso con Carta Porte se paga después, en su
caso, mediante un REP aparte que solo lleva el Complemento de Pago.

# Proceso general de CFDI 4.0 y timbrado

## Qué es el CFDI y qué es "timbrar"

El CFDI (Comprobante Fiscal Digital por Internet) es el formato de factura
electrónica exigido por el SAT en México. "Timbrar" significa que un Proveedor
Autorizado de Certificación (PAC) valida el XML del comprobante, le agrega un
sello digital (el "Timbre Fiscal Digital" o TFD) y lo registra ante el SAT.
Un CFDI sin timbre no tiene validez fiscal.

## Versión vigente: CFDI 4.0

La versión 4.0 del CFDI es la vigente desde 2022 (con periodo de convivencia
con la 3.3 que ya terminó). Los cambios principales respecto a la versión 3.3
incluyen:

- Es obligatorio capturar el nombre, razón social y régimen fiscal tanto del
  emisor como del receptor, y deben coincidir exactamente con la Constancia de
  Situación Fiscal vigente en el SAT.
- Se agregó el campo "Exportación" para indicar si el comprobante ampara una
  operación de exportación.
- Se agregaron campos para relacionar comprobantes de operaciones a través de
  terceros y para identificar si el pago es a nombre de un tercero.
- El objeto de impuesto (ObjetoImp) ahora se declara explícitamente por cada
  concepto.

## Tipos de CFDI más comunes

- **Ingreso (I)**: ampara una venta o prestación de servicios.
- **Egreso (E)**: notas de crédito, devoluciones, descuentos.
- **Traslado (T)**: ampara el traslado de mercancías sin que exista una
  enajenación (por ejemplo, mover tu propia mercancía entre almacenes). Es el
  tipo de CFDI que normalmente se usa junto con el Complemento Carta Porte
  cuando no hay venta.
- **Pago (P)**: Complemento de Pago / REP, ver el documento dedicado a este
  tema.
- **Nómina (N)**: comprobantes de pago de sueldos y salarios.

## Proceso general de timbrado (flujo típico de cualquier plataforma/PAC)

1. **Generación del XML**: el sistema arma el XML del comprobante con los
   datos fiscales, conceptos, impuestos y, si aplica, los complementos
   correspondientes (Carta Porte, Pago, etc.).
2. **Validación local**: se valida la estructura contra los esquemas (XSD) y
   las reglas de negocio publicadas por el SAT (Anexo 20 y sus guías de
   llenado).
3. **Envío al PAC**: el XML se envía al Proveedor Autorizado de Certificación.
4. **Sellado y timbrado**: el PAC valida nuevamente el comprobante, le agrega
   el Timbre Fiscal Digital (UUID, fecha de timbrado, sello del SAT y del PAC)
   y lo reporta al SAT.
5. **Entrega**: el sistema entrega al usuario el XML timbrado y, normalmente,
   una representación impresa en PDF.

## Plazos generales de timbrado

Como regla general, un CFDI debe timbrarse el mismo día en que se realiza la
operación que ampara, o a más tardar dentro de las siguientes 72 horas,
dependiendo del tipo de comprobante y de las reglas de la Resolución
Miscelánea Fiscal vigente. Para el Complemento de Pago (REP) el plazo es
distinto (ver el documento de Complemento de Pago). **Estos plazos cambian con
frecuencia en la RMF; verifica la regla vigente antes de tomar decisiones
importantes.**

## Vigencia y almacenamiento

Los CFDI y sus complementos deben conservarse por el usuario durante el plazo
que marca el Código Fiscal de la Federación (generalmente 5 años), ya sea en
la propia plataforma, en el buzón del SAT, o en un respaldo propio del
contribuyente.

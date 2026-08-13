# Catálogos del SAT para CFDI 4.0 (generales)

## Qué son los catálogos del SAT y por qué importan

El Anexo 20 del SAT define catálogos de valores permitidos para varios campos
del CFDI (forma de pago, uso, régimen fiscal, moneda, etc.). El XML de un
comprobante solo es válido si cada campo catalogado usa exactamente una clave
que exista en el catálogo vigente — una clave mal escrita o dada de baja es
causa común de rechazo al timbrar. Estos catálogos los actualiza el SAT
periódicamente (algunas claves se dan de alta o de baja), así que ante
cualquier duda sobre si una clave sigue vigente, confírmalo en el portal del
SAT o con tu contador antes de usarla en un comprobante real.

## Catálogo c_TipoDeComprobante

| Clave | Significado |
| ----- | ------------ |
| I     | Ingreso |
| E     | Egreso |
| T     | Traslado |
| N     | Nómina |
| P     | Pago |

## Catálogo c_UsoCFDI (vigente para CFDI 4.0)

El uso de CFDI debe ser compatible con el régimen fiscal del receptor —el SAT
valida esta correlación al timbrar.

| Clave | Descripción |
| ----- | ----------- |
| G01   | Adquisición de mercancías |
| G02   | Devoluciones, descuentos o bonificaciones |
| G03   | Gastos en general |
| I01   | Construcciones |
| I02   | Mobiliario y equipo de oficina por inversiones |
| I03   | Equipo de transporte |
| I04   | Equipo de cómputo y accesorios |
| I05   | Dados, troqueles, moldes, matrices y otros activos |
| I06   | Comunicaciones telefónicas |
| I07   | Comunicaciones satelitales |
| I08   | Otra maquinaria y equipo |
| D01   | Honorarios médicos, dentales y gastos hospitalarios |
| D02   | Gastos médicos por incapacidad o discapacidad |
| D03   | Gastos funerales |
| D04   | Donativos |
| D05   | Intereses reales por créditos hipotecarios (casa habitación) |
| D06   | Aportaciones voluntarias al SAR |
| D07   | Primas por seguros de gastos médicos |
| D08   | Gastos de transportación escolar obligatoria |
| D09   | Depósitos en cuentas para el ahorro / pensiones |
| D10   | Pagos por servicios educativos (colegiaturas) |
| S01   | Sin efectos fiscales |
| CP01  | Pagos |
| CN01  | Nómina |

En logística/transporte de carga, los usos más comunes en la práctica son
**G01** (adquisición de mercancías), **G03** (gastos en general) y **S01**
(sin efectos fiscales, cuando el receptor no requiere deducir el gasto).

## Catálogo c_RegimenFiscal (vigente para CFDI 4.0)

| Clave | Descripción |
| ----- | ----------- |
| 601   | General de Ley Personas Morales |
| 603   | Personas Morales con Fines no Lucrativos |
| 605   | Sueldos y Salarios e Ingresos Asimilados a Salarios |
| 606   | Arrendamiento |
| 607   | Régimen de Enajenación o Adquisición de Bienes |
| 608   | Demás ingresos |
| 610   | Residentes en el Extranjero sin Establecimiento Permanente en México |
| 611   | Ingresos por Dividendos (socios y accionistas) |
| 612   | Personas Físicas con Actividades Empresariales y Profesionales |
| 614   | Ingresos por intereses |
| 615   | Régimen de los ingresos por obtención de premios |
| 616   | Sin obligaciones fiscales |
| 620   | Sociedades Cooperativas de Producción que optan por diferir sus ingresos |
| 621   | Incorporación Fiscal |
| 622   | Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras |
| 623   | Opcional para Grupos de Sociedades |
| 624   | Coordinados |
| 625   | Régimen de Actividades Empresariales con ingresos a través de Plataformas Tecnológicas |
| 626   | Régimen Simplificado de Confianza (RESICO) |

En transporte de carga, los regímenes más comunes son **601** (personas
morales, la mayoría de las empresas de transporte y sus clientes), **612** y
**626** (personas físicas con actividad empresarial, frecuente en operadores
independientes/fleteros) y **624** (Coordinados, específico del sector
autotransporte cuando opera bajo ese esquema).

## Catálogo c_FormaPago

| Clave | Descripción |
| ----- | ----------- |
| 01    | Efectivo |
| 02    | Cheque nominativo |
| 03    | Transferencia electrónica de fondos |
| 04    | Tarjeta de crédito |
| 05    | Monedero electrónico |
| 06    | Dinero electrónico |
| 08    | Vales de despensa |
| 12    | Dación en pago |
| 13    | Pago por subrogación |
| 14    | Pago por consignación |
| 15    | Condonación |
| 17    | Compensación |
| 23    | Novación |
| 24    | Confusión |
| 25    | Remisión de deuda |
| 26    | Prescripción o caducidad |
| 27    | A satisfacción del acreedor |
| 28    | Tarjeta de débito |
| 29    | Tarjeta de servicios |
| 30    | Aplicación de anticipos |
| 31    | Intermediario de pagos |
| 99    | Por definir (solo válido con método de pago PPD) |

## Catálogo c_MetodoPago

| Clave | Descripción |
| ----- | ----------- |
| PUE   | Pago en una sola exhibición |
| PPD   | Pago en parcialidades o diferido |

Si usas **PPD**, el CFDI debe ir seguido de uno o más Complementos de Pago
(REP) conforme se reciban los pagos — ver `30-complemento-pago-rep.md`.

## Catálogo c_Moneda (monedas más usadas)

| Clave | Descripción |
| ----- | ----------- |
| MXN   | Peso mexicano |
| USD   | Dólar americano |
| EUR   | Euro |
| XXX   | Sin moneda (operaciones donde no interviene ninguna) |

El catálogo completo del SAT incluye prácticamente todas las monedas del
mundo (~170), pero en la práctica de transporte de carga en México casi
siempre se usa MXN, y ocasionalmente USD en operaciones de comercio exterior.

## Catálogo c_TipoRelacion (para CFDIs relacionados)

| Clave | Descripción |
| ----- | ----------- |
| 01    | Nota de crédito de los documentos relacionados |
| 02    | Nota de débito de los documentos relacionados |
| 03    | Devolución de mercancía sobre facturas o traslados previos |
| 04    | Sustitución de los CFDI previos |
| 05    | Traslados de mercancías facturados previamente |
| 06    | Factura generada por los traslados previos |
| 07    | CFDI por aplicación de anticipo |
| 08    | Factura generada por pagos en parcialidades |
| 09    | Factura generada por pagos diferidos |

## Catálogo c_Exportacion

| Clave | Descripción |
| ----- | ----------- |
| 01    | No aplica |
| 02    | Definitiva |
| 03    | Temporal |

Este campo es obligatorio en todo CFDI 4.0, aunque la operación no sea de
comercio exterior — en ese caso se usa la clave **01** (No aplica).

## Catálogo c_ObjetoImp

| Clave | Descripción |
| ----- | ----------- |
| 01    | No objeto de impuesto |
| 02    | Sí objeto de impuesto |
| 03    | Sí objeto del impuesto y no obligado al desglose |
| 04    | Sí objeto del impuesto y no causa impuesto |

## Catálogos c_Impuesto y c_TipoFactor

**c_Impuesto** (impuestos que se pueden desglosar en un concepto):

| Clave | Impuesto |
| ----- | -------- |
| 001   | ISR |
| 002   | IVA |
| 003   | IEPS |

**c_TipoFactor**: indica cómo se calcula el impuesto sobre la base — Tasa,
Cuota o Exento. El más común en transporte de carga es **Tasa** con **IVA al
16%** (clave 002), salvo excepciones específicas (frontera, exportación, etc.)
que pueden calificar para tasa 0% u otro tratamiento.

## Catálogos que NO se incluyen completos aquí (y qué hacer)

Algunos catálogos del SAT son demasiado extensos para mantenerlos como texto
en esta base de conocimiento (miles o decenas de miles de claves), y
copiarlos aquí no ayudaría a responder mejor por WhatsApp. Son:

- **c_ClaveProdServ** (clave de producto/servicio): más de 52,000 claves.
- **c_ClaveUnidad** (unidad de medida): más de 3,000 claves.
- **c_CodigoPostal**, **c_Colonia**, **c_Localidad**, **c_Municipio**: los
  catálogos geográficos, con decenas o cientos de miles de registros.
- **c_MaterialPeligroso**: cientos de claves de sustancias reguladas.

Para estos, ver `51-catalogos-carta-porte.md` (que incluye las claves más
usadas en logística/transporte de carga) y, para una clave exacta que no esté
ahí, usa el buscador de catálogos del portal del SAT o el buscador integrado
en la plataforma al momento de capturar el comprobante.

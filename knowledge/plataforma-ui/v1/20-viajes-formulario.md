# Proceso: pantalla de Viajes (creación y edición de un Carta Porte)

Esta es la pantalla principal donde se arma un viaje con su Complemento
Carta Porte, dentro de **Tráfico → Viajes**. Documenta el formulario campo
por campo para poder guiar a un usuario paso a paso.

## Lista de Viajes (consulta)

La pantalla **-Viajes** muestra el listado con columnas: Folio, Creado,
Ticket, Operador, Unidad, Subtotal, Impuesto, Retenido, Total, Fecha Carga.
Cada fila tiene botones **Ver** (solo consulta) y **Editar** (abre el
formulario completo). Se puede filtrar escribiendo directamente en los
campos de encabezado de cada columna (Folio, Ticket, Operador, Unidad,
Fecha Carga).

## Barra de acciones del formulario de Viaje

En la parte superior del formulario:

- **Crea Viaje**: inicia un viaje nuevo en blanco.
- **CFDI Traslado**: genera el CFDI tipo Traslado (T) con el Complemento
  Carta Porte para este viaje.
- **Generar Factura**: genera el CFDI de Ingreso (factura) asociado.
- **Duplicar Viaje**: crea una copia del viaje actual como punto de partida
  para uno nuevo (útil para viajes recurrentes con la misma ruta/cliente).
- **Relacionar CFDi**: vincula este viaje/CFDI con otro comprobante
  relacionado (ver `c_TipoRelacion` en `50-catalogos-cfdi-generales.md`).
- **Terminar** / **Quitar Terminado**: marca el viaje como terminado o
  revierte ese estado.
- Menú desplegable (▼) con acciones adicionales: Asignar Solicitud,
  Importar XML Emb. WM 1 / WM 2 (importar embalaje desde XML de un
  almacén/WMS externo), Anexar Manifiesto, Impresión 17 puntos, Crear
  Gastos Autorizados, Borrar embalajes, Procesar Liquidacion, Traer IAVE,
  Traer Prestamos, Traer GastosSub.

El formulario tiene pestañas: **Viaje / Solicitudes**, Gastos, Evidencias,
CFDI Traslado, Tracking, Manifiesto, Liquidacion. Lo que sigue describe la
pestaña **Viaje / Solicitudes**, donde vive toda la captura del Carta Porte.

## Datos generales del viaje

- **Moneda**: PESOS (o la moneda del viaje, ver `c_Moneda`).
- **Creado**: fecha/hora de captura, y **XFolio**: folio interno del viaje.
- **Tipo Cambio**: tipo de cambio aplicable si la moneda no es MXN.
- **Ticket**, **Fcha Vencimiento CSD**, **Servicio**, **Factura**,
  **Liquidacion**, **Manifiesto**, **Solicitud de Servicio**, **Viaje
  Informe**: referencias/relaciones con otros módulos (se llenan solas o
  se ligan desde otras pantallas).
- Casillas: **Complemento Carta Porte** (activa la captura de Carta Porte
  para este viaje), **Lleva Repartos**, **Registro ISTMO**, **Logistica
  Inversa**, **Cofepris**, **Seco**.

## Emisor y Cargo A (receptor)

- **Emisor**: quién factura el viaje (tu empresa, o la sucursal/emisora
  correspondiente si manejas varias).
- **Cambiar Retenedor**: define a nombre de quién se factura (el cliente).
- **Cliente**, **RFC**, **Solicito** (quién solicitó el servicio del lado
  del cliente), **Documentador** (usuario de la plataforma que capturó el
  viaje).
- **Uso CFDI**, **Metodo de Pago**, **Forma de Pago**: catálogos del SAT,
  ver `50-catalogos-cfdi-generales.md` (`c_UsoCFDI`, `c_MetodoPago`,
  `c_FormaPago`).

## Datos Generales Carta Porte

- **Flete Tipo**: clasificación interna del tipo de flete (ej. "Flete por
  Contrato").
- **Tipo Viaje**: NACIONAL (o Internacional Entrada/Salida, según el
  catálogo del Complemento Carta Porte).
- **Clave Unidad Peso**: la unidad en que se declara el peso total de la
  mercancía (ver `c_ClaveUnidad` en `51-catalogos-carta-porte.md` — por
  ejemplo **TNE** = Tonelada).
- **Permisionario Fact.**: el permisionario que se factura (relevante
  cuando el transporte lo opera un tercero permisionado).
- **Ruta**: catálogo de rutas (ver plantilla de Rutas en
  `40-plantillas-descargables.md`); el botón **+** permite crear una ruta
  nueva sin salir del formulario.
- **Distancia Recorrida**: en kilómetros, debe ser coherente con el
  catálogo de rutas y las ubicaciones capturadas (ver errores comunes en
  `23-carta-porte-errores-comunes.md`).

## Autotransporte

- **Unidad**, **Peso Bruto Vehicular**, **Operador**, **Operador2**,
  **Operador3** (hasta 3 operadores por viaje).
- **Remolque**, **Remolque B**, **Dolly**: hasta dos remolques más el dolly
  de enganche, según la configuración vehicular (ver
  `21-carta-porte-autotransporte.md`).

## Figura de Transporte

Hasta 3 partes de transporte, cada una con:

- **Parte TransporteN**: a qué parte corresponde (ej. la propia empresa o
  un tercero).
- **Figura TransporteN**: la persona/entidad específica (operador,
  propietario, arrendador, etc. — ver figuras descritas en
  `21-carta-porte-autotransporte.md`).
- **Tipo Figura TransporteN**: el rol conforme al catálogo del SAT
  (Operador, Propietario, Arrendador, Notificado).

## Remitente y Destinatario (Ubicaciones)

Dos bloques con la misma estructura, uno para el **Remitente** (origen) y
otro para el **Destinatario** (destino) — corresponden al bloque de
Ubicaciones del Complemento Carta Porte:

- Botones **Agrega Remitente/Destinatario** (elegir uno ya registrado en el
  catálogo de Clientes/Clientes Destino) y **Crea Nuevo Remitente/
  Destinatario** (dar de alta uno nuevo desde aquí mismo).
- **Codigo Origen/Destino**: clave interna del domicilio en el catálogo.
- **Remitente/Destinatario** y **RFC**: razón social y RFC — deben
  coincidir exactamente con la Constancia de Situación Fiscal (ver
  `10-cfdi-40-timbrado.md`).
- **Pais, Codigo Postal, Estado, Municipio, Localidad, Colonia, Calle, Num
  Ext, Num Int, Referencia**: domicilio completo (los catálogos
  geográficos se documentan de forma resumida en
  `51-catalogos-carta-porte.md`).
- **Num Reg Id Trib** y **Residencia Fiscal**: solo aplican cuando el
  remitente/destinatario es residente en el extranjero.
- **Cita Carga / Cita Descarga**: fecha y hora programada.
- **Registro ISTMO**: si ese domicilio específico está dentro del corredor
  interoceánico del Istmo de Tehuantepec.
- **Se Recogera / Se Entregara**: referencia libre de dónde se recoge o
  entrega la mercancía.
- **Contacto** y **Telefono**: datos de contacto en ese domicilio.

## Embalaje (mercancías)

Tabla de mercancías con botón **Importar CSV Embalaje** (carga masiva) y
**Agregar Nuevo** (captura manual). Columnas:

- **Cantidad**, **Embalaje** (clave de `c_TipoEmbalaje`), **Peso**,
  **Descripcion**, **Cve Un[idad]** (`c_ClaveUnidad`, ej. TNE), **Cve
  Pr[odServ]** (`c_ClaveProdServ`, clave de la mercancía en sí — distinta
  de la clave del servicio de transporte que va en Partidas).

Debajo se totalizan: **Total Cantidad**, **Peso**, **Peso Neto**, **Mt3s**
(metros cúbicos) y **Peso Tara**.

## Seguros

- **Asegura Med Ambiente** / **Asegura Carga**: aseguradoras.
- **Poliza Med Ambiente** / **Poliza Carga**: números de póliza.
- **Valor Declarado**: valor de la mercancía asegurada.

## Partidas (conceptos de la factura)

Tabla con los conceptos que se facturan del viaje, botones **Agrega
Partida** y **Agrega Tarifa** (traer una tarifa ya definida en el catálogo
de Tarifas de Clientes). Columnas: **Concepto**, **ClaveP[rodServ]**
(típicamente **78101800**, Servicios de transporte de carga por carretera —
ver `51-catalogos-carta-porte.md`), **Cantidad**, **Precio**, **Subtotal**,
**IVAImp[uesto]**, **Retenci[ón]**, **Importe**.

Nota: la clave de producto/servicio de **Partidas** (el servicio que se
cobra, ej. "FLETE") es distinta de la clave de producto/servicio de
**Embalaje** (la mercancía física que se transporta, ej. "PIEDRA DE YESO A
GRANEL") — son dos catálogos de propósito distinto aunque ambos usen
`c_ClaveProdServ`.

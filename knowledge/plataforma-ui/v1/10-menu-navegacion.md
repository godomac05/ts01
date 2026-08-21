# Mapa del menú de navegación de la plataforma

## Cómo usar este mapa de menú

Este documento describe el menú lateral completo de la plataforma, para
poder indicarle a un usuario **en qué menú y submenú** encontrar un catálogo,
una consulta o un proceso. Convención de íconos del menú:

- 🔍 (lupa) + nombre con guion al inicio (ej. "-Clientes"): es una pantalla
  de **consulta/listado** de un catálogo (buscar, filtrar, ver registros
  existentes).
- ⚡ (rayo): es una pantalla de **acción o proceso** (crear, importar,
  generar, ejecutar algo), no solo consulta.
- Los triángulos (▲) son submenús que se expanden y contienen más opciones
  dentro.

Cuando un usuario pregunte "¿dónde encuentro/edito/doy de alta X?", usa este
mapa para indicarle la ruta exacta, con el formato: **Menú → Submenú →
Opción**.

## Menú principal

- **Inicio**
- **Videos Tutoriales**
- **Crear PreDocumento** (⚡ proceso): para generar un documento previo antes
  de la Carta Porte/factura final.
- **Importación Masiva** (submenú):
  - Importación Masiva Documentos (⚡)
  - Actualizar Registros Importados (⚡)
- **Resumen Documentos**

## Catálogo / Búsqueda

Submenú con la mayoría de los catálogos maestros de la plataforma (clientes,
unidades, operadores, usuarios, etc.). Todas estas son pantallas de consulta
(🔍) salvo las marcadas como proceso (⚡):

- Aseguradoras
- Clientes
- Tarifas de Clientes (⚡)
- Importar Clientes Destinos (⚡)
- Importar Clientes Tarifas (⚡)
- Traspaso Tarifas Clientes (⚡)
- Causas de Cancelación
- Estados
- Oficinas
- Operadores
- Operador Vencimientos
- País
- Rutas
- Unidades
- Unidades Vencimientos
- Unidades Clase
- Emisores
- Usuarios
- Matriz de Permisos Usuarios
- Sucursal
- Clientes Accesos Solicitud
- Busqueda Domicilios (⚡)

Las plantillas descargables de Clientes, Clientes Destino, Rutas y Unidades
(ver `40-plantillas-descargables.md`) corresponden a los catálogos
**Clientes**, **Importar Clientes Destinos**, **Rutas** y **Unidades** de
este submenú.

## Tráfico → Catálogos (generales)

- Conceptos Facturación
- Servicios
- Tipo de Cambio

## Tráfico → Catálogos Complemento CP

Estos catálogos corresponden directamente a los catálogos del SAT para el
Complemento Carta Porte documentados en `51-catalogos-carta-porte.md`:

- Clave Unidad Peso (`c_ClaveUnidad`)
- Config Autotransporte (`c_ConfigAutotransporte`)
- Sub Tipo Rem (`c_SubTipoRem`)
- Clave Prod Serv CP (`c_ClaveProdServ`)
- Material Peligroso (`c_MaterialPeligroso`)
- Tipo Embalaje (`c_TipoEmbalaje`)
- Colonias, Municipios, Localidades (catálogos geográficos)
- Fracción Arancelaria
- Registro ISTMO
- Condiciones Especiales
- Forma Farmaceutica
- Sector Cofepris
- Tipo Materia
- Regimen Aduanero
- Documento Aduanero
- Transporte

Si un usuario pregunta "¿dónde busco la clave de [config autotransporte /
tipo de embalaje / material peligroso / etc.]?", la respuesta es: **Tráfico
→ Catálogos Complemento CP → [nombre del catálogo]**.

## Tráfico → Cotizaciones

- Catálogos: Contenedores, Materiales
- Cotizaciones (⚡ proceso)
- -Cotizaciones (🔍 consulta)

## Tráfico → Solicitudes

- Solicitud de Servicio (⚡)
- Solicitudes x Atender
- -Solicitudes (🔍)
- Importar Solicitud (⚡)

La plantilla descargable de "Solicitud" (ver `40-plantillas-descargables.md`)
corresponde a **Importar Solicitud** en este submenú.

## Transfer

- Transfer (⚡)
- -Transfer (🔍)

## Viajes

- Viajes (vista tipo dashboard/mapa, ícono distinto a los demás)
- -Viajes (🔍 consulta general)
- Viajes por Terminar
- Viajes por Facturar
- Viajes por Liquidar
- Viajes Canceladas
- Viajes Detalle
- Viajes Resumen
- Viajes de Cobros
- Auditoria Folios → Folios Faltantes (⚠️ alerta/revisión)
- Importar CCPT (⚡)

La plantilla descargable "CCPT" (ver `40-plantillas-descargables.md`)
corresponde a **Importar CCPT** en este submenú.

## Manifiesto

- Manifiesto (⚡)
- -Manifiesto (🔍)

## Viajes Informes

- Viajes Informes (⚡)
- -Viajes Informes (🔍)
- Viajes Informes por Terminar
- Viajes Informes por Liquidar
- Viajes Informes Permisionario
- Viajes Informes Permisionario Detalle

## Gastos → Catálogos

- Estaciones
- Conceptos Liquidacion
- Combustible

## Gastos → Cargos Unidades

- Cargos Unidades (⚡)
- -Cargos Unidades (🔍)
- Cargos Impresión Masiva (⚡)
- Importar CSV (⚡)

La plantilla descargable "Cargos a Unidades" corresponde a este submenú.

## Gastos → Gastos y Préstamos

- Gastos: -Gastos, Gastos por Aplicar Transferencia, Gastos por Liquidar,
  Gastos Combustible, Rendimiento Según Vales
- Prestamos: -Prestamos, Prestamos por Aplicar Transferencia, Prestamos x
  Liquidar, Importar Cargas Combustible (⚡)

La plantilla descargable "Cargas de Combustible" corresponde a **Importar
Cargas Combustible** en este submenú (dentro de Préstamos, aunque el nombre
sugiera Gastos — es una particularidad de la interfaz actual).

## Facturación → Procesos

- Facturacion (⚡, pantalla principal de timbrado)
- -Facturacion (🔍)
- Facturas Canceladas
- Viajes en Facturas
- Facturas por Timbrar
- Facturas Timbradas
- Facturas Resumen
- Importar XML SAT (⚡)
- Folios Restantes
- Cancelar Facturas (⚡)
- Fecha Revisión
- Insertar dato CFDI Timbrado (⚡)
- Anexar Viajes (⚡)
- Importar Facturas Pedimento (⚡)
- Actualizar Facturas Importadas (⚡)

La plantilla descargable "Facturas de Pedimento" corresponde a **Importar
Facturas Pedimento** en este submenú.

## Facturación → Catálogos

Estos catálogos corresponden a los catálogos generales del SAT documentados
en `50-catalogos-cfdi-generales.md`:

- Conceptos Facturación
- UsoCFDI (`c_UsoCFDI`)
- Metodo Pago (`c_MetodoPago`)
- Forma Pago (`c_FormaPago`)
- Tipo de Cambio
- Tipo Pago
- Periodicidad
- Meses
- Régimen Fiscal (`c_RegimenFiscal`)

Si un usuario pregunta "¿dónde configuro/busco el uso de CFDI, la forma de
pago o el régimen fiscal?", la respuesta es: **Facturación → Catálogos →
[nombre del catálogo]**.

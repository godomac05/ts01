# Proceso: pantalla de Liquidaciones (liquidación de operador/unidad)

Pantalla dentro de **Liquidaciones → Liquidaciones**. Es distinta de la
pestaña "Liquidacion" que existe dentro de un Viaje individual (ver
`21-viajes-otras-pestanas.md`): aquí se liquida a un **operador/unidad por
un periodo completo** (puede agrupar varios viajes, gastos, IAVE,
mantenimientos, vales de almacén y compras de ese periodo), no solo un
viaje suelto.

## Liquidaciones por Operador (consulta)

La pantalla **-Liquidaciones x Operador** muestra el listado con columnas:
Operador, Folio (prefijo "LQ"), Fe[cha], Di[as] (laborados), Kms Inicial,
Kms Final, Rendimiento, Tot[al], Comision Operador, Estatus. Las filas
resaltadas en rojo/rosa suelen indicar liquidaciones con algún resultado en
cero o inconsistente que conviene revisar antes de confirmarlas.

## Barra de acciones del formulario de Liquidación

- **Crear Liquidacion**: inicia una liquidación nueva.
- **Procesar Liquidacion**: calcula/recalcula los totales de la
  liquidación con los datos capturados.
- **Agregar Viajes** / **Agregar Viajes Srv**: incorpora viajes (normales o
  de servicio) del periodo a esta liquidación.
- **Agregar Gastos**: agrega gastos sueltos.
- **Agregar Cargos Unidades**: trae cargos ya registrados en el catálogo
  de Cargos a Unidades (ver `11-menu-navegacion-2.md`).
- Menú desplegable (▼): Agrega Prestamos, Agrega Impuestos, Agrega
  Impuestos Nom[ina], Agrega IAVE, Agrega Caseta Sin IVA, Agrega Compras,
  Agrega Vales Almacen, Agrega Mantenimientos, Confirma Liquidaciones,
  Cambia Operador, Cambio Unidad, Trae Conceptos Gastos, Retirar Banco,
  Trae IAVE, Traer Gastos de Remisiones, Traer Datos, Impresion PDF,
  ImpresionOperador, Agregar Viaje Informe, Remover IAVE.

Pestañas del formulario: **Liquidaciones**, Viajes Liquidados, Gastos,
IAVE, Mantenimientos, Vales de Almacen, Evidencias, Compras, Viajes
Informe.

## Datos generales y de la unidad/operador

- **Estatus** (Proceso, etc.), **Documentador**, **Folio** (ej. LQ7),
  **Permisionario**, **Servicio**, **Fecha** (obligatoria), **Cuenta
  Bancaria**, **Emisor**.
- **Unidad**, **Placas**, **Operador**, **RFC**, **% Operador** (porcentaje
  de comisión), **Sueldo Diario**.
- **Desde** / **Hasta** y **Dias Laborados** (calculado): el periodo que
  cubre esta liquidación.
- **Kms Cargado**, **Kms Vacio**, **Recorridos**: kilometraje del periodo.

## Ingresos

Mismo desglose de costos que en Viajes/Factura — **Comision Descuentos**,
**Otros Descuentos**, **Flete**, **Seguro**, **Carga**, **Descarga**,
**Recoleccion**, **Repartos**, **Autopistas**, **Demoras**, **Otros** →
**Subtotal**, **Impuesto**, **Retenido**, **Total**; más **Peso**, **Mt3**
e **IVA** de referencia.

## Gastos con Vales

Dos columnas: **Depositos** (Casetas E, Depositos, Notas de Cargo,
Combustible con su Subtotal y Litros, Prestamos, Impuestos) y
**Mantenimientos** (Casetas E Subtotal, Almacen, Mantenimiento, Comb.
Subtotal).

## Comprobado Combustible

Desglose de combustible comprobado con vales/facturas, separado en
**Combustible** normal y **Combustible Thermo** (para el equipo de
refrigeración de la unidad, si aplica) — cada uno con Total, IVA, Subtotal
y Litros comprobados (Comb. Lts.).

## Conceptos Comprobado

Tabla con los gastos que el operador comprobó contra lo que se le
depositó: **Viaje**, **Concepto** (ej. ACEITES Y LUBRICANTES, ALIMENTOS,
CASETAS, LAVADO Y ENGRASADO, FEDERALES, ADUANA), **Deposito**,
**Autorizado**, **Diferencia**, con botones Editar/Remover. Al final se
totaliza Deposito, Autorizado y Diferencia — esta diferencia es la que
después se refleja en el bloque de Resultados como parte del "Total" a
favor o en contra del operador.

## Egreso y Resultados

- **Egreso** y **Diferencia** (Ingreso menos Egreso) como resumen rápido.
- **Resultados** (columna): Ingreso, Egreso, Diferencia, **Utilidad**,
  Comision Sueldo Diario, **Comision % Operador** (editable), casilla
  **Vales Salida**.
- **Gastos** (columna): Sueldo Operador, Depositos, Prestamos, Notas de
  Cargo, Combustible, IAVE, Casetas Sin IVA, Mantenimiento, Vales Salida,
  Compras, **Infonavit**, **ISR**, **IMSS** (estos tres editables — ver
  también la plantilla "Operadores - Impuestos" en
  `40-plantillas-descargables.md`), Cargos Unidad.
- **Resultado Operador** (columna): Recibio, Comprobo, Diferencia, Comb.
  Faltante, Comb.F Thermo, Comb.F Thermo2, Total, Sueldo, Operador,
  Impuestos — es el saldo final a favor o en contra del operador para el
  periodo liquidado.

## Diesel Tracto

Igual concepto que en la Liquidación por viaje (`21-viajes-otras-pestanas.md`),
pero acumulado para todo el periodo: Diesel Vale, Diesel Consumido
(editable), Diesel Comprobado, Total Diesel, Diesel ECM (lectura del
computador de la unidad, si aplica), Margen, Precio Litro (editable), Kms
Inicial/Final (editables), Kms Recorridos, Rendimiento, Diesel Descontar,
Total Descontar, y la casilla **Cobrar Combustible?** (si se le descuenta
al operador el faltante de combustible).

## Diesel Thermo y Diesel Thermo 2

Cuando la unidad lleva equipo de refrigeración (thermo), se agregan uno o
dos bloques adicionales idénticos entre sí — **Diesel Thermo** y **Diesel
Thermo 2** (para unidades con dos equipos thermo) — con la misma lógica que
Diesel Tracto pero medida en **horas de uso** en lugar de kilómetros, ya
que el motor del thermo no se mide por distancia recorrida:

- **Unidad Thermo**: catálogo del equipo de refrigeración específico.
- Diesel Vale, Diesel Consumido (editable), Diesel Comprobado, Total
  Diesel, Diesel ECM, Margen.
- **Horas Inicial** / **Horas Final** (editables), **Horas Recorridas**,
  **Rendimiento**.
- Precio Litro (editable), Diesel Descontar, Total Descontar.
- Casilla **Cobrar Combustible?** (Diesel Thermo) / **Cobrar Lts
  Operador?** (Diesel Thermo 2).

Estos alimentan los campos **Comb.F Thermo** y **Comb.F Thermo2** del
bloque de Resultado Operador ya descrito arriba.

## Pestaña Viajes Liquidados

Tabla de los viajes incluidos en esta liquidación (botón **Agregar
Nuevo**, con ayuda contextual **Help**): Viaje, Guia, R[uta], Flete,
Im[puesto], Re[tenido], Su[btotal], Total, T[ipo], C, C, con acciones
Editar (ícono de lápiz) y **Borrar**.

## Pestaña Gastos

- Tabla **Gastos**: V[er], Tipo (ej. Deposito), Ga[sto], Fol[io], Fe[cha],
  C, Su[btotal], Im[porte], C, Litros, con Ver/Editar/Borrar.
- **Cargos a Unidades**: tabla Folio, Creado, Comentarios, Importe — trae
  lo agregado con la acción "Agregar Cargos Unidades" de la barra
  superior.
- **Impuestos**: tabla Periodo, Importe.
- **Prestamos / Fianzas**: tabla Folio, Concepto, Importe.

## Pestaña IAVE

- Tabla **IAVE**: Codigo, Unidad, Fecha, Hora, Caseta, Clase, Impo[rte] —
  se llena con la acción "Trae IAVE" de la barra superior.
- Tabla **Casetas Sin IVA**: Codigo, Unidad, Fecha, Caseta, Clase, Importe
  — para casetas que no desglosan IVA en su comprobante.

## Pestaña Mantenimientos

Tabla simple: Ma[ntenimiento], Fe[cha], Im[porte], Comentarios — se llena
con la acción "Agrega Mantenimientos" de la barra superior, y se relaciona
con el catálogo de Mantenimientos (ver `11-menu-navegacion-2.md`).

## Pestaña Vales de Almacen

Tabla simple: Vale, Fe[cha], Im[porte], Comentario — se llena con la acción
"Agrega Vales Almacen" de la barra superior.

## Pestaña Evidencias

A diferencia de la pestaña Evidencias de Viajes/Factura/Abonos (que es una
bitácora de archivos), aquí es un panel de **carga y autorización** de la
liquidación:

- **Escaneo**: zona para seleccionar o arrastrar el archivo escaneado de
  soporte de la liquidación.
- **Adjunto** y **Adjuntado**: nombre/fecha del archivo ya adjuntado.
- Panel de autorización con dos firmas: **Gerencia** y **Aut.
  Liquidaciones**, cada una con su campo **Autorizado** — es decir, la
  liquidación requiere la autorización de ambas partes antes de
  considerarse aprobada.

## Pestaña Compras

Tabla: Compra (folio), Fecha, Prove[edor], Come[ntario], Subtotal,
Impuesto, Total, con Editar/Borrar — compras cargadas a esta liquidación
(ej. refacciones, insumos comprados durante el periodo), relacionado con
el módulo de Compras (ver `11-menu-navegacion-2.md`).

## Pestaña Viajes Informe

Tabla "Folio Sub Viaje" con columna **Viaje Informe** — viajes de tipo
informe (sin facturación propia, solo para llevar registro) incluidos en
la liquidación, alimentada por la acción "Agregar Viaje Informe" de la
barra superior.

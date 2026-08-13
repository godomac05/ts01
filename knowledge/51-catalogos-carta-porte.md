# Catálogos del SAT específicos de Carta Porte

Complementa a `50-catalogos-cfdi-generales.md`. Estos catálogos son propios
del Complemento Carta Porte (Anexo 20, catálogos de Carta Porte). Los que
tienen pocos valores se listan completos; los que son muy extensos
(c_ClaveProdServ, c_ClaveUnidad, c_MaterialPeligroso, catálogos geográficos)
solo incluyen las claves más usadas en logística de carga.

## Catálogo c_TipoPermiso (permisos SCT/ATFyM)

| Clave  | Descripción |
| ------ | ----------- |
| TPAF01 | Autotransporte Federal de Carga General |
| TPAF02 | Transporte Privado de Carga |
| TPAF03 | Autotransporte Federal de Carga Especializada de Materiales y Residuos Peligrosos |
| TPAF04 | Transporte Privado de Materiales y Residuos Peligrosos |
| TPAF05 | Autotransporte Federal de Carga de Gran Peso y/o Volumen (más de 30 hasta 50 Ton) |
| TPAF06 | Transporte Privado de Carga de Gran Peso y/o Volumen (más de 30 hasta 50 Ton) |
| TPAF07 | Autotransporte Federal de Carga de Gran Peso y/o Volumen (más de 50 hasta 66 Ton) |
| TPAF08 | Transporte Privado de Carga de Gran Peso y/o Volumen (más de 50 hasta 66 Ton) |
| TPAF09 | Autotransporte Federal de Carga de Gran Peso y/o Volumen, Doble Semirremolque (más de 66 hasta 90 Ton) |
| TPAF10 | Transporte Privado de Carga de Gran Peso y/o Volumen, Doble Semirremolque (más de 66 hasta 90 Ton) |
| TPAF11 | Autotransporte Internacional de Carga de Largo Recorrido |
| TPAF12 | Transporte Internacional de Carga de Largo Recorrido |

**⚠️ Nota de confianza:** este catálogo ha tenido ajustes y ampliaciones por
parte de la autoridad en distintos años (se han agregado claves para grúas,
objetos voluminosos, etc.). Antes de capturar un permiso poco común,
verifica la clave exacta contra el catálogo vigente en el portal del SAT.

## Catálogo c_ConfigAutotransporte

Usa las mismas claves de nomenclatura vehicular ya descritas en
`21-carta-porte-autotransporte.md` (C2, C3, T3S2, etc.), más estas
adicionales del catálogo del SAT:

| Clave    | Descripción |
| -------- | ----------- |
| VL       | Vehículo ligero de carga (2 ejes, hasta 3 toneladas) |
| C2, C3   | Camión unitario (2 y 3 ejes) |
| C2R2, C3R2, C2R3, C3R3 | Camión-remolque |
| T2S1, T2S2, T2S3, T3S1, T3S2, T3S3 | Tractocamión articulado |
| T2S1R2, T2S1R3, T2S2R2, T3S1R2, T3S1R3, T3S2R2, T3S2R3, T3S2R4 | Tractocamión articulado con remolque |
| T2S2S2, T3S2S2, T3S3S2 | Tractocamión doblemente articulado |
| OTROEXT  | Otro tipo de configuración vehicular no listada (excepcional) |

## Catálogo c_SubTipoRem (subtipo de remolque/semirremolque)

Valores orientativos más frecuentes (esquema `CTRxxx`):

| Clave  | Descripción |
| ------ | ----------- |
| CTR001 | Caja |
| CTR004 | Caja seca |
| CTR002 | Caja refrigerada |
| CTR017 | Plataforma |
| CTR019 | Redilas |
| CTR023 | Tanque |
| CTR024 | Tolva |
| CTR025 | Volteo |
| CTR007 | Chasis portacontenedor |
| CTR014 | Jaula |

**⚠️ Nota de confianza:** esta tabla es orientativa (los valores más comunes
en la práctica del sector). El catálogo completo del SAT tiene alrededor de
25-30 claves; si necesitas una que no esté aquí, confírmala contra el
catálogo oficial antes de usarla en un comprobante real.

## Catálogo c_TipoEmbalaje (claves más comunes, basado en códigos ONU)

| Clave | Descripción |
| ----- | ----------- |
| 4G    | Caja de cartón |
| 4C1   | Caja de madera natural ordinaria |
| 4D    | Caja de contrachapado |
| 4H2   | Caja de plástico rígido |
| 1A2   | Bidón/tambor de acero, tapa desmontable |
| 1H2   | Bidón/tambor de plástico, tapa desmontable |
| 3H1   | Jerricán de plástico, tapa no desmontable |
| 5H1   | Saco de tejido de plástico |
| 5M1   | Saco de papel de varias hojas |
| 6HA1  | Envase compuesto, recipiente de plástico |
| ZZ    | Sin embalaje / a granel |

**⚠️ Nota de confianza:** el catálogo completo del SAT (basado en las
recomendaciones de la ONU para embalajes) tiene más de 60 claves. Esta es
una selección de las más usadas; verifica la clave exacta en el catálogo
oficial si tu mercancía no encaja claramente en alguna de estas.

## Catálogo c_ClaveUnidad (unidades más usadas en Carta Porte)

| Clave | Descripción |
| ----- | ----------- |
| KGM   | Kilogramo |
| TNE   | Tonelada métrica |
| GRM   | Gramo |
| LTR   | Litro |
| MTQ   | Metro cúbico |
| MTR   | Metro |
| H87   | Pieza |
| XBX   | Caja |
| XPK   | Paquete |
| XBG   | Bolsa |
| XDR   | Tambor |
| XPL   | Tarima / Paleta |
| XCN   | Contenedor |
| E48   | Unidad de servicio |
| ACT   | Actividad |

El campo "peso en kilogramos" del complemento Carta Porte siempre se declara
en kg independientemente de la unidad de medida de la mercancía, así que
**KGM** casi siempre debe coincidir con ese dato.

## Claves de c_ClaveProdServ más usadas para transporte de carga

El catálogo completo tiene más de 52,000 claves (8 dígitos). Las más
relevantes para describir el **servicio de transporte** (no la mercancía
transportada, que lleva su propia clave de producto) suelen estar en el
segmento 78 (Servicios de Transporte, Almacenaje y Correo):

| Clave    | Descripción aproximada |
| -------- | ----------------------- |
| 78101800 | Servicios de transporte de carga por carretera |
| 78101700 | Servicios de transporte por ferrocarril |
| 78102200 | Servicios de transporte marítimo y por vías navegables interiores |
| 78111800 | Servicios de transporte aéreo de carga |
| 78121600 | Servicios de mensajería |

**⚠️ Nota de confianza:** estas son claves orientativas del segmento de
transporte; para la clave exacta de 8 dígitos que corresponda a tu servicio
específico (o a la mercancía que transportas, que usa una clave totalmente
distinta del catálogo de productos), usa el buscador de claves de producto/
servicio del SAT o el buscador integrado en la plataforma.

## Materiales y residuos peligrosos (c_MaterialPeligroso)

Este catálogo tiene varios cientos de claves (basadas en la clasificación de
la ONU para el transporte de sustancias peligrosas) y no se incluye aquí por
su tamaño. Si transportas materiales o residuos peligrosos, la clave exacta
del material (y su clase de riesgo asociada) debe buscarse en el catálogo
oficial del SAT — declarar una clase de riesgo incorrecta puede generar
observaciones serias, así que no debe adivinarse ni aproximarse.

## Catálogos geográficos y de otros medios de transporte

Códigos postales, colonias, municipios y países (usados en las
"Ubicaciones" del complemento) y los catálogos específicos de transporte
marítimo/aéreo/ferroviario (tipo de embarcación, tipo de estación, etc., ver
`22-carta-porte-otros-medios.md`) tampoco se incluyen aquí por su tamaño o
por ser de uso poco frecuente. Para esos casos, usa el buscador de catálogos
del portal del SAT.

## Nota general de vigencia

Todos los catálogos de esta base de conocimiento reflejan el estado general
del Anexo 20 y sus catálogos de Carta Porte a inicios de 2026, con base en
conocimiento general y no en una consulta en tiempo real al SAT. El SAT
actualiza estos catálogos con cierta frecuencia (altas, bajas y ajustes de
claves). Antes de usar una clave en un comprobante real, especialmente en
catálogos donde se marcó una nota de confianza baja arriba, verifícala en el
portal del SAT o en el buscador de catálogos integrado en la plataforma.

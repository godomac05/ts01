# Número de pedimento aduanal

## Qué es

El "pedimento" es el documento aduanero que ampara la importación o
exportación legal de mercancías en México ante el SAT/Aduanas. Aparece
referenciado en el CFDI cuando la mercancía facturada proviene de una
operación de comercio exterior (ver también la plantilla "Facturas de
Pedimento" en `40-plantillas-descargables.md` y el catálogo "Documento
Aduanero" / "Regimen Aduanero" en `11-menu-navegacion-2.md`).

## Estructura del número de pedimento (15 dígitos)

| Posición | Dígitos | Significado |
| -------- | ------- | ----------- |
| 1-2      | 2       | Año (últimos 2 dígitos del año en que se procesó) |
| 3-4      | 2       | Clave de la Aduana |
| 5-8      | 4       | Patente del agente/agencia aduanal |
| 9-15     | 7       | Folio progresivo asignado por la aduana ese año |

Ejemplo de formato (sin que sea necesariamente un pedimento real):
`26 01 3456 0001234` → año 2026, aduana 01, patente 3456, folio 0001234.

## Validación automática del bot (por WhatsApp)

Si un usuario menciona la palabra "pedimento" junto con una secuencia de 15
dígitos, el bot valida automáticamente que tenga la **estructura correcta**
(15 dígitos, año/aduana/patente/folio no obviamente inválidos) — esto
detecta errores de captura comunes (dígitos de más/menos, folio en ceros).

**Importante:** esta validación es solo de formato, hecha localmente sin
consultar ningún sistema externo. **No confirma que el pedimento exista
realmente** en los sistemas del SAT/Aduanas — para eso hay que consultarlo
en el portal oficial del SAT. Si un usuario pregunta si su pedimento "es
válido" en el sentido de que sí fue procesado por la aduana, aclara esta
diferencia y recomienda la consulta oficial.

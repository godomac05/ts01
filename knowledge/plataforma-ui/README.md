# Conocimiento versionado de la interfaz/proceso de la plataforma

Esta carpeta es para documentar **cómo se ve y cómo se usa la plataforma
hoy** (pantallas, menús, botones, pasos concretos), a partir de capturas de
pantalla que se le compartan a Claude. Es distinta del resto de
`knowledge/`, que documenta reglas generales de CFDI/Carta Porte/SAT que no
cambian aunque la interfaz de la plataforma se rediseñe.

**Este archivo README no se carga al bot** (el loader solo lee `.md` dentro
de una carpeta de versión, no en la raíz de `plataforma-ui/`).

## Por qué está versionado

Cuando la plataforma tiene un cambio grande de interfaz (rediseño de un
módulo, pasos nuevos, botones que cambian de lugar), la documentación vieja
deja de ser precisa. En lugar de editar encima y perder el historial, cada
"versión" de la interfaz vive en su propia carpeta:

```
knowledge/plataforma-ui/
  v1/   <- versión actual (activa)
  v2/   <- futura versión, cuando exista
```

El bot **solo carga la carpeta de la versión activa**, definida por la
variable de entorno `PLATFORM_UI_VERSION` en `.env` (por defecto `v1`).

## Cómo agregar contenido a la versión activa

1. Comparte con Claude las capturas de pantalla de la plataforma (menús,
   formularios, flujos, botones).
2. Claude transcribe esa información a uno o más archivos `.md` dentro de
   `plataforma-ui/v1/` (o la versión activa), usando `##` para dividir en
   secciones, igual que el resto del knowledge base.
3. Reinicia el bot para que tome el contenido nuevo.

## Cómo dar de alta una versión nueva (cuando la plataforma cambia mucho)

1. Crea la carpeta `plataforma-ui/v2/` (o el número que siga) y documenta
   ahí la interfaz nueva, igual que en el paso anterior.
2. Cambia `PLATFORM_UI_VERSION=v2` en tu `.env`.
3. Reinicia el bot. Automáticamente deja de usar el contenido de `v1/` y
   empieza a usar `v2/` — no hace falta borrar nada, `v1/` queda como
   referencia histórica en el repositorio.

Si en algún punto quieres que el bot use más de una versión a la vez (por
ejemplo, durante una migración donde conviven dos versiones de la
plataforma), avísale a Claude para ajustar `PLATFORM_UI_VERSION` a una lista
en lugar de un solo valor — hoy soporta una sola versión activa a la vez.

# Carta Porte: transporte de carga por autotransporte federal

## Cuándo aplica

Aplica cuando la mercancía se traslada por carretera y el trayecto transcurre,
total o parcialmente, por **vías generales de comunicación de jurisdicción
federal** (carreteras federales que conectan dos o más entidades federativas,
o que cruzan fronteras). Si el traslado es exclusivamente dentro de una misma
zona metropolitana o municipio usando calles locales, puede aplicar el
esquema de "transporte local" en lugar del Carta Porte federal completo.

## Datos obligatorios del bloque "Autotransporte Federal"

- **Permiso SCT/ATFyM**: tipo de permiso otorgado por la Secretaría de
  Infraestructura, Comunicaciones y Transportes (antes SCT, ahora a través de
  la Agencia de Transporte Ferroviario y Multimodal u organismo
  correspondiente) y su número. Ejemplos de tipo de permiso: autotransporte
  federal de carga general, materiales o residuos peligrosos, doble
  remolque, etc.
- **Datos del vehículo**: configuración vehicular (por ejemplo, C2, C3, T3S2,
  etc., conforme al catálogo del SAT), placa (matrícula del vehículo), año y
  modelo.
- **Aseguradora**: nombre o razón social de la aseguradora que cubre la
  responsabilidad civil por daños a terceros, y el número de póliza.
- **Remolque(s)**: si aplica, subtipo de remolque y placa de cada uno
  (pueden ser hasta dos remolques, según la configuración vehicular).

## Figura de transporte en autotransporte

En el autotransporte, normalmente se identifican estas figuras:

- **Operador**: quien conduce el vehículo. Se requiere su RFC (o RFC
  genérico para extranjeros), nombre y **número de licencia federal
  vigente**.
- **Propietario del vehículo**: si es distinto de quien emite el CFDI.
- **Arrendatario/Arrendador**: cuando el vehículo se usa bajo un contrato de
  arrendamiento.
- **Notificado**: en algunos casos, un tercero que debe ser notificado del
  traslado (por ejemplo, en operaciones de comercio exterior).

## Materiales y residuos peligrosos

Si la mercancía transportada es un material o residuo peligroso, es
obligatorio declarar:

- La clave de material peligroso conforme al catálogo del SAT (basado en las
  claves de la SCT/Secretaría de Comunicaciones y Transportes y normas de la
  ONU para el transporte de sustancias peligrosas).
- El tipo de embalaje utilizado.
- Documentación adicional que puede exigir la normatividad de transporte de
  materiales peligrosos (permisos específicos, señalización del vehículo,
  etc.), que va más allá del propio CFDI.

## Errores frecuentes específicos de autotransporte

- Usar una clave de configuración vehicular que no corresponde al tipo de
  vehículo declarado.
- Omitir el número de licencia del operador o capturar una licencia vencida.
- No actualizar el número de póliza de seguro cuando cambia de aseguradora.
- Registrar una distancia recorrida en kilómetros que no corresponde a la
  ruta real entre las ubicaciones declaradas (el SAT valida coherencia
  geográfica).

Estas reglas dependen de catálogos del SAT que se actualizan periódicamente
(claves de configuración vehicular, tipos de permiso, materiales peligrosos).
Verifica siempre contra el catálogo vigente antes de capturar la información.

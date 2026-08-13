# Errores comunes de validación en Carta Porte

## Errores de ubicaciones

- **Código postal inválido o inexistente** en el catálogo del SAT para el
  domicilio declarado.
- **RFC del remitente o destinatario no coincide** con el registrado en el
  SAT (nombre, régimen fiscal), cuando la ubicación es de tipo Origen o
  Destino y requiere RFC.
- **Fechas de salida/llegada incoherentes**: por ejemplo, fecha de llegada
  anterior a la fecha de salida, o fuera del rango permitido respecto a la
  fecha de timbrado.

## Errores de mercancías

- **Clave de producto/servicio (ClaveProdServ) que no corresponde** a la
  descripción de la mercancía.
- **Peso en kilogramos no declarado o en cero**, cuando el campo es
  obligatorio para el tipo de mercancía.
- **Falta declarar material peligroso** cuando la descripción o clave de
  producto indica que la mercancía lo es (el SAT valida cruces entre ciertas
  claves y la obligación de declarar el material como peligroso).

## Errores de autotransporte

- **Permiso SCT vencido o inexistente** en el padrón correspondiente.
- **Configuración vehicular incompatible** con el número de remolques
  declarados.
- **Placa con formato inválido** (longitud o caracteres no permitidos).

## Errores de figura de transporte

- **Licencia del operador vencida** o con un tipo de licencia que no
  corresponde a la configuración vehicular (por ejemplo, se requiere una
  licencia federal de tipo específico para ciertas configuraciones).
- **RFC de la figura de transporte no registrado** o inactivo ante el SAT.

## Errores de distancia recorrida

- El SAT valida que la distancia declarada sea consistente con la distancia
  real entre las ubicaciones de origen y destino declaradas (dentro de un
  margen de tolerancia). Una distancia de cero o claramente incoherente
  genera rechazo.

## Recomendaciones generales para evitar rechazos

1. Verificar el RFC de todas las partes (emisor, receptor, figuras de
   transporte) contra el servicio de validación del SAT antes de timbrar.
2. Mantener actualizados los catálogos de la plataforma (claves de producto,
   configuración vehicular, materiales peligrosos, códigos postales) contra
   la versión más reciente publicada por el SAT.
3. Revisar el mensaje de error específico que regresa el PAC, ya que suele
   incluir el código de error y el campo exacto que falló — es la forma más
   rápida de diagnosticar el problema.

Si el usuario reporta un error puntual con un mensaje específico del PAC o de
la plataforma, y no corresponde a los descritos aquí, sugiere que comparta el
texto exacto del error para poder orientarlo mejor, o que contacte a soporte
humano si el bot no puede identificar la causa.

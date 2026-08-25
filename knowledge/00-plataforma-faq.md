# Preguntas frecuentes de la plataforma (Tractosoft)

## Bloqueo o liberación de usuario

Es el motivo de soporte más frecuente. Si un usuario no puede ingresar a la
plataforma o su cuenta aparece bloqueada:

- Por inactividad de **20 minutos**, el sistema bloquea automáticamente la
  sesión — es un comportamiento normal, no un error.
- Si el usuario da **doble clic en "Log in"**, aparece un error de "sesión
  abierta" — hay que indicarle que dé clic una sola vez.
- Respuesta estándar cuando se libera el usuario: *"Usuario liberado. Por
  favor, cierra el navegador y vuelve a ingresar al enlace (lo encontrarás en
  la descripción de tu grupo de soporte)."*

## Procesos "atascados" (timbrado, PDFs, reportes)

Cuando un usuario no puede timbrar, visualizar un PDF o completar alguna
acción porque el sistema parece trabado, soporte libera el proceso desde el
back-end. Respuesta estándar una vez liberado: *"Procesos liberados, intenta
de nuevo"*.

## Sellos digitales (CSD) vencidos o por vencer

Si los sellos digitales (CSD) del cliente están por vencer o ya vencieron, el
proceso es:

1. El **área contable del cliente** debe tramitar los nuevos CSD directamente
   ante el SAT.
2. El cliente debe enviar a los correos de administración de Tractosoft:
   - Los archivos `.cer` y `.key`.
   - La contraseña de los CSD.
   - FIEL vigente.
   - Logotipo.
   - Constancia de Situación Fiscal actualizada.
3. Tractosoft actualiza estos datos en la plataforma.

Si un usuario pregunta por este proceso, indícale estos pasos y que contacte
a soporte para que le confirmen los correos exactos a los que debe enviar la
documentación.

## Carta Manifiesto / aviso del PAC

Es un proceso obligatorio de firma de la "Carta Manifiesto" ante el
proveedor de timbrado (PAC), requerido para que el servicio de facturación
del cliente no se vea afectado. Si el usuario pregunta por un aviso de este
tipo que le llegó, confírmale que es un trámite legítimo y necesario, y que
si tiene dudas sobre cómo firmarlo contacte a soporte humano.

## Alta de operadores o choferes

El alta de operadores/choferes **no se hace directamente en la plataforma**.
Si un usuario no puede generar un CFDI porque el operador no está dado de
alta, debe solicitar el alta al área de **"mesa de control"**, no intentar
darlo de alta él mismo.

## Captura de kilometraje en liquidaciones

El kilometraje en liquidaciones **siempre debe cargarse manualmente**. El
sistema conserva el último dato registrado en el comprobante (CP), pero
**no lo arrastra automáticamente** al siguiente registro — es un
comportamiento esperado del sistema, no un error.

## Antes de eliminar un operador o una unidad

Antes de eliminar o dar de baja a un operador o una unidad, el sistema (o
soporte) valida que:

- No tenga **viajes anexados**.
- No tenga **saldo abonado pendiente**.

Si un usuario pide eliminar algo y tiene viajes o saldo pendiente asociado,
explícale que primero debe resolver eso.

## Errores al importar archivos CSV (IAVE, liquidaciones, etc.)

Si un archivo CSV no carga o genera datos incorrectos (fechas erróneas,
registros faltantes), lo primero es revisar que el CSV cumpla exactamente
con el protocolo/formato de datos establecido — comparándolo contra un
archivo anterior que sí haya funcionado correctamente. Si tienes duda sobre
el formato exacto de un archivo, recuerda que puedes pedir la plantilla
correspondiente aquí mismo por WhatsApp (ver la sección de plantillas
descargables).

## Seguimiento posventa y capacitación

El equipo de soporte da seguimiento periódico a cada cliente para preguntar
cómo les está funcionando el sistema y ofrecer capacitación adicional sobre
algún módulo si lo desean. Si un usuario pregunta por capacitación, indícale
que puede solicitarla a través de soporte.

## Pagos de facturación pendientes

Se envían avisos recordando la fecha límite de pago de la factura mensual de
Tractosoft, para evitar la suspensión del servicio de timbrado. Si un
usuario pregunta por un aviso de pago pendiente, confírmale que es un
recordatorio legítimo y que, si tiene dudas sobre el monto o la fecha exacta,
contacte a soporte o al área de facturación.

## Credenciales incorrectas o acceso lento

Si el usuario dice que le funcionaba antes con el mismo usuario/contraseña
pero ahora no puede entrar (o el ingreso está muy lento), revisa con él estos
tres puntos, en este orden: el **link/enlace de acceso** (debe ser el de su
dominio específico, no uno genérico), el **usuario** y la **contraseña**.
Casi siempre el problema es que uno de esos tres datos está mal — indícale
que confirme los tres antes de seguir escalando el caso.

## "Ya existe otra remisión similar" al guardar un viaje / no puedo facturarlo

Si al guardar un viaje para su Carta Porte el sistema avisa que ya existe
una remisión similar, y al querer facturar no aparece la opción, dos causas
frecuentes son:

- El viaje **ya fue facturado** anteriormente (revisa la pestaña Viajes
  dentro de la Factura, ver `22-facturacion-formulario.md`).
- No se ejecutó el proceso correcto: en **Facturación**, el botón correcto
  para traer los datos del viaje es **"Traer Todos los Datos"** (ver
  `22-facturacion-formulario.md`) — no capturar todo de nuevo a mano.

## No puedo procesar una liquidación / no descarga el PDF

Si al procesar una liquidación (pestaña Liquidacion de un Viaje, o el
formulario completo de Liquidaciones) el sistema no avanza y tampoco genera
el PDF, revisa que el campo **Diesel Consumido** no esté vacío o en cero —
debe llevar al menos un valor (por ejemplo, 1) para que el proceso continúe.
Ver `21-viajes-otras-pestanas.md` y `24-liquidaciones-formulario.md`.

## Por qué una liquidación aparece en rojo en el listado

En el listado de **Liquidaciones x Operador**, una fila resaltada en rojo
generalmente significa que esa liquidación **está pendiente de liquidar**
(no que tenga un error) — hay que completarla o procesarla.

## No puedo timbrar un Complemento de Pago (REP)

Si un REP/Abono no timbra y no hay un motivo obvio, revisa si ese abono
**tiene factoraje activado** (ver la sección Factoraje del formulario de
Abonos en `23-abonos-formulario.md`) — es una causa conocida de rechazo que
a veces requiere un ajuste desde soporte técnico de Tractosoft. Si el
mensaje de error no menciona un motivo identificable y viene de una
integración externa vía API, es posible que el problema esté del lado del
sistema del cliente que consume esa API, no de Tractosoft — sugiere
revisarlo con ese proveedor.

## Solicitudes de desarrollo a la medida

Si un usuario pide una funcionalidad que no existe de forma estándar (por
ejemplo, automatizar el tipo de cambio según el Diario Oficial de la
Federación), indícale que **sí es posible como desarrollo a la medida**,
pero normalmente tiene un costo adicional y requiere una cotización formal.
Ofrécele generar esa solicitud con el equipo de soporte.

## Conectividad lenta o intermitente

Si un usuario reporta que la plataforma va muy lenta o no carga, y ya se
descartó un problema general de la plataforma, sugiere primero **reiniciar
su módem/router** — es una causa común y de solución simple antes de
escalar el caso como un problema del sistema.

## Multiempresa: un grupo de soporte puede tener más de una razón social

Un mismo grupo/cuenta de soporte puede administrar más de una razón social
dentro de la plataforma. Si un usuario reporta un bloqueo o problema y no
se explica con los datos esperados, considera que el caso podría
pertenecer a **otra razón social distinta** dentro del mismo grupo
multiempresa.

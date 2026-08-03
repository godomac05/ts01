# Carta Porte: transporte marítimo, aéreo y ferroviario

El Complemento Carta Porte incluye bloques específicos según el medio de
transporte utilizado. Además del bloque general de ubicaciones y mercancías
(ver `20-carta-porte-general.md`), cada medio agrega su propio subcomplemento.

## Transporte marítimo

Aplica cuando la mercancía se traslada por embarcaciones (cabotaje entre
puertos nacionales, o el tramo nacional de una operación internacional).
Datos relevantes que se capturan:

- Nombre de la embarcación y su matrícula/número OMI.
- Tipo de embarcación (carga general, contenedor, granelero, etc.).
- Puerto de origen y puerto de destino (además de las ubicaciones generales
  del complemento).
- Número de permiso o concesión otorgado por la autoridad marítima.
- Contenedor(es): número de contenedor, tipo, y si aplica, si va en tránsito
  o consolidado con otros embarques.

## Transporte aéreo

Aplica al traslado de mercancías por vía aérea. Datos relevantes:

- Matrícula de la aeronave.
- Número de permiso otorgado por la autoridad aeronáutica (AFAC u organismo
  correspondiente).
- Número de guía aérea (Master Air Waybill / House Air Waybill) cuando
  aplica.
- Aeropuerto de origen y de destino.

## Transporte ferroviario

Aplica al traslado de mercancías por ferrocarril. Datos relevantes:

- Nombre de la empresa ferroviaria (concesionaria).
- Tipo de servicio (arrastre, terminal, etc.).
- Número de carro(s) de ferrocarril y tipo (góndola, tolva, plataforma,
  contenedor, etc.).
- Derechos de paso, cuando la operación involucra a más de una empresa
  ferroviaria en el trayecto.

## Consideraciones generales para estos tres medios

- Igual que en autotransporte, se debe declarar la o las figuras de
  transporte relevantes (operador, propietario, etc.) según el medio.
- Cuando el traslado combina más de un medio (por ejemplo, tramo marítimo +
  tramo terrestre hasta el destino final), se conoce como transporte
  **multimodal**, y cada tramo puede requerir su propio complemento o
  sección dentro del mismo CFDI, dependiendo de quién es responsable de cada
  tramo.
- Las claves de puertos, aeropuertos y demás catálogos (país, aduana,
  colonia, etc.) provienen de los catálogos oficiales del SAT (Anexo 20) y se
  actualizan periódicamente.

**Nota:** estos tres medios son menos frecuentes que el autotransporte en la
mayoría de las plataformas de timbrado, y sus catálogos y validaciones
específicas cambian con cierta frecuencia. Si tu plataforma soporta alguno de
estos medios, se recomienda complementar este documento con la guía de
llenado específica y vigente del SAT para ese medio de transporte.

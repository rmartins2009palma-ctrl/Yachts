# Palma Marine Electric & Electronics: rediseño web

Nueva versión de https://www.palmamarine.es/palma-marine-electric-electronics-esp.html con un estilo moderno inspirado en https://nauti-parts.com/es: franja de avisos, cabecera fija translúcida, portada a sangre, tarjetas en paralelogramo, bandas con corte diagonal y botones biselados en oro.

Todo el contenido (servicios, marcas, contacto, horario e imágenes) procede de la web actual de Palma Marine.

## Estructura

- `index.html`: página única en español, con SEO (meta description, Open Graph y datos estructurados LocalBusiness).
- `css/styles.css`: estilos y tokens de color y tipografía (Barlow Condensed y Barlow, de Google Fonts).
- `js/main.js`: menú móvil, pestañas de servicios accesibles, botón para copiar el email y formulario que prepara un correo a info@palmamarine.es.
- `assets/img/`: imágenes originales optimizadas en WebP.

## Verlo en local

```bash
python3 -m http.server 8000
```

Después abre http://localhost:8000.

## Pendiente de decidir

- El formulario abre el programa de correo del visitante (mailto). Para recibir los mensajes directamente hace falta un servicio de formularios (Formspree, Netlify Forms o un backend propio).
- La web original tenía banderas EN, DE y RU sin enlace. Faltan los textos traducidos para añadir el selector de idioma.
- Se ha quitado el aviso de METS TRADE 2022 por estar desactualizado.
- La dirección exacta del taller no aparece en la web actual. El enlace al mapa apunta a Palma de Mallorca en general.

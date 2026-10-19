# De Idea a Corto

Landing responsive del curso para crear cortometrajes con inteligencia artificial. Incluye la VSL, compra en Hotmart, seis episodios de muestra y el diseño original adaptado a PC y móviles.

[Ver la landing pública](https://de-idea-a-corto.gentleisle66.chatgpt.site/)

## Archivos

- `index.html`: contenido, reproductor y enlaces.
- `styles.css`: diseño responsive, tarjetas y animaciones.
- `landing.js`: interacción de las tarjetas, pausa de la cinta y reproductor.
- `config.js`: enlaces principales de VSL y Hotmart.
- `assets/vsl.jpg`: arte original utilizado en la página.
- `tiendup/`: versiones HTML y TXT para copiar el bloque completo en Tiendup.

No necesita instalación de paquetes ni compilación. La VSL, los episodios y las fuentes de Google requieren conexión a Internet.

## Enlaces

- [VSL](https://youtu.be/sUT9b-HiK-k)
- [Compra en Hotmart](https://go.hotmart.com/B107939959B?dp=1)
- Episodios: [1](https://www.youtube.com/watch?v=vVW4ltgl_GE) · [2](https://www.youtube.com/watch?v=fnMbAnjjZWI) · [3](https://www.youtube.com/watch?v=9QU0W7egCN0) · [4](https://www.youtube.com/watch?v=-L56uhvU64A&t=26s) · [5](https://www.youtube.com/watch?v=Z7u0LS8aNiQ&t=2s) · [6](https://www.youtube.com/watch?v=R2ktjQ_1ixg&t=16s).

Para cambiar VSL o Hotmart, edita `config.js` y sus enlaces iniciales en `index.html`. Las exportaciones de `tiendup/` son copias independientes: actualiza también sus enlaces cuando corresponda.

## Ver en tu equipo

Desde la carpeta del proyecto, con Python 3 instalado:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Abre [http://127.0.0.1:8000](http://127.0.0.1:8000). Para detener el servidor, pulsa `Ctrl+C`.

## Interacciones

Las cuatro tarjetas se elevan al pasar el puntero o recibir foco de teclado. Un clic o toque fija la elevación de una tarjeta; otro la desactiva. La cinta de etapas se desplaza en un bucle continuo y tiene un control para pausar o reanudar. Las animaciones respetan la preferencia de movimiento reducido del dispositivo.

Los seis episodios abren sus videos en otra pestaña. Los botones de compra llevan a Hotmart. El segundo recuadro rojo, en «Ahora descubre el detrás de cámaras», está reservado: falta proporcionar el video correspondiente.

## Alojamiento

El repositorio guarda el código fuente; la landing pública se mantiene en el enlace indicado arriba. Para usar otro alojamiento que admita páginas comerciales estáticas, sube `index.html`, `styles.css`, `landing.js`, `config.js` y la carpeta `assets/`, conservando sus rutas. No requiere proceso de compilación.

## Usar en Tiendup

Copia todo el contenido de `tiendup/de-idea-a-corto-tiendup.html` o de su versión `.txt` en un bloque de código HTML de ancho completo. Ambas versiones contienen el mismo bloque.

Estas exportaciones cargan el arte desde la dirección pública del sitio original; la página principal de este repositorio usa `assets/vsl.jpg`. Si cambias el alojamiento de las imágenes, actualiza la URL del arte en ambas exportaciones Tiendup.

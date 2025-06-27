# Game of Life JS

Este proyecto es una implementación en JavaScript del famoso autómata celular "Game of Life" de John Conway.

## Descripción

El [Juego de la Vida ](https://es.wikipedia.org/wiki/Juego_de_la_vida)es un autómata celular ideado por el matemático británico John Horton Conway en 1970. Es un juego de cero jugadores, lo que significa que su evolución está determinada por su estado inicial, sin requerir más entradas.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/game-of-life-js.git
   ```
2. Ingresa al directorio del proyecto:
   ```bash
   cd game-of-life-js
   ```
3. Instala las dependencias (si corresponde):
   ```bash
   npm install
   ```

## Uso

Puedes ejecutar el proyecto localmente. Existe un archivo `index.html`, simplemente ábrelo en tu navegador. Si quieres puedes usar Node.js, ejecuta:

```bash
npm start
```

## Dependencias

Revisa el archivo `package.json` para ver las dependencias utilizadas. Solo depedencias de desarrollo.

## Buenas prácticas o aplicando patrones de diseño

- **Patrón Builder:** Se implementó el patrón de diseño Builder para facilitar la creación y configuración flexible de tableros o configuraciones iniciales del juego, permitiendo construir objetos complejos paso a paso.
- **Separación de responsabilidades:** El código está organizado en módulos/clases separando la lógica del juego, la visualización y la gestión de estado.
- **Programación orientada a objetos:** Se emplean clases para las celdas y para controlar el estado del juego.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

# Game of Life JS - by @sebasrival

## Descripción
Implementación interactiva del autómata celular "Juego de la Vida" de John Conway en JavaScript moderno. Es un juego de cero jugadores donde la evolución está determinada por el estado inicial y las reglas de Conway.

## Características Principales
- **Simulación en tiempo real** con controles interactivos (Start/Pause/Reset).
- **Sistema de temas** con modo oscuro y claro.
- **Visualización dual canvas** para separar células y grilla.
- **Estadísticas en vivo** mostrando generación y población.
- **Diseño responsivo** que se adapta al tamaño de ventana.

## Instalación y Uso
```bash
# Clonar repositorio
git clone https://github.com/sebasrival/game-of-life-js.git
cd game-of-life-js

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Alternativamente, abre `index.html` directamente en el navegador.

## Arquitectura del Código
El proyecto implementa patrones de diseño modernos:

### Módulos Principales
- **`src/main.js`**: Orquestador principal y manejo de eventos.
- **`src/lib.js`**: Motor del juego con lógica de Conway.
- **`src/models.js`**: Clases Cell, GameState y CellBuilder.
- **`src/config.js`**: Configuración de grilla y dimensiones.
- **`src/theme.js`**: Gestión de colores y temas.

### Patrones Implementados
- **Patrón Builder**: Para construcción flexible de células.
- **Separación de responsabilidades**: Módulos especializados por funcionalidad.
- **POO**: Clases encapsuladas para células y estado del juego.

## Tecnologías
- <img src="https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png" width="20"/> JavaScript ES6+ con módulos
- <img src="https://raw.githubusercontent.com/github/explore/main/topics/html/html.png" width="20"/> HTML5 Canvas para renderizado
- <img src="https://raw.githubusercontent.com/github/explore/main/topics/css/css.png" width="20"/> CSS
- <img src="https://vitejs.dev/logo.svg" width="20"/> Vite para desarrollo y build
- <img src="https://avatars.githubusercontent.com/u/44036562?s=200&v=4" width="20"/> GitHub Actions para CI/CD con GitHubPages

Wiki Game of Life: https://es.wikipedia.org/wiki/Juego_de_la_vida

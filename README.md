# Alicorp Secure Code - Escáner de Vulnerabilidades

Herramienta para analizar las dependencias de proyectos de Node.js en busca de vulnerabilidades conocidas, utilizando una base de datos interna y proporcionando recomendaciones de seguridad.

## Propósito

Esta aplicación permite a los desarrolladores subir sus archivos `package.json` y/o `package-lock.json` para:

1.  **Analizar Dependencias:** Identificar todas las dependencias del proyecto.
2.  **Detectar Vulnerabilidades:** Comparar las dependencias con una base de datos de paquetes con vulnerabilidades conocidas.
3.  **Obtener Recomendaciones:** Si se encuentran vulnerabilidades, se muestra una recomendación para contactar a los equipos de seguridad de Alicorp.
4.  **Exportar Resultados:** Generar un reporte en formato CSV con los resultados del análisis.

Todo el procesamiento de archivos se realiza localmente en el navegador del cliente para garantizar la privacidad y seguridad del código.

## Tecnologías Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (con App Router y salida estática)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes:** [ShadCN UI](https://ui.shadcn.com/)
- **Iconos:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Cómo Levantar en Local

Sigue estos pasos para ejecutar la aplicación en tu entorno de desarrollo local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- `npm` o `yarn`

### Pasos

1.  **Clonar el Repositorio:**
    ```bash
    git clone <URL-DEL-REPOSITORIO>
    cd <NOMBRE-DEL-DIRECTORIO>
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar el Servidor de Desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:9002`.

## Despliegue en GitHub Pages

Esta aplicación está configurada para ser exportada como un sitio estático, lo que la hace **totalmente compatible con GitHub Pages**.

### Pasos para el Despliegue

1.  **Construir la Aplicación Estática:**
    Ejecuta el siguiente comando para generar los archivos estáticos en una carpeta `out`.
    ```bash
    npm run build
    ```

2.  **Desplegar en GitHub Pages:**
    Usa el script `deploy` incluido en `package.json`, que se encarga de todo el proceso.
    ```bash
    npm run deploy
    ```
    Este comando publicará el contenido de la carpeta `out` en la rama `gh-pages` de tu repositorio.

3.  **Configurar el Repositorio en GitHub:**
    - Ve a la configuración de tu repositorio en GitHub (`Settings` > `Pages`).
    - En la sección "Build and deployment", asegúrate de que la fuente sea `Deploy from a branch` y selecciona la rama `gh-pages` con la carpeta `/ (root)`.
    - Guarda los cambios. Tu sitio debería estar disponible en `https://<tu-usuario>.github.io/<tu-repositorio>/` en unos minutos.

# Alicorp Secure Code - Escáner de Vulnerabilidades

Herramienta para analizar las dependencias de proyectos de Node.js en busca de vulnerabilidades conocidas, utilizando una base de datos interna y proporcionando recomendaciones de seguridad generadas por IA.

## Propósito

Esta aplicación permite a los desarrolladores subir sus archivos `package.json` y/o `package-lock.json` para:

1.  **Analizar Dependencias:** Identificar todas las dependencias del proyecto.
2.  **Detectar Vulnerabilidades:** Comparar las dependencias con una base de datos de paquetes con vulnerabilidades conocidas.
3.  **Obtener Recomendaciones de IA:** Si se encuentran vulnerabilidades, la IA de Genkit genera un resumen de seguridad y recomienda los pasos a seguir, incluyendo el contacto con los equipos de seguridad de Alicorp.
4.  **Exportar Resultados:** Generar un reporte en formato CSV con los resultados del análisis.

Todo el procesamiento de archivos se realiza localmente en el navegador del cliente para garantizar la privacidad y seguridad del código.

## Tecnologías Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (con App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes:** [ShadCN UI](https://ui.shadcn.com/)
- **Inteligencia Artificial:** [Firebase Genkit](https://firebase.google.com/docs/genkit) (con el modelo Gemini de Google AI)
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

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade tu clave de API para el modelo de IA.
    ```env
    GEMINI_API_KEY=tu_api_key_aqui
    ```

4.  **Ejecutar el Servidor de Desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:9002`.

## Cómo Levantar con Docker

Puedes construir una imagen de Docker y ejecutar la aplicación en un contenedor.

1.  **Construir la Imagen Docker:**
    Desde la raíz del proyecto, ejecuta el siguiente comando:
    ```bash
    docker build -t alicorp-secure-code .
    ```

2.  **Ejecutar el Contenedor:**
    Una vez construida la imagen, ejecuta el siguiente comando para iniciar el contenedor:
    ```bash
    docker run -p 3000:3000 -d alicorp-secure-code
    ```
    La aplicación estará disponible en `http://localhost:3000`.

## Despliegue

### GitHub Pages

**No es posible desplegar esta aplicación en GitHub Pages.** GitHub Pages está diseñado para sitios estáticos, y esta aplicación utiliza funcionalidades de backend de Next.js (Server Actions) para comunicarse con el servicio de IA de Genkit.

### Plataformas Recomendadas

Para desplegar esta aplicación, necesitas un proveedor de hosting que soporte aplicaciones de Node.js, como:

- **Vercel:** La plataforma recomendada para Next.js.
- **Firebase App Hosting:** Se integra de forma nativa con el ecosistema de Firebase.
- Cualquier otro servicio de nube que soporte contenedores de Docker o aplicaciones Node.js (por ejemplo, Google Cloud Run, AWS, etc.).

El proceso general de despliegue sería:
1.  Sube tu código a un repositorio de Git (GitHub, GitLab, etc.).
2.  Conecta tu repositorio a la plataforma de hosting elegida.
3.  Configura las variables de entorno (como `GEMINI_API_KEY`) en la configuración de tu sitio en la plataforma de hosting.
4.  Inicia el despliegue.

# Proyecto SalesDatePrediction-WebApp

## Descripción

`SalesDatePrediction-WebApp` es la aplicación frontend desarrollada con Angular para visualizar y gestionar las predicciones de fechas de venta. Esta aplicación se comunica con la API backend desarrollada en .NET Core, permitiendo a los usuarios interactuar con los datos predictivos de manera eficiente.

## Estructura del Proyecto

La estructura principal del proyecto Angular es la siguiente:

- **.angular/**: Contiene archivos y configuraciones específicas del framework Angular.
- **.vs/**: Directorio que almacena configuraciones específicas de Visual Studio.
- **node_modules/**: Carpeta donde se almacenan todos los módulos y dependencias de Node.js instalados.
- **src/**: Directorio principal del código fuente de la aplicación.
- **.gitignore**: Archivo que especifica qué archivos y directorios deben ser ignorados por Git.
- **angular.json**: Archivo de configuración principal de Angular CLI que gestiona las configuraciones de compilación, testeo, y demás.
- **package.json**: Archivo de configuración para npm que gestiona las dependencias y scripts de la aplicación.

## Requisitos Previos

Antes de poner en marcha el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
- [Angular CLI](https://angular.io/cli)

## Instalación

Para configurar el proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JhonCorredor/SalesDatePrediction-WebApp.git
   cd SalesDatePrediction-WebApp
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar las variables de entorno:**
   ```bash
   API_BASE_URL=http://localhost:44332
   ```
4. **Ejecución del proyecto:**
   ```bash
   ng serve
   ```

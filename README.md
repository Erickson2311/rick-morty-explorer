# Rick & Morty Explorer

Aplicación web desarrollada como **Single Page Application (SPA)** que consume la API pública de *Rick and Morty*. El proyecto está enfocado en buenas prácticas de desarrollo frontend, una arquitectura clara y una experiencia de usuario fluida en distintos dispositivos.

---

##  Características

- Listado de personajes con diseño **responsivo en grid**
-  **Paginación completa** con navegación siguiente / anterior
- **Vista detallada** de personajes mediante modal
- **Búsqueda en tiempo real** por nombre de personaje
- Gestión de episodios mostrando **nombre y código** (ej. `S01E01`)
-  Indicadores visuales de estado: **Vivo / Muerto / Desconocido**
- Arquitectura limpia utilizando **TypeScript** y patrones de diseño
-  Diseño adaptable para **móvil, tablet y desktop**
-  Manejo de **errores** y **estados de carga**
- **Tests unitarios** con Vitest y Testing Library

---

## Tecnologías Utilizadas

- **React 18** – Biblioteca para construir interfaces de usuario
- **TypeScript** – Tipado estático para mayor mantenibilidad
- **Tailwind CSS** – Framework de utilidades CSS para estilos rápidos y consistentes
- **Vite** – Herramienta de construcción y desarrollo rápido
- **Axios** – Cliente HTTP para consumo de la API
- **React Router DOM** – Manejo de rutas y navegación
- **Vitest** – Framework de testing
- **Testing Library** – Pruebas de componentes React enfocadas en el usuario

---

##  Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 16 o superior)
- **npm** (incluido con Node.js) o **yarn**
- **Git** (opcional, para clonar el repositorio)

Puedes verificar las versiones con:

```bash
node --version
# Debería mostrar v16.x.x o superior

npm --version
# Debería mostrar 8.x.x o superior
```

---

##  Instalación y Ejecución

### Paso 1: Clonar el repositorio

```bash
# Clonar el proyecto
git clone https://github.com/tu-usuario/rick-morty-explorer.git

# Entrar al directorio del proyecto
cd rick-morty-explorer
```

### Paso 2: Instalar dependencias

```bash
# Instalar todas las dependencias del proyecto
npm install
```

### Paso 3: Ejecutar la aplicación

```bash
# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación se abrirá automáticamente en tu navegador:

🔗 **Local:** [http://localhost:5173](http://localhost:5173)

---

##  Testing

Para ejecutar los tests unitarios:

```bash
npm run test
```

Para verificar tipos de TypeScript:

```bash
npm run type-check
```

---

## Solución de Problemas Comunes

### Problema 1: Puerto en uso

Si el puerto `5173` está ocupado:

```bash
npm run dev -- --port 3000
```

---

### Problema 2: Dependencias no se instalan correctamente

```bash
# Eliminar dependencias y reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

### Problema 3: Errores de TypeScript

```bash
# Verificar tipos
npm run type-check

# Reinstalar tipos si el error persiste
npm install @types/react @types/react-dom @types/node --save-dev
```

---

##


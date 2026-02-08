# Frontend Challenge

Este proyecto es una aplicación de comercio electrónico (E-commerce) desarrollada como parte de una prueba técnica. Implementa un listado de productos, detalle de producto y una funcionalidad de carrito de compras, siguiendo buenas prácticas de arquitectura y diseño.

## 🚀 Cómo arrancar el proyecto

### Prerrequisitos
- Node.js (v18 o superior recomendado)
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <repository-url>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

### Ejecución

Para levantar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Tecnologías Usadas

- **[Next.js 15](https://nextjs.org/)**: Framework de React para producción, utilizando App Router.
- **[React 19](https://react.dev/)**: Biblioteca para construir interfaces de usuario.
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Framework de utilidades CSS para diseño rápido y responsivo.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript con tipado estático.
- **[Zod](https://zod.dev/)**: Validación de esquemas y tipos TypeScript.
- **[Lucide React](https://lucide.dev/)**: Iconos ligeros y personalizables.
- **Zustand**: (Ver notas abajo).

---

## 🏗️ Arquitectura y Patrones

El proyecto sigue una **Arquitectura Hexagonal (Ports and Adapters)** para desacoplar la lógica de negocio de la infraestructura y la interfaz de usuario.

### Estructura de Carpetas (`src/modules`)

- **Domain**: Contiene las entidades (`Product`, `ProductDetail`) y las interfaces de los repositorios (`ProductRepository`). Esta capa no tiene dependencias externas.
- **Application**: Contiene los casos de uso (`getProductList`, `getProductDetail`) que orquestan la lógica de negocio.
- **Infrastructure**: Implementaciones concretas de los repositorios, llamadas API, DTOs y adaptadores (`ProductRepositoryApi`, `HttpClient`).
- **UI**: Componentes de React y hooks (`Header`, `ProductItem`, `useProducts`).

### Patrones Implementados

- **Repository Pattern**: Abstrae la fuente de datos (API), permitiendo cambiar la implementación sin afectar al dominio o la aplicación.
- **Facade Pattern**: Unifica los casos de uso en una fachada (`productsFacade`) para simplificar el acceso desde la UI.
- **DTO (Data Transfer Object)**: Define la estructura de los datos recibidos de la API y valida su formato con Zod antes de mapearlos al dominio.
- **Adapter**: Transforma los datos externos al formato esperado por el dominio.

---

## ⚡ Caché

Se ha implementado una estrategia de **caché de cliente** personalizada para optimizar las llamadas a la API y mejorar la experiencia de usuario.

- **Almacenamiento**: Memoria (o LocalStorage según configuración).
- **TTL (Time To Live)**: Los datos se almacenan por **1 hora**. Si se solicita el mismo recurso dentro de ese periodo, se sirve desde la caché sin realizar petición de red.
- **Implementación**: `CacheManager` en `src/modules/shared/infrastructure/cache-manager.ts`.

---

## 📝 Notas de Implementación

### Client-side Fetching vs Server-side
Se ha optado por realizar las llamadas a la API desde el **lado del cliente** (`use client`, `useEffect`) para cumplir explícitamente con los requisitos de la prueba técnica.

> **Nota del desarrollador**: En un entorno de producción real, habría preferido utilizar **Server Components** con **Fetch API** de Next.js para aprovechar **ISR (Incremental Static Regeneration)** o **SSG (Static Site Generation)**. Esto mejoraría significativamente el rendimiento, el SEO y la carga inicial (FCP/LCP).

### Gestión de Estado (Zustand)
Aunque `zustand` está listado en las dependencias y es una excelente opción para gestión de estado global, **se decidió no utilizarlo para el carrito de compras** en esta iteración. Dado que la funcionalidad requerida para el carrito en la prueba es limitada, el uso de Context API o estado local fue suficiente y se evitó añadir complejidad innecesaria.

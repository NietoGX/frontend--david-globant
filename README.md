# Frontend Challenge

This project is an e-commerce application developed as part of a technical test. It implements a product listing page, product detail page, and shopping cart functionality, following best practices in architecture and design.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Technologies Used

- **[Next.js 15](https://nextjs.org/)**: React framework for production, using App Router.
- **[React 19](https://react.dev/)**: Library for building user interfaces.
- **[Tailwind CSS 4](https://tailwindcss.com/)**: CSS utility framework for fast and responsive design.
- **[TypeScript](https://www.typescriptlang.org/)**: JavaScript superset with static typing.
- **[Zod](https://zod.dev/)**: Schema validation and TypeScript types.
- **[Lucide React](https://lucide.dev/)**: Lightweight and customizable icons.
- **Zustand**: (See notes below).

---

## 🏗️ Architecture and Patterns

The project follows a **Hexagonal Architecture (Ports and Adapters)** to decouple business logic from infrastructure and user interface.

### Folder Structure (`src/modules`)

- **Domain**: Contains entities (`Product`, `ProductDetail`) and repository interfaces (`ProductRepository`). This layer has no external dependencies.
- **Application**: Contains use cases (`getProductList`, `getProductDetail`) that orchestrate business logic.
- **Infrastructure**: Concrete implementations of repositories, API calls, DTOs, and adapters (`ProductRepositoryApi`, `HttpClient`).
- **UI**: React components and hooks (`Header`, `ProductItem`, `useProducts`).

### Implemented Patterns

- **Repository Pattern**: Abstracts the data source (API), allowing implementation changes without affecting the domain or application.
- **Facade Pattern**: Unifies use cases in a facade (`productsFacade`) to simplify access from the UI.
- **DTO (Data Transfer Object)**: Defines the structure of data received from the API and validates its format with Zod before mapping it to the domain.
- **Adapter**: Transforms external data to the format expected by the domain.

---

## ⚡ Caching

A custom **client-side caching** strategy has been implemented to optimize API calls and improve user experience.

- **Storage**: Memory (or LocalStorage depending on configuration).
- **TTL (Time To Live)**: Data is stored for **1 hour**. If the same resource is requested within that period, it is served from cache without making a network request.
- **Implementation**: `CacheManager` in `src/modules/shared/infrastructure/cache-manager.ts`.

---

## 📝 Implementation Notes

### Client-side Fetching vs Server-side
API calls are made from the **client-side** (`use client`, `useEffect`) to explicitly comply with the technical test requirements.

> **Developer Note**: In a real production environment, I would have preferred to use **Server Components** with Next.js **Fetch API** to leverage **ISR (Incremental Static Regeneration)** or **SSG (Static Site Generation)**. This would significantly improve performance, SEO, and initial load (FCP/LCP).

### State Management (Zustand)
Although `zustand` is listed in the dependencies and is an excellent option for global state management, **it was decided not to use it for the shopping cart** in this iteration. Given that the required cart functionality for the test is limited, using Context API or local state was sufficient and avoided adding unnecessary complexity.

### Cart Behavior
The cart behavior **is not as expected** due to the technical test specifications. According to the requirements, the cart result must be obtained from the API call. However, since **the API does not maintain user data consistency**, the cart always returns **1 product**, regardless of the actions performed in the interface.

### Carrito de la compra
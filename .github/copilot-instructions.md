# Copilot Instructions for Projeto Financeiro

## Big Picture Architecture
- **Monorepo structure**: Contains a Java backend (Spring Boot) and an Angular frontend (`app/`).
- **Backend**: Located in `src/main/java/com/curso/` with configuration in `src/main/resources/`. Handles business logic, persistence, and exposes REST APIs for all core features (accounts, transactions, goals, users).
- **Frontend**: Located in `app/src/app/`. Implements UI components for banking, transactions, goals, users, etc. Uses Angular routing and services for API communication.
- **Data Flow**: Frontend communicates with backend via REST API (see `proxy.conf.json` for local dev proxying).
- **Class Diagram**: See `Imagens/Diagrama_de_Classe_Projeto_Financeiro.png` for domain model overview.

## Developer Workflows
- **Backend build/test**: Use Maven wrapper (`./mvnw` or `mvnw.cmd`).
  - Build: `./mvnw clean install`
  - Run: `./mvnw spring-boot:run`
  - Test: `./mvnw test` (logs in `prjfinanceiro_test.log*`)
- **Frontend build/test**:
  - Dev server: `ng serve` (from `app/`)
  - Build: `ng build`
  - Unit tests: `ng test`
  - E2E tests: `ng e2e`
- **Debugging**:
  - Backend: Use Spring Boot dev tools, check logs in `target/` and root log files.
  - Frontend: Use browser dev tools, Angular CLI live reload.

## Project-Specific Conventions
- **Angular**: Feature folders (e.g., `bancos/`, `contas/`, `metaFinanceiras/`) each have `.component.ts`, `.service.ts`, and `.html` files. Routing is split for server/client (`app.routes.server.ts`, `app.routes.ts`).
- **Java**: Properties files for different environments (`application.properties`, `application-dev.properties`, etc.).
- **API Security**: Auth handled via Angular `auth.interceptor.ts` and backend user/login endpoints.
- **Testing**: Backend test logs are written to root as `prjfinanceiro_test.log*`.

## Integration Points & External Dependencies
- **Frontend/Backend API**: All data flows through REST endpoints. Use Angular services for HTTP calls.
- **Spring Boot**: Standard dependencies, see `pom.xml`.
- **Angular**: Standard CLI setup, see `app/package.json`.

## Key Files & Directories
- `src/main/java/com/curso/` — Java backend source
- `src/main/resources/` — Backend configs
- `app/src/app/` — Angular source code
- `app/proxy.conf.json` — API proxy config for local dev
- `Imagens/Diagrama_de_Classe_Projeto_Financeiro.png` — Domain model
- `README.md`, `app/README.md` — Project and frontend docs

## Example Patterns
- To add a new feature: create a folder in `app/src/app/`, add `.component.ts`, `.service.ts`, `.html`, and update routing.
- To expose a new backend API: add a controller in `src/main/java/com/curso/`, update service/repository, and document endpoint in README if needed.

---

For questions or unclear conventions, check the main `README.md` or ask for clarification.

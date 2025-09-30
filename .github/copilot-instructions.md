## Copilot / AI agent quick instructions — Projeto Financeiro

This file contains targeted, actionable guidance for AI coding agents working on this repository.

## Big-picture architecture (what to know first)
- Two main parts: backend (Spring Boot, Java 17) and frontend (Angular standalone, in `app/`).
- Backend code lives under `src/main/java/com/curso`:
	- REST controllers: `resources/*` (e.g., `AuthController`, `BancoResource`).
	- Services: `services/*` implement business logic (e.g., `BancoService`, `DBService`).
	- Entities: `domains/*` and DTOs in `domains/dtos`.
	- Repositories: `repositories/*` (Spring Data JPA).
- Frontend lives in `app/` and uses Angular standalone components (lazy-loaded via `loadComponent` in `app/src/app/app.routes.ts`).

## Key integration points & patterns
- Authentication: JWT issued by backend (`/auth/login` → `AuthController` → `JWTUtils.generateToken`). Frontend expects/stores token in localStorage key `token` (`app/src/app/auth/auth.service.ts`).
- Interceptor/Guard: `auth.interceptor.ts` adds `Authorization: Bearer <token>` header; `auth.guard.ts` protects routes.
- API proxy: frontend `app/proxy.conf.json` proxies `/api` and `/api/auth` to `http://localhost:8080` during `ng serve`.
- OpenAPI: `springdoc` enabled; UI reachable at `/swagger-ui.html` (properties in `src/main/resources/application.properties`).

## Build / run / test (concrete commands)
- Backend (Windows PowerShell):
```powershell
./mvnw.cmd test
./mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev   # run with PostgreSQL settings
./mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=test  # uses in-memory H2 (default in repo)
```
- Frontend (Windows PowerShell):
```powershell
cd app
npm install
npx ng serve --configuration development   # serves at http://localhost:4200 and uses proxy.conf.json
```

## Project-specific conventions (follow these)
- Controllers in `resources/*` return DTOs (not entities) and use `@RequestMapping("/api/...")` — maintain DTO usage when adding endpoints.
- Services contain transactional/business code; repositories are thin Spring Data interfaces. Add logic to `services/*`, not controllers.
- JWTs: backend `JWTUtils.generateToken` returns raw token (no "Bearer "). Frontend `AuthService` strips an optional "Bearer " prefix if present and persists just the token string.
- Entity scanning and repo packages are explicit in `ProjetoFinanceiroApplication.java` — keep classes under `com.curso.*` so component scan and JPA scan work.

## Examples to copy/paste
- Login request (backend expects `CredenciaisDTO` JSON):
```json
POST /auth/login
{ "username": "user", "password": "secret" }
```
Response: `{ "token": "<JWT>" }` (controller wraps token in `TokenDTO`).

## Tests and profiles
- Integration tests use H2 and are configured by `application-test.properties` (in-memory DB). Use `-Dspring-boot.run.profiles=test` for test-like environment.

## When editing code, quick checklist
1. Update or add DTOs under `src/main/java/com/curso/domains/dtos` for any public API changes.
2. Register new entities under `com.curso.domains` and ensure `@Entity` imports are in scanned packages.
3. Add repository under `com.curso.repositories` and a service in `com.curso.services`.
4. Add controller in `com.curso.resources` with OpenAPI annotations if it is a public API (see `BancoResource` for style).
5. If changing endpoints used by frontend, update `app/` calls or proxy rules accordingly.

## Files to inspect for more context
- Backend: `ProjetoFinanceiroApplication.java`, `AuthController.java`, `JWTUtils.java`, `BancoResource.java`, `DBService.java`.
- Frontend: `app/src/app/auth/*`, `app/src/app/app.routes.ts`, `app/proxy.conf.json`, `app/README.md`.

If any section is unclear or you want more examples (tests, DTO patterns, or a sample endpoint implementation), tell me which area to expand and I will iterate.

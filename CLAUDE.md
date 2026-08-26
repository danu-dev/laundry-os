# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

*Note: There is currently no pre-configured testing framework (like Jest or Vitest) set up in this repository.*

## Code Architecture

- **Authentication & Middleware:**
  - Route protection and redirection are handled at the edge in `src/middleware.ts`.
  - Authentication tokens are stored in cookies (`token`).
  - `src/providers/auth-provider.tsx` likely wraps the application to provide client-side auth context/state.
- **API Communication:** 
  - Axios is configured as the HTTP client in `src/lib/api.ts`.
  - The Axios instance automatically attaches the `token` cookie as a Bearer token in requests and intercepts 401s to clear the token.
- **Styling & UI:**
  - Tailwind CSS v4 is used for styling.
  - Shadcn UI components are located in `src/components/ui/`.
  - Complex custom application layout components are located in `src/components/layout/`.
  - Lucide React is used for iconography.
- **State Management:** Zustand is used. Custom React hooks are placed in `src/hooks/`.

## Common Conventions

- **Next.js Conventions:** Use `page.tsx` for route components and `layout.tsx` for layout wrappers within `src/app/`.
- **API calls:** Prefer using the configured Axios instance from `src/lib/api.ts` rather than native `fetch` to ensure authorization tokens are correctly attached.

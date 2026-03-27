# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Web app that converts QR codes into Apple Wallet passes. Generates `.pkpass` files for Toss, KakaoPay, LinkedIn, and Instagram profiles, delivered via email.

**Domain:** https://pass.connects.im
**Target:** Korean users (Korean UI/SEO)
**Hosting:** GitHub Pages (static site)

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Bun** (package manager — uses `bun.lock`)
- **Tailwind CSS** + Framer Motion
- **AWS Lambda** (backend API for pass generation)

## Commands

```bash
bun dev          # dev server
bun run build    # production build
bun run lint     # lint
```

No test files — type system provides safety.

## Architecture

### Core Data Flow

The form page (`src/app/form/page.tsx`) is the single controller managing all state:

1. **Template selection** (`Template.tsx`) — horizontal snap-scroll through 7 templates, theme (dark/light) picker
2. **Image upload** (`Profile.tsx` → `ImageContext.tsx` → `CropImage.tsx`) — `ImageProvider` Context shares crop state; converts to Base64 and syncs to `formData.thumbnail`
3. **Form input** — type guard functions (`isInstaForm`, `isLinkedin1Form`, etc.) in `page.tsx` conditionally render service-specific fields
4. **API submission** (`sendFormData`) — maps template ID to service endpoint (see below)
5. **Success page** (`form/success/`) — redirects with `?issue_code=XXX` param

### Template ID → API Endpoint Mapping

Handled by the switch statement in `sendFormData` (`page.tsx`):

| Template ID | API Service |
|---|---|
| `insta1`, `insta_special` | `/instagram` |
| `linkedin1`, `linkedin2`, `linkedin3` | `/linkedin` |
| `kakaopay1` | `/kakaopay` |
| `tosspay1` | `/tosspay` |

**Base URL:** `https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/v1/passes/pass.com.passconnect/{service}`

### Type System

`Types.tsx`: 5 form interfaces as a union type (`FormDataTypes`)
- Common fields: `template`, `code`, `email`, `theme`
- Service-specific: `thumbnail`, `name`, `id`, `bio`, `role`, `company`, `joinDate`, `text`
- Type guard functions live in `page.tsx` (not Types.tsx — that file only has interfaces)
- Tosspay is the only template without image upload (`!isTossPayForm` excludes `ImageProvider`)

## Key Patterns

### Component Conventions

- **"use client"** directive required (all interactive components)
- **Filenames:** PascalCase (`Hero.tsx`, `Footer.tsx`)
- **Exports:** default export

### Styling

- Tailwind CSS utility classes
- Dark mode: `dark:` prefix (CSS variable based)
- Responsive: `sm:`, `md:` breakpoints
- Fonts: Geist Sans/Mono (local fonts, `layout.tsx`)

### Image Crop Flow

`ImageProvider` (Context API) shares cropped image state between `Profile.tsx` and `CropImage.tsx`. `DisplayCroppedImage` is a generic component that syncs the crop result to form data via `useEffect` + `setFormData`.

## Deployment

- **GitHub Actions** (`.github/workflows/nextjs.yml`) — auto-deploys on `main` push
- **CI uses npm** (not bun) — the workflow detects package manager from lock files
- `actions/configure-pages` with `static_site_generator: next` auto-injects `output: "export"` + `images.unoptimized` into `next.config.mjs`
- Build output: `/out` → GitHub Pages

## Adding a New Template

1. Add entry to `templates` array in `src/app/form/page.tsx` (single image → `src`, light/dark variants → `dark`/`light`)
2. Add preview images to `public/`
3. Define new form interface in `Types.tsx` + add to `FormDataTypes` union
4. Add type guard function in `page.tsx` + conditional form field rendering
5. Add endpoint mapping in `sendFormData` switch statement

## External Services

- **Google Tag Manager:** `GTM-N7FLDX2M` (`GTM.tsx`)
- **Buy Me a Coffee:** Footer/Sponsor components
- **AWS Lambda:** Pass generation API (ap-northeast-2)
- **SEO:** Open Graph, Twitter Card, JSON-LD, `ko_KR` locale (`layout.tsx`)

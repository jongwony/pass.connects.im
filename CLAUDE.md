# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pass Connect (패스 커넥트) is a multilingual Next.js application that generates Apple Wallet passes with QR codes for:
- Toss Pay (송금 계좌)
- KakaoPay (송금 링크)
- LinkedIn profiles
- Instagram profiles

The frontend is hosted on GitHub Pages. The backend API is an external AWS API Gateway service (not in this repository).

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production (outputs to ./out for static export)
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- Next.js 14 with App Router (TypeScript)
- Tailwind CSS for styling
- framer-motion for animations
- react-easy-crop for profile image cropping
- next-intl for internationalization
- Deployed to GitHub Pages via `.github/workflows/nextjs.yml`

### Internationalization (i18n)
The app supports Korean (ko) and English (en) using next-intl with subpath routing:

**Route Structure:**
- `/` - Redirects to default locale (`/ko`)
- `/ko`, `/en` - Localized landing pages
- `/ko/form`, `/en/form` - Localized form pages
- `/ko/form/success`, `/en/form/success` - Confirmation pages
- `/ko/privacy`, `/en/privacy` - Privacy policy pages

**Key i18n Files:**
- `src/i18n/routing.ts` - Locale configuration (locales, defaultLocale)
- `src/i18n/request.ts` - Message loading configuration
- `src/i18n/navigation.ts` - Localized navigation hooks (Link, useRouter, usePathname)
- `messages/ko.json`, `messages/en.json` - Translation files

**Adding Translations:**
1. Add keys to both `messages/ko.json` and `messages/en.json`
2. Use `useTranslations('namespace')` hook in components
3. Access translations with `t('key')` or `t('nested.key')`

### Directory Structure
```
src/app/
├── layout.tsx              # Root layout (minimal, returns children)
├── page.tsx                # Root redirect to /ko
├── globals.css
├── fonts/
└── [locale]/               # All localized content
    ├── layout.tsx          # Locale layout with NextIntlClientProvider
    ├── page.tsx            # Home page
    ├── Hero.tsx, Footer.tsx, etc.
    ├── form/
    │   ├── page.tsx        # Form page
    │   ├── Types.tsx       # Form type definitions
    │   ├── Template.tsx    # Template selector
    │   ├── ImageContext.tsx
    │   └── success/
    └── privacy/
```

### Form System (`src/app/[locale]/form/`)
The form dynamically renders fields based on selected template type:
- **Types.tsx** - TypeScript interfaces for each template type (`Insta1Form`, `Linkedin1Form`, `KakaopayForm`, `TosspayForm`, etc.) with union type `FormDataTypes`
- **ImageContext.tsx** - React Context for managing cropped profile image state across components
- **Template.tsx** - Template selection component
- **CropImage.tsx** / **Profile.tsx** - Profile image upload and cropping

Type guards in `page.tsx` (`isInstaForm`, `isLinkedin1Form`, etc.) determine which form fields to render.

### API Integration
Form submissions POST to different AWS API Gateway endpoints based on template type:
- Instagram: `.../passes/pass.com.passconnect/instagram`
- LinkedIn: `.../passes/pass.com.passconnect/linkedin`
- KakaoPay: `.../passes/pass.com.passconnect/kakaopay`
- TossPay: `.../passes/pass.com.passconnect/tosspay`

### Fonts
Custom local fonts loaded in `[locale]/layout.tsx`:
- Geist Sans/Mono (variable fonts)
- Pretendard (Korean font family)

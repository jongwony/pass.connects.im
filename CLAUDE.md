# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pass Connect (패스 커넥트) is a Korean-language Next.js application that generates Apple Wallet passes with QR codes for:
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
- Deployed to GitHub Pages via `.github/workflows/nextjs.yml`

### Route Structure
- `/` - Landing page with animated hero showcasing pass types
- `/form` - Multi-template form for creating passes
- `/form/success` - Confirmation page after submission
- `/privacy` - Privacy policy page

### Form System (`src/app/form/`)
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
Custom local fonts loaded in `layout.tsx`:
- Geist Sans/Mono (variable fonts)
- Pretendard (Korean font family)

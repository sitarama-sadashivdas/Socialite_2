# Socialite App

A modern, responsive social media dashboard application built with React, TypeScript, and Tailwind CSS.

## Overview

Aura Dashboard is a feature-rich social media application that provides a clean, intuitive interface for managing social connections, viewing feeds, exploring content, and interacting with notifications and messages.

## Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Icons** | Lucide React |
| **Routing** | React Router DOM |
| **Animations** | Framer Motion |
| **Forms** | React Hook Form + Zod |
| **Testing** | Vitest |

## Features

- **Feed** - Browse and interact with posts
- **Explore** - Discover trending content
- **Notifications** - Stay updated with activity alerts
- **Messages** - Private messaging functionality
- **Profile** - User profile management
- **Responsive Design** - Works seamlessly on all devices

## Prerequisites

- Node.js 18+
- npm or bun

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`.

### Build

Create a production build:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── components/
│   ├── feed/          # Feed-related components
│   ├── layout/        # Layout components (Navbar, Sidebar)
│   └── ui/            # Reusable UI components
├── data/              # Mock data
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Route pages
│   ├── Feed.tsx
│   ├── Explore.tsx
│   ├── Messages.tsx
│   ├── Notifications.tsx
│   ├── Profile.tsx
│   └── Index.tsx
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Configuration

### Vite Configuration

The project uses Vite for development and building. Configuration can be found in `vite.config.ts`.

### Tailwind CSS

Tailwind CSS is configured via `tailwind.config.ts` with the following plugins:
- `@tailwindcss/typography`
- `tailwindcss-animate`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is private and all rights are reserved.


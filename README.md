# Digital Identity

[![Node.js](https://img.shields.io/badge/Node.js-Ready-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Nuxt](https://img.shields.io/badge/Nuxt-Ready-green?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-Ready-green?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Ready-blue?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker&logoColor=white)](https://www.docker.com/)

A customizable digital identity application built with Nuxt 3, allowing users to create personal profile pages with contact information and social links. The application supports multiple templates and can generate vCard files for easy contact sharing.

## Features

- 🎨 Multiple template options (Basic, Modern)
- 📱 Responsive design with Tailwind CSS
- 📇 vCard generation for contact sharing
- 🚀 Server-side rendering (SSR) support
- 🐳 Docker containerization
- ⚙️ Highly configurable via environment variables
- 🔍 SEO optimized with meta tags

## Quick Start

### Prerequisites

- Node.js 24+ (Alpine recommended for Docker)
- npm, pnpm, yarn, or bun package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

3. Copy environment variables and configure:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

The application will be available at `http://localhost:3000`

## Environment Variables

All environment variables are optional but recommended for a complete setup. Create a `.env` file in the root directory with the following variables:

### Profile Information

```env
# Basic profile information
NUXT_PUBLIC_PROFILE_NAME="Your Full Name"
NUXT_PUBLIC_PROFILE_IMAGE="/path/to/your/image.jpg"
NUXT_PUBLIC_PROFILE_DESCRIPTION="A brief description about yourself"

# Contact Information
NUXT_PUBLIC_EMAIL_ADDRESS="your.email@domain.com"
NUXT_PUBLIC_PHONE_NUMBER="+1234567890"
NUXT_PUBLIC_WEBSITE_URL="https://yourwebsite.com"
NUXT_PUBLIC_ADDRESS="Your Address, City, Country"

# Professional Information
NUXT_PUBLIC_COMPANY_NAME="Your Company"
NUXT_PUBLIC_JOB_TITLE="Your Job Title"
```

### Site Configuration

```env
# SEO and branding
NUXT_PUBLIC_SITE_TITLE="Your Digital Identity"
NUXT_PUBLIC_META_DESCRIPTION="A professional digital identity page"
NUXT_PUBLIC_FAVICON="/favicon.ico"
NUXT_PUBLIC_THEME_COLOR="#000000"
NUXT_PUBLIC_COPYRIGHT="© 2025 Your Name. All rights reserved."

# Template and layout
NUXT_PUBLIC_TEMPLATE="modern"  # Options: "basic", "modern"
NUXT_PUBLIC_LAYOUT="default"
NUXT_PUBLIC_IMAGE_COVER="/path/to/cover/image.jpg"
```

### Social Links

```env
# JSON string containing social media links
NUXT_PUBLIC_LINKS='[
  {"name": "GitHub", "url": "https://github.com/username", "icon": "github"},
  {"name": "LinkedIn", "url": "https://linkedin.com/in/username", "icon": "linkedin"},
  {"name": "Twitter", "url": "https://twitter.com/username", "icon": "twitter"}
]'
```

### Application Configuration

```env
# Logging configuration
LOG_LEVEL="info"        # Options: "error", "warn", "info", "debug"
LOG_FORMAT="text"       # Options: "text", "json"

# Build information (automatically set during Docker builds)
BUILD_VERSION="1.0.0"
BUILD_FLAVOR="production"  # Options: "dev", "staging", "production"
```

## Development

### Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Building for Production

Build the application for production:

```bash
npm run build
```

### Preview Production Build

Locally preview the production build:

```bash
npm run preview
```

## Docker Deployment

### Using Docker Compose (Recommended)

The project includes a `compose.yaml` file for easy deployment:

```bash
docker compose up -d
```

This will:

- Build the application with version `1.1.5` and flavor `dev`
- Start the container on port `3000`
- Load environment variables from `.env` file

### Manual Docker Build

```bash
# Build the image
docker build -t digital-identity \
  --build-arg BUILD_VERSION=1.0.0 \
  --build-arg BUILD_FLAVOR=production .

# Run the container
docker run -p 3000:3000 --env-file .env digital-identity
```

## Templates

The application supports multiple templates that can be selected via the `NUXT_PUBLIC_TEMPLATE` environment variable:

- **`modern`** (default): A contemporary design with enhanced visual elements
- **`basic`**: A clean, minimalist template focusing on essential information

## Project Structure

```text
├── components/           # Vue components
│   ├── basicTemplate.vue   # Basic template component
│   └── modernTemplate.vue  # Modern template component
├── composables/         # Vue composables
│   ├── coverCompute.ts     # Cover image utilities
│   ├── logger.ts           # Logging utilities
│   └── useVCard.ts         # vCard generation
├── pages/               # Nuxt pages
│   └── index.vue           # Main page with template selection
├── public/              # Static assets
├── server/              # Server-side code
├── theme/               # Theme configuration
├── app.vue              # Root Vue component
├── nuxt.config.ts       # Nuxt configuration
├── Dockerfile           # Docker configuration
├── compose.yaml         # Docker Compose configuration
└── package.json         # Dependencies and scripts
```

## Technologies Used



- **Nuxt 3**: Vue.js framework with SSR support
- **Vue 3**: Progressive JavaScript framework
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **vCard Creator**: Contact information generation
- **Docker**: Containerization platform

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For questions and support, please refer to the [Nuxt documentation](https://nuxt.com/docs) or create an issue in the repository.

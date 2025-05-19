# Next.js Project

## Project Structure

```
next-project/
├── .github/                    # GitHub Actions & workflows
├── .husky/                     # Husky pre-commit hooks
├── public/                     # Static assets (favicon, images, fonts)
├── src/
│   ├── app/                    # Next.js App Router (pages, layouts, routes)
│   ├── components/             # Reusable UI and common components
│   ├── context/                # React context providers (auth, theme)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities, stores, and helpers
│   ├── services/               # API service layers
│   ├── styles/                 # Global styles and variables
│   └── types/                  # TypeScript type definitions
├── .env.local                  # Local environment variables
├── .env.example                # Example environment variables
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment variables:**
   - Copy `.env.example` to `.env.local` and update values as needed.

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Features
- Next.js 15 App Router
- React 19
- Tailwind CSS & PostCSS
- TypeScript
- Jotai state management
- React Query for data fetching
- Modern folder structure for scalability

---
Feel free to customize this project structure to fit your needs!

# VedaAI - AI Assessment Creator

## Tech Stack
- **Client**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Zustand, Socket.io-client
- **Server**: Express, TypeScript, MongoDB (Mongoose), Redis, BullMQ, Socket.io, OpenAI
- **Infra**: Docker Compose (MongoDB + Redis)

## Folder Structure
```
vedaai/
├── client/          # Next.js frontend
│   └── src/
│       ├── app/     # App Router pages
│       ├── components/
│       ├── stores/  # Zustand stores
│       ├── hooks/   # Custom hooks
│       ├── lib/     # Utils, API client
│       └── types/
├── server/          # Express backend
│   └── src/
│       ├── models/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── jobs/
│       ├── socket/
│       ├── middleware/
│       ├── utils/
│       └── types/
└── design/          # Figma reference screenshots
```

## Running Dev Servers
```bash
# Start infra
docker compose up -d

# Start both servers
npm run dev

# Or individually
npm run dev:server   # Express on :5001
npm run dev:client   # Next.js on :3000
```

## Conventions
- TypeScript strict mode everywhere
- Tailwind for all styling, no component libraries
- No auth (out of scope)
- Color palette: orange accent (#F97316), dark text (#1F2937), light gray bg (#F3F4F6)
- Sidebar: 320px floating card on desktop (w-80 wrapper with p-3 padding)
- Mobile: bottom tab nav, no sidebar

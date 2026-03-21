# VedaAI - AI Assessment Creator

An AI-powered assessment creator that lets teachers create assignments, generate structured question papers using GPT-4o, and download them as PDFs.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS, Zustand |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB (Mongoose) |
| Cache/Queue | Redis, BullMQ |
| Real-time | Socket.io |
| AI | OpenAI GPT-4o |
| PDF | Puppeteer |
| Infra | Docker Compose |

## Architecture

```
┌─────────────┐     ┌──────────────────────────────────────┐
│   Next.js    │────▶│  Express API Server                  │
│   Client     │◀────│                                      │
│              │ WS  │  POST /api/assignments  ──▶ MongoDB  │
│  Zustand     │◀───▶│       │                              │
│  Socket.io   │     │       ▼                              │
└─────────────┘     │  BullMQ Queue ──▶ Redis               │
                    │       │                              │
                    │       ▼                              │
                    │  Worker: GPT-4o ──▶ JSON Paper        │
                    │       │                              │
                    │       ▼                              │
                    │  Save to MongoDB + Socket.io emit    │
                    │                                      │
                    │  GET /api/assignments/:id/pdf         │
                    │       │                              │
                    │       ▼                              │
                    │  Puppeteer ──▶ A4 PDF                │
                    └──────────────────────────────────────┘
```

### Flow

1. Teacher fills the assignment form (question types, marks, optional PDF upload)
2. Frontend POSTs to `/api/assignments` — creates a MongoDB document
3. A BullMQ job is queued for AI generation
4. Worker picks up the job, builds a structured prompt, calls GPT-4o with JSON mode
5. AI response is parsed, validated, and saved to MongoDB
6. Socket.io emits `assignment:completed` — frontend updates in real-time
7. Teacher views the formatted paper and can download as PDF

## Setup

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- OpenAI API key

### Install & Run

```bash
# 1. Start MongoDB + Redis
docker compose up -d

# 2. Configure environment
cp server/.env.example server/.env
# Edit server/.env and add your OPENAI_API_KEY

# 3. Install dependencies
npm run install:all

# 4. Start development servers
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5001

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/assignments` | Create assignment + enqueue AI generation |
| GET | `/api/assignments` | List all assignments |
| GET | `/api/assignments/:id` | Get assignment with generated paper |
| DELETE | `/api/assignments/:id` | Delete assignment |
| GET | `/api/assignments/:id/pdf` | Download generated paper as PDF |
| POST | `/api/assignments/:id/regenerate` | Regenerate the question paper |

## Folder Structure

```
vedaai/
├── client/                    # Next.js frontend
│   └── src/
│       ├── app/               # App Router pages (/, /create, /assignment/[id])
│       ├── components/        # UI components (layout, assignments, create, paper)
│       ├── stores/            # Zustand stores (assignment, create, generation)
│       ├── hooks/             # WebSocket hook
│       ├── lib/               # API client, utils
│       └── types/             # TypeScript interfaces
├── server/                    # Express backend
│   └── src/
│       ├── models/            # Mongoose schemas
│       ├── routes/            # Express routes
│       ├── controllers/       # Route handlers
│       ├── services/          # AI generation, PDF export
│       ├── jobs/              # BullMQ queue + worker
│       ├── socket/            # Socket.io setup
│       ├── middleware/        # File upload, error handling
│       └── utils/             # Prompt builder, response parser
├── design/                    # Figma reference screenshots
└── docker-compose.yml         # MongoDB + Redis
```

## Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| State management | Zustand | Lighter than Redux, 3 small focused stores |
| Styling | Tailwind CSS | Matches Figma designs, no component library needed |
| AI model | GPT-4o | JSON mode for reliable structured output |
| PDF generation | Puppeteer | Full HTML/CSS control for exam paper formatting |
| Job queue | BullMQ + Redis | Non-blocking AI generation with real-time status updates |
| Real-time | Socket.io | Auto-reconnection, room-based events per assignment |
| File handling | pdf-parse | Extracts text from uploaded PDFs for AI context |

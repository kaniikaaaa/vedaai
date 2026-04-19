# Exam Engine

Assessment creator that turns a topic and a spec into a graded, printable question paper in 10 to 30 seconds. Teachers pick subject, difficulty, counts per question type; the engine generates, grades, and exports PDF.

**Live:** https://vedaai-7vks.onrender.com

## Stack

Next.js 14 (App Router) · TypeScript · Express · MongoDB (Mongoose) · Redis + BullMQ · Socket.io · OpenAI GPT-4o (JSON mode) · @react-pdf/renderer · Docker Compose

## What's interesting here

- **Job-queue architecture with live progress.** Generation is offloaded to a BullMQ worker so the request returns in milliseconds. A Socket.io room tied to the job ID streams progress events back to the client while questions are produced.
- **Strict JSON-mode LLM calls.** Every generation request hits GPT-4o with `response_format: { type: "json_object" }` and a schema contract, so the worker can deserialize directly into Mongoose documents without a brittle regex parser.
- **Client-side PDF.** Graded papers render with @react-pdf/renderer in the browser, so exports never hit the server and load scales with users, not CPU.

## Run locally

```bash
# 1. Clone and install
git clone https://github.com/kaniikaaaa/exam-engine.git
cd exam-engine
cp server/.env.example server/.env   # fill OPENAI_API_KEY, MONGO_URI, REDIS_URL

# 2. Start MongoDB + Redis via Docker
docker compose up -d

# 3. Install deps (root runs both client + server via concurrently)
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# 4. Run in dev
npm run dev
# client: http://localhost:3000
# server: http://localhost:5000
```

## Project layout

```
client/   Next.js 14 app, Zustand stores, @react-pdf renderer
server/   Express API, Mongoose models, BullMQ worker, Socket.io
docker-compose.yml   MongoDB + Redis
```

## Status

Live and deployed. Reached final interview round with VedaAI on this project.

## License

MIT

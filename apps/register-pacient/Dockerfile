FROM oven/bun:1.2-alpine AS base
WORKDIR /app

# Development settings to container
FROM base AS dev
COPY package.json bun.lock bunfig.toml ./
RUN bun install
EXPOSE 3000
CMD ["bun", "run", "dev"]

# Builder seetings
FROM dev AS builder
COPY . .
RUN bun run build

# Production settings to container
FROM base AS prod-deps
COPY package.json bun.lock bunfig.toml ./
RUN bun ci --production

FROM base AS release

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

USER appuser

EXPOSE 3000
ENTRYPOINT [ "bun" ]
CMD ["dist/index.js"]
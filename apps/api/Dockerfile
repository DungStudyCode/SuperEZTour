# Build from monorepo root:
#   docker build -f apps/api/Dockerfile -t superez-api:local .
FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/contracts ./packages/contracts
RUN npm ci --workspace @superez/api --include-workspace-root=false
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json
COPY apps/api/src ./apps/api/src
RUN npm run build --workspace @superez/api \
    && test -f /app/apps/api/dist/server.js \
    && test -f /app/apps/api/dist/database/migrate.js \
    && npm prune --omit=dev --workspace @superez/api --include-workspace-root=false

FROM node:24-bookworm-slim
ENV NODE_ENV=production
ENV HOST=0.0.0.0
WORKDIR /app/apps/api
COPY --from=build --chown=node:node /app/node_modules /app/node_modules
COPY --from=build --chown=node:node /app/packages/contracts /app/packages/contracts
COPY --from=build --chown=node:node /app/apps/api/dist ./dist
COPY --chown=node:node apps/api/package.json ./package.json
COPY --chown=node:node apps/api/migrations ./migrations
EXPOSE 3103
USER node
CMD ["node", "dist/server.js"]

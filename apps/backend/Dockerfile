###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine AS builder

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

USER node


###################
# PRODUCTION
###################

FROM node:20-alpine
ARG NODE_ENV
RUN echo "NODE_ENV: $NODE_ENV"

WORKDIR /app

COPY --chown=node:node --from=builder /app/package*.json ./

RUN npm ci --omit=dev
COPY --chown=node:node --from=builder /app/dist ./dist


CMD ["node", "dist/main"]
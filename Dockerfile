FROM node:22-alpine AS base

# --- Dependencies ---
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV WORDPRESS_GRAPHQL_URL=https://cms.octisight.io/graphql
ENV NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_nbeuqbs
ENV NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_m970a2n
ENV NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=BP3ZMGda5OHQG87i5

RUN npm run build

# --- Runner ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT=8080
ENV HOSTNAME=0.0.0.0
EXPOSE 8080

CMD ["node", "server.js"]

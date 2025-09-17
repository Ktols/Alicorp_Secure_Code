# 1. Base Image
FROM node:20-alpine AS base

# 2. Build Stage
FROM base AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 3. Production Stage
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expose port and start app
EXPOSE 3000
CMD ["npm", "start", "--", "-p", "3000"]

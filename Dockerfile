# Stage 1: install dependencies
FROM node:18-alpine AS deps

# Create app directory
WORKDIR /usr/src/app

ARG NPM_TOKEN

RUN npm i -g pnpm

# Files required by pnpm install
COPY ./package*.json ./pnpm-lock.yaml ./

# Install app dependencies
RUN pnpm install --frozen-lockfile 


# Stage 2: Build the app
FROM node:18-alpine AS builder

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/ /usr/src/app/

COPY . .

# Build the production ready app to a dist/ folder 
RUN pnpm build 


# Stage 3: Serve the app with a nginx server
FROM nginx:latest as final

# Applying custom server configuration
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Bundle app source
COPY --from=builder /usr/src/app/dist /usr/src/app

RUN chown -R www-data /usr/src/app
RUN chmod -R 0755 /usr/src/app
RUN chmod -R 0755 /var/log/nginx
RUN chmod -R 0755 /var/cache/nginx

EXPOSE 80:8080
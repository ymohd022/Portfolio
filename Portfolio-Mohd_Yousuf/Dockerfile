# Stage 1: Build Angular app
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/portfolio-mohd-yousuf/browser /usr/share/nginx/html
EXPOSE 80
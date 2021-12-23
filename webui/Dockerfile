FROM node:17-slim
WORKDIR /opt/ProjectUI
COPY . .
RUN npm install
ENV NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:3010
ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build
CMD ["node", "server.js"]
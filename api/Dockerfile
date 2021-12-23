FROM node:17-slim
WORKDIR /opt/ProjectAPI
COPY . .
RUN npm install
ENV MONGODB_URI=mongodb://mongo-server-project:27017/project_db
CMD ["node", "server.js"]
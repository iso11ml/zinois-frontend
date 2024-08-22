FROM node:18-alpine

ENV VITE_NEST_SERVER="https://zinois-backend-production-ocdi7twgpq-uc.a.run.app"


WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
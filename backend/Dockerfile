FROM node:20

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
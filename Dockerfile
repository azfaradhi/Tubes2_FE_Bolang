# Gunakan image Node.js resmi
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Salin dependency file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Salin seluruh source code
COPY . .

# Build Next.js
RUN npm run build

# Jalankan Next.js dalam mode produksi
EXPOSE 3000
CMD ["npm", "start"]

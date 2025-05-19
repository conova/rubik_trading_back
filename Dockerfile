FROM node:22-slim

# Set working directory
WORKDIR /usr/app

# Install essential build tools only if needed
# (e.g., if using native node modules like bcrypt)
RUN apt-get update && apt-get install -y \
  openssl \
  tzdata \
  vim \
  && rm -rf /var/lib/apt/lists/*

# Timezone setup
ENV TZ=Asia/Ulaanbaatar
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Set default command (optional)
CMD ["node", "dist/server.js"]

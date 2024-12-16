# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Environment variables necessary for build
ENV NEXT_PUBLIC_API_PROFILES=http://host.docker.internal:3001/api/v1/profiles
ENV NEXT_PUBLIC_API_QUOTE_CHECKS=http://host.docker.internal:3001/api/v1/quote_checks

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
# frontend/Dockerfile

# Stage 1: Build the React application
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
# REACT_APP_API_URL is passed as a build argument or environment variable during Docker build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the built React app from the build stage to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration (optional, but good for single-page apps)
# This ensures that all requests are routed to index.html, which is crucial for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]

# backend/Dockerfile
# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container at /app
COPY . .

# Expose port 5000 (Flask default port)
EXPOSE 5000

# Define environment variable for Flask to run in production mode
# ENV FLASK_ENV=production # Uncomment for production builds

# Run the Flask application
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000"]
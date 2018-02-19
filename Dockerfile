# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Set the working directory to /projetForMalkyrs
WORKDIR /projetForMalkyrs

# Copy the current directory contents into the container at /projetForMalkyrs
ADD . /projetForMalkyrs

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run project
CMD index.html

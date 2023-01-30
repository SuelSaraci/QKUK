# Use an official PostgreSQL image as the base image
FROM postgres:12.4-alpine

# Install the PostGIS extension for PostgreSQL
RUN apk update && apk add --no-cache \
    postgis \
    bash

# Set the environment variables for the PostgreSQL instance
ENV POSTGRES_USER=myuser \
    POSTGRES_PASSWORD=mysecretpassword \
    POSTGRES_DB=mydb

# Create a new PostgreSQL database and enable the PostGIS extension
RUN echo "CREATE DATABASE ${POSTGRES_DB};" | psql -U postgres
RUN echo "CREATE EXTENSION postgis;" | psql -U postgres -d mydb

# Expose the default PostgreSQL port
EXPOSE 5432

# Set the current working directory to the root directory
WORKDIR /

# Use an official GeoServer image as the base image
FROM docker.osgeo.org/geoserver:2.21.1

# Mount the local data directory to the container
VOLUME /mnt/c/Users/Admin/Desktop/geoserverdata:/opt/geoserver_data

# Expose the default GeoServer port
EXPOSE 8080

# Run GeoServer when the container starts
CMD ["/usr/local/tomcat/bin/catalina.sh", "run"]
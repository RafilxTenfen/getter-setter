FROM postgres

RUN mkdir -p /docker-entrypoint-initdb.d/
COPY init.sql /docker-entrypoint-initdb.d/10-init.sql
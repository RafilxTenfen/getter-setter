CREATE DATABASE ei;
GRANT ALL PRIVILEGES ON DATABASE ei TO postgres;

CREATE USER rafilx;
GRANT ALL PRIVILEGES ON DATABASE ei TO rafilx;
GRANT ALL PRIVILEGES ON DATABASE app TO rafilx;
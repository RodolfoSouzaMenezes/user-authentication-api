--Extenção que permite gerar um uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--Extenção que permite gerar uma senha crypitografada
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

--Incerindo dados inicias
INSERT INTO application_user (username, password) VALUES ('rodolfo', crypt('admin', 'my_salt'));
INSERT INTO application_user (username, password) VALUES ('admin', crypt('admin', 'my_salt'));
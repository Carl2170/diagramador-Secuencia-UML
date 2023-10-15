-- Active: 1695438067521@@127.0.0.1@3307@diagramadorsequence

CREATE DATABASE IF NOT EXISTS diagramadorsequence

USE diagramadorsequence

CREATE TABLE IF NOT EXISTS users (
    id int AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(50) NOT NULL,
     last_name VARCHAR(50),
     email VARCHAR(100) NOT NULL,
     password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS rol_user (
  id int AUTO_INCREMENT PRIMARY KEY,
  user_id int,
  rol_id int,
  FOREIGN KEY(user_id)REFERENCES users(id),
  FOREIGN KEY(rol_id)REFERENCES role(id)
);

CREATE TABLE IF NOT EXISTS permission (
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
)

drop table project

select * from session

CREATE TABLE IF NOT EXISTS session(
    id int AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(30) NOT NULL,
     user_id int,
    FOREIGN KEY(user_id)REFERENCES users(id)
);

drop table notification

CREATE TABLE IF NOT EXISTS project(
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    sala_id int,
    FOREIGN KEY(sala_id)REFERENCES session(id)
    
   
);

CREATE TABLE IF NOT EXISTS project_user (
    id int AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    project_id int,
    FOREIGN KEY(user_id)REFERENCES users(id),
    FOREIGN KEY(project_id)REFERENCES project(id)
);

CREATE TABLE IF NOT EXISTS notification (
    id int AUTO_INCREMENT PRIMARY KEY,
    message varchar(80),
    status int,
    answer int,
    user_id int,
    sala_id int,
    FOREIGN KEY(user_id)REFERENCES users(id),
    FOREIGN KEY(sala_id)REFERENCES session(id)
);

CREATE TABLE IF NOT EXISTS sessions(
    session_id VARCHAR(128) COLLATE utf8mb4_bin not null,
    expires int(11) UNSIGNED NOT NULL,
    data MEDIUMTEXT COLLATE utf8mb4_bin,
    PRIMARY key(session_id)
)
USE master;
GO
if exists (select * from sysdatabases where name='github')
   DROP DATABASE github;
GO

CREATE DATABASE github
GO
USE github
GO


----- Create Tables -----
CREATE TABLE USERS (
  LOGIN VARCHAR(255) NOT NULL,
  NAME VARCHAR(255) NOT NULL,
  CREATED_AT DATE NOT NULL
);


----- Create Constraints -----
ALTER TABLE USERS ADD CONSTRAINT PK_USER PRIMARY KEY(LOGIN);

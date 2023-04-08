drop table if exists "user";
drop table if exists "role";
drop table if exists institution;

CREATE TABLE "role"(
	"id" SERIAL PRIMARY KEY,
	role_name VARCHAR(30)
);

CREATE TABLE institution(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(30),
	address VARCHAR(100),
	latitude FLOAT,
	"length" FLOAT
);

CREATE TABLE "user"(
	id SERIAL PRIMARY KEY,
	username VARCHAR(30) UNIQUE,
	email VARCHAR(30) UNIQUE,
	"password" TEXT,
	"role" INT REFERENCES "role"("id"),
	institution INT REFERENCES institution("id")
);


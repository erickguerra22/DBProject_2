drop table if exists "user";
drop table if exists "role";
drop table if exists institution;

CREATE TABLE "role"(
	"id" SERIAL PRIMARY KEY,
	role_name VARCHAR(30)
);

CREATE TABLE institution(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(30) UNIQUE,
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

INSERT INTO "role" VALUES(0,'admin');
INSERT INTO "role" VALUES(DEFAULT,'manager');


INSERT INTO institution VALUES(DEFAULT,'Hospital San Juan de Dios', 'Zona 1 Ciudad de Guatemala, 1ra Avenida "A" 10-50',9.93363435,-84.0860790430928);
CREATE TABLE "reading_grade_levels" (
	"id" SERIAL PRIMARY KEY,
	"reading_grade_level" VARCHAR(55)
);

INSERT INTO "reading_grade_levels" ("reading_grade_level")
VALUES ('Kindergarten'), ('First Grade'), ('Second Grade'), ('Third Grade'), ('Fourth Grade'), ('Fifth Grade'), ('Sixth Grade'), ('Seventh Grade'), ('Eighth Grade'), ('Ninth Grade');

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(255) UNIQUE NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"reading_grade_level" INT REFERENCES "reading_grade_levels",
	"auth_level" VARCHAR(25) NOT NULL DEFAULT 'USER'
);

CREATE TABLE "genres" (
	"id" SERIAL PRIMARY KEY,
	"genre_name" VARCHAR(255) NOT NULL
);

INSERT INTO "genres" ("genre_name")
VALUES ('Picture Book'), ('Poetry'), ('Fiction'), ('Nonfiction'), ('Historical'), ('Fairy Tale'), ('Folk Lore'), ('Science Fiction'), ('Fantasy'), ('Mystery'), ('Informational'), ('Fact-Based'), ('Biographical'), ('Music');


CREATE TABLE "books" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL,
	"author" VARCHAR(255) NOT NULL,
	"isbn" VARCHAR(255),
	"genre_id" INT REFERENCES "genres",
	"description" VARCHAR(8000),
	"book_cover_image" VARCHAR(5000),
	"reading_grade_level_id" INT REFERENCES "reading_grade_levels",
	"info_page" VARCHAR(1000),
	"quantity" INT DEFAULT 1
);

CREATE TABLE "books_genres" (
	"id" SERIAL PRIMARY KEY,
	"book_id" INT REFERENCES "books",
	"genre_id" INT REFERENCES "genres"
);


CREATE TABLE "orders" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",	
	"order_date" DATE,
	"is_fulfilled" BOOLEAN DEFAULT false
);

CREATE TABLE "orders_books" (
	"id" SERIAL PRIMARY KEY,
	"order_id" INT REFERENCES "orders",
	"book_id" INT REFERENCES "books",
	"date_completed" DATE DEFAULT null
);
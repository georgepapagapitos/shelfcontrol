CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(255) UNIQUE NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"age" INT NOT NULL,
	"reading_grade_level" VARCHAR(2),
	"auth_level" VARCHAR(25) NOT NULL DEFAULT 'USER'
);

CREATE TABLE "genres" (
	"id" SERIAL PRIMARY KEY,
	"genre_name" VARCHAR(255) NOT NULL
);

INSERT INTO "genres" ("genre_name")
VALUES ('Picture Book'), ('Poetry'), ('Realistic Fiction'), ('Nonfiction'),
('Historical Fiction'), ('Fairy Tale'), ('Folk Lore'), ('Science Fiction'),
('Fantasy'), ('Mystery'), ('Informational'), ('Fact-Based'), ('Biographical'), ('Music');


CREATE TABLE "books" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL,
	"author" VARCHAR(255) NOT NULL,
	"genre_id" INT REFERENCES "genres",
	"description" VARCHAR(1000),
	"book_cover_image" VARCHAR(1000),
	"reading_grade_level" VARCHAR(2),
	"quantity" INT DEFAULT 1,
	"is_available" BOOLEAN DEFAULT true
);

CREATE TABLE "users_books" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",
	"book_id" INT REFERENCES "books",
	"is_complete" BOOLEAN DEFAULT false,
	"date_completed" DATE
);

CREATE TABLE "orders" (
	"id" SERIAL PRIMARY KEY,
	"book_id" INT REFERENCES "books",
	"order_date" DATE,
	"is_fulfilled" BOOLEAN DEFAULT false
);

CREATE TABLE "users_orders" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",
	"order_id" INT REFERENCES "orders"
);


INSERT INTO "books" ("title", "author", "genre_id", "description", "book_cover_image", "reading_grade_level")
VALUES 
('Where the Wild Things Are', 'Maurice Sendak', '9', 'Feeling misunderstood at home and at school, mischievous Max (Max Records) escapes to the land of the Wild Things, majestic -- and sometimes fierce -- creatures. They allow Max to become their leader, and he promises to create a kingdom where everyone will be happy. However, Max soon finds that being king is not easy and that, even being with the Wild Things, there is something missing.', 'https://images-na.ssl-images-amazon.com/images/I/A1wx+e0rJ2L.jpg')

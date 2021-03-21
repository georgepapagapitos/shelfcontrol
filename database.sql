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

CREATE TABLE "orders" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",	
	"order_date" DATE,
	"is_active" BOOLEAN DEFAULT true,
	"is_fulfilled" BOOLEAN DEFAULT false
);

CREATE TABLE "orders_books" (
	"id" SERIAL PRIMARY KEY,
	"order_id" INT REFERENCES "orders",
	"book_id" INT REFERENCES "books",
	"date_completed" DATE DEFAULT null
);



--CART ROUTER:

--GET FETCH_ACTIVE_CART             
SELECT "books".id AS "book_id", "books".title, "books".author, "orders_books".order_id, "orders".is_active, "orders".user_id 
FROM "books"
JOIN "orders_books" ON "books".id="orders_books".book_id 
JOIN "orders" ON "orders".id="orders_books".order_id 
WHERE "orders".is_active=true;

--POST ADD_TO_NEW_CART
INSERT INTO "orders" ("user_id") VALUES ($1) RETURNING "id";
INSERT INTO "orders_books" ("order_id", "book_id") VALUES ($1, $2);

--POST ADD_TO_EXISTING_CART
INSERT INTO "orders_books" ("order_id", "book_id") VALUES (1, 2);

--DELETE REMOVE_FROM_CART
DELETE FROM "orders_books" WHERE "book_id"=1;

--PUT CHECKOUT
UPDATE "orders" SET "is_active"=false, "order_date"=$1 WHERE "id"=$2 AND "user_id"=$3;


--ORDER ROUTER:

--GET FETCH_ACTIVE_ORDERS
SELECT "orders".id FROM "orders" WHERE "orders".is_active=true AND "orders".user_id=2;

--GET FETCH_ALL_ORDERS
SELECT "orders".id, "users".first_name, "users".last_name, "orders".is_fulfilled, JSON_AGG("books".title) AS "books"
FROM "users"
JOIN "orders" ON "users".id="orders".user_id
JOIN "orders_books" ON "orders".id="orders_books".order_id
JOIN "books" ON "orders_books".book_id="books".id
GROUP BY "orders".id, "users".first_name, "users".last_name;

--GET FETCH_USER_ORDERS
SELECT "books".title, "books".book_cover_image, "books".id AS "book_id", "orders_books".order_id, "orders_books".date_completed, "orders".id, "orders".user_id, "orders".order_date, "orders".is_fulfilled, "orders".is_active 
FROM "books" 
JOIN "orders_books" ON "books".id="orders_books".book_id 
JOIN "orders" ON "orders_books".order_id="orders".id 
WHERE "orders".user_id=3;

--PUT MARK_ORDER_SENT
UPDATE "orders" SET "is_fulfilled"=true WHERE "id"=1;


--GENRE ROUTER:

--GET FETCH_GENRES
SELECT * FROM "genres";

--POST ADD_NEW_GENRE
INSERT INTO "genres" ("genre_name") VALUES ($1) RETURNING "id";


--BOOK ROUTER:

--GET FETCH_BOOKS
SELECT "books".id, "books".title, "books".author, "books".isbn, "books".description, "books".book_cover_image, "books".info_page, "books".quantity, "genres".genre_name, "reading_grade_levels".reading_grade_level 
FROM "books" 
JOIN "genres" ON "books".genre_id="genres".id 
JOIN "reading_grade_levels" ON "reading_grade_levels".id="books".reading_grade_level_id 
ORDER BY "books".title ASC;

--POST ADD_BOOK
INSERT INTO "books" ("title", "author", "genre_id", "isbn", "description", "book_cover_image", "reading_grade_level_id", "info_page")
VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
RETURNING "id";

--DELETE DELETE_BOOK
DELETE FROM "books" WHERE "id"=$1;

--PUT INCREASE_QUANTITY
UPDATE "books" SET "quantity" = "quantity" + 1 WHERE "id"=$1;

--PUT DECREASE QUANTITY
UPDATE "books" SET "quantity" = "quantity" - 1 WHERE "id"=$1;


-- READING LEVEL ROUTER:

-- GET FETCH_READING_GRADE_LEVELS
SELECT * FROM "reading_grade_levels";
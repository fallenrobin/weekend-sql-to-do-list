CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(250) NOT NULL,
	"priority" VARCHAR(20),
	"category" VARCHAR(20)
);

ALTER TABLE "tasks"
ADD "completed" boolean;

INSERT INTO "tasks" ("task", "priority", "category", "completed")
VALUES ('Taxes boooo', 'ASAP', 'home', false), 
('Fly a kite', 'soonish', 'home', false),
('Be pantsless', 'whenevs', 'work', false),
('Shave the cat', 'ASAP', 'work', false),
('Eat lots of cheese', 'whenevs', 'work', false),
('Spray tan', 'soonish', 'home', false),
('Tattoo CRUD on knuckles', 'ASAP', 'school', true)
;

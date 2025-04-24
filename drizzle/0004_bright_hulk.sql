CREATE TABLE `presenters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` text,
	`nickName` text NOT NULL,
	`programme` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `presenters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `programming` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`starts` text NOT NULL,
	`ends` varchar(255),
	`presenter` varchar(255),
	`weekday?` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `programming_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `presenters` ADD CONSTRAINT `presenters_programme_programming_id_fk` FOREIGN KEY (`programme`) REFERENCES `programming`(`id`) ON DELETE cascade ON UPDATE no action;
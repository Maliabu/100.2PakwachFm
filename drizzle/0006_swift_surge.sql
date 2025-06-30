CREATE TABLE `opportunities_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` text,
	`purpose` text NOT NULL,
	`message` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `opportunities_table_id` PRIMARY KEY(`id`)
);

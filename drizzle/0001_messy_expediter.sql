CREATE TABLE `notification_users` (
	`id` int NOT NULL,
	`notification_id` int NOT NULL,
	`user_id` int NOT NULL,
	CONSTRAINT `notification_users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int NOT NULL,
	`user` int NOT NULL,
	`status` text NOT NULL,
	`notification` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `articles_table` RENAME COLUMN `date of article` TO `date`;--> statement-breakpoint
ALTER TABLE `notification_users` ADD CONSTRAINT `notification_users_notification_id_notifications_id_fk` FOREIGN KEY (`notification_id`) REFERENCES `notifications`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notification_users` ADD CONSTRAINT `notification_users_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_user_users_table_id_fk` FOREIGN KEY (`user`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;
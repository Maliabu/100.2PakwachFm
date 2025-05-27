CREATE TABLE `events_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`link` varchar(255),
	`event_image` varchar(255) NOT NULL,
	`start_date` timestamp,
	`end_date` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `events_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `activity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user` int NOT NULL,
	`value` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `activity_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `articles_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`facebook_link` varchar(255),
	`twitter_link` varchar(255),
	`instagram_link` varchar(255),
	`article_image` varchar(255),
	`writer` text NOT NULL,
	`type` text NOT NULL DEFAULT ('highlight'),
	`date of article` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `articles_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comments_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` text NOT NULL,
	`comment` varchar(255),
	`article_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `comments_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`outline` text,
	`course_image` varchar(255),
	`mentor_id` int NOT NULL,
	`start_date` timestamp NOT NULL,
	`end_date` timestamp NOT NULL,
	`currency_id` int NOT NULL,
	`amount` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `course_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `currency_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`currency_code` text NOT NULL,
	`currency_name` text NOT NULL,
	`name` text NOT NULL,
	`country_code` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `currency_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `editor_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`image` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `editor_images_id` PRIMARY KEY(`id`),
	CONSTRAINT `editor_images_image_unique` UNIQUE(`image`)
);
--> statement-breakpoint
CREATE TABLE `enrollments_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`course_id` int NOT NULL,
	`email` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `enrollments_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` text NOT NULL,
	`message` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `messages_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `messages_table_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `next_course_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`course_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `next_course_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
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
	`weekday` text DEFAULT ('true'),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `programming_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reply_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` text NOT NULL,
	`comment` varchar(255),
	`comment_id` int NOT NULL,
	`article_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `reply_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `subscriptions_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscriptions_table_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`username` varchar(255) NOT NULL,
	`phone` text,
	`profile_picture` varchar(255),
	`type` text NOT NULL DEFAULT ('user'),
	`decInitVector` varchar(255) NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`is_logged_in` boolean NOT NULL DEFAULT false,
	`last_login` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_table_token_unique` UNIQUE(`token`),
	CONSTRAINT `users_table_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_table_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
CREATE TABLE `votes_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` text NOT NULL,
	`vote` int,
	`article_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `votes_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `activity` ADD CONSTRAINT `activity_user_users_table_id_fk` FOREIGN KEY (`user`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments_table` ADD CONSTRAINT `comments_table_article_id_articles_table_id_fk` FOREIGN KEY (`article_id`) REFERENCES `articles_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course_table` ADD CONSTRAINT `course_table_mentor_id_users_table_id_fk` FOREIGN KEY (`mentor_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course_table` ADD CONSTRAINT `course_table_currency_id_currency_table_id_fk` FOREIGN KEY (`currency_id`) REFERENCES `currency_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `enrollments_table` ADD CONSTRAINT `enrollments_table_course_id_course_table_id_fk` FOREIGN KEY (`course_id`) REFERENCES `course_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `next_course_table` ADD CONSTRAINT `next_course_table_course_id_course_table_id_fk` FOREIGN KEY (`course_id`) REFERENCES `course_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `presenters` ADD CONSTRAINT `presenters_programme_programming_id_fk` FOREIGN KEY (`programme`) REFERENCES `programming`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reply_table` ADD CONSTRAINT `reply_table_comment_id_comments_table_id_fk` FOREIGN KEY (`comment_id`) REFERENCES `comments_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reply_table` ADD CONSTRAINT `reply_table_article_id_articles_table_id_fk` FOREIGN KEY (`article_id`) REFERENCES `articles_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `votes_table` ADD CONSTRAINT `votes_table_article_id_articles_table_id_fk` FOREIGN KEY (`article_id`) REFERENCES `articles_table`(`id`) ON DELETE cascade ON UPDATE no action;
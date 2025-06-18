CREATE TABLE `web_events` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36),
	`event_type` varchar(100),
	`metadata` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `web_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `web_users` (
	`id` varchar(36) NOT NULL,
	`consent` varchar(5) DEFAULT 'true',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL,
	CONSTRAINT `web_users_id` PRIMARY KEY(`id`)
);

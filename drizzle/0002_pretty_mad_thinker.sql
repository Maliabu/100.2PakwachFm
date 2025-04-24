ALTER TABLE `articles_table` RENAME COLUMN `link` TO `facebook_link`;--> statement-breakpoint
ALTER TABLE `articles_table` ADD `twitter_link` varchar(255);--> statement-breakpoint
ALTER TABLE `articles_table` ADD `instagram_link` varchar(255);
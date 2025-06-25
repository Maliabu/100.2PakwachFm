import { relations } from 'drizzle-orm';
import { boolean, int, json, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';

const createdAt = timestamp('created_at').notNull().defaultNow()
const updatedAt = timestamp('updated_at')
  .notNull()
  .$onUpdate(() => new Date())

export const usersTable = mysqlTable('users_table', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', {length: 255}).notNull(),
  password: varchar('password', {length: 255}).notNull(),
  email: text('email').notNull().unique(),
  token: text('token').notNull().unique(),
  username: varchar('username', {length: 255}).notNull().unique(),
  phone: text('phone').unique(),
  profilePicture: varchar('profile_picture', {length: 255}),
  userType: text('type').notNull().default("user"),
  decInit: varchar('decInitVector', {length: 255}).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  isLoggedIn: boolean("is_logged_in").notNull().default(false),
  lastLogin: timestamp('last_login'),
  createdAt,
  updatedAt,
});

export const currencyTable = mysqlTable('currency_table', {
  id: int('id').primaryKey().autoincrement(),
  code: text('currency_code').notNull(),
  currency: text('currency_name').notNull(),
  country: text('name').notNull(),
  country_code: text('country_code').notNull(),
  createdAt,
  updatedAt,
});

export const courseTable = mysqlTable('course_table', {
  id: int('id').primaryKey().autoincrement(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  courseOutline: text('outline'),
  image: varchar('course_image', {length: 255}),
  mentor: int('mentor_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  currency: int("currency_id").notNull().references(() => currencyTable.id, {onDelete: 'cascade'}),
  amount: int('amount').notNull(),
  createdAt,
  updatedAt,
});

export const articlesTable = mysqlTable('articles_table', {
  id: int('id').primaryKey().autoincrement(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  facebookLink: varchar('facebook_link', {length: 255}),
  twitterLink: varchar('twitter_link', {length: 255}),
  instagramLink: varchar('instagram_link', {length: 255}),
  image: varchar('article_image', {length: 255}),
  writer: text('writer').notNull(),
  articleType: text('type').notNull().default('highlight'),
  date: timestamp('date').defaultNow().notNull(),
    createdAt,
    updatedAt,
});

export const programmingTable = mysqlTable('programming', {
  id: int('id').primaryKey().autoincrement(),
  programme: text('name').notNull(),
  startTime: text('starts').notNull(),
  endTime: varchar('ends', {length: 255}),
  weekday: text('weekday').default("true"),
  image: varchar('programming_image', {length: 255}).notNull().default('image'),
    createdAt,
    updatedAt,
});

export const presentersTable = mysqlTable('presenters', {
  id: int('id').primaryKey().autoincrement(),
  name: text('full_name'),
  radioName: text('nickName').notNull(),
  programme: int("programme").notNull().references(() => programmingTable.id, {onDelete: 'cascade'}),
    createdAt,
    updatedAt,
});

export const EventsTable = mysqlTable('events_table', {
  id: int('id').primaryKey().autoincrement(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  link: varchar('link', {length: 255}),
  image: varchar('event_image', {length: 255}).notNull(),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt,
  updatedAt,
});

export const notificationsTable = mysqlTable('notifications', {
  id: int('id').primaryKey().autoincrement(),
  sender: int("user_id").notNull().references(() => usersTable.id, {onDelete: 'cascade'}),
  status: text('status').notNull(),
  notification: text('notification').notNull(),
    createdAt,
    updatedAt,
});

export const ticketingTable = mysqlTable('tickets', {
  id: int('id').primaryKey().autoincrement(),
  opened: int("user_id").notNull().references(() => usersTable.id, {onDelete: 'cascade'}),
  status: text('status').notNull(),
  issue: text('issue').notNull(),
    createdAt,
    updatedAt,
});

export const notificationUsersTable = mysqlTable('notification_users', {
  id: int('id').primaryKey().autoincrement(),
  notification: int('notification_id').notNull().references(() => notificationsTable.id, { onDelete: 'cascade' }),
  user: int('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const enrollmentsTable = mysqlTable('enrollments_table', {
  id: int('id').primaryKey().autoincrement(),
  courseId: int('course_id').notNull().references(() => courseTable.id, { onDelete: 'cascade'}),
  email: text('email').notNull(),
    createdAt,
    updatedAt,
});

export const nextCourseTable = mysqlTable('next_course_table', {
  id: int('id').primaryKey().autoincrement(),
  courseId: int('course_id').notNull().references(() => courseTable.id, { onDelete: 'cascade'}),
    createdAt,
    updatedAt,
});

export const subscriptionsTable = mysqlTable('subscriptions_table', {
  id: int('id').primaryKey().autoincrement(),
  email: text('email').notNull().unique(),
    createdAt,
    updatedAt,
});

export const messagesTable = mysqlTable('messages_table', {
  id: int('id').primaryKey().autoincrement(),
  email: text('email').notNull().unique(),
  status: text('status').notNull(),
  message: text('message'),
    createdAt,
    updatedAt,
});

export const commentsTable = mysqlTable('comments_table', {
  id: int('id').primaryKey().autoincrement(),
  email: text('email').notNull(),
  comment: varchar('comment', {length: 255}),
  article: int('article_id').notNull().references(() => articlesTable.id, { onDelete: 'cascade'}),
  createdAt,
  updatedAt,
});


export const commentRelations = relations(commentsTable, ({one, many}) => ({
  article: one(articlesTable, {fields: [commentsTable.article], references: [articlesTable.id]}),
  replies: many(replyTable)
}))

export const replyTable = mysqlTable('reply_table', {
  id: int('id').primaryKey().autoincrement(),
  email: text('email').notNull(),
  reply: varchar('comment', {length: 255}),
  comment: int('comment_id').notNull().references(() => commentsTable.id, { onDelete: 'cascade'}),
  article: int('article_id').notNull().references(() => articlesTable.id, { onDelete: 'cascade'}),
  createdAt,
  updatedAt,
});

export const replyRelations = relations(replyTable, ({one}) => ({
  comment: one(commentsTable, {fields: [replyTable.comment], references: [commentsTable.id]})
}))

export const votesTable = mysqlTable('votes_table', {
  id: int('id').primaryKey().autoincrement(),
  email: text('email').notNull(),
  vote: int('vote'),
  article: int('article_id').notNull().references(() => articlesTable.id, { onDelete: 'cascade'}),
  createdAt,
  updatedAt,
});

export const articleRelations = relations(articlesTable, ({many}) => ({
  votes: many(votesTable),
  comments: many(commentsTable)
}))

export const votesRelations = relations(votesTable, ({one}) => ({
  article: one(articlesTable, {fields: [votesTable.article], references: [articlesTable.id]})
}))

export const userRelations = relations(usersTable, ({many}) => ({
  activity: many(activityTable)
}))

export const activityTable = mysqlTable('activity', {
  id: int('id').primaryKey().autoincrement(),
  user: int("user_id").notNull().references(() => usersTable.id, {onDelete: 'cascade'}),
  activity: text('value').notNull(),
    createdAt,
    updatedAt,
});

export const activityRelations = relations(activityTable, ({ one }) => ({
	users: one(usersTable, { fields: [activityTable.user], references: [usersTable.id] }),
}));

export const editorImagesTable = mysqlTable('editor_images', {
  id: int('id').primaryKey().autoincrement(),
  image: text('image').notNull().unique(),
  createdAt,
  updatedAt,
})

export const webUser = mysqlTable("web_users", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID
  consent: varchar("consent", { length: 5 }).default("true"),
createdAt,updatedAt
});

export const webEvents = mysqlTable("web_events", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID
  user_id: varchar("user_id", { length: 36 }),
  event_type: varchar("event_type", { length: 100 }),
  metadata: json("metadata"),
createdAt
});

export type InsertEditorImage = typeof editorImagesTable.$inferInsert;
export type SelectEditorImage = typeof editorImagesTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertComment = typeof commentsTable.$inferInsert;
export type SelectComment = typeof commentsTable.$inferSelect;

export type InsertSubscription = typeof subscriptionsTable.$inferInsert;
export type SelectSubscription = typeof subscriptionsTable.$inferSelect;

export type InsertPost = typeof courseTable.$inferInsert;
export type SelectPost = typeof courseTable.$inferSelect;

export type InsertArticle = typeof articlesTable.$inferInsert;
export type SelectArticle = typeof articlesTable.$inferSelect;

export type InsertEnrollment = typeof enrollmentsTable.$inferInsert;
export type SelectEnrollment = typeof enrollmentsTable.$inferSelect;

export type InsertVote = typeof votesTable.$inferInsert;
export type SelectVote = typeof votesTable.$inferSelect;

export type InsertReply = typeof replyTable.$inferInsert;
export type SelectReply = typeof replyTable.$inferSelect;

export type InsertSchedule = typeof nextCourseTable.$inferInsert;
export type SelectSchedule = typeof nextCourseTable.$inferSelect;

export type InsertEvent = typeof EventsTable.$inferInsert;
export type SelectEvent = typeof EventsTable.$inferSelect;

export type InsertCurrency = typeof currencyTable.$inferInsert;
export type SelectCurrency = typeof currencyTable.$inferSelect;

export type InsertMessage = typeof messagesTable.$inferInsert;
export type SelectMessage = typeof messagesTable.$inferSelect

export type InsertActvity = typeof activityTable.$inferInsert;
export type SelectActivity = typeof activityTable.$inferSelect;

export type InsertNotification = typeof notificationsTable.$inferInsert;
export type SelectNotification = typeof notificationsTable.$inferSelect;

export type InsertNotificationsUser = typeof notificationUsersTable.$inferInsert;
export type SelectNotificationsUser = typeof notificationUsersTable.$inferSelect;

export type InsertWebUser = typeof webUser.$inferInsert;
export type SelectWebUser = typeof webUser.$inferSelect;

export type InsertWebEvents = typeof webEvents.$inferInsert;
export type SelectWebEvents = typeof webEvents.$inferSelect;
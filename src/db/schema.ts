import {
  pgTable,
  text,
  integer,
  timestamp,
  varchar,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  active: boolean("is_active").default(true).notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export type User = typeof user.$inferSelect;

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const post = pgTable("posts", {
  id: text("post_id").primaryKey(),
  title: varchar("title"),
  content: text("body").notNull(),
  authorId: text("author_id").references(() => user.id, {
    onDelete: "cascade",
  }),
  likedUsers: text("liked_users")
    .array()
    .default(sql`'{}'::text[]`),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  modifiedAt: timestamp("modified_at").notNull().defaultNow(),
});

export const comment = pgTable("comments", {
  id: text("comment_id").primaryKey(),
  body: text("body").notNull(),
  postId: text("post_id")
    .notNull()
    .references(() => post.id),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  modifiedAt: timestamp("modified_at"),
});

export const targetType = pgEnum("target_type", ["post", "comment"]);

export const media = pgTable("media", {
  id: text("id").primaryKey(),
  targetType: targetType("target_type").notNull(),
  postId: text("post_id").references(() => post.id, {
    onDelete: "cascade",
  }),
  commentId: text("comment_id").references(() => comment.id, {
    onDelete: "cascade",
  }),
  media: text("media")
    .array()
    .default(sql`'{}::text[]`)
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

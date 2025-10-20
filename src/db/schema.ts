import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  username: text("username").notNull(),
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

export const posts = pgTable("posts", {
  postId: uuid("id").primaryKey().defaultRandom(),
  body: text("body").notNull(),
  authorId: text("author_id").references(() => user.id, {
    onDelete: "cascade",
  }),
  isCollactable: boolean("is_collactable").default(false),
  urlList: text("urls_list")
    .array()
    .default(sql`ARRAY[]::text[]`),
  createdAt: timestamp("created_at").defaultNow(),
  modifiedAt: timestamp("modified_at"),
});

export type PostValues = typeof posts.$inferSelect;

export const likes = pgTable("likes", {
  likeId: uuid("like_id").primaryKey().defaultRandom(),
  postId: uuid("post_id").references(() => posts.postId, {
    onDelete: "cascade",
  }),
  userId: text("user_id").references(() => user.id, {
    onDelete: "cascade",
  }),
});
export type LikeValues = typeof likes.$inferSelect;

export const targetType = pgEnum("target_type", ["post", "comment"]);

export const collections = pgTable("collections", {
  collectionId: uuid("collection_id").primaryKey().defaultRandom(),
  postId: uuid("post_id")
    .notNull()
    .references(() => posts.postId, { onDelete: "cascade" }),
  collectedBy: text("collected_by")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
});

export type CollectionValues = typeof collections.$inferSelect;

export const gifts = pgTable("gifts", {
  giftId: uuid("gift_id").primaryKey().defaultRandom(),
  transactionId: text("transaction_id").notNull(),
  postId: uuid("post_id")
    .references(() => posts.postId, {
      onDelete: "cascade",
    })
    .notNull(),
  senderId: text("sender_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export type GiftValues = typeof gifts.$inferSelect;

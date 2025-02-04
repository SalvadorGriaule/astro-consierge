import { mysqlTable, serial,timestamp,varchar } from 'drizzle-orm/mysql-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot';


export const usersTable = mysqlTable('users',{
    id:serial().primaryKey(),
    pseudo:varchar({length:250}),
    email: varchar({length:250}).notNull().unique(),
    password: varchar({ length:250}).notNull(),
    timestamp: timestamp().defaultNow()
})

export const userInsertSchema = createInsertSchema(usersTable);
export const userSelectSchema = createSelectSchema(usersTable);
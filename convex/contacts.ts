import { query } from "./_generated/server";
import { v } from "convex/values";

export const getContacts = query({
    handler: async (ctx) => {
        const contacts = await ctx.db
            .query("contacts").collect()

        return contacts;
    },
});

// Get contact by ID

export const getTask = query({
    args: { taskId: v.id("tasks") },
    handler: async (ctx, args) => {
      const task = await ctx.db.query('contacts').withIndex('contact_by_id').first()
        return task;
      // do something with `task`
    },
  });
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getContacts = query({
    handler: async (ctx) => {
        const contacts = await ctx.db
            .query("contacts").collect()

        return contacts;
    },
});

export const getContact = query({
    args: {
        contactId: v.id("contacts"),
    },
    handler: async (ctx, args) => {
        const contact = await ctx.db.get(args.contactId);
        return contact;
    },
})

// Create a new contact
export const createContact = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        phone: v.string(),
        address: v.string(),
        lastContacted: v.optional(v.string()),
        createdAt: v.string(),
        updatedAt: v.string(),
    },
    handler: async (ctx, args) => {
        const contact = await ctx.db.insert("contacts", {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            phone: args.phone,
            address: args.address,
            lastContacted: args.lastContacted,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
        })
    }
})

// Get contact by ID

// export const getTask = query({
//     args: { taskId: v.id("tasks") },
//     handler: async (ctx, args) => {
//       const task = await ctx.db.query('contacts').withIndex('contact_by_id').first()
//         return task;
//       // do something with `task`
//     },
//   });
import { defineSchema, defineTable } from "convex/server"
import { Infer, v } from "convex/values"

export const INTERVALS = {
    MONTH: "month",
    YEAR: "year",
} as const;

export const intervalValidator = v.union(
    v.literal(INTERVALS.MONTH),
    v.literal(INTERVALS.YEAR),
);

export type Interval = Infer<typeof intervalValidator>;

// Define a price object structure that matches your data
const priceValidator = v.object({
    amount: v.number(),
    polarId: v.string(),
});

// Define a prices object structure for a specific interval
const intervalPricesValidator = v.object({
    usd: priceValidator,
});


export default defineSchema({
    users: defineTable({
        createdAt: v.string(),
        email: v.string(),
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        userId: v.string(),
        subscription: v.optional(v.string()),
        credits: v.optional(v.string()),
        tokenIdentifier: v.string(),
    }).index("by_token", ["tokenIdentifier"]),
    plans: defineTable({
        key: v.string(),
        name: v.string(),
        description: v.string(),
        polarProductId: v.string(),
        prices: v.object({
            month: v.optional(intervalPricesValidator),
            year: v.optional(intervalPricesValidator),
        }),
    })
        .index("key", ["key"])
        .index("polarProductId", ["polarProductId"]),
    subscriptions: defineTable({
        userId: v.optional(v.string()),
        polarId: v.optional(v.string()),
        polarPriceId: v.optional(v.string()),
        currency: v.optional(v.string()),
        interval: v.optional(v.string()),
        status: v.optional(v.string()),
        currentPeriodStart: v.optional(v.number()),
        currentPeriodEnd: v.optional(v.number()),
        cancelAtPeriodEnd: v.optional(v.boolean()),
        amount: v.optional(v.number()),
        startedAt: v.optional(v.number()),
        endsAt: v.optional(v.number()),
        endedAt: v.optional(v.number()),
        canceledAt: v.optional(v.number()),
        customerCancellationReason: v.optional(v.string()),
        customerCancellationComment: v.optional(v.string()),
        metadata: v.optional(v.any()),
        customFieldData: v.optional(v.any()),
        customerId: v.optional(v.string()),
    })
        .index("userId", ["userId"])
        .index("polarId", ["polarId"]),
    webhookEvents: defineTable({
        type: v.string(),
        polarEventId: v.string(),
        createdAt: v.string(),
        modifiedAt: v.string(),
        data: v.any(),
    })
        .index("type", ["type"])
        .index("polarEventId", ["polarEventId"]),

    // Define a schema for the "contacts" table
    contacts: defineTable({
        account_id: v.string(),
        birthday: v.string(),
        company_name: v.string(),
        emails: v.array(
          v.object({
            email: v.string(),
            type: v.string()
          })
        ),
        id: v.string(),
        im_addresses: v.array(
          v.object({
            im_address: v.string(),
            type: v.string()
          })
        ),
        job_title: v.string(),
        manager_name: v.string(),
        given_name: v.string(),
        middle_name: v.string(),
        surname: v.string(),
        nickname: v.string(),
        notes: v.string(),
        object: v.string(),
        office_location: v.string(),
        phone_numbers: v.array(
          v.object({
            number: v.string(),
            type: v.string()
          })
        ),
        physical_addresses: v.array(v.any()),
        picture_url: v.string(),
        suffix: v.string(),
        web_pages: v.array(v.any()),
        groups: v.array(
          v.object({
            id: v.string(),
            object: v.string(),
            account_id: v.string(),
            name: v.string(),
            path: v.string()
          })
        )
      })
        .index("by_account", ["account_id"])
        .index("contact_by_id", ["id"])

})
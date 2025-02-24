import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

import { query } from "./_generated/server";

export const get = query({
	args: {
		paginationOpts: paginationOptsValidator,
		search: v.optional(v.string()),
	},
	handler: async (ctx) => {
		return await ctx.db.query('documents').collect();
	},
});

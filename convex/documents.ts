import { ConvexError, v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';
import { mutation, query } from './_generated/server';

export const create = mutation({
	args: {
		title: v.optional(v.string()),
		initialContent: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError('Unathorized');
		}

		const organizationId = (user.organization_id ?? undefined) as
			| string
			| undefined;

		return await ctx.db.insert('documents', {
			title: args.title ?? 'Untitled document',
			ownerId: user.subject,
			organizationId,
			initialContent: args.initialContent,
		});
	},
});

export const get = query({
	args: {
		paginationOpts: paginationOptsValidator,
		search: v.optional(v.string()),
	},
	handler: async (ctx) => {
		return await ctx.db.query('documents').collect();
	},
});

export const getById = query({
	args: { id: v.id('documents') },
	handler: async (ctx, { id }) => {
		const document = await ctx.db.get(id);

		if (!document) {
			throw new ConvexError('Document not found');
		}

		return document;
	},
});

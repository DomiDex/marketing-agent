import { z } from 'zod';
// Enums
export const skillTypeSchema = z.enum(['simple', 'with_rules', 'complex']);
export const runStatusSchema = z.enum(['queued', 'running', 'completed', 'failed', 'cancelled']);
export const channelTypeSchema = z.enum(['telegram', 'slack', 'web']);
export const outputFormatSchema = z.enum(['markdown', 'json', 'html']);
export const feedbackSourceSchema = z.enum(['telegram', 'web', 'api']);
export const issueSeveritySchema = z.enum(['high', 'medium', 'low']);
// Common schemas
export const uuidSchema = z.string().uuid();
export const slugSchema = z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/);
export const emailSchema = z.string().email();
// Pagination
export const paginationSchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(20),
    offset: z.coerce.number().int().min(0).default(0),
});
// Skills API
export const skillDetectRequestSchema = z.object({
    message: z.string().min(1).max(5000),
    clientSlug: z.string().optional(),
});
export const skillListQuerySchema = z.object({
    type: skillTypeSchema.optional(),
    search: z.string().optional(),
});
// Clients API
export const createClientSchema = z.object({
    name: z.string().min(1).max(200),
    slug: slugSchema,
    description: z.string().max(1000).optional(),
});
export const updateClientSchema = z.object({
    name: z.string().min(1).max(200).optional(),
    description: z.string().max(1000).optional(),
});
// Runs API
export const runOptionsSchema = z.object({
    outputFormat: outputFormatSchema.optional(),
    maxTokens: z.number().int().min(100).max(8192).optional(),
    temperature: z.number().min(0).max(1).optional(),
});
export const createRunSchema = z.object({
    skillName: z.string().min(1),
    message: z.string().min(1).max(10000),
    clientId: uuidSchema.optional(),
    options: runOptionsSchema.optional(),
});
export const runListQuerySchema = paginationSchema.extend({
    status: runStatusSchema.optional(),
    skillName: z.string().optional(),
    clientId: uuidSchema.optional(),
});
// Outputs API
export const outputListQuerySchema = paginationSchema.extend({
    skillName: z.string().optional(),
    clientId: uuidSchema.optional(),
});
// Feedback API
export const feedbackIssueSchema = z.object({
    description: z.string().min(1).max(500),
    severity: issueSeveritySchema,
    suggestedFix: z.string().max(500).optional(),
});
export const suggestedRuleChangeSchema = z.object({
    file: z.string().min(1).max(200),
    currentRule: z.string().max(500).optional(),
    suggestedChange: z.string().min(1).max(1000),
    rationale: z.string().min(1).max(500),
});
export const createFeedbackSchema = z.object({
    outputId: uuidSchema,
    accuracyScore: z.number().int().min(1).max(5).optional(),
    qualityScore: z.number().int().min(1).max(5).optional(),
    usefulnessScore: z.number().int().min(1).max(5).optional(),
    ruleComplianceScore: z.number().int().min(1).max(5).optional(),
    overallScore: z.number().int().min(1).max(5),
    whatWorkedWell: z.string().max(2000).optional(),
    issues: z.array(feedbackIssueSchema).max(10).optional(),
    suggestedRuleChanges: z.array(suggestedRuleChangeSchema).max(5).optional(),
});
export const feedbackListQuerySchema = paginationSchema.extend({
    skillName: z.string().optional(),
    minScore: z.coerce.number().int().min(1).max(5).optional(),
    maxScore: z.coerce.number().int().min(1).max(5).optional(),
});
// Telegram webhook
export const telegramWebhookSchema = z.object({
    update_id: z.number(),
    message: z
        .object({
        message_id: z.number(),
        from: z.object({
            id: z.number(),
            is_bot: z.boolean(),
            first_name: z.string(),
            username: z.string().optional(),
        }),
        chat: z.object({
            id: z.number(),
            type: z.string(),
        }),
        date: z.number(),
        text: z.string().optional(),
    })
        .optional(),
    callback_query: z
        .object({
        id: z.string(),
        from: z.object({
            id: z.number(),
            is_bot: z.boolean(),
            first_name: z.string(),
            username: z.string().optional(),
        }),
        message: z
            .object({
            message_id: z.number(),
            chat: z.object({
                id: z.number(),
                type: z.string(),
            }),
        })
            .optional(),
        data: z.string().optional(),
    })
        .optional(),
});
// API key validation
export const apiKeySchema = z.string().regex(/^ma_live_[a-f0-9]{32}$/);
//# sourceMappingURL=index.js.map
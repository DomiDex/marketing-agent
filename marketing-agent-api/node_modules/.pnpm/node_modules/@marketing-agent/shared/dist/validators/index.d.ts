import { z } from 'zod';
export declare const skillTypeSchema: z.ZodEnum<["simple", "with_rules", "complex"]>;
export declare const runStatusSchema: z.ZodEnum<["queued", "running", "completed", "failed", "cancelled"]>;
export declare const channelTypeSchema: z.ZodEnum<["telegram", "slack", "web"]>;
export declare const outputFormatSchema: z.ZodEnum<["markdown", "json", "html"]>;
export declare const feedbackSourceSchema: z.ZodEnum<["telegram", "web", "api"]>;
export declare const issueSeveritySchema: z.ZodEnum<["high", "medium", "low"]>;
export declare const uuidSchema: z.ZodString;
export declare const slugSchema: z.ZodString;
export declare const emailSchema: z.ZodString;
export declare const paginationSchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
}>;
export declare const skillDetectRequestSchema: z.ZodObject<{
    message: z.ZodString;
    clientSlug: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message: string;
    clientSlug?: string | undefined;
}, {
    message: string;
    clientSlug?: string | undefined;
}>;
export declare const skillListQuerySchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["simple", "with_rules", "complex"]>>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "simple" | "with_rules" | "complex" | undefined;
    search?: string | undefined;
}, {
    type?: "simple" | "with_rules" | "complex" | undefined;
    search?: string | undefined;
}>;
export declare const createClientSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    description?: string | undefined;
}, {
    name: string;
    slug: string;
    description?: string | undefined;
}>;
export declare const updateClientSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
}>;
export declare const runOptionsSchema: z.ZodObject<{
    outputFormat: z.ZodOptional<z.ZodEnum<["markdown", "json", "html"]>>;
    maxTokens: z.ZodOptional<z.ZodNumber>;
    temperature: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    outputFormat?: "markdown" | "json" | "html" | undefined;
    maxTokens?: number | undefined;
    temperature?: number | undefined;
}, {
    outputFormat?: "markdown" | "json" | "html" | undefined;
    maxTokens?: number | undefined;
    temperature?: number | undefined;
}>;
export declare const createRunSchema: z.ZodObject<{
    skillName: z.ZodString;
    message: z.ZodString;
    clientId: z.ZodOptional<z.ZodString>;
    options: z.ZodOptional<z.ZodObject<{
        outputFormat: z.ZodOptional<z.ZodEnum<["markdown", "json", "html"]>>;
        maxTokens: z.ZodOptional<z.ZodNumber>;
        temperature: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        outputFormat?: "markdown" | "json" | "html" | undefined;
        maxTokens?: number | undefined;
        temperature?: number | undefined;
    }, {
        outputFormat?: "markdown" | "json" | "html" | undefined;
        maxTokens?: number | undefined;
        temperature?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    message: string;
    skillName: string;
    options?: {
        outputFormat?: "markdown" | "json" | "html" | undefined;
        maxTokens?: number | undefined;
        temperature?: number | undefined;
    } | undefined;
    clientId?: string | undefined;
}, {
    message: string;
    skillName: string;
    options?: {
        outputFormat?: "markdown" | "json" | "html" | undefined;
        maxTokens?: number | undefined;
        temperature?: number | undefined;
    } | undefined;
    clientId?: string | undefined;
}>;
export declare const runListQuerySchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
} & {
    status: z.ZodOptional<z.ZodEnum<["queued", "running", "completed", "failed", "cancelled"]>>;
    skillName: z.ZodOptional<z.ZodString>;
    clientId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    status?: "queued" | "running" | "completed" | "failed" | "cancelled" | undefined;
    skillName?: string | undefined;
    clientId?: string | undefined;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
    status?: "queued" | "running" | "completed" | "failed" | "cancelled" | undefined;
    skillName?: string | undefined;
    clientId?: string | undefined;
}>;
export declare const outputListQuerySchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
} & {
    skillName: z.ZodOptional<z.ZodString>;
    clientId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    skillName?: string | undefined;
    clientId?: string | undefined;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
    skillName?: string | undefined;
    clientId?: string | undefined;
}>;
export declare const feedbackIssueSchema: z.ZodObject<{
    description: z.ZodString;
    severity: z.ZodEnum<["high", "medium", "low"]>;
    suggestedFix: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description: string;
    severity: "high" | "medium" | "low";
    suggestedFix?: string | undefined;
}, {
    description: string;
    severity: "high" | "medium" | "low";
    suggestedFix?: string | undefined;
}>;
export declare const suggestedRuleChangeSchema: z.ZodObject<{
    file: z.ZodString;
    currentRule: z.ZodOptional<z.ZodString>;
    suggestedChange: z.ZodString;
    rationale: z.ZodString;
}, "strip", z.ZodTypeAny, {
    file: string;
    suggestedChange: string;
    rationale: string;
    currentRule?: string | undefined;
}, {
    file: string;
    suggestedChange: string;
    rationale: string;
    currentRule?: string | undefined;
}>;
export declare const createFeedbackSchema: z.ZodObject<{
    outputId: z.ZodString;
    accuracyScore: z.ZodOptional<z.ZodNumber>;
    qualityScore: z.ZodOptional<z.ZodNumber>;
    usefulnessScore: z.ZodOptional<z.ZodNumber>;
    ruleComplianceScore: z.ZodOptional<z.ZodNumber>;
    overallScore: z.ZodNumber;
    whatWorkedWell: z.ZodOptional<z.ZodString>;
    issues: z.ZodOptional<z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        severity: z.ZodEnum<["high", "medium", "low"]>;
        suggestedFix: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        severity: "high" | "medium" | "low";
        suggestedFix?: string | undefined;
    }, {
        description: string;
        severity: "high" | "medium" | "low";
        suggestedFix?: string | undefined;
    }>, "many">>;
    suggestedRuleChanges: z.ZodOptional<z.ZodArray<z.ZodObject<{
        file: z.ZodString;
        currentRule: z.ZodOptional<z.ZodString>;
        suggestedChange: z.ZodString;
        rationale: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        file: string;
        suggestedChange: string;
        rationale: string;
        currentRule?: string | undefined;
    }, {
        file: string;
        suggestedChange: string;
        rationale: string;
        currentRule?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    outputId: string;
    overallScore: number;
    issues?: {
        description: string;
        severity: "high" | "medium" | "low";
        suggestedFix?: string | undefined;
    }[] | undefined;
    accuracyScore?: number | undefined;
    qualityScore?: number | undefined;
    usefulnessScore?: number | undefined;
    ruleComplianceScore?: number | undefined;
    whatWorkedWell?: string | undefined;
    suggestedRuleChanges?: {
        file: string;
        suggestedChange: string;
        rationale: string;
        currentRule?: string | undefined;
    }[] | undefined;
}, {
    outputId: string;
    overallScore: number;
    issues?: {
        description: string;
        severity: "high" | "medium" | "low";
        suggestedFix?: string | undefined;
    }[] | undefined;
    accuracyScore?: number | undefined;
    qualityScore?: number | undefined;
    usefulnessScore?: number | undefined;
    ruleComplianceScore?: number | undefined;
    whatWorkedWell?: string | undefined;
    suggestedRuleChanges?: {
        file: string;
        suggestedChange: string;
        rationale: string;
        currentRule?: string | undefined;
    }[] | undefined;
}>;
export declare const feedbackListQuerySchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
} & {
    skillName: z.ZodOptional<z.ZodString>;
    minScore: z.ZodOptional<z.ZodNumber>;
    maxScore: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    skillName?: string | undefined;
    minScore?: number | undefined;
    maxScore?: number | undefined;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
    skillName?: string | undefined;
    minScore?: number | undefined;
    maxScore?: number | undefined;
}>;
export declare const telegramWebhookSchema: z.ZodObject<{
    update_id: z.ZodNumber;
    message: z.ZodOptional<z.ZodObject<{
        message_id: z.ZodNumber;
        from: z.ZodObject<{
            id: z.ZodNumber;
            is_bot: z.ZodBoolean;
            first_name: z.ZodString;
            username: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        }, {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        }>;
        chat: z.ZodObject<{
            id: z.ZodNumber;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            id: number;
        }, {
            type: string;
            id: number;
        }>;
        date: z.ZodNumber;
        text: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message_id: number;
        from: {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        };
        date: number;
        chat: {
            type: string;
            id: number;
        };
        text?: string | undefined;
    }, {
        message_id: number;
        from: {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        };
        date: number;
        chat: {
            type: string;
            id: number;
        };
        text?: string | undefined;
    }>>;
    callback_query: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        from: z.ZodObject<{
            id: z.ZodNumber;
            is_bot: z.ZodBoolean;
            first_name: z.ZodString;
            username: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        }, {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        }>;
        message: z.ZodOptional<z.ZodObject<{
            message_id: z.ZodNumber;
            chat: z.ZodObject<{
                id: z.ZodNumber;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                id: number;
            }, {
                type: string;
                id: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            message_id: number;
            chat: {
                type: string;
                id: number;
            };
        }, {
            message_id: number;
            chat: {
                type: string;
                id: number;
            };
        }>>;
        data: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        from: {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        };
        id: string;
        message?: {
            message_id: number;
            chat: {
                type: string;
                id: number;
            };
        } | undefined;
        data?: string | undefined;
    }, {
        from: {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        };
        id: string;
        message?: {
            message_id: number;
            chat: {
                type: string;
                id: number;
            };
        } | undefined;
        data?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    update_id: number;
    message?: {
        message_id: number;
        from: {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        };
        date: number;
        chat: {
            type: string;
            id: number;
        };
        text?: string | undefined;
    } | undefined;
    callback_query?: {
        from: {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        };
        id: string;
        message?: {
            message_id: number;
            chat: {
                type: string;
                id: number;
            };
        } | undefined;
        data?: string | undefined;
    } | undefined;
}, {
    update_id: number;
    message?: {
        message_id: number;
        from: {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        };
        date: number;
        chat: {
            type: string;
            id: number;
        };
        text?: string | undefined;
    } | undefined;
    callback_query?: {
        from: {
            id: number;
            is_bot: boolean;
            first_name: string;
            username?: string | undefined;
        };
        id: string;
        message?: {
            message_id: number;
            chat: {
                type: string;
                id: number;
            };
        } | undefined;
        data?: string | undefined;
    } | undefined;
}>;
export declare const apiKeySchema: z.ZodString;
export type SkillType = z.infer<typeof skillTypeSchema>;
export type RunStatus = z.infer<typeof runStatusSchema>;
export type ChannelType = z.infer<typeof channelTypeSchema>;
export type OutputFormat = z.infer<typeof outputFormatSchema>;
export type FeedbackSource = z.infer<typeof feedbackSourceSchema>;
export type IssueSeverity = z.infer<typeof issueSeveritySchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type SkillDetectRequest = z.infer<typeof skillDetectRequestSchema>;
export type CreateClient = z.infer<typeof createClientSchema>;
export type UpdateClient = z.infer<typeof updateClientSchema>;
export type CreateRun = z.infer<typeof createRunSchema>;
export type CreateFeedback = z.infer<typeof createFeedbackSchema>;
export type FeedbackIssue = z.infer<typeof feedbackIssueSchema>;
export type SuggestedRuleChange = z.infer<typeof suggestedRuleChangeSchema>;
export type TelegramWebhook = z.infer<typeof telegramWebhookSchema>;
//# sourceMappingURL=index.d.ts.map
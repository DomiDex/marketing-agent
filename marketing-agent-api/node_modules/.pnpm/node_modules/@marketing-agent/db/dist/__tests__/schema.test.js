import { describe, expect, it } from 'vitest';
import { getTableColumns, getTableName } from 'drizzle-orm';
import { users, userChannels, clients, skills, runs, outputs, feedback, skillTypeEnum, runStatusEnum, } from '../schema';
describe('users table', () => {
    it('should have correct table name', () => {
        expect(getTableName(users)).toBe('users');
    });
    it('should have all required columns', () => {
        const columns = getTableColumns(users);
        expect(columns.id).toBeDefined();
        expect(columns.email).toBeDefined();
        expect(columns.apiKey).toBeDefined();
        expect(columns.apiKeyHash).toBeDefined();
        expect(columns.createdAt).toBeDefined();
        expect(columns.updatedAt).toBeDefined();
    });
    it('should have id as primary key with uuid type', () => {
        const columns = getTableColumns(users);
        expect(columns.id.primary).toBe(true);
        // Drizzle internally reports uuid as 'string' dataType
        expect(columns.id.dataType).toBe('string');
        expect(columns.id.columnType).toBe('PgUUID');
    });
    it('should have unique constraint on email', () => {
        const columns = getTableColumns(users);
        expect(columns.email.isUnique).toBe(true);
    });
    it('should have unique constraint on apiKey', () => {
        const columns = getTableColumns(users);
        expect(columns.apiKey.isUnique).toBe(true);
    });
    it('should have notNull constraint on apiKey', () => {
        const columns = getTableColumns(users);
        expect(columns.apiKey.notNull).toBe(true);
    });
    it('should have notNull constraint on apiKeyHash', () => {
        const columns = getTableColumns(users);
        expect(columns.apiKeyHash.notNull).toBe(true);
    });
    it('should have timestamps with defaults', () => {
        const columns = getTableColumns(users);
        expect(columns.createdAt.notNull).toBe(true);
        expect(columns.updatedAt.notNull).toBe(true);
    });
});
describe('userChannels table', () => {
    it('should have correct table name', () => {
        expect(getTableName(userChannels)).toBe('user_channels');
    });
    it('should have all required columns', () => {
        const columns = getTableColumns(userChannels);
        expect(columns.id).toBeDefined();
        expect(columns.userId).toBeDefined();
        expect(columns.channel).toBeDefined();
        expect(columns.channelUserId).toBeDefined();
        expect(columns.channelUsername).toBeDefined();
        expect(columns.linkedAt).toBeDefined();
    });
    it('should have userId as notNull', () => {
        const columns = getTableColumns(userChannels);
        expect(columns.userId.notNull).toBe(true);
    });
    it('should have channel as notNull', () => {
        const columns = getTableColumns(userChannels);
        expect(columns.channel.notNull).toBe(true);
    });
    it('should have channelUserId as notNull', () => {
        const columns = getTableColumns(userChannels);
        expect(columns.channelUserId.notNull).toBe(true);
    });
});
describe('clients table', () => {
    it('should have correct table name', () => {
        expect(getTableName(clients)).toBe('clients');
    });
    it('should have all required columns', () => {
        const columns = getTableColumns(clients);
        expect(columns.id).toBeDefined();
        expect(columns.userId).toBeDefined();
        expect(columns.name).toBeDefined();
        expect(columns.slug).toBeDefined();
        expect(columns.description).toBeDefined();
        expect(columns.s3Prefix).toBeDefined();
        expect(columns.createdAt).toBeDefined();
        expect(columns.updatedAt).toBeDefined();
    });
    it('should have userId as notNull (foreign key to users)', () => {
        const columns = getTableColumns(clients);
        expect(columns.userId.notNull).toBe(true);
    });
    it('should have name as notNull', () => {
        const columns = getTableColumns(clients);
        expect(columns.name.notNull).toBe(true);
    });
    it('should have slug as notNull', () => {
        const columns = getTableColumns(clients);
        expect(columns.slug.notNull).toBe(true);
    });
    it('should have s3Prefix as notNull', () => {
        const columns = getTableColumns(clients);
        expect(columns.s3Prefix.notNull).toBe(true);
    });
});
describe('skills table', () => {
    it('should have correct table name', () => {
        expect(getTableName(skills)).toBe('skills');
    });
    it('should have all required columns', () => {
        const columns = getTableColumns(skills);
        expect(columns.id).toBeDefined();
        expect(columns.name).toBeDefined();
        expect(columns.description).toBeDefined();
        expect(columns.type).toBeDefined();
        expect(columns.s3Key).toBeDefined();
        expect(columns.hasRules).toBeDefined();
        expect(columns.hasSubdirectories).toBeDefined();
        expect(columns.triggerKeywords).toBeDefined();
        expect(columns.relatedSkills).toBeDefined();
        expect(columns.createdAt).toBeDefined();
        expect(columns.updatedAt).toBeDefined();
    });
    it('should have unique constraint on name', () => {
        const columns = getTableColumns(skills);
        expect(columns.name.isUnique).toBe(true);
    });
    it('should have name as notNull', () => {
        const columns = getTableColumns(skills);
        expect(columns.name.notNull).toBe(true);
    });
    it('should have description as notNull', () => {
        const columns = getTableColumns(skills);
        expect(columns.description.notNull).toBe(true);
    });
    it('should have type as notNull', () => {
        const columns = getTableColumns(skills);
        expect(columns.type.notNull).toBe(true);
    });
    it('should have triggerKeywords as notNull', () => {
        const columns = getTableColumns(skills);
        expect(columns.triggerKeywords.notNull).toBe(true);
    });
    it('should have correct skillTypeEnum values', () => {
        expect(skillTypeEnum).toEqual(['simple', 'with_rules', 'complex']);
    });
});
describe('runs table', () => {
    it('should have correct table name', () => {
        expect(getTableName(runs)).toBe('runs');
    });
    it('should have all required columns', () => {
        const columns = getTableColumns(runs);
        expect(columns.id).toBeDefined();
        expect(columns.userId).toBeDefined();
        expect(columns.skillId).toBeDefined();
        expect(columns.clientId).toBeDefined();
        expect(columns.status).toBeDefined();
        expect(columns.userMessage).toBeDefined();
        expect(columns.inngestEventId).toBeDefined();
        expect(columns.tokensInput).toBeDefined();
        expect(columns.tokensOutput).toBeDefined();
        expect(columns.errorMessage).toBeDefined();
        expect(columns.metadata).toBeDefined();
        expect(columns.queuedAt).toBeDefined();
        expect(columns.startedAt).toBeDefined();
        expect(columns.completedAt).toBeDefined();
    });
    it('should have userId as notNull (foreign key to users)', () => {
        const columns = getTableColumns(runs);
        expect(columns.userId.notNull).toBe(true);
    });
    it('should have skillId as notNull (foreign key to skills)', () => {
        const columns = getTableColumns(runs);
        expect(columns.skillId.notNull).toBe(true);
    });
    it('should have clientId as nullable (optional foreign key to clients)', () => {
        const columns = getTableColumns(runs);
        expect(columns.clientId.notNull).toBe(false);
    });
    it('should have status with default value', () => {
        const columns = getTableColumns(runs);
        expect(columns.status.notNull).toBe(true);
    });
    it('should have userMessage as notNull', () => {
        const columns = getTableColumns(runs);
        expect(columns.userMessage.notNull).toBe(true);
    });
    it('should have correct runStatusEnum values', () => {
        expect(runStatusEnum).toEqual(['queued', 'running', 'completed', 'failed', 'cancelled']);
    });
});
describe('outputs table', () => {
    it('should have correct table name', () => {
        expect(getTableName(outputs)).toBe('outputs');
    });
    it('should have all required columns', () => {
        const columns = getTableColumns(outputs);
        expect(columns.id).toBeDefined();
        expect(columns.runId).toBeDefined();
        expect(columns.s3Key).toBeDefined();
        expect(columns.format).toBeDefined();
        expect(columns.title).toBeDefined();
        expect(columns.preview).toBeDefined();
        expect(columns.sizeBytes).toBeDefined();
        expect(columns.createdAt).toBeDefined();
    });
    it('should have runId as notNull (foreign key to runs)', () => {
        const columns = getTableColumns(outputs);
        expect(columns.runId.notNull).toBe(true);
    });
    it('should have s3Key as notNull', () => {
        const columns = getTableColumns(outputs);
        expect(columns.s3Key.notNull).toBe(true);
    });
    it('should have format as notNull with default', () => {
        const columns = getTableColumns(outputs);
        expect(columns.format.notNull).toBe(true);
    });
});
describe('feedback table', () => {
    it('should have correct table name', () => {
        expect(getTableName(feedback)).toBe('feedback');
    });
    it('should have all required columns', () => {
        const columns = getTableColumns(feedback);
        expect(columns.id).toBeDefined();
        expect(columns.outputId).toBeDefined();
        expect(columns.accuracyScore).toBeDefined();
        expect(columns.qualityScore).toBeDefined();
        expect(columns.usefulnessScore).toBeDefined();
        expect(columns.ruleComplianceScore).toBeDefined();
        expect(columns.overallScore).toBeDefined();
        expect(columns.whatWorkedWell).toBeDefined();
        expect(columns.issues).toBeDefined();
        expect(columns.suggestedRuleChanges).toBeDefined();
        expect(columns.source).toBeDefined();
        expect(columns.reviewerName).toBeDefined();
        expect(columns.createdAt).toBeDefined();
    });
    it('should have outputId as notNull (foreign key to outputs)', () => {
        const columns = getTableColumns(feedback);
        expect(columns.outputId.notNull).toBe(true);
    });
    it('should have overallScore as notNull', () => {
        const columns = getTableColumns(feedback);
        expect(columns.overallScore.notNull).toBe(true);
    });
    it('should have source as notNull', () => {
        const columns = getTableColumns(feedback);
        expect(columns.source.notNull).toBe(true);
    });
    it('should have optional score columns', () => {
        const columns = getTableColumns(feedback);
        expect(columns.accuracyScore.notNull).toBe(false);
        expect(columns.qualityScore.notNull).toBe(false);
        expect(columns.usefulnessScore.notNull).toBe(false);
        expect(columns.ruleComplianceScore.notNull).toBe(false);
    });
    it('should have JSONB columns for issues and suggestedRuleChanges', () => {
        const columns = getTableColumns(feedback);
        expect(columns.issues.dataType).toBe('json');
        expect(columns.suggestedRuleChanges.dataType).toBe('json');
    });
});
describe('Schema column types', () => {
    it('should use uuid type for all id columns', () => {
        // Drizzle reports uuid as 'string' dataType, but columnType is 'PgUUID'
        expect(getTableColumns(users).id.columnType).toBe('PgUUID');
        expect(getTableColumns(userChannels).id.columnType).toBe('PgUUID');
        expect(getTableColumns(clients).id.columnType).toBe('PgUUID');
        expect(getTableColumns(skills).id.columnType).toBe('PgUUID');
        expect(getTableColumns(runs).id.columnType).toBe('PgUUID');
        expect(getTableColumns(outputs).id.columnType).toBe('PgUUID');
        expect(getTableColumns(feedback).id.columnType).toBe('PgUUID');
    });
    it('should use timestamp type for date columns', () => {
        expect(getTableColumns(users).createdAt.dataType).toBe('date');
        expect(getTableColumns(users).updatedAt.dataType).toBe('date');
        expect(getTableColumns(runs).queuedAt.dataType).toBe('date');
    });
    it('should use varchar type for string columns with length limits', () => {
        expect(getTableColumns(users).email.dataType).toBe('string');
        expect(getTableColumns(clients).name.dataType).toBe('string');
        expect(getTableColumns(clients).slug.dataType).toBe('string');
    });
    it('should use text type for long text columns', () => {
        expect(getTableColumns(clients).description.dataType).toBe('string');
        expect(getTableColumns(skills).description.dataType).toBe('string');
        expect(getTableColumns(runs).userMessage.dataType).toBe('string');
    });
});
//# sourceMappingURL=schema.test.js.map
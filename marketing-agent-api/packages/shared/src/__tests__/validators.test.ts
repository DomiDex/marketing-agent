import { describe, expect, it } from 'vitest'
import {
  uuidSchema,
  slugSchema,
  emailSchema,
  paginationSchema,
  skillDetectRequestSchema,
  createClientSchema,
  updateClientSchema,
  createRunSchema,
  runOptionsSchema,
  createFeedbackSchema,
  apiKeySchema,
  telegramWebhookSchema,
  skillTypeSchema,
  runStatusSchema,
  channelTypeSchema,
  outputFormatSchema,
  feedbackSourceSchema,
  issueSeveritySchema,
} from '../validators'

describe('uuidSchema', () => {
  it('should accept valid UUIDs', () => {
    const validUuid = '123e4567-e89b-12d3-a456-426614174000'
    expect(uuidSchema.parse(validUuid)).toBe(validUuid)
  })

  it('should reject invalid UUIDs', () => {
    expect(() => uuidSchema.parse('not-a-uuid')).toThrow()
    expect(() => uuidSchema.parse('123e4567-e89b-12d3-a456')).toThrow()
    expect(() => uuidSchema.parse('')).toThrow()
  })
})

describe('slugSchema', () => {
  it('should accept valid slugs', () => {
    expect(slugSchema.parse('my-slug')).toBe('my-slug')
    expect(slugSchema.parse('slug123')).toBe('slug123')
    expect(slugSchema.parse('a')).toBe('a')
  })

  it('should reject slugs with uppercase letters', () => {
    expect(() => slugSchema.parse('MySlug')).toThrow()
  })

  it('should reject slugs with special characters', () => {
    expect(() => slugSchema.parse('my_slug')).toThrow()
    expect(() => slugSchema.parse('my.slug')).toThrow()
    expect(() => slugSchema.parse('my slug')).toThrow()
  })

  it('should reject empty slugs', () => {
    expect(() => slugSchema.parse('')).toThrow()
  })

  it('should reject slugs exceeding max length', () => {
    const longSlug = 'a'.repeat(101)
    expect(() => slugSchema.parse(longSlug)).toThrow()
  })

  it('should accept slugs at max length', () => {
    const maxSlug = 'a'.repeat(100)
    expect(slugSchema.parse(maxSlug)).toBe(maxSlug)
  })
})

describe('emailSchema', () => {
  it('should accept valid emails', () => {
    expect(emailSchema.parse('test@example.com')).toBe('test@example.com')
    expect(emailSchema.parse('user.name+tag@domain.co.uk')).toBe('user.name+tag@domain.co.uk')
  })

  it('should reject invalid emails', () => {
    expect(() => emailSchema.parse('not-an-email')).toThrow()
    expect(() => emailSchema.parse('@example.com')).toThrow()
    expect(() => emailSchema.parse('test@')).toThrow()
    expect(() => emailSchema.parse('')).toThrow()
  })
})

describe('paginationSchema', () => {
  it('should provide default values', () => {
    const result = paginationSchema.parse({})
    expect(result.limit).toBe(20)
    expect(result.offset).toBe(0)
  })

  it('should coerce string values', () => {
    const result = paginationSchema.parse({ limit: '10', offset: '5' })
    expect(result.limit).toBe(10)
    expect(result.offset).toBe(5)
  })

  it('should enforce min limit of 1', () => {
    expect(() => paginationSchema.parse({ limit: 0 })).toThrow()
  })

  it('should enforce max limit of 100', () => {
    expect(() => paginationSchema.parse({ limit: 101 })).toThrow()
  })

  it('should enforce min offset of 0', () => {
    expect(() => paginationSchema.parse({ offset: -1 })).toThrow()
  })
})

describe('skillDetectRequestSchema', () => {
  it('should accept valid request', () => {
    const result = skillDetectRequestSchema.parse({
      message: 'Write copy for my landing page',
    })
    expect(result.message).toBe('Write copy for my landing page')
    expect(result.clientSlug).toBeUndefined()
  })

  it('should accept optional clientSlug', () => {
    const result = skillDetectRequestSchema.parse({
      message: 'Write copy',
      clientSlug: 'my-client',
    })
    expect(result.clientSlug).toBe('my-client')
  })

  it('should reject empty message', () => {
    expect(() => skillDetectRequestSchema.parse({ message: '' })).toThrow()
  })

  it('should enforce message max length of 5000', () => {
    const longMessage = 'a'.repeat(5001)
    expect(() => skillDetectRequestSchema.parse({ message: longMessage })).toThrow()
  })

  it('should accept message at max length', () => {
    const maxMessage = 'a'.repeat(5000)
    expect(skillDetectRequestSchema.parse({ message: maxMessage }).message).toBe(maxMessage)
  })
})

describe('createClientSchema', () => {
  it('should accept valid client data', () => {
    const result = createClientSchema.parse({
      name: 'My Client',
      slug: 'my-client',
    })
    expect(result.name).toBe('My Client')
    expect(result.slug).toBe('my-client')
    expect(result.description).toBeUndefined()
  })

  it('should accept optional description', () => {
    const result = createClientSchema.parse({
      name: 'My Client',
      slug: 'my-client',
      description: 'A great client',
    })
    expect(result.description).toBe('A great client')
  })

  it('should require name field', () => {
    expect(() => createClientSchema.parse({ slug: 'my-client' })).toThrow()
  })

  it('should require slug field', () => {
    expect(() => createClientSchema.parse({ name: 'My Client' })).toThrow()
  })

  it('should validate slug format', () => {
    expect(() =>
      createClientSchema.parse({
        name: 'My Client',
        slug: 'Invalid Slug',
      }),
    ).toThrow()
  })

  it('should enforce name max length', () => {
    const longName = 'a'.repeat(201)
    expect(() =>
      createClientSchema.parse({
        name: longName,
        slug: 'my-client',
      }),
    ).toThrow()
  })

  it('should enforce description max length', () => {
    const longDescription = 'a'.repeat(1001)
    expect(() =>
      createClientSchema.parse({
        name: 'My Client',
        slug: 'my-client',
        description: longDescription,
      }),
    ).toThrow()
  })
})

describe('updateClientSchema', () => {
  it('should accept empty object', () => {
    const result = updateClientSchema.parse({})
    expect(result).toEqual({})
  })

  it('should accept optional name', () => {
    const result = updateClientSchema.parse({ name: 'New Name' })
    expect(result.name).toBe('New Name')
  })

  it('should accept optional description', () => {
    const result = updateClientSchema.parse({ description: 'New description' })
    expect(result.description).toBe('New description')
  })
})

describe('runOptionsSchema', () => {
  it('should accept valid options', () => {
    const result = runOptionsSchema.parse({
      outputFormat: 'markdown',
      maxTokens: 4096,
      temperature: 0.7,
    })
    expect(result.outputFormat).toBe('markdown')
    expect(result.maxTokens).toBe(4096)
    expect(result.temperature).toBe(0.7)
  })

  it('should accept empty object', () => {
    const result = runOptionsSchema.parse({})
    expect(result).toEqual({})
  })

  it('should enforce maxTokens min of 100', () => {
    expect(() => runOptionsSchema.parse({ maxTokens: 99 })).toThrow()
  })

  it('should enforce maxTokens max of 8192', () => {
    expect(() => runOptionsSchema.parse({ maxTokens: 8193 })).toThrow()
  })

  it('should enforce temperature min of 0', () => {
    expect(() => runOptionsSchema.parse({ temperature: -0.1 })).toThrow()
  })

  it('should enforce temperature max of 1', () => {
    expect(() => runOptionsSchema.parse({ temperature: 1.1 })).toThrow()
  })

  it('should accept temperature at boundaries', () => {
    expect(runOptionsSchema.parse({ temperature: 0 }).temperature).toBe(0)
    expect(runOptionsSchema.parse({ temperature: 1 }).temperature).toBe(1)
  })
})

describe('createRunSchema', () => {
  it('should accept valid run data', () => {
    const result = createRunSchema.parse({
      skillName: 'copywriting',
      message: 'Write homepage copy',
    })
    expect(result.skillName).toBe('copywriting')
    expect(result.message).toBe('Write homepage copy')
  })

  it('should require skillName', () => {
    expect(() => createRunSchema.parse({ message: 'Write copy' })).toThrow()
  })

  it('should require message', () => {
    expect(() => createRunSchema.parse({ skillName: 'copywriting' })).toThrow()
  })

  it('should accept optional clientId as UUID', () => {
    const result = createRunSchema.parse({
      skillName: 'copywriting',
      message: 'Write copy',
      clientId: '123e4567-e89b-12d3-a456-426614174000',
    })
    expect(result.clientId).toBe('123e4567-e89b-12d3-a456-426614174000')
  })

  it('should reject invalid clientId UUID', () => {
    expect(() =>
      createRunSchema.parse({
        skillName: 'copywriting',
        message: 'Write copy',
        clientId: 'not-a-uuid',
      }),
    ).toThrow()
  })

  it('should accept optional options', () => {
    const result = createRunSchema.parse({
      skillName: 'copywriting',
      message: 'Write copy',
      options: { maxTokens: 2000 },
    })
    expect(result.options?.maxTokens).toBe(2000)
  })

  it('should enforce message max length of 10000', () => {
    const longMessage = 'a'.repeat(10001)
    expect(() =>
      createRunSchema.parse({
        skillName: 'copywriting',
        message: longMessage,
      }),
    ).toThrow()
  })
})

describe('createFeedbackSchema', () => {
  it('should accept valid feedback data', () => {
    const result = createFeedbackSchema.parse({
      outputId: '123e4567-e89b-12d3-a456-426614174000',
      overallScore: 4,
    })
    expect(result.outputId).toBe('123e4567-e89b-12d3-a456-426614174000')
    expect(result.overallScore).toBe(4)
  })

  it('should require overallScore', () => {
    expect(() =>
      createFeedbackSchema.parse({
        outputId: '123e4567-e89b-12d3-a456-426614174000',
      }),
    ).toThrow()
  })

  it('should enforce score range 1-5 for all scores', () => {
    const validBase = {
      outputId: '123e4567-e89b-12d3-a456-426614174000',
      overallScore: 3,
    }

    // Test each score field
    expect(() => createFeedbackSchema.parse({ ...validBase, accuracyScore: 0 })).toThrow()
    expect(() => createFeedbackSchema.parse({ ...validBase, accuracyScore: 6 })).toThrow()
    expect(createFeedbackSchema.parse({ ...validBase, accuracyScore: 1 }).accuracyScore).toBe(1)
    expect(createFeedbackSchema.parse({ ...validBase, accuracyScore: 5 }).accuracyScore).toBe(5)

    expect(() => createFeedbackSchema.parse({ ...validBase, qualityScore: 0 })).toThrow()
    expect(() => createFeedbackSchema.parse({ ...validBase, qualityScore: 6 })).toThrow()

    expect(() => createFeedbackSchema.parse({ ...validBase, usefulnessScore: 0 })).toThrow()
    expect(() => createFeedbackSchema.parse({ ...validBase, usefulnessScore: 6 })).toThrow()

    expect(() => createFeedbackSchema.parse({ ...validBase, ruleComplianceScore: 0 })).toThrow()
    expect(() => createFeedbackSchema.parse({ ...validBase, ruleComplianceScore: 6 })).toThrow()

    expect(() => createFeedbackSchema.parse({ ...validBase, overallScore: 0 })).toThrow()
    expect(() => createFeedbackSchema.parse({ ...validBase, overallScore: 6 })).toThrow()
  })

  it('should accept issues array with max 10 items', () => {
    const result = createFeedbackSchema.parse({
      outputId: '123e4567-e89b-12d3-a456-426614174000',
      overallScore: 3,
      issues: [
        { description: 'Issue 1', severity: 'high' },
        { description: 'Issue 2', severity: 'medium', suggestedFix: 'Fix it' },
      ],
    })
    expect(result.issues).toHaveLength(2)
  })

  it('should reject issues array exceeding 10 items', () => {
    const issues = Array(11)
      .fill(null)
      .map((_, i) => ({
        description: `Issue ${i}`,
        severity: 'low' as const,
      }))
    expect(() =>
      createFeedbackSchema.parse({
        outputId: '123e4567-e89b-12d3-a456-426614174000',
        overallScore: 3,
        issues,
      }),
    ).toThrow()
  })

  it('should accept suggestedRuleChanges array with max 5 items', () => {
    const result = createFeedbackSchema.parse({
      outputId: '123e4567-e89b-12d3-a456-426614174000',
      overallScore: 3,
      suggestedRuleChanges: [
        {
          file: 'RULES.md',
          suggestedChange: 'Add new rule',
          rationale: 'Because it helps',
        },
      ],
    })
    expect(result.suggestedRuleChanges).toHaveLength(1)
  })

  it('should reject suggestedRuleChanges array exceeding 5 items', () => {
    const changes = Array(6)
      .fill(null)
      .map((_, i) => ({
        file: `file${i}.md`,
        suggestedChange: 'Change',
        rationale: 'Reason',
      }))
    expect(() =>
      createFeedbackSchema.parse({
        outputId: '123e4567-e89b-12d3-a456-426614174000',
        overallScore: 3,
        suggestedRuleChanges: changes,
      }),
    ).toThrow()
  })
})

describe('apiKeySchema', () => {
  it('should accept valid API key format', () => {
    const validKey = 'ma_live_0123456789abcdef0123456789abcdef'
    expect(apiKeySchema.parse(validKey)).toBe(validKey)
  })

  it('should reject keys without correct prefix', () => {
    expect(() => apiKeySchema.parse('0123456789abcdef0123456789abcdef')).toThrow()
    expect(() => apiKeySchema.parse('ma_test_0123456789abcdef0123456789abcdef')).toThrow()
    expect(() => apiKeySchema.parse('sk_live_0123456789abcdef0123456789abcdef')).toThrow()
  })

  it('should reject keys with wrong length', () => {
    expect(() => apiKeySchema.parse('ma_live_0123456789abcdef')).toThrow()
    expect(() => apiKeySchema.parse('ma_live_0123456789abcdef0123456789abcdef0')).toThrow()
  })

  it('should reject keys with invalid characters', () => {
    expect(() => apiKeySchema.parse('ma_live_0123456789ABCDEF0123456789abcdef')).toThrow()
    expect(() => apiKeySchema.parse('ma_live_0123456789ghijkl0123456789abcdef')).toThrow()
  })
})

describe('telegramWebhookSchema', () => {
  it('should accept valid message webhook', () => {
    const result = telegramWebhookSchema.parse({
      update_id: 123,
      message: {
        message_id: 456,
        from: {
          id: 789,
          is_bot: false,
          first_name: 'John',
          username: 'johndoe',
        },
        chat: {
          id: 789,
          type: 'private',
        },
        date: 1234567890,
        text: 'Hello',
      },
    })
    expect(result.update_id).toBe(123)
    expect(result.message?.text).toBe('Hello')
  })

  it('should accept valid callback_query webhook', () => {
    const result = telegramWebhookSchema.parse({
      update_id: 123,
      callback_query: {
        id: 'callback-123',
        from: {
          id: 789,
          is_bot: false,
          first_name: 'John',
        },
        message: {
          message_id: 456,
          chat: {
            id: 789,
            type: 'private',
          },
        },
        data: 'button_clicked',
      },
    })
    expect(result.callback_query?.data).toBe('button_clicked')
  })

  it('should accept webhook with only update_id', () => {
    const result = telegramWebhookSchema.parse({ update_id: 123 })
    expect(result.update_id).toBe(123)
    expect(result.message).toBeUndefined()
    expect(result.callback_query).toBeUndefined()
  })

  it('should require update_id', () => {
    expect(() => telegramWebhookSchema.parse({})).toThrow()
  })

  it('should accept message without optional username', () => {
    const result = telegramWebhookSchema.parse({
      update_id: 123,
      message: {
        message_id: 456,
        from: {
          id: 789,
          is_bot: false,
          first_name: 'John',
        },
        chat: {
          id: 789,
          type: 'private',
        },
        date: 1234567890,
      },
    })
    expect(result.message?.from.username).toBeUndefined()
  })
})

describe('Enum schemas', () => {
  describe('skillTypeSchema', () => {
    it('should accept valid skill types', () => {
      expect(skillTypeSchema.parse('simple')).toBe('simple')
      expect(skillTypeSchema.parse('with_rules')).toBe('with_rules')
      expect(skillTypeSchema.parse('complex')).toBe('complex')
    })

    it('should reject invalid skill types', () => {
      expect(() => skillTypeSchema.parse('invalid')).toThrow()
    })
  })

  describe('runStatusSchema', () => {
    it('should accept valid run statuses', () => {
      expect(runStatusSchema.parse('queued')).toBe('queued')
      expect(runStatusSchema.parse('running')).toBe('running')
      expect(runStatusSchema.parse('completed')).toBe('completed')
      expect(runStatusSchema.parse('failed')).toBe('failed')
      expect(runStatusSchema.parse('cancelled')).toBe('cancelled')
    })

    it('should reject invalid run statuses', () => {
      expect(() => runStatusSchema.parse('pending')).toThrow()
    })
  })

  describe('channelTypeSchema', () => {
    it('should accept valid channel types', () => {
      expect(channelTypeSchema.parse('telegram')).toBe('telegram')
      expect(channelTypeSchema.parse('slack')).toBe('slack')
      expect(channelTypeSchema.parse('web')).toBe('web')
    })

    it('should reject invalid channel types', () => {
      expect(() => channelTypeSchema.parse('discord')).toThrow()
    })
  })

  describe('outputFormatSchema', () => {
    it('should accept valid output formats', () => {
      expect(outputFormatSchema.parse('markdown')).toBe('markdown')
      expect(outputFormatSchema.parse('json')).toBe('json')
      expect(outputFormatSchema.parse('html')).toBe('html')
    })

    it('should reject invalid output formats', () => {
      expect(() => outputFormatSchema.parse('text')).toThrow()
    })
  })

  describe('feedbackSourceSchema', () => {
    it('should accept valid feedback sources', () => {
      expect(feedbackSourceSchema.parse('telegram')).toBe('telegram')
      expect(feedbackSourceSchema.parse('web')).toBe('web')
      expect(feedbackSourceSchema.parse('api')).toBe('api')
    })

    it('should reject invalid feedback sources', () => {
      expect(() => feedbackSourceSchema.parse('email')).toThrow()
    })
  })

  describe('issueSeveritySchema', () => {
    it('should accept valid issue severities', () => {
      expect(issueSeveritySchema.parse('high')).toBe('high')
      expect(issueSeveritySchema.parse('medium')).toBe('medium')
      expect(issueSeveritySchema.parse('low')).toBe('low')
    })

    it('should reject invalid issue severities', () => {
      expect(() => issueSeveritySchema.parse('critical')).toThrow()
    })
  })
})

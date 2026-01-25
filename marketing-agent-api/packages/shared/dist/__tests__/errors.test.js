import { describe, expect, it } from 'vitest';
import { AppError, UnauthorizedError, InvalidApiKeyError, ForbiddenError, NotFoundError, SkillNotFoundError, ClientNotFoundError, RunNotFoundError, OutputNotFoundError, ValidationError, RateLimitError, AnthropicError, DatabaseError, StorageError, InternalError, isAppError, } from '../errors';
describe('AppError', () => {
    it('should set code, message, statusCode, and details', () => {
        const error = new AppError('TEST_ERROR', 'Test message', 400, { field: 'value' });
        expect(error.code).toBe('TEST_ERROR');
        expect(error.message).toBe('Test message');
        expect(error.statusCode).toBe(400);
        expect(error.details).toEqual({ field: 'value' });
        expect(error.name).toBe('AppError');
    });
    it('should use default status code 500 when not provided', () => {
        const error = new AppError('TEST_ERROR', 'Test message');
        expect(error.statusCode).toBe(500);
    });
    describe('toApiError', () => {
        it('should return correct ApiError shape without requestId', () => {
            const error = new AppError('TEST_ERROR', 'Test message', 400, { field: 'value' });
            const apiError = error.toApiError();
            expect(apiError).toEqual({
                code: 'TEST_ERROR',
                message: 'Test message',
                details: { field: 'value' },
                requestId: undefined,
            });
        });
        it('should return correct ApiError shape with requestId', () => {
            const error = new AppError('TEST_ERROR', 'Test message', 400);
            const apiError = error.toApiError('req-123');
            expect(apiError).toEqual({
                code: 'TEST_ERROR',
                message: 'Test message',
                details: undefined,
                requestId: 'req-123',
            });
        });
    });
});
describe('UnauthorizedError', () => {
    it('should have correct defaults', () => {
        const error = new UnauthorizedError();
        expect(error.code).toBe('UNAUTHORIZED');
        expect(error.message).toBe('Authentication required');
        expect(error.statusCode).toBe(401);
    });
    it('should accept custom message', () => {
        const error = new UnauthorizedError('Custom auth message');
        expect(error.message).toBe('Custom auth message');
        expect(error.statusCode).toBe(401);
    });
});
describe('InvalidApiKeyError', () => {
    it('should have fixed message and code', () => {
        const error = new InvalidApiKeyError();
        expect(error.code).toBe('INVALID_API_KEY');
        expect(error.message).toBe('Invalid or expired API key');
        expect(error.statusCode).toBe(401);
    });
});
describe('ForbiddenError', () => {
    it('should have 403 status', () => {
        const error = new ForbiddenError();
        expect(error.code).toBe('FORBIDDEN');
        expect(error.message).toBe('Access denied');
        expect(error.statusCode).toBe(403);
    });
    it('should accept custom message', () => {
        const error = new ForbiddenError('Not allowed');
        expect(error.message).toBe('Not allowed');
    });
});
describe('NotFoundError', () => {
    it('should create dynamic message with resource only', () => {
        const error = new NotFoundError('User');
        expect(error.code).toBe('USER_NOT_FOUND');
        expect(error.message).toBe('User not found');
        expect(error.statusCode).toBe(404);
    });
    it('should create dynamic message with resource and id', () => {
        const error = new NotFoundError('User', '123');
        expect(error.code).toBe('USER_NOT_FOUND');
        expect(error.message).toBe("User with id '123' not found");
        expect(error.statusCode).toBe(404);
    });
});
describe('SkillNotFoundError', () => {
    it('should inherit from NotFoundError', () => {
        const error = new SkillNotFoundError('copywriting');
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.code).toBe('SKILL_NOT_FOUND');
        expect(error.message).toBe("Skill with id 'copywriting' not found");
        expect(error.statusCode).toBe(404);
    });
});
describe('ClientNotFoundError', () => {
    it('should inherit from NotFoundError', () => {
        const error = new ClientNotFoundError('client-123');
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.code).toBe('CLIENT_NOT_FOUND');
        expect(error.message).toBe("Client with id 'client-123' not found");
        expect(error.statusCode).toBe(404);
    });
});
describe('RunNotFoundError', () => {
    it('should inherit from NotFoundError', () => {
        const error = new RunNotFoundError('run-456');
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.code).toBe('RUN_NOT_FOUND');
        expect(error.message).toBe("Run with id 'run-456' not found");
        expect(error.statusCode).toBe(404);
    });
});
describe('OutputNotFoundError', () => {
    it('should inherit from NotFoundError', () => {
        const error = new OutputNotFoundError('output-789');
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.code).toBe('OUTPUT_NOT_FOUND');
        expect(error.message).toBe("Output with id 'output-789' not found");
        expect(error.statusCode).toBe(404);
    });
});
describe('ValidationError', () => {
    it('should have 400 status with details', () => {
        const error = new ValidationError('Invalid input', { field: 'email', reason: 'invalid format' });
        expect(error.code).toBe('VALIDATION_ERROR');
        expect(error.message).toBe('Invalid input');
        expect(error.statusCode).toBe(400);
        expect(error.details).toEqual({ field: 'email', reason: 'invalid format' });
    });
    it('should work without details', () => {
        const error = new ValidationError('Invalid input');
        expect(error.statusCode).toBe(400);
        expect(error.details).toBeUndefined();
    });
});
describe('RateLimitError', () => {
    it('should have 429 status and retryAfter property', () => {
        const error = new RateLimitError(60);
        expect(error.code).toBe('RATE_LIMIT_EXCEEDED');
        expect(error.message).toBe('Too many requests');
        expect(error.statusCode).toBe(429);
        expect(error.retryAfter).toBe(60);
        expect(error.details).toEqual({ retryAfter: 60 });
    });
});
describe('AnthropicError', () => {
    it('should have 502 status', () => {
        const error = new AnthropicError('API failed', { originalError: 'timeout' });
        expect(error.code).toBe('ANTHROPIC_ERROR');
        expect(error.message).toBe('API failed');
        expect(error.statusCode).toBe(502);
        expect(error.details).toEqual({ originalError: 'timeout' });
    });
});
describe('DatabaseError', () => {
    it('should have 500 status', () => {
        const error = new DatabaseError('Connection failed');
        expect(error.code).toBe('DATABASE_ERROR');
        expect(error.message).toBe('Connection failed');
        expect(error.statusCode).toBe(500);
    });
});
describe('StorageError', () => {
    it('should have 500 status', () => {
        const error = new StorageError('S3 upload failed');
        expect(error.code).toBe('STORAGE_ERROR');
        expect(error.message).toBe('S3 upload failed');
        expect(error.statusCode).toBe(500);
    });
});
describe('InternalError', () => {
    it('should have 500 status with default message', () => {
        const error = new InternalError();
        expect(error.code).toBe('INTERNAL_ERROR');
        expect(error.message).toBe('An unexpected error occurred');
        expect(error.statusCode).toBe(500);
    });
    it('should accept custom message', () => {
        const error = new InternalError('Something went wrong');
        expect(error.message).toBe('Something went wrong');
    });
});
describe('isAppError', () => {
    it('should return true for AppError instances', () => {
        expect(isAppError(new AppError('TEST', 'test'))).toBe(true);
        expect(isAppError(new UnauthorizedError())).toBe(true);
        expect(isAppError(new NotFoundError('Test'))).toBe(true);
        expect(isAppError(new ValidationError('test'))).toBe(true);
    });
    it('should return false for non-AppError values', () => {
        expect(isAppError(new Error('test'))).toBe(false);
        expect(isAppError(null)).toBe(false);
        expect(isAppError(undefined)).toBe(false);
        expect(isAppError('string')).toBe(false);
        expect(isAppError({ code: 'TEST', message: 'test' })).toBe(false);
    });
});
//# sourceMappingURL=errors.test.js.map
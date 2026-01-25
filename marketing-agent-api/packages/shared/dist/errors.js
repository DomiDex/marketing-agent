export class AppError extends Error {
    code;
    statusCode;
    details;
    constructor(code, message, statusCode = 500, details) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
    }
    toApiError(requestId) {
        return {
            code: this.code,
            message: this.message,
            details: this.details,
            requestId,
        };
    }
}
// Authentication errors
export class UnauthorizedError extends AppError {
    constructor(message = 'Authentication required') {
        super('UNAUTHORIZED', message, 401);
    }
}
export class InvalidApiKeyError extends AppError {
    constructor() {
        super('INVALID_API_KEY', 'Invalid or expired API key', 401);
    }
}
export class ForbiddenError extends AppError {
    constructor(message = 'Access denied') {
        super('FORBIDDEN', message, 403);
    }
}
// Resource errors
export class NotFoundError extends AppError {
    constructor(resource, id) {
        const message = id ? `${resource} with id '${id}' not found` : `${resource} not found`;
        super(`${resource.toUpperCase()}_NOT_FOUND`, message, 404);
    }
}
export class SkillNotFoundError extends NotFoundError {
    constructor(skillName) {
        super('Skill', skillName);
    }
}
export class ClientNotFoundError extends NotFoundError {
    constructor(clientId) {
        super('Client', clientId);
    }
}
export class RunNotFoundError extends NotFoundError {
    constructor(runId) {
        super('Run', runId);
    }
}
export class OutputNotFoundError extends NotFoundError {
    constructor(outputId) {
        super('Output', outputId);
    }
}
// Validation errors
export class ValidationError extends AppError {
    constructor(message, details) {
        super('VALIDATION_ERROR', message, 400, details);
    }
}
// Rate limiting
export class RateLimitError extends AppError {
    retryAfter;
    constructor(retryAfter) {
        super('RATE_LIMIT_EXCEEDED', 'Too many requests', 429, { retryAfter });
        this.retryAfter = retryAfter;
    }
}
// External service errors
export class AnthropicError extends AppError {
    constructor(message, details) {
        super('ANTHROPIC_ERROR', message, 502, details);
    }
}
export class DatabaseError extends AppError {
    constructor(message) {
        super('DATABASE_ERROR', message, 500);
    }
}
export class StorageError extends AppError {
    constructor(message) {
        super('STORAGE_ERROR', message, 500);
    }
}
// Internal errors
export class InternalError extends AppError {
    constructor(message = 'An unexpected error occurred') {
        super('INTERNAL_ERROR', message, 500);
    }
}
// Type guard
export function isAppError(error) {
    return error instanceof AppError;
}
//# sourceMappingURL=errors.js.map
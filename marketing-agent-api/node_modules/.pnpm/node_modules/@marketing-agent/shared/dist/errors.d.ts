import type { ApiError } from './types';
export declare class AppError extends Error {
    readonly code: string;
    readonly statusCode: number;
    readonly details?: Record<string, unknown>;
    constructor(code: string, message: string, statusCode?: number, details?: Record<string, unknown>);
    toApiError(requestId?: string): ApiError;
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
export declare class InvalidApiKeyError extends AppError {
    constructor();
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
export declare class NotFoundError extends AppError {
    constructor(resource: string, id?: string);
}
export declare class SkillNotFoundError extends NotFoundError {
    constructor(skillName: string);
}
export declare class ClientNotFoundError extends NotFoundError {
    constructor(clientId: string);
}
export declare class RunNotFoundError extends NotFoundError {
    constructor(runId: string);
}
export declare class OutputNotFoundError extends NotFoundError {
    constructor(outputId: string);
}
export declare class ValidationError extends AppError {
    constructor(message: string, details?: Record<string, unknown>);
}
export declare class RateLimitError extends AppError {
    readonly retryAfter: number;
    constructor(retryAfter: number);
}
export declare class AnthropicError extends AppError {
    constructor(message: string, details?: Record<string, unknown>);
}
export declare class DatabaseError extends AppError {
    constructor(message: string);
}
export declare class StorageError extends AppError {
    constructor(message: string);
}
export declare class InternalError extends AppError {
    constructor(message?: string);
}
export declare function isAppError(error: unknown): error is AppError;
//# sourceMappingURL=errors.d.ts.map
// Re-export database client
export { db, migrationDb } from './client';
// Re-export schema and types
export * from './schema';
// Re-export drizzle operators for convenience
export { eq, ne, gt, gte, lt, lte, and, or, like, ilike, desc, asc, sql } from 'drizzle-orm';
//# sourceMappingURL=index.js.map
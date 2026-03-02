/** Error type for query/mutation results (Convert-style). */
export type QueryError = Error & { response?: { status?: number; data?: unknown } };

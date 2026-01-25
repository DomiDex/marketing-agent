export interface ClientContext {
    profile: string;
    brand: {
        voice?: string;
        messaging?: string;
        assets?: string;
    };
    audience: {
        primaryIcp?: string;
        secondaryIcp?: string;
        antiPersonas?: string;
        customerJourney?: string;
    };
    product: {
        overview?: string;
        pricing?: string;
        differentiators?: string;
        objections?: string;
    };
    market: {
        competitors?: string;
        industry?: string;
        proof?: string;
    };
}
/**
 * Get client context from S3
 */
export declare function getClientContext(clientSlug: string): Promise<ClientContext>;
/**
 * List all clients
 */
export declare function listClients(): Promise<string[]>;
//# sourceMappingURL=clients.d.ts.map
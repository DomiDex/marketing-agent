export interface OutputFile {
    key: string;
    content: string;
    metadata: {
        skill: string;
        client?: string;
        type?: string;
        date: string;
    };
}
/**
 * Save output to S3
 */
export declare function saveOutput(skillName: string, clientSlug: string | undefined, outputType: string, content: string): Promise<string>;
/**
 * Get output content
 */
export declare function getOutput(s3Key: string): Promise<string>;
/**
 * Generate signed download URL
 */
export declare function getDownloadUrl(s3Key: string, expiresIn?: number): Promise<string>;
/**
 * List outputs for a skill
 */
export declare function listOutputs(skillName: string, limit?: number): Promise<string[]>;
//# sourceMappingURL=outputs.d.ts.map
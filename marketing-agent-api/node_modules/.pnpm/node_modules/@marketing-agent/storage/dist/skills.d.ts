export interface SkillContent {
    skillMd: string;
    rulesMd?: string;
    subdirectories?: Record<string, Record<string, string>>;
}
/**
 * Get skill content from S3
 */
export declare function getSkillContent(skillName: string): Promise<SkillContent>;
/**
 * List all skills
 */
export declare function listSkills(): Promise<string[]>;
//# sourceMappingURL=skills.d.ts.map
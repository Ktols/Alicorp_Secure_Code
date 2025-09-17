'use server';
/**
 * @fileOverview Provides AI-driven security recommendations based on vulnerability analysis.
 *
 * - getSecurityRecommendations - A function that generates security recommendations based on provided vulnerabilities.
 * - SecurityRecommendationsInput - The input type for the getSecurityRecommendations function.
 * - SecurityRecommendationsOutput - The return type for the getSecurityRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SecurityRecommendationsInputSchema = z.object({
  vulnerabilityAnalysisResults: z
    .string()
    .describe(
      'A stringified JSON of the vulnerability analysis results, including package name, vulnerable version, installed version, match status, and suggestion.'
    ),
});
export type SecurityRecommendationsInput = z.infer<
  typeof SecurityRecommendationsInputSchema
>;

const SecurityRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'AI-generated security recommendations based on the vulnerability analysis results.'
    ),
});
export type SecurityRecommendationsOutput = z.infer<
  typeof SecurityRecommendationsOutputSchema
>;

export async function getSecurityRecommendations(
  input: SecurityRecommendationsInput
): Promise<SecurityRecommendationsOutput> {
  return securityRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'securityRecommendationsPrompt',
  input: {schema: SecurityRecommendationsInputSchema},
  output: {schema: SecurityRecommendationsOutputSchema},
  prompt: `You are a security expert providing a summary and recommendations based on vulnerability analysis results.

The user has scanned their project and found the vulnerabilities listed below.

Vulnerability Analysis Results (JSON format):
{{{vulnerabilityAnalysisResults}}}

Based on these results, provide a concise summary of the findings. If vulnerabilities were found, you MUST instruct the user to contact the Cybersecurity team or the transition team for remediation guidance. You MUST include the transition team's email address, which is gta@alicorp.com.pe, in your response. The response should be in Spanish.
`,
});

const securityRecommendationsFlow = ai.defineFlow(
  {
    name: 'securityRecommendationsFlow',
    inputSchema: SecurityRecommendationsInputSchema,
    outputSchema: SecurityRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    
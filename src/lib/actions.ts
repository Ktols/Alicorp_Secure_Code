'use server';

import { analyzeVulnerabilities, type VulnerabilityAnalysisInput, type VulnerabilityAnalysisOutput } from '@/ai/flows/vulnerability-table-ai-suggestions';
import { getSecurityRecommendations } from '@/ai/flows/ai-security-recommendations';

export async function getAnalysisAndSuggestions(packages: VulnerabilityAnalysisInput): Promise<VulnerabilityAnalysisOutput> {
  try {
    const results = await analyzeVulnerabilities(packages);
    return results;
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    // Return a fallback so the UI doesn't break
    return packages.map(p => ({
      packageName: p.packageName,
      installedVersion: p.installedVersion,
      isVulnerable: false,
      suggestion: 'Error analyzing package.'
    }));
  }
}

export async function getAiSummary(vulnerabilityAnalysisResults: string) {
  try {
    const result = await getSecurityRecommendations({ vulnerabilityAnalysisResults });
    return result;
  } catch (error) {
    console.error('Error getting AI summary:', error);
    return { recommendations: 'Could not generate security summary due to an error.' };
  }
}

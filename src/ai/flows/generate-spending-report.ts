'use server';

/**
 * @fileOverview An AI agent for generating spending reports for users.
 *
 * - generateSpendingReport - A function that generates a spending report for a user.
 * - GenerateSpendingReportInput - The input type for the generateSpendingReport function.
 * - GenerateSpendingReportOutput - The return type for the generateSpendingReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSpendingReportInputSchema = z.object({
  userId: z.string().describe('The ID of the user to generate the report for.'),
  startDate: z.string().describe('The start date for the report period (YYYY-MM-DD).'),
  endDate: z.string().describe('The end date for the report period (YYYY-MM-DD).'),
  spendingData: z.string().describe('The user spending data as a JSON string.'),
});
export type GenerateSpendingReportInput = z.infer<typeof GenerateSpendingReportInputSchema>;

const GenerateSpendingReportOutputSchema = z.object({
  report: z.string().describe('The generated spending report.'),
});
export type GenerateSpendingReportOutput = z.infer<typeof GenerateSpendingReportOutputSchema>;

export async function generateSpendingReport(input: GenerateSpendingReportInput): Promise<GenerateSpendingReportOutput> {
  return generateSpendingReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSpendingReportPrompt',
  input: {schema: GenerateSpendingReportInputSchema},
  output: {schema: GenerateSpendingReportOutputSchema},
  prompt: `You are an expert financial analyst. Generate a spending report for the user with the following data, over the specified period. Adhere to a professional tone, include sections for total income, total expenses, and key spending patterns.

User ID: {{{userId}}}
Start Date: {{{startDate}}}
End Date: {{{endDate}}}
Spending Data: {{{spendingData}}}
`,
});

const generateSpendingReportFlow = ai.defineFlow(
  {
    name: 'generateSpendingReportFlow',
    inputSchema: GenerateSpendingReportInputSchema,
    outputSchema: GenerateSpendingReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';
/**
 * @fileOverview A voice-first assistant for artisans to manage their store.
 *
 * - manageStoreWithVoice - A function that handles voice commands for listing products and checking order status.
 * - ManageStoreWithVoiceInput - The input type for the manageStoreWithVoice function.
 * - ManageStoreWithVoiceOutput - The return type for the manageStoreWithVoice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ManageStoreWithVoiceInputSchema = z.object({
  voiceCommand: z
    .string()
    .describe('The voice command spoken by the artisan in their local language.'),
  language: z.enum(['Kannada', 'Hindi', 'English']).describe('The language for the response.'),
});
export type ManageStoreWithVoiceInput = z.infer<typeof ManageStoreWithVoiceInputSchema>;

const ManageStoreWithVoiceOutputSchema = z.object({
  response: z
    .string()
    .describe('The response from the assistant after processing the voice command.'),
});
export type ManageStoreWithVoiceOutput = z.infer<typeof ManageStoreWithVoiceOutputSchema>;

export async function manageStoreWithVoice(input: ManageStoreWithVoiceInput): Promise<ManageStoreWithVoiceOutput> {
  return manageStoreWithVoiceFlow(input);
}

const manageStoreWithVoicePrompt = ai.definePrompt({
  name: 'manageStoreWithVoicePrompt',
  input: {schema: ManageStoreWithVoiceInputSchema},
  output: {schema: ManageStoreWithVoiceOutputSchema},
  prompt: `You are Karminetra, a voice assistant for artisans to manage their online store.

You will receive voice commands from the artisan in their local language.
Your job is to understand the command and provide a helpful and informative response in the specified language.

Language for response: {{{language}}}

Here are some examples of commands the artisan might use:
- "मेरे पास 20 मिट्टी के बर्तन हैं" (I have 20 pottery items) - Respond by listing the products in the store
- "मेरे कितने ऑर्डर हैं?" (How many orders do I have?) - Respond with the number of new, shipped and completed orders.

Voice Command: {{{voiceCommand}}}
`,
});

const manageStoreWithVoiceFlow = ai.defineFlow(
  {
    name: 'manageStoreWithVoiceFlow',
    inputSchema: ManageStoreWithVoiceInputSchema,
    outputSchema: ManageStoreWithVoiceOutputSchema,
  },
  async input => {
    const {output} = await manageStoreWithVoicePrompt(input);
    return output!;
  }
);

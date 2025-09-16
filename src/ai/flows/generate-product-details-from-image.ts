'use server';
/**
 * @fileOverview Generates product details (title, description, keywords, hashtags, price) from an image of pottery.
 *
 * - generateProductDetailsFromImage - A function that handles the product detail generation process.
 * - GenerateProductDetailsFromImageInput - The input type for the generateProductDetailsFromImage function.
 * - GenerateProductDetailsFromImageOutput - The return type for the generateProductDetailsFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDetailsFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the pottery product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.enum(['Kannada', 'Hindi', 'English']).describe('The language for the product details.'),
});
export type GenerateProductDetailsFromImageInput = z.infer<typeof GenerateProductDetailsFromImageInputSchema>;

const GenerateProductDetailsFromImageOutputSchema = z.object({
  title: z.string().describe('The generated title for the product.'),
  description: z.string().describe('The generated description for the product.'),
  keywords: z.string().describe('The generated keywords for the product.'),
  hashtags: z.string().describe('The generated hashtags for the product.'),
  suggestedPrice: z.number().describe('The suggested price for the product.'),
});
export type GenerateProductDetailsFromImageOutput = z.infer<typeof GenerateProductDetailsFromImageOutputSchema>;

export async function generateProductDetailsFromImage(
  input: GenerateProductDetailsFromImageInput
): Promise<GenerateProductDetailsFromImageOutput> {
  return generateProductDetailsFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDetailsFromImagePrompt',
  input: {schema: GenerateProductDetailsFromImageInputSchema},
  output: {schema: GenerateProductDetailsFromImageOutputSchema},
  prompt: `You are an expert in creating compelling product listings for pottery items.

  Given a photo of a pottery product, generate a product title, description, keywords, hashtags, and a suggested price in the specified language.

  Language: {{{language}}}

  Photo: {{media url=photoDataUri}}

  Title:
  Description:
  Keywords:
  Hashtags:
  Suggested Price:`, // Ensure all fields are populated in the response
});

const generateProductDetailsFromImageFlow = ai.defineFlow(
  {
    name: 'generateProductDetailsFromImageFlow',
    inputSchema: GenerateProductDetailsFromImageInputSchema,
    outputSchema: GenerateProductDetailsFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

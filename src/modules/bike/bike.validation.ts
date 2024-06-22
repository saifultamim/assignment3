
import { z } from 'zod';

export const bikeValidation = z.object({
  name: z.string(),
  description: z.string(),
  pricePerHour: z.number().positive(),
  isAvailable: z.boolean().optional(),
  cc: z.number().positive().int(),
  year: z.number().int().gte(1900).lte(new Date().getFullYear()),
  model: z.string(),
  brand: z.string()
});
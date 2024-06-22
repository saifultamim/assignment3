
import { z } from "zod";

  const dateStringSchema = z.string().refine((date) => {
    //the ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;
    return iso8601Regex.test(date);
  }, {
    message: 'Invalid date format, expected ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)',
  });
 const rentValidation = z.object({
 
    userId: z.string().optional(),
    bikeId: z.string(),
    startTime: dateStringSchema,
    returnTime: dateStringSchema.optional(),
    totalCost: z.number().default(0),
    isReturned: z.boolean().default(false),
 
});
export default rentValidation

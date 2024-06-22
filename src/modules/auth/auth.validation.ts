
import { z } from 'zod';

export const authSignupValidation = z.object({
    name: z.string({ required_error: "Name is required"}),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1,"Password must be at least 6 characters long"),
    phone: z.string().min(1,'Number is required'),
    address: z.string().min(1,'Address is required'),
    role: z.enum(['admin', 'user']).refine((val) => val === 'admin' || val === 'user', {
        message: "Role must be either 'admin' or 'user'"
    })
});



export const authValidationLogin = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1,"Password must be at least 6 characters long")
});



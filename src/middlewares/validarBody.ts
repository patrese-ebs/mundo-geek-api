import type { NextFunction, Request, Response } from "express"
import { ZodError, type ZodSchema } from "zod";

export const validarBody = (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    status: "validation-error",
                    error: error.issues.map((err) => ({
                        field: err.path[0] as string,
                        message: err.message
                    }))
                });
            }
            // Passa erros desconhecidos para o errorHandler global
            return next(error);
        }
    }
}

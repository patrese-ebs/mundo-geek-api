import { z } from "zod";

export const createCategoriaSchema = z.object({
    nome: z.string({ message: "Nome deve ser uma string" })
        .min(3, "Nome deve ter no mínimo 3 caracteres")
        .max(100, "Nome deve ter no máximo 100 caracteres"),

    descricao: z.string({ message: "Descrição deve ser uma string" })
        .max(255, "Descrição deve ter no máximo 255 caracteres")
        .optional(),
});

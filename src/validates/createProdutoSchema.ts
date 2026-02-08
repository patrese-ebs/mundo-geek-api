import { z } from "zod";

export const createProdutoSchema = z.object({
    nome: z.string({ message: "Nome deve ser uma string" })
        .min(3, "Nome deve ter no mínimo 3 caracteres")
        .max(100, "Nome deve ter no máximo 100 caracteres"),

    descricao: z.string({ message: "Descrição deve ser uma string" })
        .max(255, "Descrição deve ter no máximo 255 caracteres")
        .optional(),

    preco: z.number({ message: "Preço deve ser um número" })
        .gt(0, "Preço deve ser maior que zero"),

    estoque: z.number({ message: "Estoque deve ser um número" })
        .int("Estoque deve ser um número inteiro")
        .min(0, "Estoque deve ser maior ou igual a zero"),

    categoriaId: z.number({ message: "O ID da categoria é obrigatório" })
});

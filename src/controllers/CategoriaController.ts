import type { Request, Response } from "express";
import { CategoriaService } from "../services/CategoriaService.js";

export class CategoriaController {

    constructor(private categoriaService: CategoriaService) { }

    public async create(req: Request, res: Response) {
        const body = req.body;
        const categoria = await this.categoriaService.addCategoria(body);
        res.status(201).json(categoria);
    }

    public async findAll(req: Request, res: Response) {
        const categorias = await this.categoriaService.getAllCategorias();
        res.status(200).json(categorias);
    }

    public async findById(req: Request, res: Response) {
        const { id } = req.params;
        const categoria = await this.categoriaService.getCategoriaById(id as string);
        res.status(200).json(categoria);
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const body = req.body;
        const categoria = await this.categoriaService.updateCategoria(id as string, body);
        res.status(200).json(categoria);
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.categoriaService.deleteCategoria(id as string);
        res.status(204).json({ status: "Categoria deletada" })
    }
}
import type { Request, Response } from "express";
import { ProdutoService } from "../services/ProdutoService.js";

export class ProdutoController {

    constructor(private produtoService: ProdutoService) { }

    public async create(req: Request, res: Response) {
        const body = req.body;
        const produto = await this.produtoService.addProduto(body);
        res.status(201).json(produto);
    }

    public async findAll(req: Request, res: Response) {
        const produtos = await this.produtoService.getAllProdutos();
        res.status(200).json(produtos);
    }

    public async findById(req: Request, res: Response) {
        const { id } = req.params;
        const produto = await this.produtoService.getProdutoById(id as string);
        res.status(200).json(produto);
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const body = req.body;
        const produto = await this.produtoService.updateProduto(id as string, body);
        res.status(200).json(produto);
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.produtoService.deleteProduto(id as string);
        res.status(204).json({ status: "Produto deletado" })
    }
}
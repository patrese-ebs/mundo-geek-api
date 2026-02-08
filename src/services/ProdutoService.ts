import { appDataSource } from '../database/appDataSource.js';
import { Produtos } from '../entities/Produtos.js';
import { AppError } from '../errors/AppError.js';

export class ProdutoService {
    private produtoRepository = appDataSource.getRepository(Produtos);

    public async getAllProdutos(): Promise<Produtos[]> {
        return await this.produtoRepository.find({ relations: ['categoria'] });
    }

    public async getProdutoById(id: string): Promise<Produtos> {
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            throw new AppError(400, "ID inválido");
        }
        const produto = await this.produtoRepository.findOne({
            where: { id: idNumber },
            relations: ['categoria']
        });
        if (!produto) {
            throw new AppError(404, "Produto não encontrado");
        }
        return produto;
    }

    public async addProduto(body: unknown): Promise<Produtos> {
        const produtoData = body as Partial<Produtos>;

        if (!produtoData.nome) {
            throw new AppError(400, "Nome do produto é obrigatório");
        }

        const produtoExiste = await this.produtoRepository.findOne({ where: { nome: produtoData.nome } })
        if (produtoExiste) {
            throw new AppError(400, "Produto com este nome já cadastrado!");
        }

        const novoProduto = this.produtoRepository.create(produtoData);
        await this.produtoRepository.save(novoProduto);
        return novoProduto;
    }

    public async updateProduto(id: string, body: Partial<Produtos>): Promise<Produtos> {
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            throw new AppError(400, "ID inválido");
        }

        const produtoExiste = await this.produtoRepository.findOneBy({ id: idNumber })
        if (!produtoExiste) {
            throw new AppError(404, "Produto não encontrado!");
        }

        this.produtoRepository.merge(produtoExiste, body);
        await this.produtoRepository.save(produtoExiste);
        return produtoExiste;
    }

    public async deleteProduto(id: string): Promise<void> {
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            throw new AppError(400, "ID inválido");
        }

        const produto = await this.produtoRepository.findOneBy({ id: idNumber });
        if (!produto) {
            throw new AppError(404, "Produto não encontrado");
        }
        await this.produtoRepository.remove(produto);
    }
}

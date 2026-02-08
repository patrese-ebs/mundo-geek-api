import { appDataSource } from '../database/appDataSource.js';
import { Categoria } from '../entities/Categoria.js';
import { AppError } from '../errors/AppError.js';

export class CategoriaService {
    private categoriaRepository = appDataSource.getRepository(Categoria);

    public async getAllCategorias(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({ relations: ['produtos'] });
    }

    public async getCategoriaById(id: string): Promise<Categoria> {
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            throw new AppError(400, "ID inválido");
        }
        const categoria = await this.categoriaRepository.findOne({
            where: { id: idNumber },
            relations: ['produtos']
        });
        if (!categoria) {
            throw new AppError(404, "Categoria não encontrada");
        }
        return categoria;
    }

    public async addCategoria(body: unknown): Promise<Categoria> {
        const categoriaData = body as Partial<Categoria>;

        if (!categoriaData.nome) {
            throw new AppError(400, "Nome da categoria é obrigatório");
        }

        const categoriaExiste = await this.categoriaRepository.findOne({ where: { nome: categoriaData.nome } })
        if (categoriaExiste) {
            throw new AppError(400, "Categoria com este nome já cadastrada!");
        }

        const novaCategoria = this.categoriaRepository.create(categoriaData);
        await this.categoriaRepository.save(novaCategoria);
        return novaCategoria;
    }

    public async updateCategoria(id: string, body: Partial<Categoria>): Promise<Categoria> {
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            throw new AppError(400, "ID inválido");
        }

        const categoriaExiste = await this.categoriaRepository.findOneBy({ id: idNumber })
        if (!categoriaExiste) {
            throw new AppError(404, "Categoria não encontrada!");
        }

        this.categoriaRepository.merge(categoriaExiste, body);
        await this.categoriaRepository.save(categoriaExiste);
        return categoriaExiste;
    }

    public async deleteCategoria(id: string): Promise<void> {
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            throw new AppError(400, "ID inválido");
        }

        const categoria = await this.categoriaRepository.findOneBy({ id: idNumber });
        if (!categoria) {
            throw new AppError(404, "Categoria não encontrada");
        }
        await this.categoriaRepository.remove(categoria);
    }
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Categoria } from "./Categoria.js";

@Entity("produtos")
export class Produtos {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    nome!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    descricao?: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    preco!: number;

    @Column({ type: "int", nullable: false })
    estoque!: number;

    @CreateDateColumn({ name: 'create_at' })
    dataCriacao!: Date;

    @UpdateDateColumn({ name: 'update_at' })
    dataAtualizacao!: Date;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
    categoria!: Categoria;
}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Produtos } from "./Produtos.js";

@Entity("categoria")
export class Categoria {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100, nullable: false, unique: true })
    nome!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    descricao?: string;

    @CreateDateColumn({ name: 'create_at' })
    dataCriacao!: Date;

    @UpdateDateColumn({ name: 'update_at' })
    dataAtualizacao!: Date;

    @OneToMany(() => Produtos, (produto) => produto.categoria)
    produtos!: Produtos[];
}
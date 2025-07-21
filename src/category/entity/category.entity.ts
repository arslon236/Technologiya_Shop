import { Products } from "src/products/entity/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    title: string

    @OneToMany(() => Products, product => product.category)
    products: Products[];
}
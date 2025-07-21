import { Category } from "src/category/entity/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Category, (category) => category.products, { nullable: false })
    category: Category;

    @Column({ nullable: false })
    title: string

    @Column({ nullable: false })
    description: string

    @Column({ nullable: false })
    price: string

    @Column({ type: 'enum', enum: ['black', 'white', 'red', 'yellow', 'gray'], nullable: true })
    color?: string

    @Column({ type: 'enum', enum: [128, 256, 512, 1024], nullable: true })
    storage?: number

    @Column({ type: 'float4', nullable: true })
    Screen_size?: number

    @Column({ nullable: true })
    battery?: number

    @Column({ nullable: true })
    ram?: number

    @Column("simple-array", { nullable: true })
    images: string[];

    @CreateDateColumn()
    createdAt: Date;
}
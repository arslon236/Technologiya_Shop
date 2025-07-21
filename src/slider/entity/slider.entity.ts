import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('slider')
export class Slider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string; // image path

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  description?: string;
}

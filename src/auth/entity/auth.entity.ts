import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;


  @Column()
  username: string;

  @Column()
  password: string;

  @Column({type:'enum', enum: ['user', 'admin', 'superadmin'], default: 'user'}) // yoki 'admin'
  role: string;
}

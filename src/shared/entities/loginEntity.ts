import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer'; 

@Entity('users')
export class LoginEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) 
  username: string;

  @Exclude({ toPlainOnly: true }) 
  @Column()
  password: string;

  @Column({ unique: true }) 
  email: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true }) 
  deletedAt: Date; 
  
  @Column({ default: false })
  emailVerified: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
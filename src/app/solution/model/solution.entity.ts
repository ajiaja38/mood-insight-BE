import { Disorder } from 'src/app/disorder/model/disorder.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Solution {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ nullable: false })
  solution: string;

  @ManyToOne(() => Disorder, (disorder: Disorder) => disorder.solution)
  @JoinColumn({ name: 'disorder_id', referencedColumnName: 'id' })
  disorder: Disorder;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

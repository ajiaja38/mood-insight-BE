import { KnowledgeBase } from 'src/app/knowledge-base/model/knowledge-base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Disorder {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(
    () => KnowledgeBase,
    (knowledgeBase: KnowledgeBase) => knowledgeBase.disorder,
  )
  knowledgeBase: KnowledgeBase[];
}

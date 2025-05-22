import { DiagnosisResultDisorder } from 'src/app/diagnosis-result-disorder/model/diagnosis-result-disorder';
import { KnowledgeBase } from 'src/app/knowledge-base/model/knowledge-base.entity';
import { Solution } from 'src/app/solution/model/solution.entity';
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

  @OneToMany(() => Solution, (solution: Solution) => solution.disorder)
  solution: Solution[];

  @OneToMany(() => DiagnosisResultDisorder, (disorder) => disorder.disorder)
  diagnosisResultDisorder: DiagnosisResultDisorder[];
}

import { Disorder } from '../../disorder/model/disorder.entity';
import { Symptom } from '../../symptom/model/symptom.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'knowledge_base',
})
export class KnowledgeBase {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @ManyToOne(() => Symptom, (symptom: Symptom) => symptom.knowledgeBase)
  @JoinColumn({ name: 'symptom_id', referencedColumnName: 'id' })
  symptom: Symptom;

  @ManyToOne(() => Disorder, (disorder: Disorder) => disorder.knowledgeBase)
  @JoinColumn({ name: 'disorder_id', referencedColumnName: 'id' })
  disorder: Disorder;

  @Column({ nullable: false, type: 'float' })
  weight: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

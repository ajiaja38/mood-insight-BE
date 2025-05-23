import { ConsultationDetail } from '../../consultation-detail/model/consultation-detail.entity';
import { KnowledgeBase } from '../../knowledge-base/model/knowledge-base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Symptom {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({
    nullable: false,
  })
  symptom: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(
    () => KnowledgeBase,
    (knowledgeBase: KnowledgeBase) => knowledgeBase.symptom,
  )
  knowledgeBase: KnowledgeBase[];

  @OneToMany(
    () => ConsultationDetail,
    (consultationDetail: ConsultationDetail) => consultationDetail.symptom,
  )
  consultationDetail: ConsultationDetail[];
}

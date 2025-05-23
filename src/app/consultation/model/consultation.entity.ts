import { ConsultationDetail } from '../../consultation-detail/model/consultation-detail.entity';
import { DiagnosisResult } from '../../diagnosis-result/model/diagnosis-result.entity';
import { User } from '../../user/model/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('consultation')
export class Consultation {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user: User) => user.consultation)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(
    () => ConsultationDetail,
    (consultationDetail) => consultationDetail.consultation,
  )
  consultationDetail: ConsultationDetail[];

  @OneToMany(
    () => DiagnosisResult,
    (diagnosisResult) => diagnosisResult.consultation,
  )
  diagnosisResult: DiagnosisResult[];
}

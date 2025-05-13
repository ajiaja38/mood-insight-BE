import { Consultation } from 'src/app/consultation/model/consultation.entity';
import { Disorder } from 'src/app/disorder/model/disorder.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('diagnosis_result')
export class DiagnosisResult {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'float' })
  belief_value: number;

  @ManyToOne(() => Consultation, (consultation) => consultation.diagnosisResult)
  consultation: Consultation;

  @ManyToOne(() => Disorder, (disorder) => disorder.diagnosisResult)
  disorder: Disorder;
}

import { Type } from '../../../types/interface/ITypeClass.interface';
import { Consultation } from '../../consultation/model/consultation.entity';
import { DiagnosisResultDisorder } from '../../diagnosis-result-disorder/model/diagnosis-result-disorder';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('diagnosis_result')
export class DiagnosisResult {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'float' })
  belief_value: number;

  @OneToMany(
    () => DiagnosisResultDisorder,
    (disorder) => disorder.diagnosisResult,
  )
  diagnosisResultDisorder: DiagnosisResultDisorder[];

  @ManyToOne(() => Consultation, (consultation) => consultation.diagnosisResult)
  consultation: Type<Consultation>;
}

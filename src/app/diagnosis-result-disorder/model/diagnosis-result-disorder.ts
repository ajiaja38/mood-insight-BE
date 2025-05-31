import { Type } from 'src/types/interface/ITypeClass.interface';
import { DiagnosisResult } from '../../diagnosis-result/model/diagnosis-result.entity';
import { Disorder } from '../../disorder/model/disorder.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('diagnosis_result_disorder')
export class DiagnosisResultDisorder {
  @PrimaryColumn()
  id: string;

  @ManyToOne(
    () => DiagnosisResult,
    (diagnosisResult) => diagnosisResult.diagnosisResultDisorder,
  )
  diagnosisResult: DiagnosisResult;

  @ManyToOne(() => Disorder, (disorder) => disorder.diagnosisResultDisorder)
  disorder: Type<Disorder>;
}

import { Type } from 'src/types/interface/ITypeClass.interface';
import { Consultation } from '../../consultation/model/consultation.entity';
import { Symptom } from '../../symptom/model/symptom.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('consultation_detail')
export class ConsultationDetail {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @ManyToOne(() => Symptom, (symptom: Symptom) => symptom.consultationDetail)
  @JoinColumn({ name: 'symptom_id', referencedColumnName: 'id' })
  symptom: Type<Symptom>;

  @ManyToOne(
    () => Consultation,
    (consultation: Consultation) => consultation.consultationDetail,
  )
  @JoinColumn({ name: 'consultation_id', referencedColumnName: 'id' })
  consultation: Type<Consultation>;
}

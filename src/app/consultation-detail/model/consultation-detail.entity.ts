import { Consultation } from 'src/app/consultation/model/consultation.entity';
import { Symptom } from 'src/app/symptom/model/symptom.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('consultation_detail')
export class ConsultationDetail {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @ManyToOne(() => Symptom, (symptom: Symptom) => symptom.consultationDetail)
  @JoinColumn({ name: 'symptom_id', referencedColumnName: 'id' })
  symptom: Symptom;

  @ManyToOne(
    () => Consultation,
    (consultation: Consultation) => consultation.consultationDetail,
  )
  @JoinColumn({ name: 'consultation_id', referencedColumnName: 'id' })
  consultation: Consultation;
}

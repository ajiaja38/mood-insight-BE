import { Consultation } from '../../consultation/model/consultation.entity';
import { ERole } from '../../../types/enum/ERole.enum';
import { EGender } from '../../../types/enum/Gender.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'mst_user',
  orderBy: { id: 'DESC' },
})
export class User {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    unique: true,
    nullable: false,
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  address: string;

  @Column({
    type: 'enum',
    enum: ERole,
    enumName: 'ERole',
    default: ERole.USER,
  })
  role: ERole;

  @Column({
    type: 'enum',
    enum: EGender,
    enumName: 'EGender',
  })
  gender: EGender;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Consultation, (consultation) => consultation.user)
  consultation: Consultation[];
}

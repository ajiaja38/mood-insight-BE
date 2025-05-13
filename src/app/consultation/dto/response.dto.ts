export interface IResAllConsultation {
  id: string;
  user: string;
  result: string;
  createdAt: Date;
}

interface IDetailConsultation {
  symptomId: string;
  symptom: string;
}

interface IDiagnosisResult {
  id: string;
  belief_value: number;
  disorder: string;
}

export interface IResDetailConsultation {
  id: string;
  userId: string;
  user: string;
  userAddress: string;
  userEmail: string;
  userPhoneNumber: string;
  symptoms: IDetailConsultation[];
  diagnosisResult: IDiagnosisResult[];
  solution: string[];
  createdAt: Date;
}

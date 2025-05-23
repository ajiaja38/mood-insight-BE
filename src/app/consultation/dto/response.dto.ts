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

interface IDiagnosisResultDisorder {
  id: string;
  name: string;
}

interface IDiagnosisResult {
  id: string;
  belief_value: number;
  plausability_value: number;
  disorder: IDiagnosisResultDisorder[];
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

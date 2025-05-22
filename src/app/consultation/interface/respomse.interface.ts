export interface IMassFunction {
  disorders: string[];
  belief: number;
}

export interface IResNewConsultation {
  consultationId: string;
  result: IMassFunction;
}

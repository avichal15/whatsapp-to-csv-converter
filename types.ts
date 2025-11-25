export interface StudentEntry {
  Name: string;
  Course: string;
  Year: string;
  Subject: string;
  PhoneNumber: string;
}

export interface ProcessingStatus {
  isProcessing: boolean;
  error: string | null;
  progress: number;
}
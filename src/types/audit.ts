export interface ToolDetail {
  plan: string;
  spend: number;
  seats: number;
}

export interface AuditData {
  selectedTools: string[];
  toolDetails: {
    [toolId: string]: ToolDetail;
  };
  teamSize: number;
  useCase: string;
}
export type User = {
    _id: string;
    username: string;
    role: Roles;
    district: {
      name: string;
      _id: string;
    };
}


export type District = {
  _id: string;
  name: string;
  supervisors: User[]; 
  records: Record[]; 
}



export type RecordType = 'BIRTH' | 'MARRIAGE' | 'DEATH'; 
export type Roles = "ADMIN" | "SUPERVISOR" | 'ANALYTICS';

export interface Record {
  id: string;
  type: RecordType;
  details: unknown; 
  createdAt: Date;
  createdBy: User; 
  district: District; 
}

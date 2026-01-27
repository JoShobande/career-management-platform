
export type JobApplicationStatus = 'active' | 'rejected' | 'offer'

export interface JobApplication{
    id:string;
    roleName: string
    companyName: string
    status: JobApplicationStatus
    dateApplied: string
}

export type NewJobApplication = Omit<JobApplication, 'id'>

export type ApplicationsContextValue = {
  applications: JobApplication[];
  status: 'loading' | 'ready' | 'error';
  addApplication:(input:NewJobApplication) => void;
};






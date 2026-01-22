
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
//   error: string | null;
  fetchApplications: () => void;
  addApplication:(input:NewJobApplication) => void;
};






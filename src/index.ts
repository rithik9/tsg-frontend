export type JobStatus = 'Idle' | 'Pending' | 'Processing' | 'Completed' | 'Failed';

export type CampaignStatus = 'Draft' | 'Active' | 'Paused' | 'Completed'

export interface Campaign {
    id: string;
    title: string;
    status: CampaignStatus;
    budget: number;
    startDate: string;
    jobStatus: JobStatus;
    progress: number;
}
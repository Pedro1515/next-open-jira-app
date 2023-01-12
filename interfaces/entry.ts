export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStatus;
}

export type EntryStatus = 'PENDING' | 'IN_PROGRESS' | 'FINISHED';
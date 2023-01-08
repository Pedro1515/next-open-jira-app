export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStatus;
}

export type EntryStatus = 'PEDING' | 'IN_PROGRESS' | 'FINISHED';
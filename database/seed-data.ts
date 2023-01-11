interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Entry in PEDING status',
            createdAt: new Date().getTime(),
            status: 'PEDING',
        },
        {
            description: 'Entry in IN_PROGRESS status',
            createdAt: new Date().getTime(),
            status: 'IN_PROGRESS',
        },
        {
            description: 'Entry in FINISHED status',
            createdAt: new Date().getTime(),
            status: 'FINISHED',
        },
    ]
}
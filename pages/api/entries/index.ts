import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { EntryModel, IEntryModel } from '../../../models'

type Data = 
    | { message: string }
    | IEntryModel[]

export default function handle(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res)
    
        default:
            return res.status(400).json({ message: 'Endpoint not implemented'})
    }

}

const getEntries = async (res: NextApiResponse<Data>) => {

    await db.connect()
    const entries = await EntryModel.find().sort({ createdAt: 'ascending' })
    await db.disconnect()

    res.status(200).json(entries)
}
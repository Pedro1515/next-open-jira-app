import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IEntryModel } from '../../../models'
import EntryModel from '../../../models/Entry';
import mongoose from 'mongoose';

type Data = 
    | { message: string }
    | IEntryModel;


export default function handle(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if ( !mongoose.isValidObjectId(id) ) {
        return res.status(400).json({ message: 'Invalid id' })
    }
    
    switch (req.method) {
        case 'GET':
            return getEntry(id as string, res)

        case 'PATCH':
            return pacthEntry(req, res)

        case 'DELETE':
            return deleteEntry(id as string, res)
    
        default:
            return res.status(400).json({ message: 'Endpoint not implemented'})
    }

}

const getEntry = async (id: string, res: NextApiResponse<Data>) => {
    try {

        await db.connect()
        const entry = await EntryModel.findById(id)
        if (!entry) return res.status(404).json({message: "Entry not found"})
        await db.disconnect()
        
        return res.status(200).json(entry)
        
    } catch (error) {
        await db.disconnect()
        console.log(error);

        return res.status(500).json({ message: 'Internal server error' })
    }

}

const pacthEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {

        await db.connect()
        const entryUpdated = await EntryModel.findOneAndUpdate(
            {_id: req.query.id}, 
            req.body, { new: true, runValidators: true }
        )

        if ( !entryUpdated ) return res.status(404).json({message: "Entry not found"}) 
        await db.disconnect()

        return res.status(200).json(entryUpdated)
    } catch (error: any) {
        await db.disconnect()
        return res.status(500).json({ message: error.errors.status.message })
    }
}

const deleteEntry = async (id: string, res: NextApiResponse<Data>) => {
    try {

        await db.connect()
        const entry = await EntryModel.deleteOne({_id: id})
        if (!entry) return res.status(404).json({message: "Entry not found"})
        await db.disconnect()

        console.log(entry);
        
        return res.status(200).json(entry as any)
        
    } catch (error) {
        await db.disconnect()
        console.log(error);

        return res.status(500).json({ message: 'Internal server error' })
    }
}
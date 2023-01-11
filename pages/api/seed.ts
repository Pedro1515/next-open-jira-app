// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { EntryModel } from '../../models'

type Data = {
  name: string
}

export default async function handler(  
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(process.env.NODE_ENV === 'production'){
    return res.status(401).json({ message: 'Not allowed' } as any)
  }

  await db.connect()
  
  await EntryModel.deleteMany()
  await EntryModel.insertMany( seedData.entries )
  
  await db.disconnect()

  res.status(200).json({ name: 'John Doe' }) 
}

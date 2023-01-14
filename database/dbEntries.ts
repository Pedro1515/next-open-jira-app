import { db } from '.';
import EntryModel from '../models/Entry';

export const dbEntries = async (id: string) => {
    await db.connect()
    const entry = await EntryModel.findById(id).lean()
    await db.disconnect()

    //* entry id is parsed to avoid the getServerSideProps serialization error because of the mongoID object
    const idString = JSON.stringify(`${entry?._id}`)
    const idParsed = JSON.parse(idString) as string

    return entry ? {...entry, _id: idParsed} : null;
}
import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces/entry';

export interface IEntryModel extends Entry {}

const EntrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number, required: true },
    status: { 
        type: String,
        enum: ['PEDING', 'IN_PROGRESS', 'FINISHED'], 
        message: 'Status must be PEDING, IN_PROGRESS or FINISHED',
    },
});

const EntryModel: Model<IEntryModel> = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);

export default EntryModel;
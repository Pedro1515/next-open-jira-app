import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongooConnection = {
    status: 0
}

export const connect = async () => {
    if (mongooConnection.status !== 0) {
        console.log( 'we were already connected' )
        return;
    }

    if( mongoose.connections.length > 0 ) {
        mongooConnection.status = mongoose.connections[0].readyState;
        
        if ( mongooConnection.status === 1 ) {
            console.log( 'Using existing database connection' )
            return;
        }

        await disconnect()
    }

    mongooConnection.status = 2;
    console.log('Connecting to database: ', process.env.MONGODB_URL)

    await mongoose.connect( process.env.MONGODB_URL || '' )
    mongooConnection.status = 1;
    console.log('Connected to database: ', process.env.MONGODB_URL)
}

export const disconnect = async () => {
    if (mongooConnection.status === 0) return;

    mongooConnection.status = 3;
    console.log('Disconnecting from database', process.env.MONGODB_URL)
    
    await mongoose.disconnect();
    mongooConnection.status = 0;
    console.log('Disconnected from database', process.env.MONGODB_URL)
}
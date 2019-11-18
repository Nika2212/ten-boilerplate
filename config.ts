const mongoose = require('mongoose');

export function connectMongoDB(): void {
    // @ts-ignore
    mongoose.Promise = global.Promise;
    mongoose.connect('MONGO_DB', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Database Connected Successfully'))
        .catch((error: any) => console.error('Database Error,', error));
}

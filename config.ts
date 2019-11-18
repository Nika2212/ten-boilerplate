const mongoose = require('mongoose');

export function connectMongoDB(): void {
    // @ts-ignore
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_SERVER, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Database Connected Successfully'))
        .catch((error: any) => console.error('Database Error,', error));
}

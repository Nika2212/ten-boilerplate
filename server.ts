import { Application } from './src/application';
import { connectMongoDB } from "./config";

connectMongoDB();
const app = new Application().listen(process.env.PORT);

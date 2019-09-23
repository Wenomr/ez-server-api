import express, {Express, Router, Request, Response} from 'express';
import router from './router';
import bodyParser from 'body-parser';

const app: Express = express();
app.use(bodyParser.text());
app.use(router);

app.listen(3000, () => {
    console.log("Server started on port 3000.")
});
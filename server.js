import express from 'express';
import cors from 'cors';

import movieRouter from './routers/moviesRouter.js';
import errorMiddlewares from './middlewares/errorMiddlewares.js';

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use('/api/movies', movieRouter);

app.get('/', (request, response) => {
    console.log(`🏠 New request on 'root' route from IP: ${request.ip}.`);
    response.send('Server is running...');
});

app.use(errorMiddlewares.routeNotFound);
app.use(errorMiddlewares.internalServerError);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`⏳ Server is listening on http://localhost:${process.env.SERVER_PORT}...`);
});
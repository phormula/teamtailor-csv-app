import 'dotenv/config';
import express, { urlencoded } from 'express';
import cors from 'cors';
import { join } from 'path';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

const corsConfig = {
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'RefreshToken'],
  exposedHeaders: ['Content-Length', 'Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsConfig));
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(join(__dirname, 'public')));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

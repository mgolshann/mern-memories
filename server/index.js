import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();

// middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// routes
app.use('/posts', postRoutes)

// mongo connections settings
const CONNECTION_URL = "mongodb://localhost/react-shopping-cart-db";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL ,{ useNewUrlParser: true, useUnifiedTopology:true })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`) ))
    .catch((error) => console.log(error.message))


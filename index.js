require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRoutes')
const postRouter = require('./routers/postRoutes')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ extended: true }));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

const start =  async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        app.listen(port, () => console.log(`Server started on PORT = ${port}`))
    } catch (e) {
        console.log(e);
    }
};

start();

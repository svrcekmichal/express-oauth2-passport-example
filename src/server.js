import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import database from 'config/database';

import authRoutes from 'modules/auth/routes';
import usersRoutes from 'modules/users/routes';

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(database.url);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(passport.initialize());
import 'modules/auth/passportSetup';

app.use('/api/auth',authRoutes);
app.use('/api/users', usersRoutes);

app.use((req,res, next) => {
    res.status(404).send('Not Found');
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    return res.json({error: typeof err.toJSON === 'function' ? err.toJSON() : err });
});

app.listen(PORT, () => console.log(`Api listening at localhost:${PORT} `));


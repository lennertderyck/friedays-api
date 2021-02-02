import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const api = express(), port = 5050;
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
        'DELETE',
        'PUT'
    ],

    allowedHeaders: [
        'Content-Type'
    ],
    accessControlAllowOrigin: '*'
};

// set handlers
api.use(cookieParser());
api.use(express.json());
api.use(cors(corsOpts));
api.use(express.urlencoded({
    extended: true
}));
api.use((err, req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.status(500).json(err)
})

export default api;
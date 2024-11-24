import express from 'express';
import multer from 'multer';
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from '../controllers/postscontroller.js';
import cors from 'cors';

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200 
}

//código específco
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage}); //vai estabeler onde os arquivos, que vão ser manejados pelo multer, vão ser salvos. Os arquivos vão ser alocados na pasta UPLOADS

const routes = (app) => {
    app.use(express.json()); //transformamos para json

    app.use(cors(corsOptions));

    // Rota para buscar todos os posts
    app.get('/posts', listarPosts);

    // Rota para criar um post
    app.post('/posts', postarNovoPost);

    //rota para upload de imagens(assumindo uma unica imagem chamada "imagem")
    app.post('/upload', upload.single("imagem"), uploadImagem) //chama a função uploadImagem para controlar o processo da imagem

    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;

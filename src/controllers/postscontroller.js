//vamos colocar aqui todas as responsabilidades de lidar com as respostas e as requisições

import { getTodosPosts, criarPost, atualiazarPost } from "../models/postmodels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) { //REQ(requisição) é como o cliente interage com o servidor, solicitando informações ou recursos. RES(resposta) representa a resposta que será enviada ao cliente.
    const posts = await getTodosPosts();
    res.status(200).json(posts); //o status 200 definine que a requisição deu tudo certo. o método send envia o nosso array posts.
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body; //ao enviarmos o conteúdo dessa requisição, o conteúdo vai para o corpo dessa requisição.

    try{ //tenta realizar(o conteúdo dentro das chaves) caso dê erro
        const postCriado = await criarPost(novoPost); //tenta criar um novo post no banco de dados
        res.status(200).json(postCriado); //ao criarmos um novopost, temos que ter como reposta o status 200
    }
    catch(erro){ //ao pegar o erro no try manipulamos ele no catch. O erro que deu em try, ele é armazenado no parâmetro ERRO que criamos no catch.
        console.log(erro.message); //o console mostra uma mensagem de erro, o comando MESSAGE é uma mensagem já pré-definida.
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try{
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        return res.status(201).json(postCriado);
        
    } catch(erro) {
        console.error(erro.message);
        return res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res){
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    

    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };

        const postCriado = await atualiazarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

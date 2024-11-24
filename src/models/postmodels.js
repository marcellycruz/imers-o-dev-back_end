import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); //conecta ao banco de dados utilizando a string de conexão fornecida como variável

//função assíncrona para buscar todos os posts do banco de dados.
export async function getTodosPosts() {
    //seleciona o banco de dados "imersao-intabytes"
    const db = conexao.db("imersao-instabytes");
    //Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    //Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    
    const db = conexao.db("imersao-instabytes");
    
    const colecao = db.collection("posts");
    
    return colecao.insertOne(novoPost); //o método INSERTONE() é um comando da documentação do mongodb
}

export async function atualiazarPost(id, novoPost) {

    const db = conexao.db("imersao-instabytes");
    
    const colecao = db.collection("posts");

    const objID = ObjectId.createFromHexString(id);
    
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost} );
}

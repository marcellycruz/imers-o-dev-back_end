//arquivo de conexão com o banco de dados

import { MongoClient } from 'mongodb'; //classe fornecida pelo driver do MongoDB

//A palavra-chave async é usada para declarar uma função assíncrona. Isso significa que dentro dessa função, podem ser usadas operações assíncronas, como o await.
export default async function conectarAoBanco(stringConexao){ //função que será chamada para realizar a conexão com o banco de dados. Ela recebe como parâmetro uma string chamada stringConexao, que representa a URL de conexão com o banco de dados
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectando ao cluster do banco de dados...');
        await mongoClient.connect(); // operação connect() tenta se conectar ao MongoDB de forma assíncrona. O await faz com que a execução da função espere essa operação ser concluída antes de continuar.
        console.log('Conectando ao MongoDB Atlas com sucesso!');

        return mongoClient; //Se tudo der certo, a função retorna o objeto mongoClient (que representa a conexão aberta com o banco de dados).
    } catch(erro){
        console.error('Falha na conxão com o banco!', erro);
        process.exit();
    }
}
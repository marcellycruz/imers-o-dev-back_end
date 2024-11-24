import express from 'express'; //de dentro do módulo express, vamos usar algo chamado 'express'.
import routes from "./src/routes/postroutes.js";

const posts = [ // um array que contém objetos
    {
        id: 1,
        descricao: "Uma foto teste",                    //OBJ1
        imagem: "http://placecats.com/millie/300/150",
    },

    {
        id: 2,
        descricao: "Gato fazendo yoga",                 //OBJ2
        imagem: "http://placecats.com/millie/300/150",
    },

    {
        id: 3,
        descricao: "Gato fazendo panqueca",             //OBJ3
        imagem: "http://placecats.com/millie/300/150",
    },
];

const app = express(); //executa uma função e guarda seu resultado na variável app. O app é o nome do nosso servidor.
app.use(express.static("uploads"));
routes(app);

app.listen(3000, () => { //Esse comando faz com que o servidor comece a "escutar" na porta 3000. Isso significa que ele ficará aguardando conexões de clientes na porta 3000 do seu servidor. Depois da virgula temos uma funçã de CALLBACK que será executado assim que o servidor começar a escutar a porta com sucesso. 
    console.log("Servidor escutando..."); //Esse é um comando que imprime uma mensagem no console sempre que o servidor começa a escutar na porta especificada (no caso, 3000).
});
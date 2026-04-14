const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('bombou!!!');
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});



// "DB"
let produtos = [];
let id = id++


// Aqui pelo amor de deus nao tenho nem o que explicar kkkkkkkk ele só pega os dados
// lista produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});


// aqui é o seguinte, o req body é tudo o que tu vai ter que preencher na hora de fazer a requisição, tipo, se tu for criar um produto, tu vai ter que preencher o nome e o preço, o id tem um id++ ou seja ele é autoincrementado, ou seja, ele vai somando 1 pra cada produto criado
// cria produto
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;

    // ó meu guri, aqui é um if simples, se o nome não existir ou o preço não existir, ele retorna um erro, presta atenção que o || serve pra dizer "ou", então se o nome não existir OU o preço não existir, ele retorna o erro
    if (!nome || preco === undefined) {
        return res.json({ erro: 'nome e preço são obrigatórios' });
    }

    //  Aqui é o mesmo rolê porém com tipo de dado, se o preço não for um número, ele retorna um erro
    if (typeof preco !== 'number') {
        return res.json({ erro: 'preço deve ser um número' });
    }

    const novoProduto = {
        id: id++,
        nome,
        preco
    };

    produtos.push(novoProduto);

    res.json(novoProduto);
});



// Busca produto
app.get('/produtos/:id', (req, res) => {
    const idParam = req.params.id;

    const produto = produtos.find(p => p.id == idParam);

    res.json(produto);
});



// atualiza produto
app.put('/produtos/:id', (req, res) => {
    const idParam = req.params.id;

    const produto = produtos.find(p => p.id == idParam);

    if (produto) {
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
    }

    res.json(produto);
});



// deleta produto
app.delete('/produtos/:id', (req, res) => {
    const idParam = req.params.id;

    produtos = produtos.filter(p => p.id != idParam);

    res.json({ mensagem: 'produto deletado' });
});
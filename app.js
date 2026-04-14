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
let id = 0;


// lista produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});


// cria produto
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
        return res.json({ erro: 'nome e preço são obrigatórios' });
    }

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

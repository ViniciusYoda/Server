const express = require("express");
const app = express();
const Produtos = require("./models/Produtos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/cadastro", async (req, res) => {
    try {
        if (!req.body || !req.body.nome || !req.body.preco || !req.body.descricao) {
            return res.status(400).send("Dados do produto incompletos.");
        }
        await Produtos.create({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao
        });
        res.send("Produto cadastrado com sucesso");
    } catch (erro) {
        res.status(500).send('Erro ao cadastrar o produto: ' + erro);
    }
});

app.get("/", async (req, res) => {
    try {
        const produtos = await Produtos.findAll();
        res.send({ produtos: produtos });
    } catch (erro) {
        res.status(500).send('Erro ao buscar produtos: ' + erro);
    }
});

app.get("/:nome", async (req, res) => {
    try {
        const produto = await Produtos.findOne({ where: { nome: req.params.nome } });
        if (produto) {
            res.send(produto);
        } else {
            res.status(404).send("Produto não encontrado");
        }
    } catch (erro) {
        res.status(500).send("Erro ao buscar produto: " + erro);
    }
})

app.patch("/atualizar/:id", async (req, res) => {
    try {
        const [updated] = await Produtos.update(
            {
                nome: req.body.nome,
                preco: req.body.preco,
                descricao: req.body.descricao
            },
            { where: { id: req.params.id } }
        );
        if (updated) {
            res.send("Produto atualizado com sucesso");
        } else {
            res.status(404).send("Produto não encontrado");
        }
    } catch (erro) {
        res.status(500).send("Erro ao atualizar: " + erro);
    }
});

app.delete("/deletar/:id", async (req, res) => {
    try {
        const deleted = await Produtos.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.send("Produto deletado com sucesso");
        } else {
            res.status(404).send("Produto não encontrado");
        }
    } catch (erro) {
        res.status(500).send("Erro ao deletar: " + erro);
    }
})

app.listen(8081, () => {
    console.log('Servidor está rodando');
});

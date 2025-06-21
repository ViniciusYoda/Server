const db = require("./db")

// Verifique se db.sequelize e db.Sequelize estão definidos
if (!db.sequelize || !db.Sequelize) {
    throw new Error("O módulo './db' deve exportar 'sequelize' e 'Sequelize'. Verifique o arquivo db.js.");
}

const Produto = db.sequelize.define("produtos", {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: db.Sequelize.DOUBLE,
        allowNull: false
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
})

async function init() {
    await Produto.sync({ force: true })
    await Produto.create({
        nome: "Core i5 12400F",
        preco: 950.99,
        descricao: "Processador da 12th geração",
    })
}

init()
module.exports = Produto
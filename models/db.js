const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "cadastroserver",
    "root",
    "Hayashi11@4",
    {
        host: "localhost",
        dialect: "mysql"
    }
)

sequelize.authenticate().then((function(){
    console.log('Banco de dados conectado com sucesso')
})).catch(function(erro) {
    console.log('Erro', erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
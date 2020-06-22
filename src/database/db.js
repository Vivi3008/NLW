const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database('src/database/database.db')

db.serialize( ()=>{
    //CRIAR A TABELA
    db.run(`CREATE TABLE IF NOT EXISTS places(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        adress TEXT,
        adress2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
    );
    `)

    //inserir dados na tabela
    const query = `INSERT INTO places(
        image,
        name,
        adress,
        adress2,
        state,
        city,
        items
    ) VALUES(?,?,?,?,?,?,?); `

    const values = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Papersider",
        "Rua são paulo, Jardim Petrópolis",
        "Número 2",
        "Goiás",
        "Goiânia",
        "Papel, Papelão"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        } 

        console.log('Cadastrado com sucesso!')
        console.log(this)
    }
    
 // db.run(query, values, afterInsertData)

   
  //
    //deletar um dado da tabela
/*     db.run('DELETE FROM places WHERE id=?', [3],  function(err){
        if(err) return console.log(err)

        console.log('Registro deletado com sucesso!')
    })
 */
 //consultar dados da tabela
/*   db.all(`SELECT * FROM places`,  function(err,rows){
    if(err){
     return console.log(err)
    } 
    console.log(rows)
})  */

})

module.exports = db
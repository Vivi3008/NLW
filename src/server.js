const express = require("express")
const server = express()
const db = require('./database/db')

//configurando pasta publica
server.use(express.static('public'))

//habilitando o uso do req.body
server.use(express.urlencoded({extended:true}))

//utilizando template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})


server.get('/', (req,res)=>{
   return res.render("index.html")
   
})

server.get('/create-point', (req,res)=>{

    return res.render("create-point.html")
})

server.post('/savepoint', (req,res)=>{

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
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            return res.render("create-point.html", {error: true} )
        } 

        return res.render("create-point.html", {saved: true} )
        
    }
    
   db.run(query, values, afterInsertData)

})

server.get('/search', (req,res) => {

    const search = req.query.search

    if (search == ""){
        return res.render('search-results.html', {total: 0})
        
    } 
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows){
        if(err) {
         return console.log(err)
        } 
    
        //mostrar a pagina html com os dados do banco de dados
         return res.render("search-results.html", {places: rows, total: rows.length})
    })
   
})

//ligando o servidor na porta 3000
server.listen(3000)
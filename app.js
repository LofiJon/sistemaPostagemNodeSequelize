const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const Post = require('./models/Post') 
const bodyParser = require("body-parser")
//configuração de template engine

        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars') 
//Body-parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
//conexão com banco de dados


// rotas
        app.get('/',function(req,res){
                Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
                    // console.log(posts)
                    res.render('home',{posts: posts})
                }).catch((erro)=>{
                    res.render(`erro na amostra ${erro}`)
                })
            })

        app.get('/cadastro', (req,res)=>{
            res.render('formularioCadastro')
        })

        app.post('/add', (req,res)=>{
            
            Post.create({
                titulo: req.body.titulo,
                conteudo: req.body.conteudo
            }).then(()=>{
                res.redirect('/')
            }).catch((erro)=>{
                res.send(`Houveu uma falha na postagem :( : ${erro}`)
            })
        })

        app.get('/deletar/:id',function(req,res){
            Post.destroy({
                where:{
                    'id': req.params.id
                }
            }).then(()=>{
                    res.send("Excluido com sucesso!")
            }).catch((erro)=>{
                res.send("essa postagem não existe")
            })
        })


//
app.listen(8000, ()=>{
    console.log("rodando na porta 8000!")
})
/*Objetivo: Criar nossa API de usuários

    - Criar um usuário
    - Listar todos os usuários
    - Editar um usuário
    - Deletar um usuário

    Usuário do banco de dados Mongo: matheuspereira10br / Senha: tmzyxk7XOz9RxSnW

*/

// importar express
import express from 'express'

// importar cors
import cors from 'cors'

// Importar o Prisma
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Cria uma variável para uma função para o express para acessar tudo que podemos nele.
const app = express()

// Avisar o express que vamos utilizar JSON
app.use(express.json())
app.use(cors())

/* Criar uma rota que devolve algo 
    1) Tipo de Rota / Método HTTP (Com requisição - req e resposta - res)
    2) Endereço
*/

// Criar usuário (Post)
app.post('/usuarios', async (req, res) => {
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

// Listar usuários (Get)
app.get('/usuarios', async (req, res) => {

    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

// Editar usuário (Put)
app.put('/usuarios/:id', async (req, res) => {
    
    await prisma.user.update({

        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

// Deletar usuário
app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Usuário deletado com sucesso!'})
})

// Dizendo qual porta do computador ele deve rodar
app.listen(3000)
// config untuk API
const express = require('express')
const app = express()
// port mana apinya akan dijalankan
const port = 2020

// agar dapat menerima objek saat post (req.body)
app.use(express.json())

// Config untuk MongoDB
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const URL = 'mongodb://127.0.0.1:27017'
const database = 'API-MongoDB'

MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    // Jika terdapat error, 'err' akan berisi object error, dan kemudian memunculkan teks di console
    if (err) {
        return console.log('Gagal terkoneksi dengan MongoDB');
    }

    // Menentukan databse mana yang akan digunakan
    const db = client.db(database)

    // alamat, function yang akan di running ketika alamat itu dikunjungi
    // app.get('/users', (req, res) => {
    // res.send('<h1>Hello Friend</h1>')
    //     res.send(
    // {
    //     "status": 404,
    // req.query adalah data yang dikirim di masukkan di dalam params di postman
    //     name: req.query
    // }
    //         '<h1>Welcom to my Home</h1>'
    //     )
    // })

    app.post('/users', (req, res) => {
        // mengambil property name dan age dari req.body
        const { name, age } = req.body

        // res.send(
        // { name: req.body.name, age: req.body.age }
        //     { name, age }
        // )

        // db.users.insertOne // asyncronous maka ada then nya // codingan untuk memasukkan ke database
        db.collection('users').insertOne({ name, age })
            .then((resp) => {
                // res.send(resp)

                // jika kita ingin untuk mendapatkan respon tertentu // id dan user property dari hasil responnya, resp.insertedId resp.ops[0] data yang akan dihasilkan
                res.send(
                    {
                        id: resp.insertedId,
                        user: resp.ops[0]
                    }
                )
            })
    })

    app.get('/findone', (req, res) => {

        // Data yang dikirim saat proses GET akan dianggap sebagai string
        let _age = parseInt(req.query.age)

        // Mencari satu data berdasarkan umurnya
        db.collection('users').findOne({ age: _age })
            .then((resp) => res.send(resp))
    })

    // get data berdasarkan nama
    app.get('/users', (req, res) => {
        // harus sesuai dengan inputan yang dipostman // get dan params name 
        let _age = parseInt(req.query.age)

        // mencari lebih dari satu data berdasarkan umurnya
        db.collection('users').find({ age: _age })
            .toArray().then((resp) => {
                res.send(resp)
            })
    })

})



app.listen(port, () => {
    console.log('Api Running at port' + port);
})

//localhost:2020/users?name=kunto params post key value
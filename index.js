// config untuk API
const express = require('express')
const app = express()
// port mana apinya akan dijalankan
const port = 2020

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
    app.get('/users', (req, res) => {
        // res.send('<h1>Hello Friend</h1>')
        res.send(
            {
                "status": 404,
                // req.query adalah data yang dikirim di masukkan di dalam params di postman
                name: req.query
            }
        )
    })

    // kalau post pilih post di postman lalu body pilih raw dan pilih jason
    app.post('/users', (req, res) => {
        res.send(
            req.body
        )
    })
})

// agar dapat menerima objek saat post (req.body)
app.use(express.json())

app.listen(port, () => {
    console.log('Api Running at port' + port);
})

//localhost:2020/users?name=kunto params post key value
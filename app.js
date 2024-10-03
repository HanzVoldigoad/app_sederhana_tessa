const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Koneksi ke Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aplikasi_sederhana'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// Rute untuk Menambahkan Data Pengguna (CREATE)
app.post('/register', (req, res) => {
    let user = { 
        nama: req.body.nama, 
        email: req.body.email, 
        kata_sandi: req.body.kata_sandi 
    };
    let sql = 'INSERT INTO pengguna SET ?';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        res.send('User registered successfully!');
    });
});

// Rute untuk Menampilkan Semua Pengguna (READ)
app.get('/users', (req, res) => {
    let sql = 'SELECT * FROM pengguna';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Rute untuk Memperbarui Pengguna Berdasarkan ID (UPDATE)
app.put('/user/:id', (req, res) => {
    let sql = `UPDATE pengguna SET nama = '${req.body.nama}', email = '${req.body.email}' WHERE id_pengguna = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('User updated successfully!');
    });
});

// Rute untuk Menghapus Pengguna Berdasarkan ID (DELETE)
app.delete('/user/:id', (req, res) => {
    let sql = `DELETE FROM pengguna WHERE id_pengguna = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully!');
    });
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Menjalankan server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

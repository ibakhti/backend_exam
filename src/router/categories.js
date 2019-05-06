const router = require('express').Router();

const conn = require('./../connection/connection');

router.post('/addcategory', (req, res) => {
    const data = req.body
    const sql = `INSERT INTO categories SET ?`;
    const sql2 = `SELECT * FROM categories`;

    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err.sqlMessage)

        conn.query(sql2, (err, result2) => {
            if(err) return res.send(err.sqlMessage)

            res.send(result2)
        })
    })
});

router.get('/allcategory', (req, res) => {
    const sql = `SELECT * FROM categories`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err.sqlMessage)

        res.send(result)
    })
});

router.put('/editcategory/:categoryId', (req, res) => {
    const data = req.body;
    const sql = `UPDATE categories SET ? WHERE id = ${req.params.categoryId}`;
    const sql2 = `SELECT * FROM categories`

    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err.sqlMessage)

        conn.query(sql2, (err, result2) => {
            if(err) return res.send(err.sqlMessage)

            res.send(result2)
        })
    })
});

router.delete('/deletecategory/:categoryId', (req, res) => {
    const sql = `DELETE FROM categories WHERE id = ${req.params.categoryId}`
    const sql2 = `SELECT * FROM categories`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err.sqlMessage);

        conn.query(sql2, (err, result2) => {
            if(err) return res.send(err.sqlMessage)

            res.send(result2)
        })
    })
});


module.exports = router
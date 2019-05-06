const router = require('express').Router();

const conn = require('./../connection/connection');

router.post('/addconnection', (req, res) => {
    const data = req.body;
    const nData = {};
    sql1 = `SELECT id FROM movies WHERE nama = '${data.movie}'`;
    sql2 = `SELECT id FROM categories WHERE nama = '${data.category}'`;
    sql3 = 'INSERT INTO movcat SET ?';
    sql4 = `SELECT * FROM movcat`;

    conn.query(sql1, (err, result) => {
        if(err) return res.send('dari sql1: ' + err.sqlMessage)
        if(result.length === 0) return res.status(400).send("Movie Not Found")
        
        nData.movie_id = result[0].id

        conn.query(sql2, (err, result2) => {
            if(err) res.send('dari sql2: ' + err.sqlMessage)
            if(result2.length === 0) return res.status(400).send("Category Not Found")
            nData.category_id = result2[0].id

            conn.query(sql3, nData, (err, result3) => {
                if(err) return res.send('dari sql3:' + err.sqlMessage)

                conn.query(sql4, (err, result4) => {
                    if(err) return res.send('dari sql4: ' + err.sqlMessage)
                    res.send(result4);
                })
            })
        })
    })
});


router.delete('/deleteconnection/:movcatId', (req, res) => {
    const sql = `DELETE FROM movcat WHERE id = ${req.params.movcatId}`;
    const sql2 = `SELECT * FROM movcat`;

    conn.query(sql, (err, result) => {
        if(err) return res.send(err.sqlMessage)
        conn.query(sql2, (err, result2) => {
            if(err) res.send(err.sqlMessage)
            res.send(result2)
        })
    })
});

router.get('/allmovcat', (req, res) => {
    const sql = `SELECT m.nama AS namaMovie, c.nama AS namaCategory FROM movcat mv JOIN movies m ON mv.movie_id = m.id JOIN categories c ON mv.category_id = c.id`;

    conn.query(sql, (err, result) => {
        if(err) return res.send(err.sqlMessage)
        res.send(result)
    })
});

module.exports = router;
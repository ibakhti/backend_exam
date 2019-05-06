const router = require('express').Router();

const conn = require('./../connection/connection');

router.post('/addmovie', (req, res) => {
    const data = req.body
    const sql = `INSERT INTO movies SET ?`
    const sql2 = `SELECT * FROM movies`

    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err.sqlMessage)
        
        conn.query(sql2, (err, result2) => {
            if(err) return res.send(err.sqlMessage)
            res.send(result2)
        })
    })
});

router.get('/allmovie', (req, res) => {
    const sql = `SELECT * FROM movies`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err.sqlMessage)

        res.send(result)
    })
});

router.put('/editmovie/:movieId', (req, res) => {
    const data = req.body;
    const sql = `UPDATE movies SET ? WHERE id = ${req.params.movieId}`;
    const sql2 = `SELECT * FROM movies`;

    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err.sqlMessage)
        if(!result.affectedRows) return res.status(404).send('id not found')
        conn.query(sql2, (err, result2) => {
            if(err) return res.send(err.sqlMessage);
            res.send(result2)
        })
    })
});

router.delete('/deletemovie/:movieId', (req, res) => {
    const sql = `DELETE FROM movies WHERE id = ${req.params.movieId}`;
    const sql2 = `SELECT * FROM movies`

    conn.query(sql, (err, result) => {
        if(err) return res.send(err.sqlMessage);

        conn.query(sql2, (err, result2) => {
            if(err) return res.send(err.sqlMessage)
            res.send(result2)
        })
    })
});


module.exports = router
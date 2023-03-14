const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.db');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // Add this middleware to parse JSON requests


db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY AUTOINCREMENT, nameProduct TEXT, priceProduct NUMERIC, imgProduct TEXT)');
});

app.get('/getProducts', (req, res) => {
    db.all('SELECT * FROM product', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
});
app.post('/createProduct', (req, res) => {
    const { name, price} = req.body;
    const { authorization } = req.headers;

    db.run('INSERT INTO product (nameProduct, priceProduct, imgProduct) VALUES (?,?,?)', name, price, img, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.send('User created');
        }
      });
  
      // db.run('INSERT INTO product (nameProduct, priceProduct, imgProduct) VALUES (?)', name, price, img, (err) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('Internal Server Error');
    //     } else {
    //         res.send('User created');
    //     }
    // });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

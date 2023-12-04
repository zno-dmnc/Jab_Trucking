const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jab_db"
});

app.post('/register', (req,res)=>{
    const sql = "INSERT INTO login (fName, address, contact, email, password) VALUES (?)";
    
    const values = [
        req.body.fName,
        req.body.address,
        req.body.contact,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (err, data)=>{
        if(err){
            console.log(err);
            return res.json("Error");
        }

        return res.json(data)
    });
})

app.post('/login', (req,res)=>{
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data)=>{
        if(err){
            return res.json("Error");
        }

        if(data.length > 0){
            return res.json("Success");
        }
        else{
            return res.json("Failed");
        }
    });
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})
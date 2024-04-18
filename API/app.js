const express = require("express");
const sql = require("mssql");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const config = {
    user: "sa",
    server: "192.168.1.49",
    password: "warehousedbo",

    // port: 1443,
    database: "Project_test",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.json());

app.get('/', (req, res) => {
    res.json('Hello, Expresssss!');
});

app.get('/test', (req, res) => {
    res.json('Hello, Thanakorn!');
});
app.get('/User', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query
            ('SELECT * FROM users');

        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'No user found' });
        }

        const selectHead = result.recordset; // Assuming `recordset` is the correct property

        res.json(selectHead);
    } catch (error) {
        console.error('Error Select head:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});
app.post('/selectUser', async (req, res) => {
    try {
        const pool = await sql.connect(config);
       
        const {
           row_id
        } = req.body;

        const result = await pool.request()
        .input("row_id", sql.BigInt, row_id)
        
        .query
            ('SELECT * FROM users WHERE row_id = @row_id');


        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'No user found' });
        }

        const selectHead = result.recordset; // Assuming `recordset` is the correct property

        res.json(selectHead);
    } catch (error) {
        console.error('Error Select head:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

app.post('/newuser', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const {
            firstName,
            lastname,
            nickname,
            birthday,
            age,
            sex
        } = req.body;

        if (!firstName || !lastname || !nickname || !birthday || !age || !sex) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }

        const result = await pool.request()
            .input("firstName", sql.NVarChar, firstName)
            .input("lastname", sql.NVarChar, lastname)
            .input("nickname", sql.NVarChar, nickname)
            .input("birthday", sql.NVarChar, birthday)
            .input("age", sql.NVarChar, age)
            .input("sex", sql.NVarChar, sex)
            .query(
                `INSERT INTO users 
                (firstname, lastname, nickname, birthday, age, sex) 
                VALUES 
                (@firstName, @lastname, @nickname, @birthday, @age, @sex)`
            );

        res.status(200).json({ success: true, message: "New user added successfully" });
    } catch (error) {
        console.error("Error during form data processing:", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});
app.post('/updateuser', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const {
            row_id,
            updatefirstName,
            updatelastname,
            updatenickname,
            updatebirthday,
            updateage,
            updatesex
        } = req.body;

        if (!updatefirstName || !updatelastname || !updatenickname || !updatebirthday || !updateage || !updatesex) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }

        const result = await pool.request()
            .input("row_id", sql.BigInt, row_id)
            .input("updatefirstName", sql.NVarChar, updatefirstName)
            .input("updatelastname", sql.NVarChar, updatelastname)
            .input("updatenickname", sql.NVarChar, updatenickname)
            .input("updatebirthday", sql.NVarChar, updatebirthday)
            .input("updateage", sql.NVarChar, updateage)
            .input("updatesex", sql.NVarChar, updatesex)
            .query
            ( `UPDATE users  SET 
                firstname = @updatefirstName,
                lastname = @updatelastname,
                nickname = @updatenickname,
                birthday = @updatebirthday,
                age = @updateage,
                sex = @updatesex
                WHERE row_id = @row_id `
             )

        res.status(200).json({ success: true, message: "New user added successfully" });
    } catch (error) {
        console.error("Error during form data processing:", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});

app.post('/deleteuser', async (req, res) => {
    try {
        const pool = await sql.connect(config);
      const {
           row_id
        } = req.body;
        const result = await pool.request()
            .input("row_id", sql.BigInt, row_id)
        .query
            ('DELETE FROM users WHERE row_id = @row_id');  
        
            res.status(200).json({ success: true, message: "Delete User successfully" });     
    } catch (error) {
        console.error('Error Select head:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
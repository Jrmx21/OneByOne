const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.options('/api/datos', cors());
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'onebyone'
});

app.get('/api/datos', (req, res) => {
  connection.query('SELECT * FROM frases', (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(results);
    }
    console.log("Frases adquiridas correctamente");
  });
});
app.use(bodyParser.json());
app.post('/api/moverFrase', (req, res) => {
    const fraseId = req.body.frase_id;
    console.log(fraseId);
    // Obtén la frase de frasesusuario
    connection.query('SELECT * FROM frasesusuario WHERE frase_id = ?', [fraseId], (error, results) => {
      if (error) throw error;
  
      if (results.length > 0) {
        const fraseUsuario = results[0].fraseUsuario;//EL FALLO ESTA EN QUE ESTO NO DEVUELVE NADA
        const autorUsuario = results[0].autorUsuario;
  
        // Inserta la frase en la tabla frases
        connection.query('INSERT INTO frases (frase, autor) VALUES (?, ?)', [fraseUsuario, autorUsuario], (error, results)=> {
          if (error) throw error;
  
          // Elimina la frase de frasesusuario después de insertarla en frases
          connection.query('DELETE FROM frasesusuario WHERE frase_id = ?', [fraseId], (error, results) => {
            if (error) throw error;
  
            res.json({ message: 'Frase movida exitosamente' });
          });
        });
      } else {
        res.json({ message: 'Frase no encontrada en frasesusuario' });
      }
    });
  });
app.post('/api/addFrase', (req, res) => {
    const { fraseUsuario, autorUsuario } = req.body;
    if (!fraseUsuario || !autorUsuario) {
      return res.status(400).json({ message: 'Frase y autor son campos requeridos' });
    }
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
    const sql = 'INSERT INTO frasesUsuario (fraseUsuario, autorUsuario, fecha) VALUES (?, ?, ?)';
    connection.query(sql, [fraseUsuario, autorUsuario, currentDate], (err, result) => {
      if (err) {
        console.log('Error inserting data:', err);
        return res.status(500).json({ message: 'Error al insertar la frase' });
      }
  
      console.log('Frase insertada correctamente');
      return res.status(200).json({ message: 'Frase insertada correctamente' });
    });
  });
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
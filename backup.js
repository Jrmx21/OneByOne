const { exec } = require('child_process');

// Ruta y credenciales de la base de datos
const databaseHost = 'localhost';
const databaseUser = 'root';
const databasePassword = '123456';
const databaseName = 'nombre_de_tu_base_de_datos';

// Ruta donde se guardará la copia de seguridad
const backupFilePath = 'ruta/donde/guardar/copia_de_seguridad.sql';

// Comando para realizar la copia de seguridad usando mysqldump
const command = `mysqldump -h ${databaseHost} -u ${databaseUser} -p${databasePassword} ${databaseName} > ${backupFilePath}`;

// Ejecutar el comando
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al realizar la copia de seguridad: ${error.message}`);
  } else {
    console.log('Copia de seguridad exitosa');
  }
});

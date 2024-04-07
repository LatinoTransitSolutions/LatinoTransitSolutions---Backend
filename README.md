# LatinoTransitSolutions

## Pasos para levantar el proyecto

### Proyecto Backend

1. Revisar el .env para asegurarse que DB_USER, DB_PASSWORD y DB_PORT son los valores que corresponde a la instancia de MariaDB que se tiene corriendo en la máquina
2. En la consola ejecutar **npm install** para instalar todas las dependencias necesarias para que el proyecto funcione
3. Luego ejecutar **npm run dev** para levantar la aplicación en el puerto 8080. De estar ocupando el puerto 8080 se puede cambiar en el .env en la variable API_PORT

### DataBase

1. Ejecutar el archivo latinotransitsolutions.sql para crear la base de datos, las tablas y el usuario admin

### Postman

1. Importar el archivo latinotransitsolutions.postman_collection.json para tener la colección donde están todas las consultas HTTP
2. Importar el archivo latinotransitsolutions.postman_enviroment.json para tener las variables de entorno necesarias para que las consultas HTTP funcionen. En caso de haber cambiado el puerto donde se levanta la aplicación, hay que cambiar la variable de entorno **domain** para que tenga el puerto actualizado

### ⚠ Nota Importante

Implementamos un mecanismo de autenticación por Bearer Token, por lo tanto es importante revisar que en cada consulta de Postman, en el apartado de **Authorization** esté el "Type" como Bearer Token.

Luego de eso hay que ejecutar la consulta llamada **login (POST)** la cual devolverá un token que se debe copiar y pegar en la variable de entorno **token** para que la autenticación funcione bien y se puedan hacer las consultas

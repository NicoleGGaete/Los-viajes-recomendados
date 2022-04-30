# Proyecto Api **_Viajes Recomendados_**

## Tareas

⁂. Organizarse

1. Crear Base de Datos

   1. Inicializacion DB
   2. Conexion DB

1. Endpoints
   1. Users
      1. Registro de nuevo usuario
      2. Login de usuario
      3. Busqueda por UserName
   2. Recomendaciones
      1. Publicar recomendacion
      2. Ver lista de recomendacione (userId, tittle, image, category, spot, openLine)
      3. Buscar recomendaciones por lugar, categoria y voto
      4. Ver detalle de recomendaciones por id
      5. Votar recomendacion
      6. Eliminar recomendacion

### Tablas

1. Tabla _Users_

   1. id
   2. email
   3. password
   4. createdAt
   5. userName
   6. name
   7. surname
   8. picture
   9. description
   10. role

2. Tabla _Reco_
   1. recoId
   2. userId
   3. tittle
   4. category
   5. spot
   6. openLine
   7. text
   8. picture
   9. votes
   10. createdAt

Prueba5
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjUxMzYwNTY1LCJleHAiOjE2NTE5NjUzNjV9.NdL_Su4UejqwGyfLiMlgnD2XKoua7baSxauLwlqcGYQ

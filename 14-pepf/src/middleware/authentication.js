// Autenticación de user
function userAuth(request, response, next) {
  const isAdmin = true;
  if (isAdmin) next();

  console.log(`isAdmin está seteado en ${isAdmin}`)

  response.json({
    error: 401,
    description: "ruta X método Y no autorizada",
  });
}

module.exports = userAuth;
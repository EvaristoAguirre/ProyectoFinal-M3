export const validateUserData = (user) => {
  // const emailRegexp = /\S+@\S+\.\S+/;
  const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const errors = {};

  if (!user.name) {
    errors.name = "Debe ingresar nombre y apellido";
  }

  if (!user.email) {
    errors.email = "Debe ingresar su correo";
  } else {
    if (emailRegexp.test(email)) {
      errors.email = "Debe ingresar un correo válido";
    }
  }

  if (!user.birtdate) {
    errors.birtdate = "Debe ingresar su fecha de nacimiento";
  }

  if (!user.nDni) {
    errors.nDni = "Debe ingresar su número de documento";
  }

  if (!user.username) {
    errors.username = "Debe ingresar un nombre de usuarix";
  }

  if (!user.password) {
    errors.password = "Debe ingresar una contraseña válida";
  } else {
    if (user.password.length < 6) {
      errors.password = "Contraseña de al menos 6 caracteres";
    }
    if (user.password.length > 10) {
      errors.password = "Contraseña de no más de 10 caracteres";
    }
    
  }

 
  return errors;
};

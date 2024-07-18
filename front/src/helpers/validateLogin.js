export const validateLoginData = (user) => {
    
    const errors = {};
  
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
  
export const validateReservarData = (appointmentData) => {
    
  const isOpen = (date) => {
    const day = new Date(date).getDate();
    return day === 0 || day === 1;
}
    const errors = {};
  
    if (!appointmentData.date) {
      errors.date = "Debe ingresar una fecha válida";
    } else if(isOpen(date)){
      errors.date = "La fecha seleccionada no es una fecha válida"
    }
  
    return errors;
  };
  
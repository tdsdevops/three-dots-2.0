import React, { createContext, useContext, useState } from "react";
import AppointmentDialog from "../shared/components/AppointmentDialog";

const AppointmentContext = createContext();

export const useAppointment = () => {
  return useContext(AppointmentContext);
};

export const AppointmentProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <AppointmentContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <AppointmentDialog open={isOpen} onClose={closeDialog} />
    </AppointmentContext.Provider>
  );
};

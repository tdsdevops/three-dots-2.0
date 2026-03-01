import React from "react";
import LinkButton from "../LinkButton";
import AppButton from "../AppButton";

function BookAppointmentButton() {
  return (
    <LinkButton
      to="/contact"
      element={<AppButton btnText="Book an Appointment" />}
    />
  );
}

export default BookAppointmentButton;

export const getContactEmailTemplate = ({ firstName, lastName, email, country, category, message }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
      <h2 style="color: #2563EB; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">New Contact Inquiry</h2>
      
      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563EB;">${email}</a></p>
        <p style="margin: 5px 0;"><strong>Country:</strong> ${country}</p>
        <p style="margin: 5px 0;"><strong>Category:</strong> ${category}</p>
      </div>
      <h3 style="color: #444; margin-bottom: 10px;">Message:</h3>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #2563EB; white-space: pre-wrap;">${message}</div>  
      <p style="font-size: 0.85rem; color: #888; margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 10px;">This email was automatically generated from the Contact Us form on your website.</p>
    </div>
  `;
};

export const getAppointmentEmailTemplate = ({ name, email, phone, date, time, message }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
      <h2 style="color: #8B5CF6; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">New Appointment Request</h2>
      
      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563EB;">${email}</a></p>
        <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin: 5px 0;"><strong>Preferred Date:</strong> ${date}</p>
        <p style="margin: 5px 0;"><strong>Preferred Time:</strong> ${time}</p>
      </div>
      <h3 style="color: #444; margin-bottom: 10px;">Message / Details:</h3>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #8B5CF6; white-space: pre-wrap;">${message || 'No additional message provided.'}</div>  
      <p style="font-size: 0.85rem; color: #888; margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 10px;">This email was automatically generated from the Book an Appointment form on your website.</p>
    </div>
  `;
};

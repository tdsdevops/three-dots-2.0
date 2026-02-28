import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,

  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { apiRoutes, appConstant, services } from '../../appConstant';
import MuiButton from '../MuiButton';
import useAxios from '../../api/useAxios'
import { sendmail } from '../functions/commonfunctions';
const ServiceDialog = ({ open, onClose,handleClick }) => {
  const axiosData = useAxios();
  const service =  services.map((item, ind) => {return item.title });
 
  const initialValues = {
    name: '',
    companyName: '',
    email: '',
    service: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    companyName: Yup.string().required('Company Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    service: Yup.string().required('Please select a service'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = (values) => {
    handleClick()
    sendmail(values);
    onClose();
  };

  // Responsive design logic
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen} // Makes the dialog fullscreen on small screens
    >
      <DialogTitle>Request Quote</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <Field
                as={TextField}
                margin="dense"
                label="Name"
                name="name"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name && Boolean(errors.name)}
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                margin="dense"
                label="Company Name"
                name="companyName"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyName}
                error={touched.companyName && Boolean(errors.companyName)}
                helperText={<ErrorMessage name="companyName" />}
              />
              <Field
                as={TextField}
                margin="dense"
                label="Email"
                name="email"
                type="email"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
              />
              <FormControl
                fullWidth
                margin="dense"
                error={touched.service && Boolean(errors.service)}
              >
                <InputLabel>Service</InputLabel>
                <Field
                  as={Select}
                  name="service"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.service}
                >
                  {service.map((service, index) => (
                    <MenuItem key={index} value={service}>
                      {service}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="service" component="div" style={{ color: 'red', fontSize: '0.75rem' }} />
              </FormControl>
              <Field
                as={TextField}
                margin="dense"
                label="Enter Your Message"
                name="message"
                multiline
                rows={4}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                error={touched.message && Boolean(errors.message)}
                helperText={<ErrorMessage name="message" />}
              />
              <DialogActions>
              
                <MuiButton btnText='Cancel' submitQuoteValue={onClose} classname='' variant={appConstant.outlined}></MuiButton>
                <MuiButton  classname='' btnText={appConstant.submit} buttonType={appConstant.buttonType} variant={appConstant.contained} />
               
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;

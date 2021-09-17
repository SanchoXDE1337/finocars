import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  bodyOptions,
  colorOptions,
  fuelOptions,
  transmissionOptions,
  driveOptions,
  wheelOptions,
  ptsOptions,
  customsOptions,
  initialValues,
  validationSchema,
  cars,
} from './utils';
import classes from './styles.module.css';

export const SearchForm = () => {
  const [price, setPrice] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (values) => {
    const { data } = await axios.post('/api/price', values);
    setPrice(data.price);
    handleOpen();
  };

  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" gutterBottom component="div">
        Оценка автомобиля
      </Typography>
      <Typography variant="overline" gutterBottom component="div" color="textSecondary">
        От корректности введенных данных зависит точность определения стоимости автомобиля
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values: { brand, model },
          setFieldValue,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form>
            <div className={classes.dataContainer}>
              <Autocomplete
                id="brand"
                name="brand"
                options={Object.keys(cars.brands)}
                onInputChange={(e, value) => {
                  setFieldValue('brand', value !== null ? value : '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="Бренд"
                    variant="outlined"
                    name="brand"
                    error={touched.brand && Boolean(errors.brand)}
                  />
                )}
              />
              <Autocomplete
                id="model"
                name="model"
                freeSolo
                disabled={!brand}
                onInputChange={(e, value) => {
                  setFieldValue('model', value !== null ? value : '');
                }}
                options={
                  cars.brands[brand]
                    ? Object.keys(cars.brands[brand]?.models)
                    : []
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Модель"
                    name="model"
                    margin="normal"
                    variant="outlined"
                    error={touched.model && Boolean(errors.model)}
                  />
                )}
              />
              <Autocomplete
                id="generation"
                name="generation"
                disabled={!brand || !model}
                freeSolo
                onInputChange={(e, value) => {
                  setFieldValue('generation', value !== null ? value : '');
                }}
                options={cars.brands[brand]?.models?.[model] || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Поколение"
                    name="generation"
                    margin="normal"
                    variant="outlined"
                    error={touched.generation && Boolean(errors.generation)}
                  />
                )}
              />
              <TextField
                id="year"
                name="year"
                onChange={handleChange}
                inputProps={{
                  min: 1900,
                  max: new Date().getFullYear(),
                  maxLength: 4,
                }}
                type="number"
                label="Год выпуска"
                margin="normal"
                variant="outlined"
                error={touched.year && Boolean(errors.year)}
              />
              <TextField
                id="mileage"
                name="mileage"
                onChange={handleChange}
                type="number"
                inputProps={{
                  min: 0,
                }}
                label="Пробег(км)"
                margin="normal"
                variant="outlined"
                error={touched.mileage && Boolean(errors.mileage)}
              />
              <Autocomplete
                id="body_type"
                name="body_type"
                onInputChange={(e, value) => {
                  setFieldValue('body_type', value !== null ? value : '');
                }}
                options={bodyOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="Кузов"
                    variant="outlined"
                    name="body_type"
                    error={touched.body_type && Boolean(errors.body_type)}
                  />
                )}
              />
              <Autocomplete
                id="color"
                name="color"
                onInputChange={(e, value) => {
                  setFieldValue('color', value !== null ? value : '');
                }}
                options={colorOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="Цвет"
                    variant="outlined"
                    name="color"
                    error={touched.color && Boolean(errors.color)}
                  />
                )}
              />
              <Autocomplete
                id="fuel_type"
                name="fuel_type"
                onInputChange={(e, value) => {
                  setFieldValue('fuel_type', value !== null ? value : '');
                }}
                options={fuelOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="Тип топлива"
                    variant="outlined"
                    name="fuel_type"
                    error={touched.fuel_type && Boolean(errors.fuel_type)}
                  />
                )}
              />
              <TextField
                id="engine_volume"
                name="engine_volume"
                onChange={handleChange}
                inputProps={{
                  min: 0,
                  step: '0.1',
                  max: 10,
                }}
                type="number"
                label="Объем двигателя(л)"
                margin="normal"
                variant="outlined"
                error={touched.engine_volume && Boolean(errors.engine_volume)}
              />
              <TextField
                id="engine_power"
                name="engine_power"
                onChange={handleChange}
                inputProps={{
                  min: 0,
                  max: 3000,
                }}
                type="number"
                label="Мощность двигателя(л.с.)"
                margin="normal"
                variant="outlined"
                error={touched.engine_power && Boolean(errors.engine_power)}
              />
              <Autocomplete
                id="transmission"
                name="transmission"
                onInputChange={(e, value) => {
                  setFieldValue('transmission', value !== null ? value : '');
                }}
                options={transmissionOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="Трансмиссия"
                    variant="outlined"
                    name="transmission"
                    error={touched.transmission && Boolean(errors.transmission)}
                  />
                )}
              />
              <Autocomplete
                id="drive"
                name="drive"
                onInputChange={(e, value) => {
                  setFieldValue('drive', value !== null ? value : '');
                }}
                options={driveOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="Привод"
                    variant="outlined"
                    name="drive"
                    error={touched.drive && Boolean(errors.drive)}
                  />
                )}
              />
              <Autocomplete
                id="wheel"
                name="wheel"
                onInputChange={(e, value) => {
                  setFieldValue('wheel', value !== null ? value : '');
                }}
                options={wheelOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="Руль"
                    variant="outlined"
                    name="wheel"
                    error={touched.wheel && Boolean(errors.wheel)}
                  />
                )}
              />
              <TextField
                id="owners_count"
                name="owners_count"
                onChange={handleChange}
                inputProps={{
                  min: 0,
                  max: 30,
                }}
                type="number"
                label="Число владельцев"
                margin="normal"
                variant="outlined"
                error={touched.owners_count && Boolean(errors.owners_count)}
              />
              <Autocomplete
                id="pts"
                name="pts"
                onInputChange={(e, value) => {
                  setFieldValue('pts', value !== null ? value : '');
                }}
                options={ptsOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="ПТС"
                    variant="outlined"
                    name="pts"
                    error={touched.pts && Boolean(errors.pts)}
                  />
                )}
              />
              <Autocomplete
                id="customs"
                name="customs"
                onInputChange={(e, value) => {
                  setFieldValue('customs', value !== null ? value : '');
                }}
                options={customsOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="Таможня"
                    variant="outlined"
                    name="customs"
                    error={touched.customs && Boolean(errors.customs)}
                  />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress color="secondary" size={24} />
                ) : (
                  'Оценить'
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.modal}>
          <Typography variant="h5" gutterBottom component="div">
            Стоимость автомобиля:
          </Typography>
          <Typography variant="h4" gutterBottom component="div">
            {typeof price === 'string' ? price : price + ' рублей'}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

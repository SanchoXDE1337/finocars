import React, { useState } from 'react';
import { Formik, Form } from 'formik';
// import * as yup from 'yup';
import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

const cars = require('./normalizedCars.json');

/*
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
*/

const bodyOptions = [
  'седан',
  'седан 2 дв.',
  'хэтчбек 5 дв.',
  'хэтчбек 4 дв.',
  'хэтчбек 3 дв.',
  'универсал 5 дв.',
  'универсал 3 дв.',
  'внедорожник 5 дв.',
  'внедорожник 3 дв.',
  'внедорожник открытый',
  'кабриолет',
  'компактвэн',
  'купе',
  'купе-хардтоп',
  'лимузин',
  'лифтбек',
  'микровэн',
  'минивэн',
  'пикап двойная кабина',
  'пикап одинарная кабина',
  'пикап полуторная кабина',
  'родстер',
  'седан-хардтоп',
  'спидстер',
  'тарга',
  'фастбек',
  'фаэтон',
  'фургон',
];

const colorOptions = [
  'бежевый',
  'белый',
  'голубой',
  'жёлтый',
  'зелёный',
  'золотистый',
  'коричневый',
  'красный',
  'оранжевый',
  'пурпурный',
  'розовый',
  'серебристый',
  'серый',
  'синий',
  'фиолетовый',
  'чёрный',
];

const fuelOptions = [
  'Бензин',
  'Дизель',
  'Газ',
  'Гибрид',
  'Бензин, газобаллонное оборудование',
  'Газ, газобаллонное оборудование',
  'Гибрид, газобаллонное оборудование',
  'Дизель, газобаллонное оборудование',
  'Электро',
];

const transmissionOptions = [
  'автоматическая',
  'механическая',
  'вариатор',
  'роботизированная',
];

const driveOptions = ['передний', 'задний', 'полный'];
const wheelOptions = ['Левый', 'Правый'];
const ptsOptions = ['Оригинал', 'Дубликат'];
const customsOptions = ['Растаможен', 'Не растаможен'];

const initialValues = {
  brand: '',
};

export const SearchForm = () => {
  const [price, setPrice] = useState();

  const onSubmit = async (values) => {
    const { data } = await axios.post('/api/price', values);
    console.log(data.price);
    setPrice(data.price);
  };

  const resetPrice = () => {
    price && setPrice(undefined);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleChange, values: { brand, model }, setFieldValue }) => (
          <Form>
            <Autocomplete
              id="brand"
              name="brand"
              freeSolo
              options={Object.keys(cars.brands)}
              onChange={resetPrice}
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
                />
              )}
            />
            <Autocomplete
              id="model"
              name="model"
              freeSolo
              disabled={!brand}
              onChange={resetPrice}
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
                />
              )}
            />
            <Autocomplete
              id="generation"
              name="generation"
              disabled={!brand || !model}
              freeSolo
              onChange={resetPrice}
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
                />
              )}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridGap: '24px',
              }}
            >
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
                    label="Коробка передач"
                    variant="outlined"
                    name="transmission"
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
                  />
                )}
              />
            </div>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {price && <h2 style={{ textAlign: 'center' }}>Цена авто: {price}</h2>}
    </div>
  );
};

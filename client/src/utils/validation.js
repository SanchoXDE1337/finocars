import * as yup from 'yup';

const initialValues = {
  brand: '',
  model: '',
  generation: '',
  year: '',
  mileage: '',
  body_type: '',
  color: '',
  fuel_type: '',
  engine_volume: '',
  engine_power: '',
  transmission: '',
  drive: '',
  wheel: '',
  owners_count: '',
  pts: '',
  customs: '',
};

const validationSchema = yup.object({
  brand: yup.string().required(),
  model: yup.string().required(),
  generation: yup.string().required(),
  year: yup.string().required(),
  mileage: yup.string().required(),
  body_type: yup.string().required(),
  color: yup.string().required(),
  fuel_type: yup.string().required(),
  engine_volume: yup.string().required(),
  engine_power: yup.string().required(),
  transmission: yup.string().required(),
  drive: yup.string().required(),
  wheel: yup.string().required(),
  owners_count: yup.string().required(),
  pts: yup.string().required(),
  customs: yup.string().required(),
});

export { initialValues, validationSchema };

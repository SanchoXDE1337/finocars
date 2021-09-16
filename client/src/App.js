import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

const cars = require("./normalizedCars.json");

const App = () => {
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [modelOptions, setModelOptions] = React.useState([]);
  const [generation, setGeneration] = React.useState("");
  const [genOptions, setGenOptions] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(12);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <Autocomplete
          id="brand"
          freeSolo
          inputValue={brand}
          onInputChange={(event, newBrand) => {
            setBrand(newBrand);
            setModel("");
            newBrand &&
              setModelOptions(
                cars.brands[newBrand]
                  ? Object.keys(cars.brands[newBrand]?.models)
                  : []
              );
            setGeneration("");
          }}
          options={Object.keys(cars.brands).map((brand) => brand)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Бренд"
              margin="normal"
              variant="outlined"
            />
          )}
        />
        <Autocomplete
          id="model"
          disabled={!brand}
          inputValue={model}
          onInputChange={(event, newModel) => {
            setModel(newModel);
            setGeneration("");
            newModel &&
              setGenOptions(cars.brands[brand]?.models?.[newModel] || []);
          }}
          freeSolo
          options={modelOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Модель"
              margin="normal"
              variant="outlined"
            />
          )}
        />
        <Autocomplete
          id="generation"
          disabled={!brand || !model}
          inputValue={generation}
          onInputChange={(event, newGen) => setGeneration(newGen)}
          freeSolo
          options={genOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Поколение"
              margin="normal"
              variant="outlined"
            />
          )}
        />
          <TextField
              id="year"
              type="number"
              label="Год выпуска"
              margin="normal"
              variant="outlined"
          />
          <TextField
              id="color"
              type="text"
              label="Цвет"
              margin="normal"
              variant="outlined"
          />
          <TextField
              id="engineVolume"
              type="number"
              label="Объем двигателя"
              margin="normal"
              variant="outlined"
          />
          <TextField
              id="enginePower"
              type="number"
              label="Мощность двигателя(л.с.)"
              margin="normal"
              variant="outlined"
          />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default App;

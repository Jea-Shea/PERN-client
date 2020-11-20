import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={category}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Main Dish"}>Main Dish</MenuItem>
          <MenuItem value={"Side Dish"}>Side Dish</MenuItem>
          <MenuItem value={"Beverage"}>Beverage</MenuItem>
          <MenuItem value={"Appetizer"}>Appetizer</MenuItem>
          <MenuItem value={"Snack"}>Snack</MenuItem>
          <MenuItem value={"Dessert"}>Dessert</MenuItem>

        </Select>
        <FormHelperText>Whatever it is, hopefully it tastes good.</FormHelperText>
      </FormControl>
      
    </div>
  );
}

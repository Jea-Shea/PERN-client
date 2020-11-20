import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PickCategory from './PickCategory';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
      <TextField
          id="filled-full-width"
          label="Recipe"
          style={{ margin: 8 }}
          placeholder="Add a new recipe..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
      </div>
      <div>
        
        <TextField
          id="filled-multiline"
          label="Ingredients"
          fullwidth
          multiline
          rows={4}
          placeholder="What's in it? Enter ingredients seperated by commas..."

        />
      </div>
      <div>
        
        <TextField
          id="filled-multiline"
          label="Instructions"
          fullwidth
          multiline
          rows={4}
          placeholder="How do I cook it?"

        />
        <PickCategory/>
      </div>
    </form>
  );
}

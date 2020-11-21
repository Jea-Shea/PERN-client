import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import RecipeList from './RecipeList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));




export default function Recipes (props) {
  const classes = useStyles();

  const {sessionToken} = props;


  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [user, setUser] = useState('')

  const resetForm = () => {
      setName('')
      setIngredients('')
      setInstructions('')
  };

  const [recipes, setRecipes] = useState([]);

  useEffect( () => {
    fetch('http://localhost:8080/user/id', {
      method:'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': sessionToken
        }),
    }).then( u => u.json())
    .then(user => {
      setUser(user.id)
    })
    console.log(user)
  }, []
  )


  const fetchRecipes = () => {

    fetch('http://localhost:8080/recipes/', {
        method: 'GET',
        headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': sessionToken
        }),
        }).then(r => r.json())
        .then(rArr =>  {
            console.log(rArr)
            setRecipes(rArr)})
        .then(console.log('please work'));
    
    };

    useEffect(
      () => {
        fetchRecipes();
      }, []
    )

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('youve clicked submit');  
    const body = {
        recipes: {
        name: name,
        ingredients: ingredients,
        instructions: instructions,
    }
};

  fetch('http://localhost:8080/recipes/create', {



    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionToken
    },
  body: JSON.stringify(body)
}).then(r => r.json())
  .then(rObj => {
      console.log(rObj);
      resetForm()
      fetchRecipes()
 } ) 
}

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <h1>Add a Recipe</h1>
        </AccordionSummary>
        <AccordionDetails className={classes.details} > 
                 <div className={classes.column}>
            <Typography className={classes.heading}> Recipe Title </Typography>
            <input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}> Ingredients </Typography>
            <input value={ingredients} onChange={e => setIngredients(e.target.value)} />
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}> Instructions </Typography>
            <input value={instructions} onChange={e => setInstructions(e.target.value)} />
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" onClick={resetForm}>Cancel</Button>
          <Button size="small">Add to Shopping List</Button>
          <Button size="small" color="primary" onClick={handleSubmit} > Save </Button>
        </AccordionActions>
      </Accordion>    
      
        <RecipeList sessionToken={props.sessionToken} recipes={recipes}/>

    </div>
  );
}


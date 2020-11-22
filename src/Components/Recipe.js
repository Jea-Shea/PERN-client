import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fab from '@material-ui/core/Fab';
import TextField from "@material-ui/core/TextField";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FloatingActionButtons from "./FloatingActionButtons";
import RecipeList from "./RecipeList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  addRecipe: {
    marginLeft: '45%'
  }
}));

export default function Recipes(props) {
  const classes = useStyles();

  const { sessionToken } = props;

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [user, setUser] = useState("");
  const [selection, setSelection] = useState("");

  const [edits, setEdits] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const resetForm = () => {
    setName("");
    setIngredients("");
    setInstructions("");
  };


  useEffect(() => {
    fetch("http://localhost:8080/user/id", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    })
      .then((u) => u.json())
      .then((user) => {

        console.log("user", user);
        setUser(user);
      });
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (edits) {
      for (let recipe of recipes) {
        console.log(recipe);
        if (recipe.id === selection) {
          setName(recipe.name);
          setIngredients(recipe.ingredients);
          setInstructions(recipe.instructions);
        }
      }
    } else {
      setName("");
      setIngredients("");
      setInstructions("");
    }
  }, [edits, selection]);

  const fetchRecipes = () => {
    fetch("http://localhost:8080/recipes/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    })
      .then((r) => r.json())
      .then((rArr) => {
        console.log(rArr);
        if (rArr.length > 0) {
          setRecipes(rArr);
        } else {
          setRecipes([]);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("youve clicked submit");

    if (edits) {
      editRecipe();
    } else {
      createRecipe();
    }
  };

  const createRecipe = () => {
    const body = {
      recipes: {
        name: name,
        ingredients: ingredients,
        instructions: instructions,
        user: user,
      },
    };
    fetch("http://localhost:8080/recipes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionToken,
      },

      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((rObj) => {
        console.log(rObj);
        resetForm();
        fetchRecipes();
      });
  };

  const deleteRecipe = () => {
    fetch(`http://localhost:8080/recipes/delete/${selection}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    }).then((r) => {
      console.log(r);
      fetchRecipes();
    });
  };

  const editRecipe = () => {
    fetch(`http://localhost:8080/recipes/update/${selection}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionToken,
      },
      body: JSON.stringify({
        name: name,
        instructions: instructions,
        ingredients: ingredients,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        fetchRecipes();
      });
  };

  const addToGroceries = () => {
    let groceryList, newGroceries;
    fetch("http://localhost:8080/user/groceries", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        groceryList = json;
        console.log(groceryList);
      })
      .then((groceries) => {
        console.log("adding to groceries");
        for (let recipe of recipes) {
          if (recipe.id == selection) {
            newGroceries = recipe.ingredients.split(", ");
          }
        }
        console.log(newGroceries);
        let grocerySet = [
          ...new Set(groceryList.concat([...newGroceries])),
        ].filter((i) => i.length > 0);
        console.log(grocerySet);
        let user = { groceries: grocerySet };
        console.log(user.groceries);
        fetch("http://localhost:8080/user/groceries/update", {
          method: "PUT",
          body: JSON.stringify({ user }),
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: sessionToken,
          }),
        })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >

          {edits ? ( <Fab className={classes.addRecipe} color="secondary" aria-label="add" variant="extended" >
              <EditIcon />
             Edit Recipe
      </Fab>) : ( <Fab className={classes.addRecipe} color="primary" aria-label="add" variant="extended" >
              <AddIcon />
             Add Recipe
      </Fab>)}
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column}>
            <Typography className={classes.heading}> Recipe Title </Typography>
            <TextField value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}> Ingredients </Typography>
            <TextField
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}> Instructions </Typography>
            <TextField
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" onClick={resetForm}>
            Cancel
          </Button>
          <Button size="small">Add to Shopping List</Button>
          <Button size="small" color="primary" onClick={handleSubmit}>
    Save
          </Button>
        </AccordionActions>
      </Accordion>

      <RecipeList
        sessionToken={props.sessionToken}
        recipes={recipes}
        setSelection={setSelection}
        selection={selection}
      />
      <FloatingActionButtons
        deleteRecipe={deleteRecipe}
        editRecipe={editRecipe}
        edits={edits}
        setEdits={setEdits}
        addToGroceries={addToGroceries}
      />
    </div>
  );
}

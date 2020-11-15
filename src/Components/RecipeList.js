import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'recipeName', headerName: 'Recipe', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  {
    field: 'ingredients',
    headerName: '# of Ingredients',
    type: 'number',
    width: 190,
  },

];

const rows = [
  { id: 1, category: 'Main Dish', recipeName: 'Tacos', ingredients: 35 },
  { id: 2, category: 'Dessert', recipeName: 'Pancakes', ingredients: 42 },
  { id: 3, category: 'Main Dish', recipeName: 'Pad Thai', ingredients: 45 },
  { id: 4, category: 'Main Dish', recipeName: 'Amazing Tuna Roll', ingredients: 16 },
  { id: 5, category: 'Main Dish', recipeName: 'Spicy Pineapple Pizza', ingredients: null },
  { id: 6, category: 'Dessert', recipeName: 'Apple Pie', ingredients: 150 },
  { id: 7, category: 'Main Dish', recipeName: 'Steak', ingredients: 44 },
  { id: 8, category: 'Side Dish', recipeName: 'Mashed Potatoes', ingredients: 36 },
  { id: 9, category: 'Side Dish', recipeName: 'French Fries', ingredients: 65 },
];

export default function DataGridDemo() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}

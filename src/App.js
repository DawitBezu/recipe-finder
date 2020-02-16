import React, { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Recipe from './Recipe';

import uuid from 'uuid/v4';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: 400
		}
	}
}));

const App = () => {
	const APP_ID = '99bdf6cd';
	const APP_KEY = 'febf9169fdc7df3266eda53bc4a6b66b';

	const [ recipes, setRecipes ] = useState([]);
	const [ search, setSearch ] = useState('');
	const [ query, setQuery ] = useState(''); // rice

	useEffect(
		() => {
			getRecipes();
		},
		[ query ]
	);

	const getRecipes = async () => {
		const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
		const data = await response.json();
		setRecipes(data.hits);
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(search);
		setSearch('');
	};

	const classes = useStyles();

	return (
		<div className="App">
			<div className="header">
				<h1>Recipe Finder</h1>
			</div>
			<div className="container">
				<form onSubmit={getSearch} className={classes.root}>
					<TextField
						id="filled-basic"
						label="Look for Recipies"
						variant="outlined"
						className="search-bar"
						type="text"
						value={search}
						onChange={updateSearch}
					/>
				</form>

				<div className="recipes">
					{recipes.map((recipe) => (
						<Recipe
							title={recipe.recipe.label}
							image={recipe.recipe.image}
							ingredients={recipe.recipe.ingredients}
							key={uuid()}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default App;

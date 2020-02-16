import React from 'react';
import style from './recipe.module.css';
import color from '@material-ui/core/colors/amber';

const Recipe = ({ title, calories, image, ingredients }) => {
	return (
		<div className={style.recipe}>
			<h3 style={{ color: 'brown', padding: '10px' }}>{title}</h3>
			<img className={style.image} src={image} alt="" />
			<ul>{ingredients.map((ingredient) => <li>{ingredient.text}</li>)}</ul>
		</div>
	);
};

export default Recipe;

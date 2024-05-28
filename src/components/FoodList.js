import React from 'react';
import FoodItem from './FoodItem';

const FoodList = ({ foods, onMarkAsCooked, onRename }) => {
    return (
        <div>
            <h2>Comidas</h2>
            <ul>
                {foods.map((food, index) => (
                    <FoodItem
                        key={index}
                        food={food}
                        onMarkAsCooked={() => onMarkAsCooked(index)}
                        onRename={(newName, newTimesCooked, newLastCooked) => onRename(index, newName, newTimesCooked, newLastCooked)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default FoodList;

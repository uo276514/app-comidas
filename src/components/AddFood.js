import React, { useState } from 'react';

const AddFood = ({ onAddFood }) => {
    const [newFoodName, setNewFoodName] = useState('');

    const handleAddFood = () => {
        if (newFoodName.trim()) {
            onAddFood(newFoodName);
            setNewFoodName('');
        }
    };

    return (
        <div>
            <h2>Añadir Nueva Comida</h2>
            <input
                type="text"
                value={newFoodName}
                onChange={(e) => setNewFoodName(e.target.value)}
            />
            <button onClick={handleAddFood}>Añadir</button>
        </div>
    );
};

export default AddFood;

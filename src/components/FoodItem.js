import React, { useState, useEffect } from 'react';

const FoodItem = ({ food, onMarkAsCooked, onRename }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(food.name);
    const [newTimesCooked, setNewTimesCooked] = useState(food.timesCooked);
    const [newLastCooked, setNewLastCooked] = useState(food.lastCooked);

    useEffect(() => {
        setNewName(food.name);
        setNewTimesCooked(food.timesCooked);
        setNewLastCooked(food.lastCooked);
    }, [food.timesCooked]);

    const handleRename = () => {
        onRename(newName, newTimesCooked, newLastCooked);
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Nombre de la comida"
                    />
                    <input
                        type="number"
                        value={newTimesCooked}
                        onChange={(e) => setNewTimesCooked(parseInt(e.target.value))}
                        placeholder="Veces cocinada"
                    />
                    <input
                        type="text"
                        value={newLastCooked}
                        onChange={(e) => setNewLastCooked(e.target.value)}
                        placeholder="Última vez cocinada"
                    />
                    <button onClick={handleRename}>Guardar</button>
                </div>
            ) : (
                <span>{food.name} (Hecho {food.timesCooked} veces, Última vez: {food.lastCooked})</span>
            )}
            <button onClick={onMarkAsCooked}>Cocinada</button>
            <button onClick={() => setIsEditing(true)}>Modificar</button>
        </li>
    );
};

export default FoodItem;

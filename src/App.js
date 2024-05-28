import React, { useState, useEffect } from 'react';
import FoodList from './components/FoodList';
import AddFood from './components/AddFood';
import { format } from 'date-fns';
import ReloadFoods from './components/ReloadFoods';

const App = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
      inicializarComidas().then(comidas => {
          setFoods(comidas);
      });
    }, []);

    const leerComidasDesdeArchivo = async () => {
      try {
          const response = await fetch('/comidas.txt');
          const text = await response.text();
          const lines = text.split('\n');
          const comidas = lines.map(line => {
              const [name, timesCooked, lastCooked] = line.split(', ');
              return { name, timesCooked: parseInt(timesCooked), lastCooked };
          });
          return comidas;
      } catch (err) {
          console.error('Error al leer el archivo de comidas:', err);
          return [];
      }
    };

    const imprimirLocalStorage = () => {
      // Obtener el contenido del localStorage
      const localStorageData = JSON.parse(localStorage.getItem('comidas'));

      // Formatear cada objeto en el formato deseado
      const formattedData = localStorageData.map(item => {
          let formattedItem = `${item.name}, ${item.timesCooked}`;
          if (item.lastCooked) {
              formattedItem += `, ${item.lastCooked}`;
          }
          return formattedItem;
      });

      // Unir los elementos formateados con un salto de línea entre ellos
      const textContent = formattedData.join('\n');

      console.log(textContent);
    }

    const inicializarComidas = async () => {
      let comidas = localStorage.getItem('comidas');
      if (!comidas) {
        comidas = await leerComidasDesdeArchivo();
        localStorage.setItem('comidas', JSON.stringify(comidas));
      } else {
        comidas = JSON.parse(comidas);
      }
      imprimirLocalStorage();
      return comidas;
    };

    const actualizarLocalStorage = (nuevasComidas) => {
      localStorage.setItem('comidas', JSON.stringify(nuevasComidas));
    };

    const handleReloadFromTextFile = () => {
      localStorage.removeItem('comidas');
      inicializarComidas().then(comidas => {
        setFoods(comidas);
      });
    }

    const handleMarkAsCooked = (index) => {
        const updatedFoods = [...foods];
        const today = format(new Date(), 'dd/MM/yyyy');

        // Remove the item from its current position
        const [cookedFood] = updatedFoods.splice(index, 1);

        // Update the cooked food's properties
        cookedFood.timesCooked += 1;
        cookedFood.lastCooked = today;

        // Add the cooked food to the end of the list
        updatedFoods.push(cookedFood);

        // Update the state
        setFoods(updatedFoods);
        
        // Actualizar el localStorage
        actualizarLocalStorage(updatedFoods);
    };

    const handleRename = (index, newName, newTimesCooked, newLastCooked) => {
        const updatedFoods = [...foods];
        updatedFoods[index] = {
            name: newName,
            timesCooked: newTimesCooked,
            lastCooked: newLastCooked
        };
        setFoods(updatedFoods);

        // Actualizar el localStorage
        actualizarLocalStorage(updatedFoods);
    };

    const handleAddFood = (newFoodName) => {
        const newFood = {
            name: newFoodName,
            timesCooked: 0,
            lastCooked: 'Nunca',
        };
        const updatedFoods = [newFood, ...foods];
        setFoods(updatedFoods);
        
        // Actualizar el localStorage
        actualizarLocalStorage(updatedFoods);
    };

    return (
        <div>
            <h1>Gestor de Comidas</h1>
            <ReloadFoods onAddFood={handleAddFood} onReloadFromTextFile={handleReloadFromTextFile} />
            <AddFood onAddFood={handleAddFood} />
            <FoodList foods={foods} onMarkAsCooked={handleMarkAsCooked} onRename={handleRename} />
        </div>
    );
};

export default App;

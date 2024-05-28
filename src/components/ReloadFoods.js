import React from 'react';
import AddFood from './AddFood';

const ReloadFoods = ({ onReloadFromTextFile }) => {
    return (
        <div className="reload-menu">
            <h2>Recargar fichero con comidas</h2>
            <button className='reload-button' onClick={onReloadFromTextFile}>Recargar desde Archivo de Texto</button>
        </div>
    );
};

export default ReloadFoods;

'use client';

import React, { createContext, useContext, useState } from 'react';

const RoutineContext = createContext();

export const useRoutine = () => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutine must be used within a RoutineProvider');
  }
  return context;
};

export const RoutineProvider = ({ children }) => {
  const [routines, setRoutines] = useState([
    {
      id: 1,
      time: '08:30',
      title: 'Basic Laboratory Analysis',
      solutions: [
        { name: 'Glucose Solution', quantity: 'CHO:26G' },
        { name: 'Sodium Chloride', quantity: 'NaCl:15G' },
        { name: 'Potassium Buffer', quantity: 'K:8.5G' },
      ],
      observations: 'Handle with care, store at room temperature',
      createdAt: '2025-06-10T08:30:00.000Z',
    },
    {
      id: 2,
      time: '14:15',
      title: 'Advanced Chemical Testing',
      solutions: [
        { name: 'Hydrochloric Acid', quantity: 'HCl:50ml' },
        { name: 'Phenol Red Indicator', quantity: 'C19H14O5S:2G' },
      ],
      observations: 'Use fume hood, wear protective equipment',
      createdAt: '2025-06-11T14:15:00.000Z',
    },
    {
      id: 3,
      time: '10:45',
      title: 'Blood Sample Preparation',
      solutions: [
        { name: 'EDTA Solution', quantity: 'C10H16N2O8:3G' },
        { name: 'Saline Solution', quantity: 'NaCl:9G/L' },
        { name: 'Preservative Buffer', quantity: 'PBS:10ml' },
      ],
      observations: '',
      createdAt: '2025-06-12T10:45:00.000Z',
    },
  ]);

  const addRoutine = newRoutine => {
    const routine = {
      id: Date.now(), // Simple ID generation
      ...newRoutine,
      createdAt: newRoutine.createdAt || new Date().toISOString(),
    };
    setRoutines(prev => [...prev, routine]);
  };

  const updateRoutine = (id, updatedRoutine) => {
    setRoutines(prev =>
      prev.map(routine =>
        routine.id === id ? { ...routine, ...updatedRoutine } : routine
      )
    );
  };

  const deleteRoutine = id => {
    setRoutines(prev => prev.filter(routine => routine.id !== id));
  };

  const value = {
    routines,
    addRoutine,
    updateRoutine,
    deleteRoutine,
  };

  return (
    <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>
  );
};

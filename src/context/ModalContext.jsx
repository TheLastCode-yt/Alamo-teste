'use client';

import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({
    newRoutine: false,
    // Add more modals here as needed
  });

  const openModal = modalName => {
    setModals(prev => ({
      ...prev,
      [modalName]: true,
    }));
  };

  const closeModal = modalName => {
    setModals(prev => ({
      ...prev,
      [modalName]: false,
    }));
  };

  const toggleModal = modalName => {
    setModals(prev => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  const value = {
    modals,
    openModal,
    closeModal,
    toggleModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

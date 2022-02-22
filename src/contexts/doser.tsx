import React, { useState, useContext } from "react";
import data from "../data.json";

export interface Ingredient {
  name: string;
  remarques?: string;
  poidsVolume?: number; //  Kg/L
  tempsCuisson?: number; //  m
  volumeEau?: number; //  L
  poidsPersonne?: number; //  Kg
  volumeCuitCru?: number; //  L/L
}

const ingredients: Ingredient[] = data;

interface DoserContextType {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient;
  setSelectedIngredient: (Ingredient) => void;
  nbPersonnes: number;
  setNbPersonnes: (Number) => void;
}

const defaultValue = {
  ingredients,
  selectedIngredient: ingredients[0],
  setSelectedIngredient: (i) => 0,
  nbPersonnes: 1,
  setNbPersonnes: (i) => 0,
};

const DoserContext = React.createContext<DoserContextType>(defaultValue);

export const DoserContextProvider = ({ children }) => {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>(
    defaultValue.selectedIngredient
  );
  const [nbPersonnes, setNbPersonnes] = useState<number>(
    defaultValue.nbPersonnes
  );

  const contextValue: DoserContextType = {
    selectedIngredient,
    setSelectedIngredient,
    ingredients,
    nbPersonnes,
    setNbPersonnes,
  };

  return (
    <DoserContext.Provider value={contextValue}>
      {children}
    </DoserContext.Provider>
  );
};

export const useDoserContext = () => useContext(DoserContext);

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // État pour stocker la valeur
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Récupérer depuis localStorage
      const item = window.localStorage.getItem(key);
      // Parser les données JSON stockées ou retourner la valeur initiale
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si erreur, retourner la valeur initiale
      console.log(error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur - VERSION CORRIGÉE
  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      // Permettre à la valeur d'être une fonction pour avoir la même API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Sauvegarder l'état
      setStoredValue(valueToStore);
      // Sauvegarder dans localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Une erreur plus avancée pourrait être gérée ici
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// Hook pour générer des références uniques
export const useReference = () => {
  const generateReference = () => `RDC-${Date.now().toString().slice(-8)}`;
  return { generateReference };
};

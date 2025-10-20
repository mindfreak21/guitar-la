import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { db } from "../data/db";

export function useCart() {
  const initialCar = () => {
    try {
      const stored = localStorage.getItem("cart");
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed) && parsed.every((item) => item !== null)) {
        return parsed;
      }

      return [];
    } catch {
      return [];
    }
  };

  // State
  const [data] = useState(db);
  const [car, setCar] = useState(initialCar);
  const MAX_ITEM = 5;
  const MIN_ITEM = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(car));
  }, [car]);

  function addToCar(item) {
    const itemExist = car.findIndex((guitar) => guitar.id == item.id);

    if (itemExist < 0) {
      item.qty = 1;
      setCar((prevCart) => [...car, item]);
    } else {
      if (item.qty >= MAX_ITEM) return;
      const updatedCar = [...car];
      updatedCar[itemExist].qty++;
      setCar(updatedCar);
    }
  }

  function removeFromCar(id) {
    setCar((prevCart) => prevCart.filter((guitar) => guitar.id != id));
  }

  function increaseQuantity(id) {
    const updateCar = car.map((item) => {
      if (item.id == id && item.qty < MAX_ITEM) {
        return {
          ...item,
          qty: item.qty + 1,
        };
      }
      return item;
    });
    setCar(updateCar);
  }

  function decreaseQuantity(id) {
    const updateCar = car.map((item) => {
      if (item.id == id && item.qty > MIN_ITEM) {
        return {
          ...item,
          qty: item.qty - 1,
        };
      }
      return item;
    });
    setCar(updateCar);
  }

  function clearCar(e) {
    setCar([]);
  }

  // derivate state
  const isEmpty = useMemo(() => car.length === 0, [car]);
  const carTotal = useMemo(
    () => car.reduce((total, item) => total + item.qty * item.price, 0),
    [car]
  );

  return {
    data,
    car,
    addToCar,
    removeFromCar,
    increaseQuantity,
    decreaseQuantity,
    clearCar,
    isEmpty,
    carTotal,
  };
}

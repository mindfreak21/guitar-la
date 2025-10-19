import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "./data/db";

function App() {
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

  return (
    <>
      <Header
        car={car}
        removeFromCar={removeFromCar}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCar={clearCar}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Our Collection</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCar={setCar}
              addToCar={addToCar}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - All rigths reserved
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;

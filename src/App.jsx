import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useCart } from "./hooks/useCart";

function App() {
  const {
    data,
    car,
    addToCar,
    removeFromCar,
    increaseQuantity,
    decreaseQuantity,
    clearCar,
    isEmpty,
    carTotal,
  } = useCart();

  return (
    <>
      <Header
        car={car}
        removeFromCar={removeFromCar}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCar={clearCar}
        isEmpty={isEmpty}
        carTotal={carTotal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Our Collection</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCar={addToCar} />
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

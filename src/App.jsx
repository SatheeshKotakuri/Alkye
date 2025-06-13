import Card from "./components/Card";
import Carousel from "./components/Carousal";
import { useSelector, useDispatch } from "react-redux";
import { selectCar } from "./features/carSlice";
import logo from "./assets/Logo/Logo.png";
import "./App.css"; // Import animation styles

const App = () => {
  const dispatch = useDispatch();
  const car = useSelector((state) => state.car.selectedCar);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "Desktop" }}>
      <div className="curser" onClick={() => dispatch(selectCar(null))}>
        <div className="title-container fade-up" style={{ animationDelay: "0.1s" }}>
          <img
            height={"30px"}
            src={logo}
            alt="logo"
            className="fade-up"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
        <h1 className="title1 fade-up" style={{ animationDelay: "0.3s" }}>alkye</h1>
        <p className="desc fade-up" style={{ animationDelay: "0.4s" }}>
          The easiest text you will ever do
        </p>
      </div>

      {car ? <Card /> : <Carousel />}
    </div>
  );
};

export default App;

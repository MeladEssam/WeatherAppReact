import "./App.css";
import Weather from "./Components/Weather";

// import ProductsCategory from "./Components/Pages/ProductsCategory";
function App() {
  return (
    <div className="App">
      <div className="container py-3">
        <div className="row d-flex justify-content-center ">
          <div className="col-md-10 col-lg-7">
            <Weather />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
// export default GetName;

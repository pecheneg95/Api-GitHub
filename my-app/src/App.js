import logo from "./logo.svg";
import "./App.css";
import SearchLine from "./components/SearchLine.jsx";
import MainPage from "./components/MainPage.jsx";

function App() {

const onSearch = (newSearch) => {
  console.log('New search:', newSearch)
}

  return (
    <div className="App">
      <SearchLine onSearch={onSearch} />
      <MainPage />
    </div>
  );
}

export default App;

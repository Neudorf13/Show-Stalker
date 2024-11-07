import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

//page imports
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyShows from "./pages/MyShows";
import About from "./pages/About";
import SearchResults from "./pages/SearchResults";
import ShowDetails from "./pages/ShowDetails";
import Register from "./pages/Register";
import Calendar from "./pages/Calendar";

import "./App.css";

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/myShows" element={<MyShows />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/calendar" element={<Calendar />}></Route>
            <Route path="/searchResults" element={<SearchResults />}></Route>
            <Route
              path="/showDetails/:showName"
              element={<ShowDetails />}
            ></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

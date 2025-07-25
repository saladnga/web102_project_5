import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import BreweryDetail from "./components/BreweryDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="brewery/:id" element={<BreweryDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

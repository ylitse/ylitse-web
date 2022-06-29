import { Routes, Route, Link } from "react-router-dom";
import NavigationBar from './features/Navigation';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavigationBar />} />
      </Routes>
    </div>
  );
}

export default App;
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Navbar } from "./components";
import { HomePage, ProductPage } from "./pages";
import { useThemeStore } from "./stores";

function App() {
  const { theme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductsPage from "./components/productlist";
import BasketPage from "./components/Basket";
import SavedBasketsPage from "./pages/SavedBasketsPage";
import DashboardLayout from "./layout/DashboardLayout";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/saved" element={<SavedBasketsPage />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </Provider>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, AdminLoginPage, AdminPage } from "pages";
import { AuthProvider } from "contexts/AuthContext";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<HomePage />}></Route>
            <Route path="admin_login" element={<AdminLoginPage />}></Route>
            <Route path="admin" element={<AdminPage />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  AdminLoginPage,
  AdminPage
} from "pages"

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<HomePage/>}></Route>
        <Route path="admin_login" element={<AdminLoginPage/>}></Route>
        <Route path="admin" element={<AdminPage/>}></Route>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

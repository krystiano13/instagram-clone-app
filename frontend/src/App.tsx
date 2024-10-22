import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/Layout"

//views
import { Login } from "./views/login"
import { Register } from "./views/register"
import { Explore } from "./views/explore"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

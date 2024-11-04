import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/Layout"

//views
import { Home } from "./views/home"
import { Login } from "./views/login"
import { Register } from "./views/register"
import { Explore } from "./views/explore"
import { Search } from "./views/search"
import { Create } from "./views/create"
import { Post } from "./views/post"
import { Profile } from "./views/profile"
import { Notifications } from "./views/notifications.tsx";

//components
import { Spinner } from "./components/Spinner.tsx";

//contexts
import { AuthContextProvider } from "./contexts/auth-context-provider.tsx";

function App() {
  return (
    <BrowserRouter>
        <AuthContextProvider>
        <Layout>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/search" element={<Search />} />
              <Route path="/create" element={<Create />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/notifications/:user_id" element={<Notifications />} />
          </Routes>
        </Layout>
        </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App

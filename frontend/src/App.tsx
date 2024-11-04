import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react";
import { Layout } from "./components/layout/Layout"

//views
const Home = lazy(() => import("./views/home.tsx"))
const Login = lazy(() => import("./views/login.tsx"))
const Register = lazy(() => import("./views/register.tsx"))
const Explore = lazy(() => import("./views/explore.tsx"))
const Search = lazy(() => import("./views/search.tsx"))
const Create = lazy(() => import("./views/create.tsx"))
const Post = lazy(() => import("./views/post.tsx"))
const Profile = lazy(() => import("./views/profile.tsx"))
const Notifications = lazy(() => import("./views/notifications.tsx"))


//components
import { Spinner } from "./components/Spinner.tsx";

//contexts
import { AuthContextProvider } from "./contexts/auth-context-provider.tsx";

function App() {
  return (
    <BrowserRouter>
        <AuthContextProvider>
        <Layout>
          <Suspense fallback={<Spinner />}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/post/:id" element={<Post />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/notifications" element={<Notifications />} />
              </Routes>
          </Suspense>
        </Layout>
        </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App

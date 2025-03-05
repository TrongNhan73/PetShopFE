import { Route, Routes } from "react-router"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/client/Home"
import NotFound from "./pages/NotFound"
import path from "./const/path"
import Auth from "./layouts/Auth"



function App() {


  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route element={<Auth />}>
          <Route path={path.login} element={<Login />} />
          <Route path={path.register} element={<Register />} />
        </Route>
        <Route path={path.others} element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

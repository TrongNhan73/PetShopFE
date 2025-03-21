
import MainRoute from "./routes/MainRoute"
import { Bounce, Slide, ToastContainer } from "react-toastify"


function App() {


  return (
    <>
      <MainRoute />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  )
}

export default App

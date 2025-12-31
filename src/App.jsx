import { Bounce, ToastContainer } from "react-toastify";
import Routing from "./routes/Routing";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="App">
        <Routing />
      </div>
    </>
  );
}

export default App;

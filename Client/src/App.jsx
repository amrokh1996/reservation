import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Routers from "./routers/Routers";
import { useState, createContext, useEffect } from "react";

// export const userLogged = createContext();


function App() {

  const [isLog, updateIsLog] = useState(localStorage.getItem("token") ? true : false);


  // const [userData, setUserData] = useState()
  // const [userType, setUserType] = useState()
  // const getUserInfoUsingToken = async () => {
  //   if (userType === "costumer") {
  //     try {
  //       const res = await axios.get("http://localhost:5000/get_user", {
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       setUserData(res.data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   else if (userType === "provider") {
  //     try {
  //       const res = await axios.get("http://localhost:5000/get_provider", {
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       setUserData(res.data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   else {
  //     try {
  //       const res = await axios.get("http://localhost:5000/get_provider", {
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       setUserData(res.data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }
  // useEffect(() => {
  //   getUserInfoUsingToken();
  // }, [isLog])

  return (
    <>
      {/* <userLogged.Provider value={{ userData: userData, setUserType: setUserType }}> */}
        {!window.location.pathname.includes("admin") ? <Header isLog={isLog} updateIsLog={updateIsLog} /> : null}
        <div>
          <Routers updateIsLog={updateIsLog} />
        </div>
        {!window.location.pathname.includes("admin") ? <Footer /> : null}
      {/* </userLogged.Provider> */}
    </>
  );
}

export default App;

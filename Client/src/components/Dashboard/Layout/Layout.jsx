import Router from "../routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";
import "./lay.css";

const Layout = () => {
  document.body.style = "background: var(--body-bg)"
    return (
    <div className="mainCont">
      <div className="layout">
        <Sidebar />
        <div className="main__layout">
          <TopNav />

          <div className="content">
            <Router />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

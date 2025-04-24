import Home from "./home/page";
import Footer from "./navigation/footer";
import { Menu } from "./navigation/menu";

export default function page() {
  return (
    <div className="sm:px-16 sm:bg-muted">
      <div className="sm:p-2">
        <Menu/>
      </div>
      <div className="px-2">
        <Home/>
      </div>
      <div className="sm:p-2">
        <Footer/>
      </div>
    </div>
  );
}

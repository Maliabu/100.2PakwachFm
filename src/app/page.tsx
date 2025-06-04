import Home from "./home/page";
import Footer from "./navigation/footer";
import { Menu } from "./navigation/menu";

export default function page() {
  return (
    <div className="sm:px-16 md:px-12 sm:bg-secondary">
      <div className="sm:px-2">
        <Menu/>
      </div>
      <div className="sm:px-2">
        <Home/>
      </div>
      <div className="mt-2">
        <Footer/>
      </div>
    </div>
  );
}

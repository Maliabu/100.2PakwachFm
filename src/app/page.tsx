import Home from "./home/page";
import Footer from "./navigation/footer";
import { Menu } from "./navigation/menu";

export default function page() {
  return (
    <div className="sm:px-12 sm:bg-muted">
      <div className="">
        <Menu/>
      </div>
      <div className="">
        <Home/>
      </div>
      <div className="mt-2">
        <Footer/>
      </div>
    </div>
  );
}

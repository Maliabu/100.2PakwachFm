import Home from "./(website)/home/page";
import Footer from "./(website)/navigation/footer";
import { Menu } from "./(website)/navigation/menu";

export default function page() {
  return (
    <div className="sm:px-16 md:px-12 sm:bg-muted">
      <div>
        <Menu/>
      </div>
      <div>
        <Home/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

import Footer from "./navigation/footer";
import { Menu } from "./navigation/menu";
import Menu1 from "./navigation/menu1";

export default function WebsiteLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="sm:px-16 md:px-12 sm:bg-muted">
        <div>
          <Menu/>
        </div>
        <div>
          <Menu1/>
        </div>
        <div>
          {children}
        </div>
        <div className="mt-2">
          <Footer/>
        </div>
      </div>
    );
  }
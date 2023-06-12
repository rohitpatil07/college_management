import { AppProps } from "next/app";
import NavBar from "../../components/NavBar/NavBar";
import SideMobile from "../../components/NavBar/StudentNavigations/SideMobileNav";
import SideNavBar from "../../components/NavBar/StudentNavigations/SideNavBar";
import "../styles/globals.css"; // Assuming you have a global styles file

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className="w-screen bg-slate-200">
      <NavBar />
      <div className="flex flex-col sm:flex-row w-screen min-h-screen h-fit overflow-hidden">
        <SideMobile />
        <SideNavBar />
        <div className="w-full sm:w-3/5 md:w-4/5">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar/NavBar";
import SideMobile from "../components/NavBar/StudentNavigations/SideMobileNav";
import SideNavBar from "../components/NavBar/StudentNavigations/SideNavBar";
import AuthProvider from "../contexts/AuthContext";
export default function App({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element {
  // Determine if the current route matches the specific route
  const isSpecificRoute = router.pathname === "/tpc/editProfile/personalInfo";

  return (
    <AuthProvider>
      <div className="w-screen bg-slate-200">
        {/* Render the appropriate NavBar based on the current route */}
        {isSpecificRoute ? (
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
        ) : (
          <Component {...pageProps} />
        )}

        {/* Render the Component with pageProps */}
      </div>
    </AuthProvider>
  );
}

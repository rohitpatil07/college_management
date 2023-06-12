import LoginPage from "../components/LoginPage";
import Head from "next/head";
import AuthProvider from "../contexts/AuthContext";

function Login() {
  return (
    <html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style jsx global>{`
          body {
            font-family: "Inter", sans-serif;
          }
        `}</style>
      </Head>
      <AuthProvider>
        <body className="bg-slate-100">
          <LoginPage />
        </body>
      </AuthProvider>
    </html>
  );
}

export default Login;

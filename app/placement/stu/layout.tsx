import Header from "./Header"

export default function StuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className="bg-slate-200">
         <Header />
        {children}
    </body>
  )
}
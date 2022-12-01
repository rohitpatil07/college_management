import Header from "./Header"

export default function StuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-screen h-screen bg-slate-200">
         <Header />
        {children}
    </div>
  )
}
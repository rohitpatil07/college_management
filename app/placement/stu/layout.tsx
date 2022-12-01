import Header from "./Header"

export default function StuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
         <Header />
        {children}
    </div>
  )
}
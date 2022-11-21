import Link from "next/link";

export default function PlacementLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {
    return (
      <div className="flex w-full">
        <aside className="bg-gray-500 h-screen w-1/5">
          <div className="text-white flex flex-col mx-2 my-2 text-2xl">
            <Link href="placement/dashboard">Dashboard</Link>
            <Link href="placement/lookup">Look UP</Link>
          </div>
        </aside>
        <main>{children}</main>
      </div>
    );
  }
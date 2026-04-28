import { AuthNav } from "./auth-nav"
import { Nav } from "./nav"
import { INav } from "@/types/nav-t"

const menu: INav[] = [
  { title: "Employees", slug: "employees" },
  { title: "Orders", slug: "orders" },
  { title: "Companies", slug: "companies" },
  { title: "Reports", slug: "reports" },
]
export async function Header() {
  return (
    <header className="border-b border-gray-400 mb-5">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4">
        <Nav menu={menu} />
        <AuthNav />
      </div>
    </header>
  )
}

import SideMobile from "./StudentNavigations/SideMobileNav"
import SideNavBar from "./StudentNavigations/SideNavBar"

const SideBar = () => {
  return (
    <div className='w-full sm:w-1/5'>
      <SideNavBar/>
      <SideMobile/>
    </div>
  )
}

export default SideBar


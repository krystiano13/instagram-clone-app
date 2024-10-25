import { NavLink } from "react-router-dom";

export function DesktopButtons() {
  return (
    <section className="card w-[100vw] sm:w-[20rem] sm:h-[100vh] p-4 pt-12 sm:p-0 rounded-none">
      <div className="drawer-header hidden sm:block">
        <h3 className="drawer-title">Instagram Clone</h3>
      </div>
      <div className="drawer-body flex flex-col gap-4">
          <NavLink to="/">
              <button className="w-full flex btn btn-soft btn-primary">
                  <span className="w-32 sm:h-auto sm:inline">Home Page</span>
              </button>
          </NavLink>
          <NavLink to="/search">
              <button className="w-full flex btn btn-soft btn-primary">
                  <span className="w-32 sm:h-auto sm:inline">Search</span>
              </button>
          </NavLink>
          <NavLink to="/explore">
              <button className="w-full flex btn btn-soft btn-primary">
                  <span className="w-32 sm:h-auto sm:inline">Explore</span>
              </button>
          </NavLink>
          {/* <button className="w-full flex btn btn-soft btn-primary">
          <span className="w-32 sm:h-auto sm:inline">Notifications</span>
        </button> */}
          <NavLink to="/create">
              <button className="w-full flex btn btn-soft btn-primary">
                  <span className="w-32 sm:h-auto sm:inline">Create</span>
              </button>
          </NavLink>
      </div>
        <div className="drawer-footer">
            <NavLink className="w-full" to="/profile">
                <button className="w-full flex btn btn-soft btn-secondary">
                    <span className="w-32 sm:h-auto sm:inline">Profile</span>
                </button>
            </NavLink>
        </div>
    </section>
  )
}

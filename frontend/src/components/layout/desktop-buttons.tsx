import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

export function DesktopButtons() {
  const navigate = useNavigate()
  const location = useLocation()

  const [count, setCount] = useState<number>(0)

  function logOut() {
      localStorage.removeItem("id")
      localStorage.removeItem("token")
      localStorage.removeItem("user_name")

      navigate("/login")
  }

  useEffect(() => {
        fetch(`http://127.0.0.1:3000/notifications/count/${localStorage.getItem("id")}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if(res.status === 401) {
                    logOut()
                    navigate("/login")
                }

                return res.json()
            })
            .then(data => {
                if(data.count) {
                    setCount(data.count as number)
                }
            })
      }, [location.pathname]);

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
          <NavLink to="/notifications">
              <button className="w-full flex btn btn-soft btn-primary">
                  <span className="w-32 sm:h-auto sm:inline">
                      Notifications
                      {
                          count !== 0 &&
                          <span>{" "}{`(${count})`}</span>
                      }
                  </span>
              </button>
          </NavLink>
          <NavLink to="/create">
              <button className="w-full flex btn btn-soft btn-primary">
                  <span className="w-32 sm:h-auto sm:inline">Create</span>
              </button>
          </NavLink>
      </div>
        <div className="drawer-footer flex-col">
            <NavLink className="w-full" to={`/profile/${localStorage.getItem("id")}`}>
                <button className="w-full flex btn btn-soft btn-secondary">
                    <span className="w-32 sm:h-auto sm:inline">{
                        localStorage.getItem("user_name") ? localStorage.getItem("user_name") : "Profile"
                    }</span>
                </button>
            </NavLink>
            <button onClick={logOut} className="w-full flex btn btn-soft btn-error">
                <span className="w-32 sm:h-auto sm:inline">Logout</span>
            </button>
        </div>
    </section>
  )
}

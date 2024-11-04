import React, { useState } from "react"
import { useLocation } from "react-router"
import { DesktopButtons } from "./desktop-buttons"

interface Props {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  const location = useLocation()

  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <div className="w-[100vw] bg-slate-50 overflow-x-hidden">
      <main className="w-[100vw] flex flex-col sm:flex-row">
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <>
              <div
                id="menu"
                className={`w-auto sm:hidden ${
                  !navbarOpen ? "translate-y-[-100%]" : "translate-y-[5%]"
                } fixed z-50 sm:translate-y-[0%] transition`}
              >
                <DesktopButtons />
              </div>
              <div className="w-auto hidden sm:block fixed transition">
                <DesktopButtons />
              </div>
              <div className="card fixed z-50 flex flex-row p-4 justify-between items-center sm:hidden w-[100vw] h-[3rem]">
                <h3 className="drawer-title">Instagram Clone</h3>
                <div
                  onClick={() => setNavbarOpen((prev) => !prev)}
                  id="hamburger"
                >
                  <label className="btn btn-circle">
                    <span className="icon-[tabler--menu-2] swap-off"></span>
                  </label>
                </div>
              </div>
            </>
          )}
        <div
          className={`w-[100vw] z-100 ${
            location.pathname !== "/login" &&
            location.pathname !== "/register" &&
            "sm:ml-[20rem] w-calc"
          }`}
        >
          <section className="z-100 content">{children}</section>
        </div>
      </main>
    </div>
  )
}

import React from "react"
import { DesktopButtons } from "./desktop-buttons"

interface Props {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <div className="w-[100vw] h-[100vh] bg-slate-50 overflow-x-hidden">
      <main className="w-[100vw] h-[100vh] flex flex-col sm:flex-row">
        <div
          id="menu"
          className="w-[100vw] h-[100vh] sm:hidden fixed sm:translate-y-[0%] transition"
        >
          <DesktopButtons />
        </div>
        <div className="w-[100vw] h-[100vh] hidden sm:block fixed transition">
          <DesktopButtons />
        </div>
        <div className="card fixed flex flex-row p-4 justify-between items-center sm:hidden w-[100vw] h-[3rem]">
          <h3 className="drawer-title">Instagram Clone</h3>
          <div id="hamburger">
            <label className="btn btn-circle">
              <span className="icon-[tabler--menu-2] swap-off"></span>
            </label>
          </div>
        </div>
        <div className="w-[100vw] sm:ml-[20rem]">
          <section className="content mt-12">{children}</section>
        </div>
      </main>
    </div>
  )
}

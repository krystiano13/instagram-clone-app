export function DesktopButtons() {
  return (
    <section className="card w-[100vw] sm:w-[20rem] sm:h-[100vh] p-4 pt-12 sm:p-0 rounded-none">
      <div className="drawer-header hidden sm:block">
        <h3 className="drawer-title">Instagram Clone</h3>
      </div>
      <div className="drawer-body flex flex-col gap-4">
        <button className="w-full flex btn btn-soft btn-primary">
          <span className="w-32 sm:h-auto sm:inline">Home Page</span>
        </button>
        <button className="w-full flex btn btn-soft btn-primary">
          <span className="w-32 sm:h-auto sm:inline">Search</span>
        </button>
        <button className="w-full flex btn btn-soft btn-primary">
          <span className="w-32 sm:h-auto sm:inline">Explore</span>
        </button>
        <button className="w-full flex btn btn-soft btn-primary">
          <span className="w-32 sm:h-auto sm:inline">Notifications</span>
        </button>
        <button className="w-full flex btn btn-soft btn-primary">
          <span className="w-32 sm:h-auto sm:inline">Create</span>
        </button>
      </div>
      <div className="drawer-footer">
        <button className="w-full flex btn btn-soft btn-secondary">
          <span className="w-32 sm:h-auto sm:inline">Profile</span>
        </button>
      </div>
    </section>
  )
}

export function Post() {
  return (
    <div className="w-calc flex flex-col items-center p-6 min-h-[100vh]">
      <div className="sm:max-w-md md:max-w-lg lg:max-w-xl w-[90%] sm:w-[40rem]">
        <section className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-secondary/20 text-secondary w-10 rounded-full">
              <span className="text-md uppercase">kz</span>
            </div>
          </div>
          <p>Krystian Zieja</p>
        </section>
        <img
          className="mt-3"
          src="https://c4.wallpaperflare.com/wallpaper/304/798/563/samurai-ground-hd-wallpaper-preview.jpg"
        />
        <div className="flex items-center gap-2 mt-3">
          <button className="btn">Like</button>
          <button className="btn btn-primary">Comment</button>
        </div>
        <p className="text-base-content/80 text-lg mt-3 text-justify">
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          Duis mollis, est non commodo luctus. Duis mollis, est non commodo
          luctus.Duis mollis, est non commodo luctus.Vivamus sagittis lacus vel
          augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non
          commodo luctus. Duis mollis, est non commodo luctus.Duis mollis, est
          non commodo luctus.
        </p>
        <div className="divider divider-primary"></div>
        <h2 className="text-xl py-4 border-b border-1 bg-slate-50 font-medium">Comments</h2>
        <div className="max-h-96 overflow-y-auto">
          <div className="flex mt-[1rem] flex-col gap-2">
            <section className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-secondary/20 text-secondary w-10 rounded-full">
                  <span className="text-md uppercase">kz</span>
                </div>
              </div>
              <p>Krystian Zieja</p>
            </section>
            <p className="text-lg">
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor. Duis mollis, est non commodo luctus. Duis mollis, est non
              commodo
            </p>
          </div>
          <div className="divider"></div>
          <div className="flex mt-[1rem] flex-col gap-2">
            <section className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-secondary/20 text-secondary w-10 rounded-full">
                  <span className="text-md uppercase">kz</span>
                </div>
              </div>
              <p>Krystian Zieja</p>
            </section>
            <p className="text-lg">
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor. Duis mollis, est non commodo luctus. Duis mollis, est non
              commodo
            </p>
          </div>
          <div className="divider"></div>
        </div>
      </div>
    </div>
  )
}

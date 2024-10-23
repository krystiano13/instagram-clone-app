export function PostPreview() {
  return (
    <div className="sm:max-w-lg w-[90vw] sm:w-[32rem]">
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
        luctus.Duis mollis, est non commodo luctus.
      </p>
      <div className="divider divider-primary"></div>
    </div>
  )
}

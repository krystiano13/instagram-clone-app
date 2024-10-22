export function SearchInput() {
  return (
    <label className="input-group max-w-sm w-96">
      <span className="input-group-text">
        <span className="icon-[tabler--search] text-base-content/80 size-6"></span>
      </span>
      <input
        type="search"
        className="input input-lg grow"
        placeholder="Search"
      />
    </label>
  )
}

import { SearchInput } from "../components/forms/search-input"

export function Search() {
  return (
    <main className="w-full sm:flex sm:flex-col sm:items-center min-h-[100vh] bg-slate-50">
      <div className="mt-12 w-full fixed flex justify-center sm:w-auto">
        <SearchInput />
      </div>

      <section className="translate-y-32 sm:translate-y-0 sm:mt-32 w-[100vw] sm:w-full flex flex-col items-center gap-6">
        <div className="card w-96 flex flex-row p-4 gap-6 justify-between items-center">
          <div className="avatar placeholder">
            <div className="bg-secondary/20 text-secondary w-10 rounded-full">
              <span className="text-md uppercase">cl</span>
            </div>
          </div>
          <p>Krystian Zieja</p>
        </div>
        <div className="card w-96 flex flex-row p-4 gap-6 justify-between items-center">
          <div className="avatar placeholder">
            <div className="bg-secondary/20 text-secondary w-10 rounded-full">
              <span className="text-md uppercase">cl</span>
            </div>
          </div>
          <p>Krystian Zieja</p>
        </div>
      </section>
    </main>
  )
}

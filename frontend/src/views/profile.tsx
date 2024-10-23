import { PostPreview } from "../components/shared/post-preview"

export function Profile() {
  return (
    <div className="w-calc flex flex-col items-center p-6 min-h-[100vh]">
      <div className="sm:max-w-lg max-w-[90vw] w-[90vw]">
        <section className="flex gap-6 items-center">
          <div className="avatar placeholder">
            <div className="bg-secondary/20 text-secondary w-24 rounded-full">
              <span className="text-3xl uppercase">kz</span>
            </div>
          </div>
          <h2 className="text-4xl">Krystian Zieja</h2>
        </section>
        <button className="mt-4 btn btn-primary">+ Follow</button>
        <p className="mt-4">
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          Duis mollis, est non commodo luctus. Duis mollis, est non commodo
          luctus.Duis mollis, est non commodo luctus.Vivamus sagittis lacus vel
          augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non
          commodo luctus. Duis mollis, est non commodo luctus.Duis mollis, est
          non commodo luctus.
        </p>
        <div className="divider"></div>
        <h2 className="text-3xl font-medium mb-12">Posts</h2>
        <PostPreview />
      </div>
    </div>
  )
}

import { PostPreview } from "../components/shared/post-preview"

export function Home() {
  return (
    <div className="w-calc h-[100vh] flex flex-col items-center p-6 gap-12">
      <PostPreview />
      <PostPreview />
    </div>
  )
}

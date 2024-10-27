import { useNavigate } from "react-router";

interface Props {
    name: string
    description: string
    imgSrc: string | null
    id?: number
}

export function PostPreview({ name, description, imgSrc, id }: Props) {
  const navigate = useNavigate()
  return (
    <div className="sm:max-w-lg w-[90vw] sm:w-[32rem]">
      <section className="flex items-center gap-3">
        <div className="avatar placeholder">
          <div className="bg-secondary/20 text-secondary w-10 rounded-full">
            <span className="text-md uppercase">{ name.length > 2 ? `${name[0]}${name[1]}` : name }</span>
          </div>
        </div>
        <p>{ name }</p>
      </section>
      <img
        onClick={() => navigate(`/post/${id}`)}
        className="mt-3 w-full"
        src={imgSrc}
      />
      <div className="flex items-center gap-2 mt-3">
        <button className="btn">Like</button>
        <button className="btn btn-primary">Comment</button>
      </div>
      <p className="text-base-content/80 text-lg mt-3 text-justify">
          { description }
      </p>
      <div className="divider divider-primary"></div>
    </div>
  )
}

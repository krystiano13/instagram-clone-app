import { useNavigate } from "react-router";
import { useState } from "react";
import {logOut} from "../../utils/auth.ts";

interface Props {
    name: string
    description: string
    imgSrc: string | null
    like: boolean
    id?: number
}

export function PostPreview({ name, description, imgSrc, id, like }: Props) {
  const navigate = useNavigate()

  const [liked, setLiked] = useState<boolean>(like)

  function handleLike() {
    if (liked) return
    fetch(`http://127.0.0.1:3000/likes`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: localStorage.getItem("id"),
            post_id: id
        })
    })
        .then(res => {
            if(res.status === 401) {
                logOut()
                navigate("/login")
            }

            if(res.ok) {
                setLiked(true)
            }

            return res.json()
        })
  }

  function handleUnlike() {
    if(!liked) return

    fetch(`http://127.0.0.1:3000/likes/${localStorage.getItem("id")}/${id}`,{
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    })
        .then(res => {
            if(res.status === 401) {
                logOut()
                navigate("/login")
            }

            if(res.ok) {
                setLiked(false)
            }

            return res.json()
        })
  }

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
          {
              !liked && <button onClick={handleLike} className="btn">Like</button>
          }
          {
              liked && <button onClick={handleUnlike} className="btn btn-success">Unlike</button>
          }
          <button className="btn btn-primary">Comment</button>
      </div>
      <p className="text-base-content/80 text-lg mt-3 text-justify">
          { description }
      </p>
      <div className="divider divider-primary"></div>
    </div>
  )
}

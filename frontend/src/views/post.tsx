import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Post } from "../types";

export function Post() {
  const { id } = useParams()

  const [post, setPost] = useState<Post|undefined>()
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
        .then(res => res.json())
        .then(data => {
          if(data.errors) {
            setError(true)
          }
          else {
            setPost(data)
          }
        })
  }, [])

  return (
    <div className="w-calc flex flex-col items-center p-6 min-h-[100vh]">
      <div className="sm:max-w-md md:max-w-lg lg:max-w-xl w-[90%] sm:w-[40rem]">
        { error && <h1 className="text-2xl text-center font-medium">Not Found</h1> }
        { !error && post && <>
          <section className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-secondary/20 text-secondary w-10 rounded-full">
                <span className="text-md uppercase">{ post?.name.length >= 2 ? `${post?.name[0]}${post?.name[1]}` : post?.name }</span>
              </div>
            </div>
            <p>{ post?.name }</p>
          </section>
          <img
              className="mt-3 w-full"
              src={post?.post.image}
          />
          <div className="flex items-center gap-2 mt-3">
            <button className="btn">Like</button>
            <button className="btn btn-primary">Comment</button>
          </div>
          <p className="text-base-content/80 text-lg mt-3 text-justify">
            { post.post.description }
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
        </>}
      </div>
    </div>
  )
}

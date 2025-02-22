import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Post, Comment } from "../types";
import { logOut } from "../utils/auth.ts";

export default function Post() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState<Post|undefined>()
  const [liked, setLiked] = useState<boolean>(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [formOpened, setFormOpened] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [error, setError] = useState<boolean>(false)

    function handleLike() {
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

  function handleComment(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)

      setFormErrors([])

      fetch("http://127.0.0.1:3000/comments", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
              text: formData.get("text"),
              post_id: post?.post.id,
              user_id: localStorage.getItem("id")
          })
      })
          .then(res => {
              if(res.status === 401) {
                  logOut()
                  navigate("/login")
              }

              return res.json()
          })
          .then(data => {
              if(data.errors) {
                  setFormErrors([...data.errors.text])
              }
              else {
                  setComments([{ comment: { text: formData.get("text") as string, post_id: 1, user_id: 1 }, user_name: localStorage.getItem("user_name") },...comments])
                  setFormOpened(false)
              }
          })
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
        .then(res => {
            if(res.status === 401) {
                logOut()
                navigate("/login")
            }

            return res.json()
        })
        .then(data => {
          if(data.errors) {
            setError(true)
          }
          else {
            setPost(data)
          }
        })
  }, [])

  useEffect(() => {
      if(!post) return

      fetch(`http://127.0.0.1:3000/comments/${post.post.id}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      })
          .then(res => {
              if(res.status === 401) {
                  logOut()
                  navigate("/login")
              }

              return res.json()
          })
          .then(data => {
              if(data.errors) {
                  setComments([])
              }
              else {
                  setComments([...data.comments])
              }
          })
  }, [post])

    useEffect(() => {
        if(post?.like) {
            setLiked(true)
        }
        else {
            setLiked(false)
        }
    }, [post]);

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
              {
                  !liked && <button onClick={handleLike} className="btn">Like</button>
              }
              {
                  liked && <button onClick={handleUnlike} className="btn btn-success">Unlike</button>
              }
              <button onClick={() => setFormOpened(prev => !prev)} className="btn btn-primary">Comment</button>
          </div>
          <p className="text-base-content/80 text-lg mt-3 text-justify">
            { post.post.description }
          </p>
          <div className="divider divider-primary"></div>
          <h2 className="text-xl py-4 border-b border-1 bg-slate-50 font-medium">Comments</h2>
          {
              formOpened &&
              <form onSubmit={(e) => handleComment(e)} className="mt-6 w-full">
                  <div className="form-control w-full">
                      <textarea name="text" className="textarea textarea-filled peer" placeholder="Your comment"></textarea>
                      <span className="textarea-filled-label">Your comment</span>
                      <span className="textarea-filled-focused"></span>
                  </div>
                  {
                      formErrors.map(item => (
                          <p className="text-red-500 text-base mt-3">{ item }</p>
                      ))
                  }
                  <button className="btn btn-primary mt-3">Comment</button>
              </form>
          }
            <div className="max-h-96 overflow-y-auto">
                {
                    comments.map(item => (
                        <>
                            <div className="flex mt-[1rem] flex-col gap-2">
                            <section className="flex items-center gap-3">
                                  <div className="avatar placeholder">
                                      <div className="bg-secondary/20 text-secondary w-10 rounded-full">
                                          <span className="text-md uppercase">
                                              { item.user_name.length >= 2 ? `${item.user_name[0]}${item.user_name[1]}` : item.user_name }
                                          </span>
                                      </div>
                                  </div>
                                  <p>{ item.user_name }</p>
                              </section>
                              <p className="text-lg">
                                  {
                                      item.comment.text
                                  }
                              </p>
                          </div>
                          <div className="divider"></div>
                      </>
                  ))
              }
          </div>
        </>}
      </div>
    </div>
  )
}

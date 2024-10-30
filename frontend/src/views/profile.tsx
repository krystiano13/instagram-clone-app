import type { Profile, ProfilePost } from "../types";
import Macy from "macy";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {logOut} from "../utils/auth.ts";

export function Profile() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [error, setError] = useState<boolean>(false)
  const [profile, setProfile] = useState<Profile|undefined>()
  const [description, setDescription] = useState<string|null>(null)
  const [updateDescription, setUpdateDescription] = useState<boolean>(false)
  const [posts, setPosts] = useState<ProfilePost[]>([])
  const [follow, setFollow] = useState<boolean>(false)

  function handleUpdateDescription() {
      fetch(`http://127.0.0.1:3000/user/${localStorage.getItem("id")}`, {
          method: "PATCH",
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              description: description
          })
      })
          .then(res => {
              if(res.status === 401) {
                  logOut()
                  navigate("/login")
              }

              return res.json()
          })
          .then(() => {
              setUpdateDescription(false)
          })
  }

  function handleFollow() {
    if(follow) return

    fetch(`http://127.0.0.1:3000/followers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            user_id: id,
            follower_id: localStorage.getItem("id")
        })
    })
        .then(res => {
            if(res.status === 401) {
                logOut()
                navigate("/login")
            }

            if(res.ok) {
                setFollow(true)
            }

            return res.json()
        })
  }

  function handleUnfollow() {
      if(!follow) return
      fetch(`http://127.0.0.1:3000/followers/${id}/${localStorage.getItem("id")}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      })
          .then(res => {
              if(res.status === 401) {
                  logOut()
                  navigate("/login")
              }

              if(res.ok) {
                  setFollow(false)
              }

              return res.json()
          })
  }

  useEffect(() => {
    setError(false)
    fetch(`http://127.0.0.1:3000/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    })
        .then(res => {
          if(res.status === 404) {
            setError(true)
          }

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
            setProfile(data)
            setDescription(data.description)
          }
        })
  }, [id, updateDescription])

  useEffect(() => {
      fetch(`http://127.0.0.1:3000/posts/user/${id}`, {
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
                  setPosts([])
              }
              else {
                  setPosts([...data.posts])
              }
          })
  }, [id])

    useEffect(() => {
        const macy = new Macy({
            container: "#profile-images",
            colums: 2,
            breakAt: {
                320: {
                    columns: 1,
                },
                640: {
                    columns: 2,
                },
                900: {
                    columns: 3,
                },
                1200: {
                    columns: 3,
                },
            },
        })

        const observer = new ResizeObserver(() => {
            macy.reInit()
        })

        observer.observe(document.querySelector("#profile-images") as HTMLDivElement)
    }, [posts])

    useEffect(() => {
      if(id === localStorage.getItem("id")) return

      fetch(`http://127.0.0.1:3000/followers/${id}/${localStorage.getItem("id")}`, {
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
              if(data.follow.length > 0) {
                  setFollow(true)
              }
              else {
                  setFollow(false)
              }
          })
    }, [id])

  return (
    <div className="w-calc flex flex-col items-center p-6 min-h-[100vh]">
      <div className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-w-[90vw] w-[90vw]">
        {
          !error &&
            <>
              <section className="flex gap-6 items-center">
                <div className="avatar placeholder">
                  <div className="bg-secondary/20 text-secondary w-24 rounded-full">
                    <span className="text-3xl uppercase">{ profile && (profile.user_name.length > 2 ? profile.user_name.slice(0,2) : profile.user_name)}</span>
                  </div>
                </div>
                <h2 className="text-4xl">{ profile && profile.user_name }</h2>
              </section>
              {
                  profile && profile.id !== Number(localStorage.getItem("id")) &&
                  <>
                      {
                          !follow && <button onClick={handleFollow} className="mt-4 btn btn-primary">+ Follow</button>
                      }
                      {
                          follow && <button onClick={handleUnfollow} className="mt-4 btn btn-ghost">- Unfollow</button>
                      }
                  </>
              }
              {
              !updateDescription &&
                    <>
                        <p className="mt-4">
                            {profile && profile.description}
                        </p>
                        {
                            profile && profile.id === Number(localStorage.getItem("id")) &&
                            <button
                                onClick={() => setUpdateDescription(true)}
                                className="btn btn-primary mt-4"
                            >
                                Update Bio
                            </button>
                        }
                    </>
                }
                {
                    updateDescription &&
                    <section>
                        <div className="form-control w-full mt-3">
                        <textarea
                            name="description"
                            value={description ? description : ""}
                            onChange={(e) => setDescription(e.target.value)}
                            className="textarea textarea-filled peer"
                            placeholder="Hello!!!"
                        ></textarea>
                            <span className="textarea-filled-label">Your Description</span>
                            <span className="textarea-filled-focused"></span>
                        </div>
                        <button onClick={handleUpdateDescription} className="btn btn-primary mt-3">Update</button>
                        <button
                            onClick={() => setUpdateDescription(false)}
                            className="btn btn-ghost ml-3 mt-3"
                        >
                            Cancel
                        </button>
                    </section>
                }
                <div className="divider"></div>
                <h2 className="text-3xl font-medium mb-12">Posts</h2>
                <div id="profile-images">
                    {
                        posts.map(item => (
                            <img onClick={() => navigate(`/post/${item.id}`)} src={item.image ?? ""} />
                        ))
                    }
                </div>
            </>
        }
          {
              error &&
              <h1 className="text-center font-semibold text-3xl">Not Found</h1>
          }
      </div>
    </div>
  )
}

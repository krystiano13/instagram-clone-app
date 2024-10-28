import { PostPreview } from "../components/shared/post-preview"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

import type { Post } from '../types/index'

export function Home() {
    const [posts, setPosts] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/posts/followers/${localStorage.getItem("id")}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if(res.status === 401) {
                    navigate("/login")
                }

                return res.json()
            })
            .then((data: { posts: Post[] }) => {
                setPosts([...data.posts as Post[]])
            })
    }, []);

    return (
      <div className="w-calc min-h-[100vh] flex flex-col items-center p-6 gap-12 bg-slate-50">
          {
              posts.map((item:Post) => (
                  <PostPreview
                      id={item.post.id}
                      name={item.name}
                      description={item.post.description.length > 100 ?
                          item.post.description.slice(0,99) :
                          item.post.description
                      }
                      imgSrc={item.post.image}
                  />
              ))
          }
          {
              posts.length < 1 &&
              <section className="w-full h-[100vh] max-w-sm flex flex-col justify-center items-center gap-5">
                  <h1 className="text-xl font-semibold">It looks like you have nothing to watch</h1>
                  <h2 className="text-lg font-regular">
                      Check out {" "}
                      <NavLink className="text-primary" to="/explore">
                          Explore page
                      </NavLink>
                  </h2>
                  <div className="divider"></div>
              </section>
          }
      </div>
    )
}

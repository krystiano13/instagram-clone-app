import { PostPreview } from "../components/shared/post-preview"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
                      name={item.post.name}
                      description={item.post.description.length > 100 ?
                          item.post.description.slice(0,99) :
                          item.post.description
                      }
                      imgSrc={item.post.image}
                  />
              ))
          }
      </div>
    )
}

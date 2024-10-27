import Macy from "macy"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import type { Post } from "../types";

export function Explore() {
    const [posts, setPosts] = useState<Post[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/posts/`, {
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

  useEffect(() => {
    const macy = new Macy({
      container: "#masonry",
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
          columns: 4,
        },
      },
    })

    const observer = new ResizeObserver(() => {
      macy.reInit()
    })

    observer.observe(document.querySelector("#masonry") as HTMLDivElement)
  }, [posts])

  return (
    <div id="masonry" className="w-full bg-slate-50">
        {
            posts && posts.map(item => (
                <img src={item.post.image as string} onClick={() => navigate(`/post/${item.post.id}`)}/>
            ))
        }
    </div>
  )
}

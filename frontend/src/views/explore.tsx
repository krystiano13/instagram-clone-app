import Macy from "macy"
import { useEffect } from "react"

export function Explore() {
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

    return () => {
      observer.unobserve(document.querySelector("#masonry") as HTMLDivElement)
    }
  }, [])

  return (
    <div id="masonry" className="w-full bg-slate-50">
      <img src="https://c4.wallpaperflare.com/wallpaper/304/798/563/samurai-ground-hd-wallpaper-preview.jpg" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJzXf3F5jDoYDNmSH8yo1BbyNYDw4gwle3Q&s" />
      <img src="https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg" />
      <img src="https://c4.wallpaperflare.com/wallpaper/304/798/563/samurai-ground-hd-wallpaper-preview.jpg" />
      <img src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJzXf3F5jDoYDNmSH8yo1BbyNYDw4gwle3Q&s" />
      <img src="https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg" />
      <img src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600" />
      <img src="https://c4.wallpaperflare.com/wallpaper/304/798/563/samurai-ground-hd-wallpaper-preview.jpg" />
      <img src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJzXf3F5jDoYDNmSH8yo1BbyNYDw4gwle3Q&s" />
      <img src="https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg" />
    </div>
  )
}

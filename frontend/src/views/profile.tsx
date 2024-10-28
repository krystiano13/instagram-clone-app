import { PostPreview } from "../components/shared/post-preview"
import type { Profile } from "../types";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export function Profile() {
  const { id } = useParams()

  const [error, setError] = useState<boolean>(false)
  const [profile, setProfile] = useState<Profile|undefined>()

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
          return res.json()
        })
        .then(data => {
          if(data.errors) {
            setError(true)
          }
          else {
            setProfile(data)
          }
        })
  }, [id])

  return (
    <div className="w-calc flex flex-col items-center p-6 min-h-[100vh]">
      <div className="sm:max-w-lg max-w-[90vw] w-[90vw]">
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
                  <button className="mt-4 btn btn-primary">+ Follow</button>
              }
              <p className="mt-4">
              { profile && profile.description }
              </p>
              <div className="divider"></div>
              <h2 className="text-3xl font-medium mb-12">Posts</h2>
              {/*<PostPreview />*/}
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

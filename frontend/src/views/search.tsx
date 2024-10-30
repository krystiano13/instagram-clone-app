import { SearchInput } from "../components/forms/search-input"
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { User } from "../types";
import {logOut} from "../utils/auth.ts";

export function Search() {
  const [search, setSearch] = useState<string>("")
  const [users, setUsers] = useState<User[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
     if(search === "") {
       setUsers([])
     }
     else {
       fetch(`http://127.0.0.1:3000/user/search/${search}`, {
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
               setUsers([])
             }
             else {
               setUsers([...data])
             }
           })
     }
    }, 250)

    return () => {
      clearTimeout(timeout)
    }
  }, [search])

  return (
    <main className="w-full sm:flex sm:flex-col sm:items-center min-h-[100vh] bg-slate-50">
      <div className="mt-12 w-full fixed flex justify-center sm:w-auto">
        <SearchInput onChange={(value:string) => setSearch(value)} />
      </div>

      <section className="translate-y-32 sm:translate-y-0 sm:mt-32 w-[100vw] sm:w-full flex flex-col items-center gap-6">
        {
          users.map(item => (
              <div onClick={() => navigate(`/profile/${item.id}`) } className="card w-96 flex flex-row p-4 gap-6 justify-between items-center">
                <div className="avatar placeholder">
                  <div className="bg-secondary/20 text-secondary w-10 rounded-full">
                    <span className="text-md uppercase">{ item.user_name.length > 2 ? `${item.user_name[0]}${item.user_name[1]}` : item.user_name }</span>
                  </div>
                </div>
                <p>{item.user_name}</p>
              </div>
          ))
        }
      </section>
    </main>
  )
}

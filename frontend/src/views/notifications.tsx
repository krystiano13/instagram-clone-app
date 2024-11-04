import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { logOut } from "../utils/auth.ts";
import { Notification } from "../components/notification.tsx";
import { Notification as NotificationType } from "../types";

export default function Notifications() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [notifications, setNotifications] = useState<NotificationType[]>([])

    useEffect(() => {
      fetch(`http://127.0.0.1:3000/notifications/${localStorage.getItem("id")}`, {
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
              if(data.notifications) {
                  setNotifications([...data.notifications])
              }
          })
    }, [id]);

    return (
        <div className="w-full sm:flex sm:flex-col sm:items-center min-h-[100vh] bg-slate-50">
            <section
                className="translate-y-32 p-4 sm:translate-y-0 sm:mt-32 w-[100vw] sm:w-full flex flex-col items-center gap-6"
            >
                {
                    notifications.map(item => (
                        <Notification content={item.content} />
                    ))
                }
            </section>
        </div>
    )
}
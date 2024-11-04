import { useState } from "react";
import { useNavigate } from "react-router";
import { logOut } from "../utils/auth.ts";

interface Props {
    content: string
    notificationId: number
}

export function Notification({ content, notificationId }: Props) {
    const [opened, setOpened] = useState<boolean>(false)

    const navigate = useNavigate()

    function handleOpen() {
        setOpened(true)

        fetch(`http://127.0.0.1:3000/notifications/${notificationId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if(res.status === 401) {
                   logOut()
                   navigate("/")
                }

                return res.json()
            })
    }

    return (
        <div
            onClick={handleOpen}
            className={`${opened && "opacity-40"} cursor-pointer transition card w-full max-w-2xl flex flex-row p-4 gap-6 justify-between items-center`}>
            <div className="avatar placeholder">
                <div className="bg-secondary/20 text-secondary w-10 rounded-full">
                    <span className="text-md uppercase">
                         {
                             content.length >= 2 ? `${content[0]}${content[1]}` : content
                         }
                    </span>
                </div>
            </div>
            <p>{ content }</p>
        </div>
    )
}
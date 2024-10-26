import { FormWrapper } from "../components/forms/form"
import { useState } from "react";
import { useNavigate } from "react-router";

export function Create() {
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    formData.append("user_id", localStorage.getItem("id") ?? "")

    setErrors([])

    fetch(`http://127.0.0.1:3000/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData
    })
        .then(res => {
          if(res.status === 401) {
            navigate("/login")
          }
          return res.json()
        })
        .then(data => {
          if(data.errors) {
           setErrors(["All fields are required"])
          }
          else {
            navigate("/")
          }
        })
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <FormWrapper>
        <form onSubmit={(e) => handleSubmit(e)} className="w-[90vw] sm:w-96 bg-base-200 h-full flex flex-col gap-8 p-4">
          <h2 className="text-center text-2xl font-medium">Create Post</h2>
          <div className="form-control w-full">
            <textarea
              name="description"
              className="textarea textarea-filled peer"
              placeholder="Hello!!!"
            ></textarea>
            <span className="textarea-filled-label">Your Description</span>
            <span className="textarea-filled-focused"></span>
          </div>
          <label className="form-control max-w-sm">
            <div className="label">
              <span className="label-text">Image</span>
            </div>
            <input name="image" accept="image/*" type="file" className="input" />
          </label>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          {
            errors.map(item => (
                <p className="text-red-500 font-lg text-center my-2">{item}</p>
            ))
          }
        </form>
      </FormWrapper>
    </div>
  )
}

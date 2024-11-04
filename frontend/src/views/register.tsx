import { Input } from "../components/forms/input"
import { FormWrapper } from "../components/forms/form"
import { useNavigate } from "react-router";
import { useState } from "react"

export default function Register() {
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState<boolean>(false)
  const navigate = useNavigate()
  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    setErrors([])

    if(formData.get("password") !== formData.get("password_confirmation")) {
        setErrors(["Password are not the same"])
        return
    }

    fetch("http://127.0.0.1:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          user_name: formData.get("user_name"),
          email: formData.get("email"),
          password: formData.get("password")
      })
    })
        .then(res => res.json())
        .then(data => {
          if(data.errors) {
            setErrors([...data.errors])
          }
          else {
             setSuccess(true)
             setTimeout(() => {
                 navigate("/")
             }, 2000)
          }
        })
  }

  return (
    <main className="w-full h-[100vh]  flex justify-center items-center">
      <FormWrapper
        id="register-form"
        className="card w-[90vw] sm:w-96 bg-primary bg-opacity-60"
      >
          {
              !success &&
              <form onSubmit={(e) => handleRegister(e)} className="bg-base-200 w-full h-full flex flex-col gap-8 p-4">
                  <h2 className="text-center text-2xl font-medium">Register</h2>
                  <Input name="user_name" type="text" label="Username" placeholder="John Doe"/>
                  <Input
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="email@mail.com"
                  />
                  <Input name="password" type="password" label="Password" placeholder="Password"/>
                  <Input
                      name="password_confirmation"
                      type="password"
                      label="Repeat Password"
                      placeholder="Password"
                  />
                  <button type="submit" className="btn btn-primary">
                      Create Account
                  </button>
                  {
                      errors.map(item => (
                          <p className="text-red-500 font-lg text-center my-2">{item}</p>
                      ))
                  }
              </form>
          }
          {
              success &&
              <div className="bg-base-200 w-full h-full flex flex-col gap-8 p-4">
                  <h2 className="text-emerald-500 text-center font-xl flex justify-center items-center h-[30rem]">
                      Account Created !
                  </h2>
              </div>
          }
      </FormWrapper>
    </main>
  )
}

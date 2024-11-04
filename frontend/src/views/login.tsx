import { Input } from "../components/forms/input"
import { FormWrapper } from "../components/forms/form"
import { AuthContext } from "../contexts/auth-context-provider.tsx";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";

export default function Login() {
  const [errors, setErrors] = useState<string[]>([])
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)

      setErrors([])

      fetch("http://127.0.0.1:3000/auth/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              email: formData.get("email"),
              password: formData.get("password")
          })
      })
          .then(res => {
              if(res.status === 401) {
                  setErrors(["Wrong Credentials"])
              }

              return res.json()
          })
          .then(data => {
              if(errors.length === 0) {
                  localStorage.setItem("id", data.user.id)
                  localStorage.setItem("user_name", data.user.user_name)
                  localStorage.setItem("token", data.token)

                  auth.setIsLogged(true)
                  navigate("/")
              }
          })
  }

  return (
    <main className="w-full h-[100vh] flex justify-center items-center">
      <FormWrapper
        id="login-form"
        className="card w-[90vw] sm:w-96 bg-primary bg-opacity-60"
      >
        <form onSubmit={(e) => handleLogin(e)} className="bg-base-200 w-full h-full flex flex-col gap-8 p-4">
          <h2 className="text-center text-2xl font-medium">Welcome Back</h2>
          <Input name="email" type="text" label="Email Address" placeholder="Email Address" />
          <Input name="password" type="password" label="Password" placeholder="Password" />
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
            {
                errors.map(item => (
                    <p className="text-red-500 font-lg text-center my-2">{item}</p>
                ))
            }
        </form>
      </FormWrapper>
    </main>
  )
}

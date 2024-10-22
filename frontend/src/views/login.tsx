import { Input } from "../components/forms/input"
import { FormWrapper } from "../components/forms/form"

export function Login() {
  return (
    <main className="w-full h-[100vh] flex justify-center items-center">
      <FormWrapper
        id="login-form"
        className="card w-[90vw] sm:w-96 bg-primary bg-opacity-60"
      >
        <form className="bg-base-200 w-full h-full flex flex-col gap-8 p-4">
          <h2 className="text-center text-2xl font-medium">Welcome Back</h2>
          <Input type="text" label="Username" placeholder="John Doe" />
          <Input type="password" label="Password" placeholder="Password" />
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </FormWrapper>
    </main>
  )
}

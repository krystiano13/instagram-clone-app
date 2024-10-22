import { Input } from "../components/forms/input"
import { FormWrapper } from "../components/forms/form"

export function Register() {
  return (
    <main className="w-full h-[100vh]  flex justify-center items-center">
      <FormWrapper
        id="register-form"
        className="card w-[90vw] sm:w-96 bg-primary bg-opacity-60"
      >
        <form className="bg-base-200 w-full h-full flex flex-col gap-8 p-4">
          <h2 className="text-center text-2xl font-medium">Register</h2>
          <Input type="text" label="Username" placeholder="John Doe" />
          <Input
            type="email"
            label="Email Address"
            placeholder="email@mail.com"
          />
          <Input type="password" label="Password" placeholder="Password" />
          <Input
            type="password"
            label="Repeat Password"
            placeholder="Password"
          />
          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </form>
      </FormWrapper>
    </main>
  )
}

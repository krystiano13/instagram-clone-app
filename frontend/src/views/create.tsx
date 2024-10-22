import { FormWrapper } from "../components/forms/form"
import { Input } from "../components/forms/input"

export function Create() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <FormWrapper>
        <form className="w-[90vw] sm:w-96 bg-base-200 h-full flex flex-col gap-8 p-4">
          <h2 className="text-center text-2xl font-medium">Create Post</h2>
          <Input type="text" label="Title" placeholder="Title" />
          <div className="form-control w-full">
            <textarea
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
            <input type="file" className="input" />
          </label>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </FormWrapper>
    </div>
  )
}

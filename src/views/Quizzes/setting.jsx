import { useRef } from "react"
import Tiptap from "../../components/tiptap"

export default function Setting() {
  const tiptapRef = useRef()

  return (
    <form>
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input type="email" class="form-control" value={"Quizz 1"} />
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <Tiptap ref={tiptapRef} content={"<p>Hello there</p>"} />
      </div>
      <div class="mb-3">
        <label class="form-label">Allow cute cats</label>
        <input type="password" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Allow cute instead dogs</label>
        <input type="password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  )
}
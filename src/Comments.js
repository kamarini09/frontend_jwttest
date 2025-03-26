import { useState } from "react";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const submit = () => {
    setComments([...comments, input]);
    setInput("");
  };

  return (
    <div>
      <h2>Comments (Vulnerable to XSS)</h2>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Try pasting <script> or <img>" />
      <button onClick={submit}>Post</button>

      <div>
        {comments.map((c, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: c }} />
        ))}
      </div>
    </div>
  );
}

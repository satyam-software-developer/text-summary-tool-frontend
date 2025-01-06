import "./App.css";
import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://textsmmarytoolbackend.onrender.com/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary from the server");
      }

      const data = await response.json();
      setSummary(data.summary || "No summary available.");
    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummary("Failed to summarize the text.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setSummary("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Text Summarizer</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to summarize..."
          rows="8"
          cols="50"
          className="App-textarea"
        />
        <br />
        <button
          onClick={handleSummarize}
          disabled={loading || !text}
          className="App-button"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
        <button onClick={handleClear} className="App-button">
          Clear
        </button>
        {summary && (
          <div className="App-summary">
            <h3>Summary:</h3>
            <p>{summary}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

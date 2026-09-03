import { useState } from "react";
import { Send, Sparkles, LoaderCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

const suggestedQuestions = [
  "How many days should I spend here?",
  "What is the best time to visit?",
  "What places should I not miss?",
];

const DestinationAssistant = ({ destination }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askQuestion = async (questionToAsk) => {
    if (!questionToAsk.trim() || loading) return;

    const userQuestion = questionToAsk.trim();

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        content: userQuestion,
      },
    ]);

    setQuestion("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "chat",
          destination,
          question: userQuestion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to get a response right now."
        );
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch (error) {
      console.error("AI assistant error:", error);

      setError(
        "The travel assistant is unavailable right now. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    askQuestion(question);
  };

  return (
    <section className="assistant-section">
      <div className="assistant-header">
        <div>
          <p className="section-eyebrow">YOUR TRAVEL CONCIERGE</p>

          <h2>
            Ask about <span>{destination.name}</span>
          </h2>
        </div>

        <Sparkles className="assistant-sparkle" size={28} />
      </div>

      <p className="assistant-intro">
        Curious about when to visit, what to see, or how long to stay?
        Ask anything and plan with confidence.
      </p>

      <div className="suggested-questions">
        {suggestedQuestions.map((suggestedQuestion) => (
          <button
            key={suggestedQuestion}
            type="button"
            onClick={() => askQuestion(suggestedQuestion)}
            disabled={loading}
          >
            {suggestedQuestion}
          </button>
        ))}
      </div>

      <div className="assistant-chat">
        {messages.length === 0 && !loading && (
          <div className="assistant-empty">
            <Sparkles size={24} />
            <p>
              Start a conversation about {destination.name}.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
  <div
    key={`${message.role}-${index}`}
    className={`assistant-message ${message.role}`}
  >
    {message.role === "assistant" ? (
      <ReactMarkdown>
        {message.content}
      </ReactMarkdown>
    ) : (
      <span>{message.content}</span>
    )}
  </div>
))}

        {loading && (
          <div className="assistant-message assistant loading">
            <LoaderCircle size={18} className="assistant-loader" />
            <span>Thinking about your journey...</span>
          </div>
        )}
      </div>

      {error && (
        <div className="assistant-error" role="alert">
          {error}
        </div>
      )}

      <form className="assistant-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={`Ask something about ${destination.name}`}
          aria-label={`Ask a question about ${destination.name}`}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={!question.trim() || loading}
          aria-label="Send question"
        >
          <Send size={18} />
        </button>
      </form>
    </section>
  );
};

export default DestinationAssistant;
import { useEffect, useState } from "react";
import api from "../services/api";

export default function History() {
  const [history, setHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/history/")
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteAnalysis = async (id) => {
  try {
    await api.delete(`/history/${id}/`);
    setHistory(history.filter((item) => item.id !== id));
  } catch (error) {
    console.error(error);
    alert("Failed to delete analysis.");
  }
};
const filteredHistory = history
  .filter((item) => {
    const matchesSearch =
      item.job_description.toLowerCase().includes(search.toLowerCase()) ||
      item.risk_level.toLowerCase().includes(search.toLowerCase());

    const matchesRisk =
      riskFilter === "All" || item.risk_level === riskFilter;

    return matchesSearch && matchesRisk;
  })
  .sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    return new Date(a.created_at) - new Date(b.created_at);
  });
  const closeModal = () => {
  setSelectedAnalysis(null);
};
  return (
    <div className="monad-analyzer">
      <section className="monad-hero">
        <div className="monad-eyebrow hero-eyebrow">
          <span />
          <p>Verification History</p>
          <span />
        </div>

        <h1 className="hero-title">Analysis History</h1>

        <p className="monad-subtitle hero-subtitle">
          All previously analyzed job descriptions.
        </p>
      </section>
      <div className="max-w-5xl mx-auto mt-8 mb-4 flex flex-wrap justify-between gap-4">
        <select
  value={riskFilter}
  onChange={(e) => setRiskFilter(e.target.value)}
  className="rounded-lg border border-gray-300 px-4 py-2"
>
  <option value="All">All Risks</option>
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
</select>
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="rounded-lg border border-gray-300 px-4 py-2"
  >
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
  </select>
</div>
      <div className="max-w-5xl mx-auto mt-8 mb-6">
  <input
    type="text"
    placeholder="Search by job description or risk level..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


      <div className="max-w-5xl mx-auto mt-10 space-y-4">
        {filteredHistory.map((item) => (
          <div key={item.id} className="monad-card p-6">
            <p><strong>Risk:</strong> {item.risk_level}</p>
            <p><strong>Score:</strong> {item.risk_score}%</p>
            <p className="mt-2">{item.job_description}</p>

            <button
              onClick={() => deleteAnalysis(item.id)}
  className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
>
  Delete
</button>
<button
  onClick={() => setSelectedAnalysis(item)}
  className="ml-3 mt-4 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
>
  View
</button>
          </div>
        ))}

        {history.length === 0 && (
          <p className="text-center text-gray-400">
            No analyses found.
          </p>
        )}
      </div>
      {selectedAnalysis && (
  <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
  onClick={closeModal}
>
    <div
  className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl"
  onClick={(e) => e.stopPropagation()}
>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Analysis Details
        </h2>

        <button
          onClick={closeModal}
          className="text-3xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>
      </div>

      <div className="mt-6 space-y-4">

        <div>
          <strong>Risk Level:</strong> {selectedAnalysis.risk_level}
        </div>

        <div>
            <strong>Risk Score:</strong> {selectedAnalysis.risk_score}%
            </div>
            <div>
    <strong>Reasons</strong>

    <ul className="mt-2 list-disc space-y-2 pl-5">
        {selectedAnalysis.reasons?.map((reason, index) => (
        <li key={index}>{reason}</li>
        ))}
    </ul>
    </div>
    <div>
    <strong>Analyzed On:</strong>{" "}
    {new Date(selectedAnalysis.created_at).toLocaleString()}
    </div>

        <div>
          <strong>Job Description</strong>

          <div className="mt-2 max-h-80 overflow-y-auto rounded-lg border bg-gray-50 p-4 whitespace-pre-wrap">
            {selectedAnalysis.job_description}
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={closeModal}
          className="rounded-lg bg-black px-6 py-2 text-white"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}
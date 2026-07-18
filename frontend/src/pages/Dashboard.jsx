import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import api from "../services/api";
import usePageReveal from "../hooks/usePageReveal";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const pageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef(null);
  const [recent, setRecent] = useState([]);

  const revealRefs = useMemo(
    () => [eyebrowRef, titleRef, subtitleRef, cardsRef],
    []
  );

  usePageReveal(pageRef, revealRefs);

  const [stats, setStats] = useState({
    total_analyses: 0,
    high_risk: 0,
    medium_risk: 0,
    low_risk: 0,
  });

  useEffect(() => {
  api
    .get("/stats/")
    .then((res) => {
      setStats(res.data);
      setRecent(res.data.recent);
    })
    .catch((err) => console.error(err));
}, []);

  useEffect(() => {
    if (!cardsRef.current) return;

    gsap.fromTo(
      cardsRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      }
    );
  }, [stats]);

   const cards = [
  {
    title: "Total Analyses",
    value: stats.total_analyses,
  },
  {
    title: "High Risk",
    value: stats.high_risk,
  },
  {
    title: "Medium Risk",
    value: stats.medium_risk,
  },
  {
    title: "Low Risk",
    value: stats.low_risk,
  },
  {
    title: "Average Risk",
    value: `${Number(stats.average_risk || 0).toFixed(1)}%`,
  },
  {
    title: "Average Trust",
    value: `${Number(stats.average_trust || 0).toFixed(1)}%`,
  },
];
  const pieData = [
  { name: "High Risk", value: stats.high_risk },
  { name: "Medium Risk", value: stats.medium_risk },
  { name: "Low Risk", value: stats.low_risk },
];

const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];
  

  return (
    <div ref={pageRef} className="monad-analyzer">
      <section className="monad-hero">

        <div ref={eyebrowRef} className="monad-eyebrow hero-eyebrow">
          <span />
          <p>Security Analytics</p>
          <span />
        </div>

        <h1 ref={titleRef} className="hero-title">
          Job Scam Analytics Dashboard
        </h1>

        <p ref={subtitleRef} className="monad-subtitle hero-subtitle">
          Monitor scam detection statistics and overall platform activity.
        </p>

      </section>

      <section
        ref={cardsRef}
        className="mx-auto mt-16 grid w-full max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className="monad-card p-8 min-h-[220px]"
>
            <p className="monad-label">{card.title}</p>
            <h2 className="mt-8 text-7xl font-bold text-black">
            {card.value}
            </h2>

            <div className="mt-8 h-px w-full bg-white/10" />

            <p className="mt-4 text-sm text-gray-500">
            Updated in real-time
            </p>
          </div>
          
        ))}
      </section>
      <div className="monad-card mt-10 p-8">
  <h2 className="mb-6 text-xl font-semibold">
    Risk Distribution
  </h2>

  <div className="mx-auto max-w-sm">
    <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={pieData}
      dataKey="value"
      nameKey="name"
      outerRadius={100}
      label
    >
      {pieData.map((entry, index) => (
        <Cell
          key={index}
          fill={COLORS[index % COLORS.length]}
        />
      ))}
    </Pie>

    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
  </div>
</div>

<div className="monad-card mt-10 p-8">
  <h2 className="mb-6 text-xl font-semibold">
    Scam Categories
  </h2>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div className="rounded-xl border p-5">
      <p className="text-gray-500">💰 Financial</p>
      <h3 className="mt-3 text-4xl font-bold">
        {stats.category_stats?.financial || 0}
      </h3>
    </div>

    <div className="rounded-xl border p-5">
      <p className="text-gray-500">⏰ Pressure</p>
      <h3 className="mt-3 text-4xl font-bold">
        {stats.category_stats?.pressure || 0}
      </h3>
    </div>

    <div className="rounded-xl border p-5">
      <p className="text-gray-500">📱 Contact</p>
      <h3 className="mt-3 text-4xl font-bold">
        {stats.category_stats?.contact || 0}
      </h3>
    </div>
  </div>
</div>
<div className="monad-card mt-10 p-8">
  <h2 className="mb-6 text-xl font-semibold">
    Recent Analyses
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b">
          <th className="py-3">Risk</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {recent.length > 0 ? (
          recent.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-3">{item.risk_level}</td>
              <td>{item.risk_score}%</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="py-4 text-center text-gray-500">
              No analyses available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onContainers, onStats, onHours } from "./firebase";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { FaSignOutAlt } from "react-icons/fa"; // icon logout

import {
  RadialBarChart, RadialBar,
  BarChart, Bar, Cell,
  LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

import "./StatsPanel.css";

const TIPURI = ["Menajer", "Metal", "Plastic", "Hartie"];
const barCol = {
  Menajer: "#0c6f48",
  Metal: "#1f3bc7",
  Plastic: "#1c9ae2",
  Hartie: "#e58c06"
};

const lerp = (a, b, t) => a + (b - a) * t;
const hex2rgb = h => h.match(/\w\w/g).map(x => parseInt(x, 16));
const rgb2hex = rgb => "#" + rgb.map(v => {
  const h = v.toString(16);
  return h.length === 1 ? "0" + h : h;
}).join("");

function pctColor(p) {
  const C1 = hex2rgb("#74c69d");
  const C2 = hex2rgb("#fcbf49");
  const C3 = hex2rgb("#e63946");
  let rgb;
  if (p <= 50) {
    const t = p / 50;
    rgb = C1.map((c, i) => Math.round(lerp(c, C2[i], t)));
  } else {
    const t = (p - 50) / 50;
    rgb = C2.map((c, i) => Math.round(lerp(c, C3[i], t)));
  }
  return rgb2hex(rgb);
}

const darken = h => {
  const rgb = hex2rgb(h).map(v => Math.floor(v * 0.45));
  return rgb2hex(rgb);
};

export default function StatsPage() {
  const { id } = useParams(); // container, site1, site2

  const [niv, setNiv] = useState({});
  const [stats, setStats] = useState({});
  const [hours, setHours] = useState({});

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => onContainers(setNiv, id), [id]);
  useEffect(() => onStats(setStats, id), [id]);
  useEffect(() => onHours(setHours, id), [id]);

  const dataNivel = TIPURI.map(t => ({ name: t, pct: niv[t]?.percent || 0 }));
  const dataCnt = TIPURI.map(t => ({ name: t, cnt: stats[t] || 0 }));
  const dataHour = [...Array(24).keys()].map(h => ({
    h: h.toString(), val: hours[h] || 0
  }));

  return (
    <>
      <header className="topbar">
        <div className="title-group">
          <img src="/icon-192.png" alt="logo" />
          <h1>Monitorizare {id}</h1>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </header>

      <main className="wrap">
        {TIPURI.map(name => {
          const pct = niv[name]?.percent || 0;
          const base = pctColor(pct);
          const track = darken(base);

          return (
            <div className="card" key={name}>
              <svg width="0" height="0">
                <linearGradient id={name + "Grad"} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={base} />
                  <stop offset="100%" stopColor={track} />
                </linearGradient>
              </svg>

              <h3>{name}</h3>

              <RadialBarChart width={160} height={160}
                innerRadius="75%" outerRadius="100%"
                startAngle={90} endAngle={-270}
                data={[{ name, pct, fill: `url(#${name}Grad)` }]}>
                <RadialBar dataKey="pct" cornerRadius={8}
                  background={{ fill: track }} />
                <text x="50%" y="50%" textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={20} fontWeight={600} fill="#fff">
                  {pct}%
                </text>
              </RadialBarChart>
            </div>
          );
        })}

        <section className="full-width">
          <h2>Total deșeuri colectate</h2>
          <BarChart width={720} height={260} data={dataCnt}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="cnt">
              {dataCnt.map((d, i) => (
                <Cell key={i} fill={barCol[d.name]} />
              ))}
            </Bar>
          </BarChart>
        </section>

        <section className="full-width">
          <h2>Activitate pe ore</h2>
          <LineChart width={720} height={260} data={dataHour}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="h" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="val"
              stroke={barCol.Plastic} strokeWidth={3} dot={false} />
          </LineChart>
        </section>
      </main>
    </>
  );
}

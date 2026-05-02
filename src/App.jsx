import React, { useMemo, useState } from "react";

const matches2026 = [
  { id: 1, date: "2026-03-04", orange: 6, blue: 5, players: 14, balance: 7000 },
  { id: 2, date: "2026-03-11", orange: 15, blue: 8, players: 12, balance: 11000 },
  { id: 3, date: "2026-03-18", orange: 7, blue: 5, players: 12, balance: 11000 },
  { id: 4, date: "2026-03-25", orange: 14, blue: 12, players: 14, balance: 7000 },
  { id: 5, date: "2026-04-01", orange: 9, blue: 7, players: 14, balance: 7000 },
  { id: 6, date: "2026-04-08", orange: 9, blue: 6, players: 14, balance: 7000 },
  { id: 7, date: "2026-04-15", orange: 6, blue: 11, players: 14, balance: 7000 },
  { id: 8, date: "2026-04-22", orange: 9, blue: 6, players: 14, balance: 7000 },
  { id: 9, date: "2026-04-29", orange: null, blue: null, players: null, balance: null },
];

const players = [
  { id: "u1", name: "Elías", goals: 18, attendance: 8, team: "Naranjo" },
  { id: "u2", name: "Juan", goals: 13, attendance: 7, team: "Azul" },
  { id: "u3", name: "Nico", goals: 9, attendance: 6, team: "Flexible" },
  { id: "u4", name: "Pablo", goals: 16, attendance: 8, team: "Azul" },
  { id: "u5", name: "Cristian", goals: 7, attendance: 5, team: "Naranjo" },
];

const nextRoster = [
  { id: "r1", order: 1, name: "Elías", userId: "u1", type: "Jugador", confirmation: "Sin confirmar", baseTeam: "Naranjo", matchTeam: "Naranjo", invitedBy: null },
  { id: "r2", order: 2, name: "Juan", userId: "u2", type: "Jugador", confirmation: "Confirmado", baseTeam: "Azul", matchTeam: "Azul", invitedBy: null },
  { id: "r3", order: 3, name: "Nico", userId: "u3", type: "Jugador", confirmation: "Reserva", baseTeam: "Flexible", matchTeam: "Pendiente", invitedBy: null },
  { id: "r4", order: 4, name: "Pablo", userId: "u4", type: "Jugador", confirmation: "Confirmado", baseTeam: "Azul", matchTeam: "Azul", invitedBy: null },
  { id: "g1", order: 5, name: "Galleta de Elías", userId: null, type: "Galleta", confirmation: "Confirmado", baseTeam: "Flexible", matchTeam: "Pendiente", invitedBy: "Elías" },
];

const fullRoster = [
  { id: "m1", order: 1, name: "Elías", userId: "u1", type: "Jugador", confirmation: "Confirmado", baseTeam: "Naranjo", matchTeam: "Naranjo", invitedBy: null },
  { id: "m2", order: 2, name: "Juan", userId: "u2", type: "Jugador", confirmation: "Confirmado", baseTeam: "Azul", matchTeam: "Azul", invitedBy: null },
  { id: "m3", order: 3, name: "Nico", userId: "u3", type: "Jugador", confirmation: "Confirmado", baseTeam: "Flexible", matchTeam: "Pendiente", invitedBy: null },
  { id: "m4", order: 4, name: "Pablo", userId: "u4", type: "Jugador", confirmation: "Confirmado", baseTeam: "Azul", matchTeam: "Azul", invitedBy: null },
  { id: "m5", order: 5, name: "Cristian", userId: "u5", type: "Jugador", confirmation: "Confirmado", baseTeam: "Naranjo", matchTeam: "Naranjo", invitedBy: null },
  { id: "m6", order: 6, name: "Seba", userId: "u6", type: "Jugador", confirmation: "Confirmado", baseTeam: "Flexible", matchTeam: "Pendiente", invitedBy: null },
  { id: "m7", order: 7, name: "Tomás", userId: "u7", type: "Jugador", confirmation: "Confirmado", baseTeam: "Naranjo", matchTeam: "Naranjo", invitedBy: null },
  { id: "m8", order: 8, name: "Rodrigo", userId: "u8", type: "Jugador", confirmation: "Confirmado", baseTeam: "Azul", matchTeam: "Azul", invitedBy: null },
  { id: "m9", order: 9, name: "Felipe", userId: "u9", type: "Jugador", confirmation: "Confirmado", baseTeam: "Flexible", matchTeam: "Pendiente", invitedBy: null },
  { id: "m10", order: 10, name: "Nacho", userId: "u10", type: "Jugador", confirmation: "Confirmado", baseTeam: "Naranjo", matchTeam: "Naranjo", invitedBy: null },
  { id: "m11", order: 11, name: "Diego", userId: "u11", type: "Jugador", confirmation: "Confirmado", baseTeam: "Azul", matchTeam: "Azul", invitedBy: null },
  { id: "m12", order: 12, name: "Mati", userId: "u12", type: "Jugador", confirmation: "Confirmado", baseTeam: "Flexible", matchTeam: "Pendiente", invitedBy: null },
  { id: "m13", order: 13, name: "Galleta de Elías", userId: null, type: "Galleta", confirmation: "Confirmado", baseTeam: "Flexible", matchTeam: "Pendiente", invitedBy: "Elías" },
  { id: "m14", order: 14, name: "Galleta de Juan", userId: null, type: "Galleta", confirmation: "Confirmado", baseTeam: "Flexible", matchTeam: "Pendiente", invitedBy: "Juan" },
];

const menu = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "nextMatch", label: "Próximo Partido", icon: "📲" },
  { key: "matches", label: "Partidos", icon: "📅" },
  { key: "moments", label: "Momentos", icon: "📸" },
  { key: "payments", label: "Cuotas", icon: "💳" },
  { key: "playerRankings", label: "Ranking Jugadores", icon: "🏅" },
  { key: "rules", label: "Reglas", icon: "📜" },
  { key: "bbq", label: "Asado", icon: "🔥" },
  { key: "settings", label: "Configuración", icon: "⚙️" },
];

function money(value) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value || 0);
}

function dateLabel(date) {
  return new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "short" }).format(new Date(`${date}T12:00:00`));
}

function getWinner(match) {
  if (!match || typeof match.orange !== "number" || typeof match.blue !== "number") return "Pendiente";
  if (match.orange > match.blue) return "Naranjo";
  if (match.blue > match.orange) return "Azul";
  return "Empate";
}

function getStats() {
  const played = matches2026.filter((m) => getWinner(m) !== "Pendiente");
  const orangeWins = played.filter((m) => getWinner(m) === "Naranjo").length;
  const blueWins = played.filter((m) => getWinner(m) === "Azul").length;
  const draws = played.filter((m) => getWinner(m) === "Empate").length;
  const orangeGoals = played.reduce((sum, m) => sum + m.orange, 0);
  const blueGoals = played.reduce((sum, m) => sum + m.blue, 0);
  const balance = played.reduce((sum, m) => sum + (m.balance || 0), 21000);
  const avgPlayers = played.length ? played.reduce((sum, m) => sum + (m.players || 0), 0) / played.length : 0;
  const avgGoals = played.length ? (orangeGoals + blueGoals) / played.length : 0;
  return { played, orangeWins, blueWins, draws, orangeGoals, blueGoals, balance, avgPlayers, avgGoals, latest: played[played.length - 1] };
}

function getRosterStats(roster) {
  const confirmed = roster.filter((p) => p.confirmation === "Confirmado").length;
  const reserve = roster.filter((p) => p.confirmation === "Reserva").length;
  const dropped = roster.filter((p) => p.confirmation === "Baja").length;
  const notResponded = roster.filter((p) => p.confirmation === "Sin confirmar").length;
  const guests = roster.filter((p) => p.type === "Galleta").length;
  const ideal = 14;
  const effectiveReserve = Math.min(reserve, Math.max(0, ideal - confirmed));
  const counted = Math.min(ideal, confirmed + effectiveReserve);
  const reserveWaiting = Math.max(0, reserve - effectiveReserve);
  const label = counted >= 12 ? "A tiempo" : "En riesgo";
  return { confirmed, reserve, dropped, notResponded, guests, ideal, effectiveReserve, counted, reserveWaiting, percent: Math.round((counted / ideal) * 100), label };
}

function getVisibleRoster(roster) {
  return roster.filter((p) => p.confirmation !== "Sin confirmar").sort((a, b) => a.order - b.order);
}

function getTeamBalance(roster) {
  const active = roster.filter((p) => ["Confirmado", "Reserva"].includes(p.confirmation));
  const orange = active.filter((p) => p.matchTeam === "Naranjo").length;
  const blue = active.filter((p) => p.matchTeam === "Azul").length;
  const pending = active.filter((p) => !["Naranjo", "Azul"].includes(p.matchTeam)).length;
  return { orange, blue, pending, label: pending > 0 ? "Por asignar" : Math.abs(orange - blue) <= 1 ? "Balanceado" : "Desbalanceado" };
}

function getSuggestedTeam(roster) {
  const balance = getTeamBalance(roster);
  return balance.orange <= balance.blue ? "Naranjo" : "Azul";
}

function buildBalancedTeams(roster) {
  let working = roster.map((p) => (p.type === "Galleta" ? { ...p, baseTeam: "Flexible" } : p));
  working = working.map((p) => {
    const active = ["Confirmado", "Reserva"].includes(p.confirmation);
    const flexible = p.type === "Galleta" || p.baseTeam === "Flexible";
    const pending = !["Naranjo", "Azul"].includes(p.matchTeam);
    if (!active || !flexible || !pending) return p;
    const team = getSuggestedTeam(working);
    working = working.map((row) => (row.id === p.id ? { ...row, matchTeam: team, assignedBy: "Auto" } : row));
    return { ...p, matchTeam: team, assignedBy: "Auto" };
  });
  return working;
}

function getSortedRoster(roster) {
  const order = { Naranjo: 1, Azul: 2, Pendiente: 3, Flexible: 4 };
  return getVisibleRoster(roster).sort((a, b) => (order[a.matchTeam] || 9) - (order[b.matchTeam] || 9) || a.order - b.order);
}

function getRosterScenario(key) {
  if (key === "actual") return nextRoster;
  if (key === "riesgo") return fullRoster.slice(0, 9);
  return fullRoster;
}

const scenarioButtons = [
  { key: "actual", label: "Actual" },
  { key: "mixed14", label: "14 mixtos" },
  { key: "riesgo", label: "En riesgo" },
];

function runSelfTests() {
  console.assert(getVisibleRoster(nextRoster).every((p) => p.confirmation !== "Sin confirmar"), "La nómina visible no debe incluir sin confirmar");
  console.assert(getRosterStats(fullRoster).counted === 14, "14 mixtos debe tener 14 considerados");
  console.assert(getTeamBalance(fullRoster).pending === 6, "14 mixtos debe partir con 6 por asignar");
  console.assert(getTeamBalance(buildBalancedTeams(fullRoster)).pending === 0, "Armar equipos debe dejar 0 pendientes");
  console.assert(getStats().balance === 85000, "El fondo del asado debe ser $85.000");
  console.assert(getRosterScenario("actual").length === nextRoster.length, "El escenario actual debe existir");
  console.assert(scenarioButtons.length === 3, "Deben existir 3 escenarios de prueba");
}
runSelfTests();

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function Header({ eyebrow, title, text }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-orange-600">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{title}</h2>
      <div className="mt-3 h-0.5 w-10 bg-orange-500" />
      {text ? <p className="mt-3 text-sm text-slate-500">{text}</p> : null}
    </div>
  );
}

function Button({ children, active, className = "", ...props }) {
  return <button {...props} className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${active ? "bg-[#12485B] text-white shadow-sm" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"} ${className}`}>{children}</button>;
}

function StatusBadge({ value }) {
  const styles = {
    Confirmado: "bg-emerald-50 text-emerald-700",
    Reserva: "bg-amber-50 text-amber-700",
    Baja: "bg-red-50 text-red-700",
    Pendiente: "bg-slate-100 text-slate-500",
    Flexible: "bg-slate-100 text-slate-600",
    Jugador: "bg-sky-50 text-sky-700",
    Galleta: "bg-orange-50 text-orange-700",
    Naranjo: "bg-orange-50 text-orange-600",
    Azul: "bg-blue-50 text-blue-700",
    "Sin confirmar": "bg-slate-50 text-slate-500",
    "Por asignar": "bg-amber-50 text-amber-700",
    Balanceado: "bg-emerald-50 text-emerald-700",
    Desbalanceado: "bg-red-50 text-red-700",
    "A tiempo": "bg-sky-50 text-sky-700",
    "En riesgo": "bg-red-50 text-red-700",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${styles[value] || "bg-slate-50 text-slate-500"}`}>{value}</span>;
}

function TeamPill({ team }) {
  const color = team === "Naranjo" ? "bg-orange-50 text-orange-600" : team === "Azul" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600";
  const dot = team === "Naranjo" ? "bg-orange-500" : team === "Azul" ? "bg-blue-600" : "bg-slate-400";
  return <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${color}`}><span className={`h-2 w-2 rounded-full ${dot}`} />{team}</span>;
}

function KpiCard({ icon, label, value, note, action, selected }) {
  return (
    <Card className={`min-h-[176px] p-4 text-center ${selected ? "border-sky-200 shadow-[0_12px_30px_rgba(14,165,233,0.16)]" : ""}`}>
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-xl ring-1 ring-slate-100">{icon}</div>
      <p className="mt-5 text-[11px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{note}</p>
      {action ? <p className="mt-4 text-xs font-bold text-[#12485B]">{action}</p> : null}
    </Card>
  );
}

function SectionTitle({ icon, title }) {
  return <div className="flex items-center gap-2"><span className="text-xl">{icon}</span><h3 className="text-xl font-black text-slate-950">{title}</h3></div>;
}

function StandingsTable({ title, global = false }) {
  const rows = global ? [
    { team: "Naranjo", pj: 54, pg: 28, pe: 6, pp: 20, goals: 468, pts: 90 },
    { team: "Azul", pj: 54, pg: 20, pe: 6, pp: 28, goals: 421, pts: 66 },
  ] : [
    { team: "Naranjo", pj: 8, pg: 7, pe: 0, pp: 1, goals: 75, pts: 21 },
    { team: "Azul", pj: 8, pg: 1, pe: 0, pp: 7, goals: 60, pts: 3 },
  ];
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between p-4"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tabla</p><h4 className="text-lg font-black text-slate-950">{title}</h4></div><TeamPill team="Naranjo" /></div>
      <table className="w-full text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3 text-left">Equipo</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>Goles</th><th>Pts</th></tr></thead><tbody>{rows.map((row) => <tr key={row.team} className="border-t border-slate-100"><td className="px-4 py-3"><TeamPill team={row.team} /></td><td className="text-center">{row.pj}</td><td className="text-center">{row.pg}</td><td className="text-center">{row.pe}</td><td className="text-center">{row.pp}</td><td className="text-center font-bold">{row.goals}</td><td className="text-center font-black">{row.pts}</td></tr>)}</tbody></table>
    </Card>
  );
}

function LastMatchCard({ match, onOpen }) {
  const winner = getWinner(match);
  return (
    <Card className="min-h-[214px] bg-gradient-to-br from-white to-sky-50 p-4">
      <div className="grid h-full gap-4 md:grid-cols-[1fr_162px]">
        <div className="flex flex-col justify-center"><p className="text-xs font-black uppercase tracking-widest text-[#12485B]">Último partido</p><h3 className="mt-2 text-xl font-black text-slate-950">Fecha {match.id}: Naranjo vs Azul</h3><p className="mt-3 max-w-xl text-sm leading-snug text-slate-600">Ganó <b>{winner}</b> por {Math.abs(match.orange - match.blue)} goles. La tabla 2026 se mueve y Naranjo queda con ventaja fuerte.</p>{onOpen ? <button onClick={onOpen} className="mt-4 w-fit rounded-2xl bg-white px-4 py-2 text-sm font-bold text-[#12485B] ring-1 ring-sky-100">Ver detalle del partido</button> : null}</div>
        <div className="flex items-center justify-center rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Resultado</p><div className="mt-4 flex items-center justify-center gap-4"><div><p className="text-4xl font-black text-orange-400">{match.orange}</p><p className="mt-2 text-[10px] font-bold uppercase text-slate-400">Naranjo</p></div><div><p className="text-4xl font-black text-sky-400">{match.blue}</p><p className="mt-2 text-[10px] font-bold uppercase text-slate-400">Azul</p></div></div></div></div>
      </div>
    </Card>
  );
}

function AttendanceButton({ status, active, onClick, disabled }) {
  return <button disabled={disabled} onClick={onClick} className={`rounded-2xl border px-4 py-2 text-xs font-bold shadow-sm ${active ? "border-emerald-200 bg-emerald-50 text-emerald-700" : disabled ? "border-slate-200 bg-slate-50 text-slate-300" : "border-slate-200 bg-white text-slate-500"}`}>{status}</button>;
}

function NextMatchCompact({ onOpen }) {
  const [roster, setRoster] = useState(nextRoster);
  const currentUser = roster.find((p) => p.userId === "u1");
  const stats = getRosterStats(roster);
  const next = matches2026.find((m) => getWinner(m) === "Pendiente");
  function setStatus(value) {
    if (!currentUser) return;
    setRoster((items) => items.map((p) => p.id === currentUser.id ? { ...p, confirmation: value } : p));
  }
  return (
    <Card className="min-h-[214px] p-4">
      <div className="flex items-start justify-between gap-3"><div><div className="flex items-center gap-2"><p className="text-xs font-black uppercase tracking-widest text-orange-600">Próximo partido</p><StatusBadge value={stats.label} /></div><h3 className="mt-2 text-xl font-black text-slate-950">Fecha {next.id} · {dateLabel(next.date)}</h3><p className="mt-2 text-sm text-slate-500">Elías, hoy se corre, no se mira desde la casa.</p></div><Button onClick={onOpen}>Abrir</Button></div>
      <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-2"><AttendanceButton status="Voy" active={currentUser?.confirmation === "Confirmado"} onClick={() => setStatus("Confirmado")} /><AttendanceButton status="Reserva" active={currentUser?.confirmation === "Reserva"} onClick={() => setStatus("Reserva")} /><AttendanceButton status="Me bajo" active={currentUser?.confirmation === "Baja"} onClick={() => setStatus("Baja")} disabled={!currentUser || !["Confirmado", "Reserva"].includes(currentUser.confirmation)} /></div>
      <div className="mt-5 flex items-center justify-between text-xs text-slate-500"><span><b className="text-slate-950">{stats.counted}/{stats.ideal}</b> considerados</span><span>⏱ 2d 11h</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${stats.percent}%` }} /></div>
    </Card>
  );
}

function RecordCard({ icon, title, value, note, accent = "slate" }) {
  const accents = {
    orange: "bg-orange-50 text-orange-600 ring-orange-100",
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    slate: "bg-slate-50 text-slate-700 ring-slate-100",
  };
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl ring-1 ${accents[accent] || accents.slate}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
          <p className="text-sm text-slate-500">{note}</p>
        </div>
      </div>
    </Card>
  );
}

function FameCard({ icon, title, value, note, accent = "orange" }) {
  const accents = {
    orange: "bg-orange-50 text-orange-600 ring-orange-100",
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
  };
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl ring-1 ${accents[accent] || accents.orange}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
          <p className="text-sm text-slate-500">{note}</p>
        </div>
      </div>
    </Card>
  );
}

function RecordsAndFame() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SectionTitle icon="🏆" title="Rachas y récords" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <RecordCard icon="🔥" title="Mejor racha" value="Naranjo" note="6 partidos" accent="orange" />
          <RecordCard icon="⭐" title="Partido con más goles" value="Fecha 2" note="23 goles" accent="blue" />
          <RecordCard icon="👟" title="Mayor goleada" value="15 - 8" note="Fecha 2" accent="orange" />
          <RecordCard icon="🧨" title="Partido más apretado" value="Fecha 1" note="6 - 5" accent="blue" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitle icon="👑" title="Insights y salón de la fama" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <FameCard icon="🏆" title="Dominador del año" value="Naranjo" note="7 triunfos de 8" accent="orange" />
          <FameCard icon="⚽" title="Ataque más letal" value="75 goles" note="Naranjo 2026" accent="blue" />
          <FameCard icon="📈" title="Fechas más rentables" value="Fecha 2 y 3" note="$11.000 cada una" accent="green" />
          <FameCard icon="🔥" title="Lectura rápida" value="Naranjo domina" note="Fondo asado: $85.000" accent="amber" />
        </div>
      </div>
    </div>
  );
}

function Dashboard({ setActiveView }) {
  const stats = useMemo(() => getStats(), []);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm"><div><p className="text-xs font-black uppercase tracking-widest text-slate-500">Visualización</p><p className="text-sm text-slate-600">Elige el año o acumulado global que quieres revisar.</p></div><div className="flex gap-2"><Button active>2026</Button><Button>2025</Button><Button>Global</Button></div></div>
      <Header eyebrow="Temporada 2026" title="Dashboard General" text="Resumen del campeonato, caja semanal y fondo del asado." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6"><KpiCard selected icon="⚽" label="Partidos jugados" value={stats.played.length} note="4 pendientes" action="Ver partidos" /><KpiCard icon="🛡️" label="Naranjo vs Azul" value={`${stats.orangeWins} - ${stats.blueWins}`} note={`${stats.draws} empates`} action="Ver tabla" /><KpiCard icon="🥅" label="Goles 2026" value={`${stats.orangeGoals} - ${stats.blueGoals}`} note="Naranjo / Azul" action="Ver goleadores" /><KpiCard icon="💵" label="Saldo asado" value={money(stats.balance)} note="Fondo total" action="Ver asado" /><KpiCard icon="👥" label="Promedio jugadores" value={stats.avgPlayers.toFixed(1).replace(".", ",")} note="por fecha" action="Ver jugadores" /><KpiCard icon="🎯" label="Promedio goles" value={stats.avgGoals.toFixed(1).replace(".", ",")} note="por partido" action="Ver fechas" /></div>
      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.95fr]"><LastMatchCard match={stats.latest} onOpen={() => setActiveView("matches")} /><NextMatchCompact onOpen={() => setActiveView("nextMatch")} /></div>
      <RecordsAndFame />
      <SectionTitle icon="📊" title="Resumen acumulado" />
      <div className="grid gap-4 xl:grid-cols-3"><StandingsTable title="2026" /><StandingsTable title="2026" /><StandingsTable title="Global" global /></div>
    </div>
  );
}

function TeamBalanceCard({ roster, isAdmin, onAssign }) {
  const balance = getTeamBalance(roster);
  const autoCount = roster.filter((p) => p.assignedBy === "Auto").length;

  function autoAssign() {
    if (!isAdmin) return;
    buildBalancedTeams(roster).forEach((p) => onAssign(p.id, p.matchTeam));
  }

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">Balance equipos</p>
          <h3 className="mt-1 text-lg font-black text-slate-950">Equipo del partido</h3>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge value={balance.label} />
          {balance.pending > 0 && isAdmin ? <Button onClick={autoAssign}>Auto-asignar</Button> : null}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl bg-orange-50 p-4 ring-1 ring-orange-100">
          <p className="text-3xl font-black text-orange-500">{balance.orange}</p>
          <p className="text-xs font-bold text-orange-600">Naranjo</p>
        </div>
        <div className="rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-100">
          <p className="text-3xl font-black text-blue-600">{balance.blue}</p>
          <p className="text-xs font-bold text-blue-700">Azul</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
          <p className="text-3xl font-black text-slate-700">{balance.pending}</p>
          <p className="text-xs font-bold text-slate-500">Por asignar</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600 ring-1 ring-slate-100">
        <p><b>Criterio:</b> color base se respeta. Flexibles y galletas se asignan al equipo con menos jugadores.</p>
        <p className="mt-1 text-slate-500">
          {balance.pending > 0
            ? `${balance.pending} jugadores flexibles/galletas siguen por asignar.`
            : `${autoCount || "Los"} flexibles/galletas fueron distribuidos. Se mantiene el número de llegada original.`}
        </p>
      </div>
    </Card>
  );
}

function NextMatch() {
  const [role, setRole] = useState("Admin");
  const [scenario, setScenario] = useState("mixed14");
  const [roster, setRoster] = useState(fullRoster);
  const [teamsBuilt, setTeamsBuilt] = useState(false);
  const isAdmin = role === "Admin";
  const stats = getRosterStats(roster);
  const currentUser = roster.find((p) => p.userId === "u1");
  const visible = teamsBuilt ? getSortedRoster(roster) : getVisibleRoster(roster);
  function update(id, field, value) { setRoster((items) => items.map((p) => p.id === id ? { ...p, [field]: value } : p)); }
  function applyScenario(key) { setScenario(key); setRoster(getRosterScenario(key)); setTeamsBuilt(false); }
  function buildTeams() { setRoster((items) => buildBalancedTeams(items)); setTeamsBuilt(true); }
  return <div className="space-y-6"><Header eyebrow="Convocatoria" title="Próximo Partido" text="Confirmación rápida, reservas, galletas, balance de equipos y nómina previa." /><div className="flex gap-2"><Button active={role === "Admin"} onClick={() => setRole("Admin")}>Vista Admin</Button><Button active={role === "Jugador"} onClick={() => setRole("Jugador")}>Vista Jugador</Button></div><Card className="p-4"><div className="grid gap-4 xl:grid-cols-[1fr_380px]"><div><p className="text-xs font-black uppercase tracking-widest text-[#12485B]">Confirmación rápida</p><h3 className="mt-2 text-2xl font-black text-slate-950">¿Juegas el próximo partido?</h3><p className="mt-2 text-sm text-slate-500">{currentUser?.confirmation === "Confirmado" ? "✅ Elías, estás confirmado para jugar." : currentUser?.confirmation === "Reserva" ? "🐥 Elías, quedaste en reserva." : currentUser?.confirmation === "Baja" ? "💅🏻 Elías, te bajaste del partido." : "Elías, hoy se corre, no se mira desde la casa."}</p><div className="mt-4 grid max-w-lg grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-2"><AttendanceButton status="Voy" active={currentUser?.confirmation === "Confirmado"} onClick={() => update(currentUser.id, "confirmation", "Confirmado")} /><AttendanceButton status="Reserva" active={currentUser?.confirmation === "Reserva"} onClick={() => update(currentUser.id, "confirmation", "Reserva")} /><AttendanceButton status="Me bajo" active={currentUser?.confirmation === "Baja"} onClick={() => update(currentUser.id, "confirmation", "Baja")} disabled={!currentUser || !["Confirmado", "Reserva"].includes(currentUser.confirmation)} /></div></div><Card className="bg-sky-50 p-4"><div className="flex items-center justify-between"><StatusBadge value={stats.label} /><span className="text-xs font-bold text-slate-500">⏱ 2d 11h</span></div><p className="mt-3 text-3xl font-black text-sky-700">{stats.counted} jugadores</p><p className="mt-1 text-sm text-slate-600">Faltan {Math.max(0, stats.ideal - stats.counted)} para el cupo ideal.</p><div className="mt-4 h-3 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${stats.percent}%` }} /></div></Card></div></Card><div className="grid grid-cols-2 gap-3 md:grid-cols-5"><KpiCard icon="✅" label="Considerados" value={`${stats.counted}/${stats.ideal}`} note={`${stats.confirmed} confirmados + ${stats.effectiveReserve} reservas`} /><KpiCard icon="🐥" label="Reservas" value={stats.reserve} note={`${stats.reserveWaiting} espera`} /><KpiCard icon="💅🏻" label="Bajas" value={stats.dropped} note="se bajaron" /><KpiCard icon="🍪" label="Galletas" value={stats.guests} note="invitados" /><KpiCard icon="⏳" label="Sin respuesta" value={stats.notResponded} note="jugadores sin responder" /></div><Card className="p-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-slate-500">Simulador de estados</p><p className="text-sm text-slate-500">Prueba estados de partido y equipos.</p></div><div className="flex gap-2 overflow-x-auto">{scenarioButtons.map((item) => <Button key={item.key} active={scenario === item.key} onClick={() => applyScenario(item.key)}>{item.label}</Button>)}</div></div></Card><div className="grid gap-4 xl:grid-cols-2"><TeamBalanceCard roster={roster} isAdmin={isAdmin} onAssign={(id, team) => update(id, "matchTeam", team)} /><Card className="p-4"><SectionTitle icon="🕒" title="Timeline convocatoria" /><div className="mt-3 space-y-2"><p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">08:05 · Elías abrió la convocatoria</p><p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">08:12 · Juan se confirmó</p><p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">09:03 · Galleta de Elías fue agregado</p></div></Card></div><Card className="p-4"><div className="mb-4 flex items-center justify-between"><div><h3 className="text-lg font-black text-slate-950">Nómina previa</h3><p className="text-sm text-slate-500">Orden de llegada; al armar equipos se ordena por color manteniendo número.</p></div>{isAdmin ? <Button onClick={buildTeams} active={teamsBuilt}>⚖️ {teamsBuilt ? "Equipos armados" : "Armar equipos"}</Button> : null}</div><div className="overflow-x-auto"><table className="min-w-[860px] w-full text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-400"><tr><th className="px-4 py-3 text-left">Llegada / Jugador</th><th className="px-3 py-3 text-left">Tipo</th><th className="px-3 py-3 text-left">Invitado por</th><th className="px-3 py-3 text-left">Equipo base</th><th className="px-3 py-3 text-left">Equipo partido</th><th className="px-4 py-3 text-left">Asistencia</th></tr></thead><tbody>{visible.map((p) => <tr key={p.id} className="border-t border-slate-100"><td className="px-4 py-3 font-bold"><span className="mr-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">{p.order}</span>{p.name}</td><td className="px-3 py-3"><StatusBadge value={p.type} /></td><td className="px-3 py-3 text-slate-500">{p.invitedBy || "—"}</td><td className="px-3 py-3"><TeamPill team={p.baseTeam} /></td><td className="px-3 py-3">{isAdmin ? <select value={p.matchTeam} onChange={(e) => update(p.id, "matchTeam", e.target.value)} className="rounded-xl border border-slate-200 px-2 py-1"><option>Pendiente</option><option>Naranjo</option><option>Azul</option></select> : <TeamPill team={p.matchTeam} />}</td><td className="px-4 py-3">{isAdmin ? <select value={p.confirmation} onChange={(e) => update(p.id, "confirmation", e.target.value)} className="rounded-xl border border-slate-200 px-2 py-1"><option>Sin confirmar</option><option>Confirmado</option><option>Reserva</option><option>Baja</option></select> : <StatusBadge value={p.confirmation} />}</td></tr>)}</tbody></table></div></Card></div>;
}

function ModulePage({ title, icon, text }) { return <div className="space-y-6"><Header eyebrow="Módulo" title={title} text={text} /><Card className="p-5"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-3xl">{icon}</span><div><h3 className="text-lg font-black text-slate-950">{title}</h3><p className="text-sm text-slate-500">Vista recuperada en estructura base. La podemos detallar sin tocar el Dashboard.</p></div></div><StatusBadge value="Pendiente" /></div></Card></div>; }
function MatchesPage() { return <ModulePage title="Partidos" icon="📅" text="Historial de partidos, detalle, resultados, fotos y cierre de cada fecha." />; }
function MomentsPage() { return <ModulePage title="Momentos" icon="📸" text="Feed para fotos, comentarios, crónicas rápidas y recuerdos del grupo." />; }
function PaymentsPage() { return <ModulePage title="Cuotas" icon="💳" text="Control de pagos posterior al partido, pendientes y fondo del asado." />; }
function RankingsPage() { return <ModulePage title="Ranking Jugadores" icon="🏅" text="Asistencia, goles, cancelaciones, rachas e indicadores individuales." />; }
function RulesPage() { return <ModulePage title="Reglas" icon="📜" text="Reglas del grupo para reservas, bajas, galletas, cuotas y equipos." />; }
function BBQPage() { return <ModulePage title="Asado" icon="🔥" text="Fondo acumulado, metas y planificación del asado." />; }
function SettingsPage() { return <ModulePage title="Configuración" icon="⚙️" text="Jugadores, permisos, equipos base y parámetros generales." />; }

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const pages = { dashboard: <Dashboard setActiveView={setActiveView} />, nextMatch: <NextMatch />, matches: <MatchesPage />, moments: <MomentsPage />, payments: <PaymentsPage />, playerRankings: <RankingsPage />, rules: <RulesPage />, bbq: <BBQPage />, settings: <SettingsPage /> };
  return <div className="min-h-screen bg-[#F6F8FB] text-slate-900"><div className="flex min-h-screen"><aside className="hidden w-[226px] shrink-0 border-r border-slate-200 bg-white lg:block"><div className="m-3 mb-4 rounded-tr-xl rounded-br-xl bg-[#256A7A] p-4 text-white"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">⚽</div><h1 className="mt-6 text-2xl font-black">Futbolito</h1><p className="text-sm text-cyan-50/90">Control semanal 2026</p></div><nav className="space-y-2 px-3">{menu.map((item) => <button key={item.key} onClick={() => setActiveView(item.key)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeView === item.key ? "bg-sky-50 text-slate-900 ring-2 ring-blue-500" : "text-slate-600 hover:bg-slate-50"}`}><span>{item.icon}</span><span>{item.label}</span></button>)}</nav></aside><main className="w-full flex-1 p-3 sm:p-6 lg:p-8"><div className="mb-4 flex gap-2 overflow-x-auto lg:hidden">{menu.map((item) => <Button key={item.key} active={activeView === item.key} onClick={() => setActiveView(item.key)} className="shrink-0">{item.icon} {item.label}</Button>)}</div>{pages[activeView]}</main></div></div>;
}

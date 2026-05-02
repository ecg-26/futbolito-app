import React, { useMemo, useState } from "react";

const matches2026 = [
  { id: 1, date: "2026-03-04", orange: 6, blue: 5, players: 14, fee: 4000, balance: 7000 },
  { id: 2, date: "2026-03-11", orange: 15, blue: 8, players: 12, fee: 5000, balance: 11000 },
  { id: 3, date: "2026-03-18", orange: 7, blue: 5, players: 12, fee: 5000, balance: 11000 },
  { id: 4, date: "2026-03-25", orange: 14, blue: 12, players: 14, fee: 4000, balance: 7000 },
  { id: 5, date: "2026-04-01", orange: 9, blue: 7, players: 14, fee: 4000, balance: 7000 },
  { id: 6, date: "2026-04-08", orange: 9, blue: 6, players: 14, fee: 4000, balance: 7000 },
  { id: 7, date: "2026-04-15", orange: 6, blue: 11, players: 14, fee: 4000, balance: 7000 },
  { id: 8, date: "2026-04-22", orange: 9, blue: 6, players: 14, fee: 4000, balance: 7000 },
  { id: 9, date: "2026-04-29", orange: null, blue: null, players: null, fee: null, balance: null },
  { id: 10, date: "2026-05-06", orange: null, blue: null, players: null, fee: null, balance: null },
  { id: 11, date: "2026-05-13", orange: null, blue: null, players: null, fee: null, balance: null },
  { id: 12, date: "2026-05-20", orange: null, blue: null, players: null, fee: null, balance: null },
];

const historic = {
  y2025: { played: 46, orangeWins: 21, blueWins: 19, draws: 6, orangeGoals: 393, blueGoals: 372 },
  y2026: { played: 8, orangeWins: 7, blueWins: 1, draws: 0, orangeGoals: 75, blueGoals: 60 },
  global: { played: 54, orangeWins: 28, blueWins: 20, draws: 6, orangeGoals: 468, blueGoals: 432 },
};

const players = [
  { id: "u1", name: "Elías", role: "Admin", status: "Activo", debt: 0, paid: true, attendance: 8, cancellations: 1, goals: 18 },
  { id: "u2", name: "Juan", role: "Jugador", status: "Activo", debt: 0, paid: true, attendance: 7, cancellations: 2, goals: 13 },
  { id: "u3", name: "Nico", role: "Jugador", status: "Pendiente", debt: 4000, paid: false, attendance: 6, cancellations: 3, goals: 9 },
  { id: "u4", name: "Pablo", role: "Jugador", status: "Activo", debt: 0, paid: true, attendance: 8, cancellations: 0, goals: 16 },
  { id: "u5", name: "Cristian", role: "Jugador", status: "Pendiente", debt: 5000, paid: false, attendance: 5, cancellations: 4, goals: 7 },
];

const nextMatchRoster = [
  { id: "r1", arrivalOrder: 1, userId: "u1", name: "Elías", type: "Jugador", invitedBy: null, confirmation: "Sin confirmar", payment: "Pendiente", baseTeam: "Naranjo", matchTeam: "Naranjo", changedAt: "2026-04-29T09:12:00" },
  { id: "r2", arrivalOrder: 2, userId: "u2", name: "Juan", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pagado", baseTeam: "Azul", matchTeam: "Azul", changedAt: "2026-04-29T09:18:00" },
  { id: "r3", arrivalOrder: 3, userId: "u3", name: "Nico", type: "Jugador", invitedBy: null, confirmation: "Reserva", payment: "Pendiente", baseTeam: "Flexible", matchTeam: "Pendiente", changedAt: "2026-04-29T09:22:00" },
  { id: "r4", arrivalOrder: 4, userId: "u4", name: "Pablo", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Azul", matchTeam: "Azul", changedAt: "2026-04-29T09:35:00" },
  { id: "r5", arrivalOrder: 5, userId: "u5", name: "Cristian", type: "Jugador", invitedBy: null, confirmation: "Baja", payment: "Pendiente", baseTeam: "Azul", matchTeam: "Azul", changedAt: "2026-04-29T10:02:00" },
  { id: "g1", arrivalOrder: 6, userId: null, name: "Galleta de Elías", type: "Galleta", invitedBy: "Elías", confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Flexible", matchTeam: "Pendiente", changedAt: "2026-04-29T10:20:00" },
  { id: "g2", arrivalOrder: 7, userId: null, name: "Galleta de Juan", type: "Galleta", invitedBy: "Juan", confirmation: "Confirmado", payment: "Pagado", baseTeam: "Flexible", matchTeam: "Pendiente", changedAt: "2026-04-29T10:31:00" },
];

function createRosterScenario({ confirmed = 0, reserve = 0, dropped = 0 }) {
  const items = [];

  for (let index = 1; index <= confirmed; index += 1) {
    items.push({
      id: `sc-c-${index}`,
      arrivalOrder: index,
      userId: index === 1 ? "u1" : `sim-c-${index}`,
      name: index === 1 ? "Elías" : `Jugador ${index}`,
      type: index > 12 ? "Galleta" : "Jugador",
      invitedBy: index > 12 ? "Admin" : null,
      confirmation: "Confirmado",
      payment: index % 3 === 0 ? "Pendiente" : "Pagado",
      baseTeam: index > 12 ? "Flexible" : index % 2 === 0 ? "Azul" : "Naranjo",
      matchTeam: index > 12 ? "Pendiente" : index % 2 === 0 ? "Azul" : "Naranjo",
      changedAt: "2026-04-29T11:05:00",
    });
  }

  for (let index = 1; index <= reserve; index += 1) {
    items.push({
      id: `sc-r-${index}`,
      arrivalOrder: confirmed + index,
      userId: confirmed === 0 && index === 1 ? "u1" : `sim-r-${index}`,
      name: confirmed === 0 && index === 1 ? "Elías" : `Reserva ${index}`,
      type: "Jugador",
      invitedBy: null,
      confirmation: "Reserva",
      payment: "Pendiente",
      baseTeam: index % 2 === 0 ? "Azul" : "Naranjo",
      matchTeam: index % 2 === 0 ? "Azul" : "Naranjo",
      changedAt: "2026-04-29T11:08:00",
    });
  }

  for (let index = 1; index <= dropped; index += 1) {
    items.push({
      id: `sc-b-${index}`,
      arrivalOrder: confirmed + reserve + index,
      userId: confirmed === 0 && reserve === 0 && index === 1 ? "u1" : `sim-b-${index}`,
      name: confirmed === 0 && reserve === 0 && index === 1 ? "Elías" : `Baja ${index}`,
      type: "Jugador",
      invitedBy: null,
      confirmation: "Baja",
      payment: "Pendiente",
      baseTeam: "Azul",
      matchTeam: "Azul",
      changedAt: "2026-04-29T11:12:00",
    });
  }

  if (!items.some((item) => item.userId === "u1")) {
    items.unshift({ id: "sc-u1", arrivalOrder: 1, userId: "u1", name: "Elías", type: "Jugador", invitedBy: null, confirmation: "Baja", payment: "Pendiente", baseTeam: "Naranjo", matchTeam: "Naranjo", changedAt: "2026-04-29T11:00:00" });
  }

  return items;
}

const fullMixedRosterScenario = [
  { id: "m1", arrivalOrder: 1, userId: "u1", name: "Elías", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Naranjo", matchTeam: "Naranjo", changedAt: "2026-04-29T08:10:00" },
  { id: "m2", arrivalOrder: 2, userId: "u2", name: "Juan", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Azul", matchTeam: "Azul", changedAt: "2026-04-29T08:15:00" },
  { id: "m3", arrivalOrder: 3, userId: "u3", name: "Nico", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Flexible", matchTeam: "Pendiente", changedAt: "2026-04-29T08:22:00" },
  { id: "m4", arrivalOrder: 4, userId: "u4", name: "Pablo", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Azul", matchTeam: "Azul", changedAt: "2026-04-29T08:28:00" },
  { id: "m5", arrivalOrder: 5, userId: "u5", name: "Cristian", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Naranjo", matchTeam: "Naranjo", changedAt: "2026-04-29T08:33:00" },
  { id: "m6", arrivalOrder: 6, userId: "u6", name: "Seba", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Flexible", matchTeam: "Pendiente", changedAt: "2026-04-29T08:39:00" },
  { id: "m7", arrivalOrder: 7, userId: "u7", name: "Tomás", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Naranjo", matchTeam: "Naranjo", changedAt: "2026-04-29T08:44:00" },
  { id: "m8", arrivalOrder: 8, userId: "u8", name: "Rodrigo", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Azul", matchTeam: "Azul", changedAt: "2026-04-29T08:51:00" },
  { id: "m9", arrivalOrder: 9, userId: "u9", name: "Felipe", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Flexible", matchTeam: "Pendiente", changedAt: "2026-04-29T09:02:00" },
  { id: "m10", arrivalOrder: 10, userId: "u10", name: "Nacho", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Naranjo", matchTeam: "Naranjo", changedAt: "2026-04-29T09:10:00" },
  { id: "m11", arrivalOrder: 11, userId: "u11", name: "Diego", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Azul", matchTeam: "Azul", changedAt: "2026-04-29T09:16:00" },
  { id: "m12", arrivalOrder: 12, userId: "u12", name: "Mati", type: "Jugador", invitedBy: null, confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Flexible", matchTeam: "Pendiente", changedAt: "2026-04-29T09:21:00" },
  { id: "m13", arrivalOrder: 13, userId: null, name: "Galleta de Elías", type: "Galleta", invitedBy: "Elías", confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Flexible", matchTeam: "Pendiente", changedAt: "2026-04-29T09:35:00" },
  { id: "m14", arrivalOrder: 14, userId: null, name: "Galleta de Juan", type: "Galleta", invitedBy: "Juan", confirmation: "Confirmado", payment: "Pendiente", baseTeam: "Flexible", matchTeam: "Pendiente", changedAt: "2026-04-29T09:47:00" },
];

const rosterScenarios = {
  real: { label: "Actual", roster: nextMatchRoster, now: "2026-04-27T10:00:00" },
  onTime: { label: "A tiempo", roster: createRosterScenario({ confirmed: 8, reserve: 1, dropped: 1 }), now: "2026-04-24T10:00:00" },
  risk: { label: "En riesgo", roster: createRosterScenario({ confirmed: 9, reserve: 1, dropped: 2 }), now: "2026-04-28T10:00:00" },
  playable: { label: "Confirmado", roster: createRosterScenario({ confirmed: 11, reserve: 1, dropped: 1 }), now: "2026-04-28T10:00:00" },
  ideal: { label: "Confirmado 14", roster: createRosterScenario({ confirmed: 14, reserve: 0, dropped: 1 }), now: "2026-04-28T10:00:00" },
  dream: { label: "Alta convocatoria", roster: createRosterScenario({ confirmed: 14, reserve: 2, dropped: 1 }), now: "2026-04-28T10:00:00" },
  mixed14: { label: "14 mixtos", roster: fullMixedRosterScenario, now: "2026-04-28T10:00:00" },
};

const initialNextMatchTimeline = [
  { id: "t1", time: "2026-04-29T08:05:00", player: "Elías", action: "abrió la convocatoria", status: "Confirmado" },
  { id: "t2", time: "2026-04-29T08:12:00", player: "Juan", action: "se confirmó", status: "Confirmado" },
  { id: "t3", time: "2026-04-29T08:18:00", player: "Nico", action: "entró como reserva", status: "Reserva" },
  { id: "t4", time: "2026-04-29T08:25:00", player: "Pablo", action: "se confirmó", status: "Confirmado" },
  { id: "t5", time: "2026-04-29T08:41:00", player: "Cristian", action: "se bajó", status: "Baja" },
  { id: "t6", time: "2026-04-29T09:03:00", player: "Galleta de Elías", action: "fue agregado como confirmado", status: "Confirmado" },
  { id: "t7", time: "2026-04-29T09:17:00", player: "Galleta de Juan", action: "fue agregado como confirmado", status: "Confirmado" },
  { id: "t8", time: "2026-04-29T09:32:00", player: "Seba", action: "entró como reserva", status: "Reserva" },
  { id: "t9", time: "2026-04-29T09:46:00", player: "Tomás", action: "se confirmó", status: "Confirmado" },
  { id: "t10", time: "2026-04-29T10:02:00", player: "Rodrigo", action: "se confirmó", status: "Confirmado" },
  { id: "t11", time: "2026-04-29T10:19:00", player: "Felipe", action: "entró como reserva", status: "Reserva" },
  { id: "t12", time: "2026-04-29T10:31:00", player: "Cristian", action: "volvió a reserva", status: "Reserva" },
  { id: "t13", time: "2026-04-29T10:44:00", player: "Pablo", action: "se bajó", status: "Baja" },
  { id: "t14", time: "2026-04-29T10:58:00", player: "Nico", action: "pasó de reserva a confirmado", status: "Confirmado" },
  { id: "t15", time: "2026-04-29T11:05:00", player: "Felipe", action: "sigue en reserva por cupo completo", status: "Reserva" },
];

const goalReportsExample = {
  matchId: 9,
  officialScore: { orange: 7, blue: 6 },
  reports: [
    { player: "Elías", team: "Naranjo", goals: 3 },
    { player: "Nico", team: "Naranjo", goals: 2 },
    { player: "Galleta de Elías", team: "Naranjo", goals: 4 },
    { player: "Juan", team: "Azul", goals: 2 },
    { player: "Pablo", team: "Azul", goals: 3 },
    { player: "Galleta de Juan", team: "Azul", goals: 1 },
  ],
  votes: [
    { player: "Elías", vote: "Marcador oficial 7-6" },
    { player: "Juan", vote: "Marcador oficial 7-6" },
    { player: "Pablo", vote: "Revisar goles Naranjo" },
  ],
};

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

const futbolitoRules = [
  {
    id: "reserve",
    category: "Cupos y reservas",
    title: "Cómo funciona la reserva",
    summary: "La reserva suma mientras existan cupos disponibles. Si el partido llega a 14 considerados, la reserva queda en espera y vuelve a sumar automáticamente si alguien se baja.",
    example: "Si hay 12 confirmados + 1 reserva, el total considerado es 13. Si después hay 14 confirmados, la reserva queda en espera.",
    audience: "Todos",
  },
  {
    id: "late-cancel",
    category: "Bajas y pagos",
    title: "Baja el mismo día después del mediodía",
    summary: "Si un jugador se baja el mismo día después de las 12:00 y no deja reemplazo o galleta, debe pagar igual si afecta el partido.",
    example: "Si alguien cancela a las 15:00, no llega reemplazo y el cupo queda vacío, queda cuota pendiente/morosa.",
    audience: "Todos",
  },
  {
    id: "guest",
    category: "Galletas",
    title: "Responsabilidad del galleta",
    summary: "El jugador que invita un galleta queda asociado a ese invitado. El galleta cuenta para cupo, equipo, cuota y goles del partido.",
    example: "Si Elías invita un galleta, el sistema muestra 'Galleta de Elías' y deja trazabilidad del invitado.",
    audience: "Todos",
  },
  {
    id: "payment",
    category: "Cuotas",
    title: "Cuotas pendientes y morosidad",
    summary: "La cuota puede quedar pendiente durante el partido. Al cerrar la fecha, quien jugó y no pagó queda como moroso.",
    example: "Si jugaste la Fecha 9 y no marcaste pago, al cierre apareces como moroso.",
    audience: "Todos",
  },
  {
    id: "goals",
    category: "Goles y votación",
    title: "Descuadre de goles",
    summary: "Si los goles registrados por jugadores no cuadran con el marcador oficial, el Admin puede abrir una revisión o votación para cerrar el resultado real.",
    example: "El partido terminó 7-6, pero los jugadores registraron 9-6. Se abre votación y queda historial de la resolución.",
    audience: "Todos",
  },
  {
    id: "comments-photos",
    category: "Histórico",
    title: "Comentarios y fotos post-partido",
    summary: "Comentarios y fotos quedan abiertos por 24 horas después del partido. Luego se cierran y quedan como historial de la fecha.",
    example: "Se pueden dejar comentarios, respuestas y máximo 2 fotos comprimidas por partido.",
    audience: "Todos",
  },
];

const matchDetails = {
  8: {
    roster: [
      { name: "Elías", team: "Naranjo", type: "Jugador", payment: "Pagado", goals: 2 },
      { name: "Nico", team: "Naranjo", type: "Jugador", payment: "Pagado", goals: 2 },
      { name: "Galleta de Elías", team: "Naranjo", type: "Galleta", payment: "Pendiente", goals: 1 },
      { name: "Pablo", team: "Naranjo", type: "Jugador", payment: "Pagado", goals: 4 },
      { name: "Juan", team: "Azul", type: "Jugador", payment: "Pagado", goals: 2 },
      { name: "Cristian", team: "Azul", type: "Jugador", payment: "Pendiente", goals: 1 },
      { name: "Galleta de Juan", team: "Azul", type: "Galleta", payment: "Pagado", goals: 3 },
    ],
    notes: "Partido cerrado en el segundo tiempo. Naranjo sostuvo la ventaja al final.",
    commentsOpenUntil: "2026-04-23T23:00:00",
    photosOpenUntil: "2026-04-23T23:00:00",
    photos: [
      { id: "p8-1", title: "Foto destacada", caption: "Cierre de la Fecha 8, partido apretado y con polémica de goles.", uploadedBy: "Elías", featured: true, sizeKb: 280, color: "from-orange-200 to-sky-200" },
      { id: "p8-2", title: "Post partido", caption: "El grupo revisando el marcador y la cuadratura final.", uploadedBy: "Pablo", featured: false, sizeKb: 240, color: "from-emerald-200 to-cyan-200" },
    ],
    comments: [
      { id: "c1", player: "Juan", time: "2026-04-22T23:18:00", text: "Partido apretado, pero el último gol de Naranjo fue dudoso igual 😂", highlighted: false, replies: [
        { id: "c1-r1", player: "Elías", time: "2026-04-22T23:21:00", text: "Jajaja por eso dejamos votación, para que no quede en el aire." },
        { id: "c1-r2", player: "Pablo", time: "2026-04-22T23:24:00", text: "Yo lo vi adentro, pero igual cuadramos por marcador final." },
      ] },
      { id: "c2", player: "Pablo", time: "2026-04-22T23:26:00", text: "Confirmo que terminó 9-6. Lo de los goles individuales estaba inflado.", highlighted: true, replies: [
        { id: "c2-r1", player: "Juan", time: "2026-04-22T23:30:00", text: "Eso mismo, el marcador era claro." },
      ] },
      { id: "c3", player: "Elías", time: "2026-04-23T09:10:00", text: "Queda cerrado por votación. Para la próxima anotamos goles altiro al terminar.", highlighted: false, replies: [] },
    ],
    resolution: {
      status: "Resuelto por votación",
      officialScore: { orange: 9, blue: 6 },
      reportedScore: { orange: 10, blue: 6 },
      finalScore: { orange: 9, blue: 6 },
      issue: "La suma de goles declarados por Naranjo dio 10, pero el marcador acordado al terminar fue 9-6.",
      decision: "Por votación se ajustó 1 gol de Naranjo y se mantuvo el resultado oficial 9-6.",
      admin: "Elías",
      votesFor: 5,
      votesAgainst: 1,
      timeline: [
        { title: "Partido finalizado", text: "Marcador informado: Naranjo 9 - 6 Azul." },
        { title: "Goles registrados", text: "Jugadores registraron Naranjo 10 - 6 Azul." },
        { title: "Diferencia detectada", text: "Sobró 1 gol en Naranjo respecto al resultado final." },
        { title: "Votación Admin", text: "Se abrió votación para validar marcador real." },
        { title: "Resolución", text: "Se ajustó la suma individual y el partido quedó cerrado 9-6." },
      ],
    },
  },
  7: {
    roster: [
      { name: "Elías", team: "Naranjo", type: "Jugador", payment: "Pagado", goals: 1 },
      { name: "Nico", team: "Naranjo", type: "Jugador", payment: "Pendiente", goals: 2 },
      { name: "Pablo", team: "Naranjo", type: "Jugador", payment: "Pagado", goals: 3 },
      { name: "Juan", team: "Azul", type: "Jugador", payment: "Pagado", goals: 4 },
      { name: "Cristian", team: "Azul", type: "Jugador", payment: "Pagado", goals: 3 },
      { name: "Galleta de Juan", team: "Azul", type: "Galleta", payment: "Pagado", goals: 4 },
    ],
    notes: "Único triunfo azul del 2026 hasta ahora.",
    commentsOpenUntil: "2026-04-16T23:00:00",
    photosOpenUntil: "2026-04-16T23:00:00",
    photos: [
      { id: "p7-1", title: "Triunfo Azul", caption: "Único triunfo azul del 2026 hasta ahora. Foto para el archivo histórico.", uploadedBy: "Cristian", featured: true, sizeKb: 260, color: "from-blue-200 to-indigo-200" },
    ],
    comments: [
      { id: "c4", player: "Cristian", time: "2026-04-15T23:20:00", text: "Al fin despertó Azul. Que quede en acta.", highlighted: true, replies: [
        { id: "c4-r1", player: "Juan", time: "2026-04-15T23:33:00", text: "Se tenía que decir y se dijo." },
      ] },
      { id: "c5", player: "Elías", time: "2026-04-16T08:40:00", text: "Dolorosa derrota, pero bien ganado por Azul.", highlighted: false, replies: [] }
    ],
    resolution: {
      status: "Cerrado sin diferencias",
      officialScore: { orange: 6, blue: 11 },
      reportedScore: { orange: 6, blue: 11 },
      finalScore: { orange: 6, blue: 11 },
      issue: "No hubo diferencia entre marcador final y goles registrados.",
      decision: "Partido cerrado sin votación.",
      admin: "Sistema",
      votesFor: 0,
      votesAgainst: 0,
      timeline: [
        { title: "Partido finalizado", text: "Marcador informado: Naranjo 6 - 11 Azul." },
        { title: "Goles registrados", text: "La suma individual coincidió con el marcador." },
        { title: "Cierre automático", text: "No fue necesario abrir votación." },
      ],
    },
  },
};

function money(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatNumber(value, decimals = 1) {
  return Number(value || 0).toFixed(decimals).replace(".", ",");
}

function dateLabel(date) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));
}

function getWinner(match) {
  if (!match || typeof match.orange !== "number" || typeof match.blue !== "number") return "Pendiente";
  if (match.orange > match.blue) return "Naranjo";
  if (match.blue > match.orange) return "Azul";
  return "Empate";
}

function calculateBestStreak(matches) {
  let bestTeam = "Sin datos";
  let bestCount = 0;
  let currentTeam = null;
  let currentCount = 0;

  matches.forEach((match) => {
    const winner = getWinner(match);
    if (winner === "Pendiente" || winner === "Empate") {
      currentTeam = null;
      currentCount = 0;
      return;
    }

    if (winner === currentTeam) {
      currentCount += 1;
    } else {
      currentTeam = winner;
      currentCount = 1;
    }

    if (currentCount > bestCount) {
      bestTeam = winner;
      bestCount = currentCount;
    }
  });

  return { team: bestTeam, count: bestCount };
}

function calculateCurrentStreak(matches) {
  const played = matches.filter((match) => getWinner(match) !== "Pendiente");
  const lastWinner = getWinner(played[played.length - 1]);

  if (lastWinner === "Pendiente" || lastWinner === "Empate") {
    return { team: lastWinner, count: 0 };
  }

  let count = 0;
  for (let index = played.length - 1; index >= 0; index -= 1) {
    if (getWinner(played[index]) === lastWinner) count += 1;
    else break;
  }

  return { team: lastWinner, count };
}

function calculateRecords(matches) {
  const played = matches.filter((match) => getWinner(match) !== "Pendiente");

  if (!played.length) {
    return {
      highestScoring: null,
      biggestWin: null,
      closestMatch: null,
      bestSingleTeamScore: { team: "Sin datos", goals: 0, match: null },
      highestBalance: null,
      highestBalanceMatches: [],
      bestStreak: { team: "Sin datos", count: 0 },
      currentStreak: { team: "Sin datos", count: 0 },
    };
  }

  const enrichedMatches = played.map((match) => ({
    ...match,
    totalGoals: match.orange + match.blue,
    diff: Math.abs(match.orange - match.blue),
  }));

  const highestScoring = enrichedMatches.reduce((best, match) => (match.totalGoals > best.totalGoals ? match : best), enrichedMatches[0]);
  const biggestWin = enrichedMatches.reduce((best, match) => (match.diff > best.diff ? match : best), enrichedMatches[0]);
  const closestMatch = enrichedMatches.reduce((best, match) => (match.diff < best.diff ? match : best), enrichedMatches[0]);
  const highestBalance = played.reduce((best, match) => ((match.balance || 0) > (best.balance || 0) ? match : best), played[0]);
  const highestBalanceMatches = played.filter((match) => match.balance === highestBalance.balance);

  const bestSingleTeamScore = played.reduce(
    (best, match) => {
      const candidates = [
        best,
        { team: "Naranjo", goals: match.orange, match },
        { team: "Azul", goals: match.blue, match },
      ];
      return candidates.reduce((winner, candidate) => (candidate.goals > winner.goals ? candidate : winner));
    },
    { team: "Sin datos", goals: 0, match: null }
  );

  return {
    highestScoring,
    biggestWin,
    closestMatch,
    bestSingleTeamScore,
    highestBalance,
    highestBalanceMatches,
    bestStreak: calculateBestStreak(matches),
    currentStreak: calculateCurrentStreak(matches),
  };
}

function calculateStats(matches, startingBalance = 21000) {
  const played = matches.filter((match) => typeof match.orange === "number" && typeof match.blue === "number");
  const orangeWins = played.filter((match) => match.orange > match.blue).length;
  const blueWins = played.filter((match) => match.blue > match.orange).length;
  const draws = played.filter((match) => match.orange === match.blue).length;
  const orangeGoals = played.reduce((sum, match) => sum + match.orange, 0);
  const blueGoals = played.reduce((sum, match) => sum + match.blue, 0);
  const weeklyBalance = played.reduce((sum, match) => sum + (match.balance || 0), 0);
  const avgPlayers = played.length ? played.reduce((sum, match) => sum + (match.players || 0), 0) / played.length : 0;
  const avgGoals = played.length ? (orangeGoals + blueGoals) / played.length : 0;
  const latestMatch = played[played.length - 1] || null;

  return {
    played,
    pending: matches.length - played.length,
    orangeWins,
    blueWins,
    draws,
    orangeGoals,
    blueGoals,
    totalGoals: orangeGoals + blueGoals,
    weeklyBalance,
    startingBalance,
    bbqBalance: weeklyBalance + startingBalance,
    avgPlayers,
    avgGoals,
    latestMatch,
    records: calculateRecords(matches),
  };
}

function buildStandings(period) {
  const totalGoals = period.orangeGoals + period.blueGoals;

  const orange = {
    team: "Naranjo",
    color: "orange",
    pj: period.played,
    pg: period.orangeWins,
    pe: period.draws,
    pp: period.blueWins,
    goals: period.orangeGoals,
  };

  const blue = {
    team: "Azul",
    color: "blue",
    pj: period.played,
    pg: period.blueWins,
    pe: period.draws,
    pp: period.orangeWins,
    goals: period.blueGoals,
  };

  return [orange, blue]
    .map((row) => ({
      ...row,
      avgGoals: row.pj ? row.goals / row.pj : 0,
      goalsPercent: totalGoals ? (row.goals / totalGoals) * 100 : 0,
      pts: row.pg * 3 + row.pe,
      winRate: row.pj ? (row.pg / row.pj) * 100 : 0,
    }))
    .sort((a, b) => b.pts - a.pts || b.goals - a.goals);
}

function getPeriodStandings() {
  return {
    "2025": buildStandings(historic.y2025),
    "2026": buildStandings(historic.y2026),
    Global: buildStandings(historic.global),
  };
}

function getAvailableYears() {
  return ["2026", "2025", "Global"];
}

function getSeasonMatches(year) {
  if (year === "2026") return matches2026;
  return [];
}

function getSeasonPeriod(year) {
  if (year === "2025") return historic.y2025;
  if (year === "2026") return historic.y2026;
  return historic.global;
}

function calculateStatsForYear(year) {
  const seasonMatches = getSeasonMatches(year);
  if (seasonMatches.length) return calculateStats(seasonMatches);

  const period = getSeasonPeriod(year);
  const totalGoals = period.orangeGoals + period.blueGoals;

  return {
    played: [],
    pending: 0,
    orangeWins: period.orangeWins,
    blueWins: period.blueWins,
    draws: period.draws,
    orangeGoals: period.orangeGoals,
    blueGoals: period.blueGoals,
    totalGoals,
    weeklyBalance: 0,
    startingBalance: 0,
    bbqBalance: 0,
    avgPlayers: 0,
    avgGoals: period.played ? totalGoals / period.played : 0,
    latestMatch: null,
    records: calculateRecords([]),
  };
}

function getLeaderLabel(rows) {
  if (!rows.length) return "Sin datos";
  const [first, second] = rows;
  if (second && first.pts === second.pts && first.goals === second.goals) return "Empate técnico";
  return first.team;
}

function getTeamBalance(roster = []) {
  const activeRoster = roster.filter((item) => ["Confirmado", "Reserva"].includes(item.confirmation));
  const orange = activeRoster.filter((item) => item.matchTeam === "Naranjo").length;
  const blue = activeRoster.filter((item) => item.matchTeam === "Azul").length;
  const pendingGuests = activeRoster.filter((item) => item.type === "Galleta" && !["Naranjo", "Azul"].includes(item.matchTeam)).length;
  const pendingFlexible = activeRoster.filter((item) => item.type === "Jugador" && item.baseTeam === "Flexible" && !["Naranjo", "Azul"].includes(item.matchTeam)).length;
  const registeredWithoutTeam = activeRoster.filter((item) => item.type === "Jugador" && item.baseTeam !== "Flexible" && !["Naranjo", "Azul"].includes(item.matchTeam)).length;
  const assignedFlexible = activeRoster.filter((item) => item.baseTeam === "Flexible" && ["Naranjo", "Azul"].includes(item.matchTeam)).length;
  const pending = pendingGuests + pendingFlexible;
  const diff = Math.abs(orange - blue);
  const label = pending > 0 ? "Por asignar" : registeredWithoutTeam > 0 ? "Revisar jugadores" : diff <= 1 ? "Balanceado" : "Desbalanceado";

  return { orange, blue, pending, pendingGuests, pendingFlexible, assignedFlexible, registeredWithoutTeam, diff, label };
}

function getSuggestedTeam(roster = []) {
  const balance = getTeamBalance(roster);
  if (balance.orange <= balance.blue) return "Naranjo";
  return "Azul";
}

function normalizeRosterTeams(roster = []) {
  return roster.map((item) => {
    if (item.type === "Galleta") return { ...item, baseTeam: "Flexible" };
    if (item.baseTeam === "Flexible") return item;
    if (["Naranjo", "Azul"].includes(item.matchTeam)) return item;
    if (["Naranjo", "Azul"].includes(item.baseTeam)) return { ...item, matchTeam: item.baseTeam };
    return item;
  });
}

function getRosterStats(roster = [], matchDate = "2026-04-29", now = new Date("2026-04-27T10:00:00")) {
  const safeRoster = Array.isArray(roster) ? roster : [];
  const confirmed = safeRoster.filter((item) => item.confirmation === "Confirmado").length;
  const reserve = safeRoster.filter((item) => item.confirmation === "Reserva").length;
  const dropped = safeRoster.filter((item) => item.confirmation === "Baja").length;
  const guests = safeRoster.filter((item) => item.type === "Galleta").length;
  const paid = safeRoster.filter((item) => item.payment === "Pagado").length;
  const notResponded = safeRoster.filter((item) => item.confirmation === "Sin confirmar").length;
  const backupPlayers = safeRoster.filter((item) => ["Sin confirmar", "Baja"].includes(item.confirmation) && item.type === "Jugador").length;
  const pendingPayment = safeRoster.filter((item) => item.payment !== "Pagado" && ["Confirmado", "Reserva"].includes(item.confirmation)).length;
  const idealPlayers = 14;
  const minimumPlayers = 12;
  const effectiveReserve = Math.min(reserve, Math.max(0, idealPlayers - confirmed));
  const reserveWaiting = Math.max(0, reserve - effectiveReserve);
  const countedPlayers = Math.min(idealPlayers, confirmed + effectiveReserve);
  const missingForIdeal = Math.max(0, idealPlayers - countedPlayers);
  const missingForMinimum = Math.max(0, minimumPlayers - countedPlayers);
  const availableSlots = missingForIdeal;
  const reserveThatCouldEnter = effectiveReserve;
  const progressPercent = Math.min(100, Math.round((countedPlayers / idealPlayers) * 100));
  const countdown = getMatchCountdown(matchDate || "2026-04-29", now);
  const matchState = getMatchConvocationState({ countedPlayers, reserveWaiting, minimumPlayers, idealPlayers, countdown });
  const statusLabel = matchState.label;

  return {
    confirmed,
    reserve,
    effectiveReserve,
    reserveWaiting,
    countedPlayers,
    doubts: 0,
    dropped,
    guests,
    paid,
    pendingPayment,
    notResponded,
    backupPlayers,
    idealPlayers,
    minimumPlayers,
    missingForIdeal,
    missingForMinimum,
    availableSlots,
    reserveThatCouldEnter,
    progressPercent,
    statusLabel,
    matchState,
    countdown,
  };
}

function safeDate(value, fallback = "2026-04-29T21:00:00") {
  const date = value instanceof Date ? value : new Date(value || fallback);
  return Number.isNaN(date.getTime()) ? new Date(fallback) : date;
}

function getConvocationOpenDate(matchDate = "2026-04-29") {
  const date = safeDate(`${matchDate}T09:00:00`);
  date.setDate(date.getDate() - 6);
  return date;
}

function getRiskStartDate(matchDate = "2026-04-29") {
  const date = safeDate(`${matchDate}T09:00:00`);
  date.setDate(date.getDate() - 1);
  return date;
}

function getMatchCountdown(matchDate = "2026-04-29", now = new Date("2026-04-27T10:00:00")) {
  const currentTime = safeDate(now, "2026-04-27T10:00:00");
  const matchAt = safeDate(`${matchDate}T21:00:00`);
  const openAt = getConvocationOpenDate(matchDate);
  const riskAt = getRiskStartDate(matchDate);
  const diffMs = matchAt.getTime() - currentTime.getTime();
  const totalHours = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60)));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  return {
    matchAt,
    openAt,
    riskAt,
    totalHours,
    days,
    hours,
    isOpen: currentTime >= openAt,
    isRiskWindow: currentTime >= riskAt,
    label: totalHours <= 0 ? "Hoy" : days > 0 ? `${days}d ${hours}h` : `${hours}h`,
  };
}

function getMatchConvocationState({ countedPlayers, reserveWaiting, minimumPlayers = 12, idealPlayers = 14, countdown = null }) {
  if (countedPlayers >= idealPlayers && reserveWaiting > 0) {
    return {
      key: "dream",
      label: "Alta convocatoria",
      headline: "14 + reservas",
      message: "Partido completo y con respaldo si alguien se baja.",
      tone: "emerald",
    };
  }

  if (countedPlayers >= idealPlayers) {
    return {
      key: "ideal",
      label: "Confirmado",
      headline: "14 jugadores",
      message: "Cupo ideal completo. Listo para jugar sin apuros.",
      tone: "green",
    };
  }

  if (countedPlayers >= minimumPlayers) {
    return {
      key: "playable",
      label: "Confirmado",
      headline: `${countedPlayers} jugadores`,
      message: `Se juega! Aún hay espacio para ${Math.max(0, idealPlayers - countedPlayers)} jugadores más.`,
      tone: "green",
    };
  }

  if (countdown?.isRiskWindow) {
    return {
      key: "risk",
      label: "En riesgo",
      headline: `${countedPlayers} jugadores`,
      message: "Estamos cerca del partido y aún no llegamos a 12. Agilizar confirmaciones y activar galletas.",
      tone: "rose",
    };
  }

  return {
    key: "onTime",
    label: "A tiempo",
    headline: `${countedPlayers} jugadores`,
    message: "Convocatoria abierta. Todavía hay tiempo para completar el mínimo.",
    tone: "sky",
  };
}

function getRosterActionLabel(status) {
  if (status === "Confirmado") return "se confirmó";
  if (status === "Reserva") return "entró como reserva";
  if (status === "Baja") return "se bajó";
  return "actualizó su estado";
}

const attendancePrompts = [
  "{name}, ¿vas o no hay permiso?",
  "{name}, ¿te da frío o vas a la cancha?",
  "{name}, ¿te duele algo o estás para jugar?",
  "{name}, el equipo pregunta: ¿vas o pollito?",
  "{name}, confirma antes que te ganen el cupo.",
  "{name}, hoy se corre, no se mira desde la casa.",
  "{name}, ¿jugador o comentarista de WhatsApp?",
  "{name}, la pelota no se patea sola. ¿Vas?",
  "{name}, ¿te anotas o mandamos búsqueda?",
  "{name}, ¿hay piernas para el próximo partido?",
  "{name}, sin miedo al éxito: ¿vas?",
  "{name}, la convocatoria está abierta. ¿Te sumas?",
];

function getStablePromptIndex(seed, length) {
  const text = String(seed || "futbolito");
  const hash = text.split("").reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 1), 0);
  return length ? hash % length : 0;
}

function getWeeklyAttendancePrompt(user, matchDate = "2026-04-29") {
  const index = getStablePromptIndex(`${user?.id || user?.userId || user?.name}-${matchDate}`, attendancePrompts.length);
  return attendancePrompts[index].replace("{name}", user?.name || "Jugador");
}

function getAttendanceStateMessage(user, matchDate = "2026-04-29") {
  if (!user) return "Selecciona tu estado para el próximo partido.";
  if (user.confirmation === "Confirmado") return `✅ ${user.name}, estás confirmado para jugar.`;
  if (user.confirmation === "Reserva") return `🐥 ${user.name}, quedaste en reserva. Sumas mientras haya cupo.`;
  if (user.confirmation === "Baja") return `💅🏻 ${user.name}, te bajaste del partido. Puedes volver a confirmar o reservar.`;
  return getWeeklyAttendancePrompt(user, matchDate);
}

function getRosterTimeline(timeline) {
  return [...timeline].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
}

function timeLabel(dateTime) {
  return new Intl.DateTimeFormat("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(dateTime));
}

function getCurrentUserRosterItem(roster, userId = "u1") {
  return roster.find((item) => item.userId === userId) || null;
}

function getVisibleRoster(roster = []) {
  return roster
    .filter((item) => item.confirmation !== "Sin confirmar")
    .sort((a, b) => {
      const orderA = a.arrivalOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.arrivalOrder ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(a.changedAt || 0).getTime() - new Date(b.changedAt || 0).getTime();
    });
}

function getTeamSortedRoster(roster = []) {
  const teamOrder = { Naranjo: 1, Azul: 2, Pendiente: 3, Flexible: 4 };
  return getVisibleRoster(roster).sort((a, b) => {
    const teamA = teamOrder[a.matchTeam] || 9;
    const teamB = teamOrder[b.matchTeam] || 9;
    if (teamA !== teamB) return teamA - teamB;
    return (a.arrivalOrder ?? 999) - (b.arrivalOrder ?? 999);
  });
}

function buildBalancedTeams(roster = []) {
  let workingRoster = normalizeRosterTeams(roster);

  workingRoster = workingRoster.map((item) => {
    const isActive = ["Confirmado", "Reserva"].includes(item.confirmation);
    const needsAssignment = isActive && (item.type === "Galleta" || item.baseTeam === "Flexible") && !["Naranjo", "Azul"].includes(item.matchTeam);
    if (!needsAssignment) return item;

    const team = getSuggestedTeam(workingRoster);
    workingRoster = workingRoster.map((row) => (row.id === item.id ? { ...row, matchTeam: team, assignedBy: "Auto" } : row));
    return { ...item, matchTeam: team, assignedBy: "Auto" };
  });

  return workingRoster;
}

function getTeamBuildExplanation(roster = [], teamsBuilt = false) {
  const balance = getTeamBalance(roster);
  const autoAssigned = roster.filter((item) => item.assignedBy === "Auto").length;

  if (balance.pending > 0) {
    return `${balance.pending} jugadores flexibles/galletas siguen por asignar. El Admin puede usar Auto-asignar o elegir color manualmente.`;
  }

  if (teamsBuilt || autoAssigned > 0) {
    const assignedText = autoAssigned ? `${autoAssigned} flexibles/galletas fueron distribuidos automáticamente` : "Los flexibles/galletas ya fueron distribuidos";
    return `${assignedText} al equipo con menos jugadores. Se mantuvo el número de llegada original.`;
  }

  if (balance.diff <= 1) {
    return "Equipos balanceados. Jugadores con color base mantienen su equipo; flexibles y galletas quedan listos si ya fueron asignados.";
  }

  return `Equipos desbalanceados por ${balance.diff} jugador${balance.diff === 1 ? "" : "es"}. Conviene revisar flexibles o mover algún jugador.`;
}

function markPostMatchDebtors(roster) {
  return roster.map((item) => {
    const shouldPay = ["Confirmado", "Reserva"].includes(item.confirmation);
    return {
      ...item,
      postMatchStatus: shouldPay && item.payment !== "Pagado" ? "Moroso" : item.payment,
    };
  });
}

function getPlayerIndicators(users) {
  const totalDebt = users.reduce((sum, user) => sum + user.debt, 0);
  const totalAttendance = users.reduce((sum, user) => sum + user.attendance, 0);
  const topAttendance = users.reduce((best, user) => (user.attendance > best.attendance ? user : best), users[0]);
  const topScorer = users.reduce((best, user) => (user.goals > best.goals ? user : best), users[0]);
  const mostCancellations = users.reduce((best, user) => (user.cancellations > best.cancellations ? user : best), users[0]);

  return {
    totalDebt,
    avgAttendance: users.length ? totalAttendance / users.length : 0,
    topAttendance,
    topScorer,
    mostCancellations,
  };
}

function getPlayerRankings(users) {
  return users
    .map((user) => ({
      ...user,
      attendanceRate: matches2026.filter((match) => getWinner(match) !== "Pendiente").length ? (user.attendance / matches2026.filter((match) => getWinner(match) !== "Pendiente").length) * 100 : 0,
      goalsPerMatch: user.attendance ? user.goals / user.attendance : 0,
      score: user.goals * 2 + user.attendance * 3 - user.cancellations * 2 - Math.round(user.debt / 1000),
    }))
    .sort((a, b) => b.score - a.score || b.goals - a.goals);
}

function getMatchFinancialSummary(match, roster = []) {
  const activeRoster = roster.filter((item) => item.payment || item.confirmation !== "Baja");
  const paid = activeRoster.filter((item) => item.payment === "Pagado").length;
  const pending = activeRoster.filter((item) => item.payment !== "Pagado").length;

  return {
    paid,
    pending,
    collected: paid * (match.fee || 0),
    expected: activeRoster.length * (match.fee || 0),
  };
}

function filterMatches(matches, filter = "Todos", query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  return matches.filter((match) => {
    const winner = getWinner(match);
    const played = winner !== "Pendiente";
    const resolutionStatus = matchDetails[match.id]?.resolution?.status || "Sin cierre";
    const matchesFilter =
      filter === "Todos" ||
      (filter === "Jugados" && played) ||
      (filter === "Pendientes" && !played) ||
      (filter === "Votación" && resolutionStatus === "Resuelto por votación") ||
      (filter === "Sin diferencias" && resolutionStatus === "Cerrado sin diferencias") ||
      winner === filter;

    const searchableText = [`Fecha ${match.id}`, dateLabel(match.date), winner, resolutionStatus].join(" ").toLowerCase();
    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

    return matchesFilter && matchesQuery;
  });
}

function getResolutionSummary(match) {
  const resolution = matchDetails[match.id]?.resolution;
  if (!resolution) return { status: "Sin cierre", needsVote: false };

  return {
    ...resolution,
    needsVote: resolution.status === "Resuelto por votación",
  };
}

function getCommentsForMatch(match) {
  return matchDetails[match.id]?.comments || [];
}

function getCommentsStatus(match, now = new Date("2026-04-23T12:00:00")) {
  const detail = matchDetails[match.id];
  if (!detail?.commentsOpenUntil) {
    return { isOpen: false, label: "Sin ventana", hoursLeft: 0, commentsCount: 0, highlightedCount: 0 };
  }

  const closesAt = new Date(detail.commentsOpenUntil);
  const diffMs = closesAt.getTime() - now.getTime();
  const hoursLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60)));
  const comments = getCommentsForMatch(match);

  return {
    isOpen: diffMs > 0,
    label: diffMs > 0 ? `Abierto ${hoursLeft}h más` : "Cerrado",
    hoursLeft,
    commentsCount: comments.length,
    highlightedCount: comments.filter((comment) => comment.highlighted).length,
  };
}

function getAnnualCommentsSummary(matches) {
  const comments = matches.flatMap((match) => getCommentsForMatch(match).map((comment) => ({ ...comment, matchId: match.id })));
  const replies = comments.flatMap((comment) => comment.replies || []);
  const highlighted = comments.filter((comment) => comment.highlighted);
  const byPlayer = [...comments, ...replies].reduce((acc, comment) => {
    acc[comment.player] = (acc[comment.player] || 0) + 1;
    return acc;
  }, {});
  const topCommenter = Object.entries(byPlayer).sort((a, b) => b[1] - a[1])[0] || ["Sin datos", 0];

  return {
    total: comments.length,
    replies: replies.length,
    totalWithReplies: comments.length + replies.length,
    highlighted: highlighted.length,
    topCommenter: topCommenter[0],
    topCommenterCount: topCommenter[1],
  };
}

function getPhotosForMatch(match) {
  return matchDetails[match.id]?.photos || [];
}

function getPhotosStatus(match, now = new Date("2026-04-23T12:00:00")) {
  const detail = matchDetails[match.id];
  const photos = getPhotosForMatch(match);

  if (!detail?.photosOpenUntil) {
    return { isOpen: false, label: "Sin ventana", hoursLeft: 0, photosCount: photos.length, limit: 2, canUpload: false, estimatedStorageKb: photos.reduce((sum, photo) => sum + (photo.sizeKb || 0), 0) };
  }

  const closesAt = new Date(detail.photosOpenUntil);
  const diffMs = closesAt.getTime() - now.getTime();
  const hoursLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60)));
  const estimatedStorageKb = photos.reduce((sum, photo) => sum + (photo.sizeKb || 0), 0);

  return {
    isOpen: diffMs > 0,
    label: diffMs > 0 ? `Carga abierta ${hoursLeft}h más` : "Carga cerrada",
    hoursLeft,
    photosCount: photos.length,
    limit: 2,
    canUpload: diffMs > 0 && photos.length < 2,
    estimatedStorageKb,
  };
}

function getAnnualPhotosSummary(matches) {
  const photos = matches.flatMap((match) => getPhotosForMatch(match).map((photo) => ({ ...photo, matchId: match.id })));
  const featured = photos.filter((photo) => photo.featured);
  const estimatedStorageKb = photos.reduce((sum, photo) => sum + (photo.sizeKb || 0), 0);

  return {
    total: photos.length,
    featured: featured.length,
    estimatedStorageKb,
    estimatedStorageMb: estimatedStorageKb / 1024,
  };
}

function getMomentsFeed(matches) {
  return matches
    .filter((match) => getWinner(match) !== "Pendiente")
    .map((match) => {
      const comments = getCommentsForMatch(match);
      const photos = getPhotosForMatch(match);
      return {
        id: `match-${match.id}`,
        match,
        photos,
        winner: getWinner(match),
        comments,
        commentsCount: comments.length,
        repliesCount: comments.reduce((sum, comment) => sum + (comment.replies?.length || 0), 0),
        highlightedComment: comments.find((comment) => comment.highlighted)?.text || comments[0]?.text || "Sin comentarios destacados.",
        featuredPhoto: photos.find((photo) => photo.featured) || photos[0] || null,
        storageKb: photos.reduce((sum, photo) => sum + (photo.sizeKb || 0), 0),
      };
    })
    .filter((item) => item.photos.length > 0 || item.comments.length > 0)
    .sort((a, b) => new Date(b.match.date).getTime() - new Date(a.match.date).getTime());
}

function getRulesByCategory(rules) {
  return rules.reduce((groups, rule) => {
    if (!groups[rule.category]) groups[rule.category] = [];
    groups[rule.category].push(rule);
    return groups;
  }, {});
}

function reconcileGoalReports(goalReport) {
  const totals = goalReport.reports.reduce(
    (acc, report) => {
      const key = report.team === "Naranjo" ? "orange" : "blue";
      acc[key] += report.goals;
      return acc;
    },
    { orange: 0, blue: 0 }
  );

  const orangeDiff = totals.orange - goalReport.officialScore.orange;
  const blueDiff = totals.blue - goalReport.officialScore.blue;
  const hasDiscrepancy = orangeDiff !== 0 || blueDiff !== 0;

  return {
    totals,
    orangeDiff,
    blueDiff,
    hasDiscrepancy,
    status: hasDiscrepancy ? "Requiere votación Admin" : "Cuadrado",
  };
}

function getChartPoints(values, width = 560, height = 230, padding = 30) {
  const maxValue = Math.max(...values, 1);
  const step = values.length > 1 ? (width - padding * 2) / (values.length - 1) : 0;

  return values.map((value, index) => {
    const x = padding + index * step;
    const y = height - padding - (value / maxValue) * (height - padding * 2);
    return { x, y, value };
  });
}

function pointsToString(points) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

function assertEqual(actual, expected, message) {
  console.assert(Object.is(actual, expected), `${message} Esperado: ${expected}. Recibido: ${actual}.`);
}

function runSelfTests() {
  const stats = calculateStats(matches2026);
  const emptyStats = calculateStats([]);

  assertEqual(stats.played.length, 8, "Debe haber 8 partidos jugados en 2026.");
  assertEqual(stats.pending, 4, "Debe haber 4 partidos pendientes.");
  assertEqual(stats.orangeWins, 7, "Naranjo debe tener 7 partidos ganados.");
  assertEqual(stats.blueWins, 1, "Azul debe tener 1 partido ganado.");
  assertEqual(stats.draws, 0, "No debe haber empates en 2026.");
  assertEqual(stats.orangeGoals, 75, "Naranjo debe tener 75 goles.");
  assertEqual(stats.blueGoals, 60, "Azul debe tener 60 goles.");
  assertEqual(stats.totalGoals, 135, "Debe haber 135 goles totales.");
  assertEqual(Math.round(stats.avgGoals * 10) / 10, 16.9, "El promedio de goles debe ser 16,9.");
  assertEqual(Math.round(stats.avgPlayers * 10) / 10, 13.5, "El promedio de jugadores debe ser 13,5.");
  assertEqual(stats.weeklyBalance, 64000, "El saldo semanal acumulado debe ser $64.000.");
  assertEqual(stats.bbqBalance, 85000, "El saldo total para asado debe ser $85.000 incluyendo fondo inicial.");
  assertEqual(getWinner(matches2026[0]), "Naranjo", "El primer partido debe ganarlo Naranjo.");
  assertEqual(getWinner(matches2026[6]), "Azul", "El séptimo partido debe ganarlo Azul.");
  assertEqual(getWinner(matches2026[8]), "Pendiente", "El noveno partido debe quedar pendiente.");
  assertEqual(stats.records.bestStreak.team, "Naranjo", "La mejor racha debe ser de Naranjo.");
  assertEqual(stats.records.bestStreak.count, 6, "La mejor racha debe ser de 6 partidos.");
  assertEqual(stats.records.currentStreak.team, "Naranjo", "La racha actual debe ser de Naranjo.");
  assertEqual(stats.records.currentStreak.count, 1, "La racha actual debe ser de 1 partido.");
  assertEqual(stats.records.highestScoring.id, 2, "El partido con más goles debe ser la fecha 2.");
  assertEqual(stats.records.highestScoring.totalGoals, 23, "La fecha 2 debe tener 23 goles.");
  assertEqual(stats.records.biggestWin.id, 2, "La mayor goleada debe ser la fecha 2.");
  assertEqual(stats.records.biggestWin.diff, 7, "La mayor goleada debe tener diferencia de 7.");
  assertEqual(stats.records.closestMatch.id, 1, "El partido más apretado debe ser la fecha 1.");
  assertEqual(stats.records.bestSingleTeamScore.team, "Naranjo", "El mayor marcador individual debe ser de Naranjo.");
  assertEqual(stats.records.bestSingleTeamScore.goals, 15, "El mayor marcador individual debe ser 15 goles.");
  assertEqual(stats.records.highestBalanceMatches.length, 2, "Deben existir 2 fechas con mayor saldo semanal.");
  assertEqual(stats.latestMatch.id, 8, "El último partido jugado debe ser la fecha 8.");
  assertEqual(getWinner(stats.latestMatch), "Naranjo", "El último partido jugado debe ganarlo Naranjo.");
  const standings = getPeriodStandings();
  assertEqual(standings["2026"][0].team, "Naranjo", "Naranjo debe liderar la tabla 2026.");
  assertEqual(standings["2026"][0].pts, 21, "Naranjo debe tener 21 puntos en 2026.");
  assertEqual(standings["2026"][1].pts, 3, "Azul debe tener 3 puntos en 2026.");
  assertEqual(standings.Global[0].pj, 54, "La tabla global debe tener 54 partidos jugados.");
  assertEqual(standings["2026"][0].goals, 75, "Naranjo debe tener 75 goles en tabla 2026.");
  assertEqual(Math.round(standings["2026"][0].avgGoals * 10) / 10, 9.4, "Naranjo debe promediar 9,4 goles por partido en 2026.");
  assertEqual(Math.round(standings["2026"][0].goalsPercent), 56, "Naranjo debe tener aproximadamente 56% de los goles 2026.");
  assertEqual(emptyStats.played.length, 0, "Sin partidos, no debe haber jugados.");
  assertEqual(emptyStats.records.highestBalanceMatches.length, 0, "Sin partidos, no debe haber saldo máximo.");
  const rosterStats = getRosterStats(nextMatchRoster, "2026-04-29", new Date("2026-04-28T10:00:00"));
  assertEqual(rosterStats.confirmed, 4, "Debe haber 4 confirmados incluyendo galletas, dejando a Elías sin confirmar.");
  assertEqual(rosterStats.reserve, 1, "Debe haber 1 jugador en reserva.");
  assertEqual(rosterStats.guests, 2, "Debe haber 2 jugadores galletas.");
  assertEqual(rosterStats.pendingPayment, 3, "Debe haber 3 pagos pendientes activos.");
  assertEqual(rosterStats.effectiveReserve, 1, "La reserva debe sumar mientras existan cupos disponibles.");
  assertEqual(rosterStats.countedPlayers, 5, "Debe haber 5 jugadores considerados contando 4 confirmados y 1 reserva.");
  assertEqual(rosterStats.missingForIdeal, 9, "Deben faltar 9 jugadores para llegar al ideal de 14 contando reservas efectivas.");
  assertEqual(rosterStats.missingForMinimum, 7, "Deben faltar 7 jugadores para llegar al mínimo de 12 contando reservas efectivas.");
  assertEqual(rosterStats.statusLabel, "En riesgo", "El martes con menos de 12 considerados el partido debe estar en riesgo.");
  assertEqual(rosterStats.matchState.key, "risk", "En ventana de riesgo y bajo 12 jugadores debe ser estado risk.");
  const fullRosterWithReserve = [
    ...Array.from({ length: 14 }, (_, index) => ({ id: `c${index}`, confirmation: "Confirmado", payment: "Pendiente", type: "Jugador" })),
    { id: "reserve-overflow", confirmation: "Reserva", payment: "Pendiente", type: "Jugador" },
  ];
  const fullRosterStats = getRosterStats(fullRosterWithReserve, "2026-04-29", new Date("2026-04-28T10:00:00"));
  assertEqual(fullRosterStats.countedPlayers, 14, "Con 14 confirmados, la reserva no debe sumar sobre el cupo ideal.");
  assertEqual(fullRosterStats.effectiveReserve, 0, "Con cupo completo, la reserva queda en espera.");
  assertEqual(fullRosterStats.reserveWaiting, 1, "Debe existir 1 reserva en espera cuando el cupo está completo.");
  assertEqual(fullRosterStats.matchState.key, "dream", "Con 14 confirmados y reservas debe ser estado alta convocatoria.");
  assertEqual(getMatchConvocationState({ countedPlayers: 10, reserveWaiting: 0, countdown: getMatchCountdown("2026-04-29", new Date("2026-04-24T10:00:00")) }).key, "onTime", "Con menos de 12 antes del martes debe estar a tiempo.");
  assertEqual(getMatchConvocationState({ countedPlayers: 10, reserveWaiting: 0, countdown: getMatchCountdown("2026-04-29", new Date("2026-04-28T10:00:00")) }).key, "risk", "Con menos de 12 el martes debe estar en riesgo.");
  assertEqual(getMatchConvocationState({ countedPlayers: 12, reserveWaiting: 0 }).key, "playable", "Con 12 jugadores debe estar confirmado.");
  assertEqual(getMatchConvocationState({ countedPlayers: 14, reserveWaiting: 0 }).key, "ideal", "Con 14 jugadores debe estar ideal.");
  assertEqual(getRosterStats(rosterScenarios.risk.roster, "2026-04-29", new Date(rosterScenarios.risk.now)).matchState.key, "risk", "Escenario Riesgo debe mostrar estado risk.");
  assertEqual(getRosterStats(rosterScenarios.onTime.roster, "2026-04-29", new Date(rosterScenarios.onTime.now)).matchState.key, "onTime", "Escenario A tiempo debe mostrar estado onTime.");
  assertEqual(getRosterStats(rosterScenarios.playable.roster, "2026-04-29", new Date(rosterScenarios.playable.now)).matchState.key, "playable", "Escenario Confirmado debe mostrar estado playable.");
  assertEqual(getRosterStats(rosterScenarios.ideal.roster, "2026-04-29", new Date(rosterScenarios.ideal.now)).matchState.key, "ideal", "Escenario Confirmado 14 debe mostrar estado ideal.");
  assertEqual(getRosterStats(rosterScenarios.dream.roster, "2026-04-29", new Date(rosterScenarios.dream.now)).matchState.key, "dream", "Escenario Alta convocatoria debe mostrar estado dream.");
  assertEqual(getRosterStats(rosterScenarios.mixed14.roster, "2026-04-29", new Date(rosterScenarios.mixed14.now)).countedPlayers, 14, "Escenario 14 mixtos debe tener 14 considerados.");
  assertEqual(getTeamBalance(rosterScenarios.mixed14.roster).pending, 6, "Escenario 14 mixtos debe partir con 6 por asignar entre flexibles y galletas.");
  assertEqual(getTeamBalance(buildBalancedTeams(rosterScenarios.mixed14.roster)).pending, 0, "Armar equipos en 14 mixtos debe dejar 0 por asignar.");
  assertEqual(initialNextMatchTimeline.length, 15, "La timeline simulada debe tener 15 movimientos.");
  assertEqual(getRosterTimeline(initialNextMatchTimeline)[0].id, "t15", "La timeline debe mostrar primero el movimiento más reciente.");
  assertEqual(getCurrentUserRosterItem(nextMatchRoster, "u1").name, "Elías", "El usuario actual de ejemplo debe ser Elías.");
  assertEqual(getCurrentUserRosterItem(nextMatchRoster, "u1").confirmation, "Sin confirmar", "Elías debe partir sin botón activo.");
  assertEqual(getVisibleRoster(nextMatchRoster).some((item) => item.confirmation === "Sin confirmar"), false, "La nómina visible no debe incluir jugadores sin confirmar.");
  assertEqual(getVisibleRoster(nextMatchRoster)[0].arrivalOrder, 2, "La nómina visible debe respetar el orden de llegada después de excluir sin confirmar.");
  const balancedRoster = buildBalancedTeams(nextMatchRoster);
  assertEqual(getTeamBalance(balancedRoster).pending, 0, "Armar equipos debe asignar todos los flexibles/galletas pendientes.");
  assertEqual(getTeamSortedRoster(balancedRoster)[0].matchTeam, "Naranjo", "La nómina armada debe ordenar primero por Naranjo.");
  assertEqual(getAttendanceStateMessage(getCurrentUserRosterItem(nextMatchRoster, "u1")), getWeeklyAttendancePrompt(getCurrentUserRosterItem(nextMatchRoster, "u1")), "El mensaje inicial debe usar una frase dinámica semanal.");
  assertEqual(attendancePrompts.length >= 10, true, "Deben existir al menos 10 frases dinámicas de convocatoria.");
  const postMatchRoster = markPostMatchDebtors(nextMatchRoster);
  assertEqual(postMatchRoster.filter((item) => item.postMatchStatus === "Moroso").length, 3, "Luego del partido deben aparecer 3 morosos.");
  const goalReconciliation = reconcileGoalReports(goalReportsExample);
  assertEqual(goalReconciliation.hasDiscrepancy, true, "Debe existir descuadre de goles.");
  assertEqual(goalReconciliation.totals.orange, 9, "La suma reportada de Naranjo debe ser 9.");
  assertEqual(goalReconciliation.totals.blue, 6, "La suma reportada de Azul debe ser 6.");
  assertEqual(goalReconciliation.orangeDiff, 2, "Naranjo debe tener 2 goles de diferencia contra el marcador oficial.");
  const rankings = getPlayerRankings(players);
  assertEqual(rankings[0].name, "Elías", "Elías debe liderar el ranking de jugadores de ejemplo.");
  const matchFinance = getMatchFinancialSummary(matches2026[7], matchDetails[8].roster);
  assertEqual(matchFinance.pending, 2, "La fecha 8 debe tener 2 pagos pendientes en el detalle de ejemplo.");
  assertEqual(filterMatches(matches2026, "Jugados").length, 8, "El filtro Jugados debe mostrar 8 partidos.");
  assertEqual(filterMatches(matches2026, "Pendientes").length, 4, "El filtro Pendientes debe mostrar 4 partidos.");
  assertEqual(filterMatches(matches2026, "Azul").length, 1, "El filtro Azul debe mostrar 1 partido ganado por Azul.");
  assertEqual(filterMatches(matches2026, "Votación").length, 1, "El filtro Votación debe mostrar 1 partido resuelto por votación.");
  assertEqual(filterMatches(matches2026, "Sin diferencias").length, 1, "El filtro Sin diferencias debe mostrar 1 partido cerrado sin diferencias.");
  assertEqual(getResolutionSummary(matches2026[7]).status, "Resuelto por votación", "La fecha 8 debe estar resuelta por votación.");
  assertEqual(getResolutionSummary(matches2026[6]).status, "Cerrado sin diferencias", "La fecha 7 debe estar cerrada sin diferencias.");
  assertEqual(filterMatches(matches2026, "Todos", "fecha 8")[0].id, 8, "La búsqueda por fecha 8 debe encontrar el partido 8.");
  assertEqual(getCommentsStatus(matches2026[7]).isOpen, true, "La zona de comentarios de fecha 8 debe estar abierta en el ejemplo.");
  assertEqual(getCommentsStatus(matches2026[6]).isOpen, false, "La zona de comentarios de fecha 7 debe estar cerrada en el ejemplo.");
  assertEqual(getCommentsForMatch(matches2026[7]).length, 3, "La fecha 8 debe tener 3 comentarios.");
  assertEqual(getAnnualCommentsSummary(matches2026).total, 5, "El resumen anual debe contar 5 comentarios principales de ejemplo.");
  assertEqual(getAnnualCommentsSummary(matches2026).replies, 4, "El resumen anual debe contar 4 respuestas de ejemplo.");
  assertEqual(getAnnualCommentsSummary(matches2026).totalWithReplies, 9, "El resumen anual debe contar 9 interacciones totales de ejemplo.");
  assertEqual(getPhotosForMatch(matches2026[7]).length, 2, "La fecha 8 debe tener 2 fotos como máximo.");
  assertEqual(getPhotosStatus(matches2026[7]).canUpload, false, "La fecha 8 no debe permitir más fotos porque ya tiene 2.");
  assertEqual(getPhotosStatus(matches2026[6]).isOpen, false, "La carga de fotos de fecha 7 debe estar cerrada.");
  assertEqual(getAnnualPhotosSummary(matches2026).total, 3, "El resumen anual debe contar 3 fotos de ejemplo.");
  assertEqual(Math.round(getAnnualPhotosSummary(matches2026).estimatedStorageKb), 780, "El almacenamiento estimado de fotos debe ser 780 KB.");
  assertEqual(getMomentsFeed(matches2026).length, 2, "El feed de momentos debe tener 2 publicaciones de partido de ejemplo.");
  assertEqual(getMomentsFeed(matches2026)[0].match.id, 8, "El primer momento debe corresponder a la fecha 8.");
  assertEqual(getMomentsFeed(matches2026)[0].photos.length, 2, "La publicación de la fecha 8 debe mostrar 2 fotos en la misma tarjeta.");
  assertEqual(getMomentsFeed(matches2026)[0].comments.length, 3, "La publicación de la fecha 8 debe mostrar todos sus comentarios principales.");
  assertEqual(getAvailableYears().length, 3, "Deben existir 3 opciones de visualización de año.");
  assertEqual(getSeasonPeriod("2025").played, 46, "El año 2025 debe tener 46 partidos acumulados.");
  assertEqual(calculateStatsForYear("Global").totalGoals, 900, "El global debe tener 900 goles totales acumulados.");
  assertEqual(futbolitoRules.length, 6, "Deben existir 6 reglas base de ejemplo.");
  assertEqual(getRulesByCategory(futbolitoRules)["Cupos y reservas"].length, 1, "Debe existir una regla de cupos y reservas.");
}

runSelfTests();

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-slate-200/70 bg-white/95 shadow-[0_8px_24px_rgba(15,23,42,0.045)] ${className}`}>
      {children}
    </div>
  );
}

function Button({ children, active = false, className = "", ...props }) {
  const baseClasses = "rounded-xl px-3.5 py-2 text-sm font-medium transition active:scale-[0.99]";
  const stateClasses = active
    ? "bg-[#12394a] text-white shadow-sm"
    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50";

  return (
    <button className={`${baseClasses} ${stateClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Kpi({ icon, label, value, note, tone = "slate", onClick, linkLabel }) {
  const tones = {
    orange: "bg-orange-50 text-orange-600 ring-orange-100",
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    purple: "bg-violet-50 text-violet-700 ring-violet-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    slate: "bg-slate-50 text-slate-700 ring-slate-100",
  };

  const content = (
    <>
      <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full text-lg ring-1 ${tones[tone]}`} aria-hidden="true">
        {icon}
      </div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      {note ? <p className="mt-1 text-[11px] text-slate-500">{note}</p> : null}
      {linkLabel ? <p className="mt-2 text-[11px] font-semibold text-[#1E5566]">{linkLabel}</p> : null}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full rounded-2xl border border-slate-200/70 bg-white/95 p-3.5 text-center shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md">
        {content}
      </button>
    );
  }

  return <Card className="p-3.5 text-center">{content}</Card>;
}

function Header({ eyebrow, title, text }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{title}</h2>
      <div className="mt-2 h-0.5 w-10 rounded-full bg-orange-500" />
      <p className="mt-2 max-w-2xl text-sm text-slate-500">{text}</p>
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="text-lg" aria-hidden="true">{icon}</span>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    </div>
  );
}

function SimpleLineChart({ data }) {
  const orangeValues = data.map((item) => item.orange);
  const blueValues = data.map((item) => item.blue);
  const allValues = [...orangeValues, ...blueValues];
  const maxValue = Math.max(...allValues, 1);
  const width = 560;
  const height = 230;
  const orangePoints = getChartPoints(orangeValues, width, height);
  const bluePoints = getChartPoints(blueValues, width, height);

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-60 min-w-[560px] w-full" role="img" aria-label="Gráfico de goles por partido">
        {[0, 1, 2, 3, 4].map((line) => {
          const y = 30 + line * 44;
          return <line key={line} x1="30" x2="530" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />;
        })}

        <polyline points={pointsToString(orangePoints)} fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={pointsToString(bluePoints)} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {orangePoints.map((point, index) => (
          <g key={`orange-${index}`}>
            <circle cx={point.x} cy={point.y} r="4" fill="#f97316" />
            <text x={point.x} y={point.y - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">{point.value}</text>
          </g>
        ))}

        {bluePoints.map((point, index) => (
          <g key={`blue-${index}`}>
            <circle cx={point.x} cy={point.y} r="4" fill="#2563eb" />
            <text x={point.x} y={point.y + 18} textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">{point.value}</text>
          </g>
        ))}

        {data.map((item, index) => {
          const point = orangePoints[index];
          return <text key={item.id} x={point.x} y="218" textAnchor="middle" fontSize="10" fill="#64748b">F{item.id}</text>;
        })}

        <text x="34" y="18" fontSize="10" fill="#64748b">Máx. {maxValue} goles</text>
      </svg>

      <div className="mt-2 flex items-center gap-4 text-xs text-slate-600">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-orange-500" /> Naranjo</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> Azul</span>
      </div>
    </div>
  );
}

function BalanceAreaChart({ data, startingBalance }) {
  const cumulative = data.reduce((items, match) => {
    const previous = items.length ? items[items.length - 1].value : startingBalance;
    return [...items, { id: match.id, value: previous + (match.balance || 0) }];
  }, []);

  const values = cumulative.map((item) => item.value);
  const width = 560;
  const height = 230;
  const points = getChartPoints(values, width, height, 34);
  const areaPoints = points.length ? `${pointsToString(points)} ${points[points.length - 1].x},205 ${points[0].x},205` : "";

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-60 min-w-[560px] w-full" role="img" aria-label="Gráfico de saldo acumulado del asado">
        <defs>
          <linearGradient id="balanceFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4].map((line) => {
          const y = 34 + line * 42;
          return <line key={line} x1="34" x2="530" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />;
        })}

        {points.length ? <polygon points={areaPoints} fill="url(#balanceFill)" /> : null}
        {points.length ? <polyline points={pointsToString(points)} fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /> : null}

        {points.map((point, index) => (
          <g key={cumulative[index].id}>
            <circle cx={point.x} cy={point.y} r="4" fill="#16a34a" />
            <text x={point.x} y={point.y - 11} textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534">{money(cumulative[index].value)}</text>
            <text x={point.x} y="218" textAnchor="middle" fontSize="10" fill="#64748b">F{cumulative[index].id}</text>
          </g>
        ))}
      </svg>

      <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Saldo acumulado
      </div>
    </div>
  );
}

function SimpleBarChart({ data }) {
  const maxValue = Math.max(...data.map((item) => item.balance || 0), 1);

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const percent = Math.round(((item.balance || 0) / maxValue) * 100);
        return (
          <div key={item.id} className="grid grid-cols-[48px_1fr_90px] items-center gap-3 text-sm">
            <span className="font-medium text-slate-600">F{item.id}</span>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-orange-500" style={{ width: `${percent}%` }} />
            </div>
            <span className="text-right font-semibold text-slate-700">{money(item.balance)}</span>
          </div>
        );
      })}
    </div>
  );
}

function RecordCard({ icon, title, main, detail, tone = "orange", onClick }) {
  const tones = {
    orange: "bg-orange-50/70 border-orange-100 text-orange-600",
    blue: "bg-blue-50/70 border-blue-100 text-blue-600",
    green: "bg-emerald-50/70 border-emerald-100 text-emerald-700",
    amber: "bg-amber-50/70 border-amber-100 text-amber-700",
  };

  const content = (
    <Card className={`p-4 ${tones[tone]} ${onClick ? "cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/75 text-2xl ring-1 ring-white" aria-hidden="true">{icon}</div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
          <p className="mt-1 truncate text-xl font-bold leading-none text-slate-900">{main}</p>
          <p className="mt-1.5 text-xs text-slate-500">{detail}</p>
          {onClick ? <p className="mt-2 text-[11px] font-semibold text-[#1E5566]">Abrir detalle</p> : null}
        </div>
      </div>
    </Card>
  );

  if (!onClick) return content;

  return (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={(event) => { if (event.key === "Enter") onClick(); }}>
      {content}
    </div>
  );
}

function TeamPill({ team }) {
  const styles = {
    Naranjo: "bg-orange-50 text-orange-700",
    Azul: "bg-blue-50 text-blue-700",
    Flexible: "bg-slate-100 text-slate-600",
    Pendiente: "bg-slate-100 text-slate-500",
    "Sin equipo": "bg-slate-100 text-slate-500",
  };

  const dots = {
    Naranjo: "bg-orange-500",
    Azul: "bg-blue-600",
    Flexible: "bg-slate-400",
    Pendiente: "bg-slate-300",
    "Sin equipo": "bg-slate-300",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[team] || "bg-slate-100 text-slate-600"}`}>
      <span className={`h-2 w-2 rounded-full ${dots[team] || "bg-slate-400"}`} />
      {team}
    </span>
  );
}

function MiniStandingsCard({ title, rows, compact = false }) {
  const leader = getLeaderLabel(rows);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Tabla</p>
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
        </div>
        <TeamPill team={leader} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2 text-left">Equipo</th>
              <th className="px-2 py-2 text-right">PJ</th>
              <th className="px-2 py-2 text-right">PG</th>
              <th className="px-2 py-2 text-right">PE</th>
              <th className="px-2 py-2 text-right">PP</th>
              <th className="px-2 py-2 text-right">Goles</th>
              {!compact ? <th className="px-2 py-2 text-right">Prom.</th> : null}
              {!compact ? <th className="px-2 py-2 text-right">% Goles</th> : null}
              <th className="px-4 py-2 text-right">PTS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.team} className="border-t border-slate-100">
                <td className="px-4 py-3 font-semibold"><TeamPill team={row.team} /></td>
                <td className="px-2 py-3 text-right text-slate-700">{row.pj}</td>
                <td className="px-2 py-3 text-right text-slate-700">{row.pg}</td>
                <td className="px-2 py-3 text-right text-slate-700">{row.pe}</td>
                <td className="px-2 py-3 text-right text-slate-700">{row.pp}</td>
                <td className="px-2 py-3 text-right font-semibold text-slate-900">{row.goals}</td>
                {!compact ? <td className="px-2 py-3 text-right text-slate-700">{formatNumber(row.avgGoals)}</td> : null}
                {!compact ? <td className="px-2 py-3 text-right text-slate-700">{formatNumber(row.goalsPercent, 0)}%</td> : null}
                <td className="px-4 py-3 text-right font-bold text-slate-900">{row.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function LastMatchPulse({ match, onOpen }) {
  if (!match) return null;

  const winner = getWinner(match);
  const diff = Math.abs(match.orange - match.blue);

  return (
    <Card className="min-h-[170px] overflow-hidden bg-gradient-to-br from-slate-900 to-[#1E5566] p-4 text-white">
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[1fr_160px] md:items-center">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100">Último partido</p>
          <h3 className="mt-1 text-lg font-bold leading-tight md:text-xl">Fecha {match.id}: Naranjo vs Azul</h3>
          <p className="mt-2 max-w-xl text-sm leading-snug text-cyan-50/85">
            Ganó <b>{winner}</b> por {diff} {diff === 1 ? "gol" : "goles"}. La tabla 2026 se mueve y Naranjo queda con ventaja fuerte.
          </p>
          {onOpen ? (
            <button onClick={onOpen} className="mt-3 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20">
              Ver detalle del partido
            </button>
          ) : null}
        </div>

        <div className="flex h-full min-h-[112px] flex-col items-center justify-center rounded-2xl bg-white/10 px-4 py-3 text-center ring-1 ring-white/15">
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-50/80">Resultado</p>
          <div className="mt-2 grid w-full grid-cols-[1fr_auto_1fr] items-baseline gap-2">
            <span className="text-right text-4xl font-black leading-none text-orange-300 tabular-nums">{match.orange}</span>
            <span className="text-xl font-bold leading-none text-white/70">-</span>
            <span className="text-left text-4xl font-black leading-none text-sky-300 tabular-nums">{match.blue}</span>
          </div>
          <div className="mt-2 grid w-full grid-cols-2 gap-2 text-[10px] font-semibold uppercase tracking-wide text-cyan-50/70">
            <span>Naranjo</span>
            <span>Azul</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function NextMatchCompact({ onOpen }) {
  const [roster, setRoster] = useState(nextMatchRoster);
  const currentUserId = "u1";
  const nextMatch = matches2026.find((match) => getWinner(match) === "Pendiente");
  const currentUser = getCurrentUserRosterItem(roster, currentUserId);
  const stats = getRosterStats(roster, nextMatch?.date || "2026-04-29", new Date("2026-04-27T10:00:00"));

  function quickConfirm(value) {
    if (!currentUser) return;
    if (currentUser.confirmation === value) return;
    setRoster((items) => items.map((item) => (item.id === currentUser.id ? { ...item, confirmation: value, changedAt: "2026-04-29T11:05:00" } : item)));
  }

  return (
    <Card className="min-h-[170px] overflow-hidden p-4">
      <div className="flex h-full flex-col justify-between gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Próximo partido</p>
              <StatusBadge value={stats.statusLabel} />
            </div>
            <h3 className="mt-1 text-lg font-bold leading-tight text-slate-900 md:text-xl">{nextMatch ? `Fecha ${nextMatch.id} · ${dateLabel(nextMatch.date)}` : "Por definir"}</h3>
            <p className={`mt-1 max-w-[390px] text-sm font-medium ${currentUser?.confirmation === "Confirmado" ? "text-emerald-700" : currentUser?.confirmation === "Reserva" ? "text-amber-700" : currentUser?.confirmation === "Baja" ? "text-red-700" : "text-slate-500"}`}>
              {getAttendanceStateMessage(currentUser, nextMatch?.date)}
            </p>
          </div>
          <Button onClick={onOpen} className="shrink-0 whitespace-nowrap px-3 py-1.5 text-xs">Abrir</Button>
        </div>

        <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-slate-100 bg-slate-50/60 p-2">
          <AttendanceChoice status="Confirmado" active={currentUser?.confirmation === "Confirmado"} onClick={() => quickConfirm("Confirmado")} />
          <AttendanceChoice status="Reserva" active={currentUser?.confirmation === "Reserva"} onClick={() => quickConfirm("Reserva")} />
          <AttendanceChoice status="Baja" active={currentUser?.confirmation === "Baja"} onClick={() => quickConfirm("Baja")} disabled={!(currentUser?.confirmation === "Confirmado" || currentUser?.confirmation === "Reserva")} />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-500">
            <span><b className="text-slate-800">{stats.countedPlayers}/{stats.idealPlayers}</b> considerados</span>
            <span>⏱ {stats.countdown?.label || "—"}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-emerald-400" style={{ width: `${stats.progressPercent}%` }} />
          </div>
        </div>
      </div>
    </Card>
  );
}

function AttendanceChoice({ status, active, onClick, disabled = false }) {
  const config = {
    Confirmado: {
      label: "Voy",
      icon: "",
      className: active
        ? "border-emerald-200 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
        : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100",
    },
    Reserva: {
      label: "Reserva",
      icon: "",
      className: active
        ? "border-amber-200 bg-amber-50 text-amber-700 ring-1 ring-amber-200"
        : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100",
    },
    Baja: {
      label: "Me bajo",
      icon: "",
      className: active
        ? "border-red-200 bg-red-50 text-red-700 ring-1 ring-red-200"
        : disabled
          ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300"
          : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100",
    },
  };

  const option = config[status];

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`flex h-8 min-w-0 items-center justify-center gap-1 rounded-full border px-3 text-[11px] font-semibold leading-none shadow-sm transition ${option.className}`}
      title={option.label}
      aria-pressed={active}
    >
      {option.icon ? <span aria-hidden="true">{option.icon}</span> : null}
      <span className="truncate">{option.label}</span>
    </button>
  );
}

function CuposCard({ stats }) {
  const state = stats.matchState || getMatchConvocationState({
    countedPlayers: stats.countedPlayers,
    reserveWaiting: stats.reserveWaiting,
    minimumPlayers: stats.minimumPlayers,
    idealPlayers: stats.idealPlayers,
    countdown: stats.countdown,
  });

  const tones = {
    rose: {
      bg: "bg-rose-50/55",
      ring: "ring-rose-100",
      text: "text-rose-700",
      bar: "bg-rose-400",
      badge: "bg-rose-50 text-rose-700 ring-rose-100",
    },
    sky: {
      bg: "bg-sky-50/55",
      ring: "ring-sky-100",
      text: "text-sky-700",
      bar: "bg-sky-400",
      badge: "bg-sky-50 text-sky-700 ring-sky-100",
    },
    amber: {
      bg: "bg-amber-50/55",
      ring: "ring-amber-100",
      text: "text-amber-700",
      bar: "bg-amber-400",
      badge: "bg-amber-50 text-amber-700 ring-amber-100",
    },
    green: {
      bg: "bg-emerald-50/55",
      ring: "ring-emerald-100",
      text: "text-emerald-700",
      bar: "bg-emerald-400",
      badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    },
    emerald: {
      bg: "bg-teal-50/60",
      ring: "ring-teal-100",
      text: "text-teal-700",
      bar: "bg-teal-400",
      badge: "bg-teal-50 text-teal-700 ring-teal-100",
    },
  };

  const current = tones[state.tone] || tones.amber;
  const countdownLabel = stats.countdown?.label || "—";

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className={`rounded-2xl px-3 py-3 ring-1 ${current.bg} ${current.ring}`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Partido</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${current.badge}`}>{state.label}</span>
              <span className="rounded-full bg-white/75 px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-white/80">⏱ {countdownLabel}</span>
            </div>
            <p className={`mt-1 text-xl font-black leading-tight ${current.text}`}>{state.headline}</p>
            <p className="mt-1 text-xs leading-snug text-slate-600">{state.message}</p>
          </div>

          <div className="shrink-0 rounded-2xl bg-white/75 px-3 py-2 text-center ring-1 ring-white/80">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Faltan</p>
            <p className={`mt-0.5 text-2xl font-black leading-none tabular-nums ${current.text}`}>{stats.missingForIdeal}</p>
          </div>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/80">
          <div className={`h-full rounded-full ${current.bar}`} style={{ width: `${stats.progressPercent}%` }} />
        </div>
      </div>
    </div>
  );
}

function TeamBalanceCard({ roster, isAdmin, onAssign, teamsBuilt = false }) {
  const balance = getTeamBalance(roster);
  const suggested = getSuggestedTeam(roster);
  const explanation = getTeamBuildExplanation(roster, teamsBuilt);
  const statusTone = balance.pending > 0 ? "bg-amber-50 text-amber-700 ring-amber-100" : balance.diff <= 1 ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : "bg-rose-50 text-rose-700 ring-rose-100";

  function autoAssignPending() {
    if (!isAdmin || !onAssign) return;
    let localRoster = normalizeRosterTeams(roster);

    roster.forEach((item) => {
      const isActive = ["Confirmado", "Reserva"].includes(item.confirmation);
      if (!isActive) return;

      if (item.type !== "Galleta" && item.baseTeam !== "Flexible" && !["Naranjo", "Azul"].includes(item.matchTeam) && ["Naranjo", "Azul"].includes(item.baseTeam)) {
        onAssign(item.id, item.baseTeam);
        localRoster = localRoster.map((row) => (row.id === item.id ? { ...row, matchTeam: item.baseTeam } : row));
        return;
      }

      if ((item.type === "Galleta" || item.baseTeam === "Flexible") && !["Naranjo", "Azul"].includes(item.matchTeam)) {
        const team = getSuggestedTeam(localRoster);
        onAssign(item.id, team);
        localRoster = localRoster.map((row) => (row.id === item.id ? { ...row, matchTeam: team } : row));
      }
    });
  }

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Balance equipos</p>
          <h3 className="text-base font-bold text-slate-900">Equipo del partido</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusTone}`}>{balance.label}</span>
          {isAdmin && balance.pending > 0 ? <Button onClick={autoAssignPending} className="px-3 py-1.5 text-xs">Auto-asignar</Button> : null}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-2xl bg-orange-50 p-3 ring-1 ring-orange-100">
          <p className="text-2xl font-black text-orange-700">{balance.orange}</p>
          <p className="text-xs font-semibold text-orange-700">Naranjo</p>
        </div>
        <div className="rounded-2xl bg-blue-50 p-3 ring-1 ring-blue-100">
          <p className="text-2xl font-black text-blue-700">{balance.blue}</p>
          <p className="text-xs font-semibold text-blue-700">Azul</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
          <p className="text-2xl font-black text-slate-700">{balance.pending}</p>
          <p className="text-xs font-semibold text-slate-600">Por asignar</p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-xs leading-snug text-slate-600 ring-1 ring-slate-100">
        <p><b>Criterio:</b> color base se respeta. Flexibles y galletas se asignan al equipo con menos jugadores. Sugerido próximo: <b>{suggested}</b>.</p>
        <p className="mt-1 text-slate-500">{explanation}</p>
      </div>
    </Card>
  );
}

function RosterMiniCard({ icon, label, value, note, tone = "slate" }) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    blue: "bg-sky-50 text-sky-700 ring-sky-100",
    yellow: "bg-amber-50 text-amber-700 ring-amber-100",
    orange: "bg-orange-50 text-orange-700 ring-orange-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    slate: "bg-slate-50 text-slate-700 ring-slate-100",
  };

  return (
    <Card className="p-3">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ring-1 ${tones[tone]}`} aria-hidden="true">{icon}</div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-0.5 text-xl font-bold leading-none text-slate-900">{value}</p>
          {note ? <p className="mt-1 truncate text-xs text-slate-500">{note}</p> : null}
        </div>
      </div>
    </Card>
  );
}

function RosterTimeline({ timeline }) {
  const [expanded, setExpanded] = useState(false);
  const ordered = getRosterTimeline(timeline);
  const visible = expanded ? ordered : ordered.slice(0, 6);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-3 py-2">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Movimientos</p>
          <h3 className="truncate text-sm font-bold text-slate-900">Timeline confirmaciones</h3>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200">{ordered.length}</span>
          {ordered.length > 6 ? (
            <button onClick={() => setExpanded((value) => !value)} className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-[#1E5566] ring-1 ring-sky-100 hover:bg-sky-50">
              {expanded ? "Contraer" : "Ver todo"}
            </button>
          ) : null}
        </div>
      </div>

      <div className={`${expanded ? "max-h-[220px] overflow-y-auto" : ""}`}>
        {visible.map((event) => (
          <div key={event.id} className="grid grid-cols-[42px_7px_1fr_auto] items-center gap-2 border-b border-slate-100 px-3 py-1.5 text-xs last:border-b-0">
            <span className="font-semibold tabular-nums text-slate-400">{timeLabel(event.time)}</span>
            <span className={`h-1.5 w-1.5 rounded-full ${event.status === "Confirmado" ? "bg-emerald-500" : event.status === "Reserva" ? "bg-sky-500" : "bg-slate-400"}`} />
            <span className="min-w-0 truncate text-slate-600"><b className="text-slate-800">{event.player}</b> {event.action}</span>
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${event.status === "Confirmado" ? "bg-emerald-50 text-emerald-700" : event.status === "Reserva" ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-600"}`}>{event.status}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 px-3 py-1.5 text-[10px] leading-snug text-slate-400">
        Registro completo de altas, reservas y bajas por hora.
      </div>
    </Card>
  );
}

function MatchSummaryCard({ match, selected, onClick }) {
  const winner = getWinner(match);
  const played = winner !== "Pendiente";
  const details = matchDetails[match.id];
  const finance = getMatchFinancialSummary(match, details?.roster || []);

  return (
    <button onClick={onClick} className={`w-full rounded-2xl border bg-white p-4 text-left shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-md ${selected ? "border-[#1E5566] ring-2 ring-sky-100" : "border-slate-200/70"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fecha {match.id}</p>
          <h3 className="mt-1 text-base font-bold text-slate-900">{dateLabel(match.date)}</h3>
          <p className="mt-1 text-xs text-slate-500">{played ? `Ganó ${winner}` : "Próximo / pendiente"}</p>
        </div>
        <StatusBadge value={winner} />
      </div>
      <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 p-3">
        <div className="text-center"><p className="text-xs text-orange-600">Naranjo</p><p className="text-2xl font-bold text-orange-600">{played ? match.orange : "—"}</p></div>
        <div className="text-xs font-semibold text-slate-400">VS</div>
        <div className="text-center"><p className="text-xs text-blue-600">Azul</p><p className="text-2xl font-bold text-blue-600">{played ? match.blue : "—"}</p></div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-xl bg-slate-50 p-2"><b>{match.players || "—"}</b><br />Jugadores</div>
        <div className="rounded-xl bg-slate-50 p-2"><b>{money(match.balance)}</b><br />Saldo</div>
        <div className="rounded-xl bg-slate-50 p-2"><b>{finance.pending || "—"}</b><br />Pendientes</div>
      </div>
    </button>
  );
}

function MatchListItem({ match, selected, onClick }) {
  const winner = getWinner(match);
  const played = winner !== "Pendiente";
  const details = matchDetails[match.id];
  const finance = getMatchFinancialSummary(match, details?.roster || []);
  const resolution = getResolutionSummary(match);

  return (
    <button
      onClick={onClick}
      className={`grid w-full grid-cols-2 items-center gap-3 border-t border-slate-100 px-4 py-3 text-left text-sm transition hover:bg-slate-50 md:grid-cols-[72px_96px_1fr_116px_110px_92px_110px] ${selected ? "bg-sky-50/70" : "bg-white"}`}
    >
      <div className="font-bold text-slate-900">F{match.id}</div>
      <div className="text-slate-600">{dateLabel(match.date)}</div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-orange-600">{played ? match.orange : "—"}</span>
        <span className="text-xs text-slate-400">vs</span>
        <span className="font-semibold text-blue-600">{played ? match.blue : "—"}</span>
        <span className="hidden text-xs text-slate-400 md:inline">Naranjo / Azul</span>
      </div>
      <div><StatusBadge value={winner} /></div>
      <div><StatusBadge value={resolution.status} /></div>
      <div className="font-semibold text-slate-700">{money(match.balance)}</div>
      <div className="text-right text-slate-600 md:text-left">{finance.pending || "—"} pend.</div>
    </button>
  );
}

function ResolutionTimeline({ match }) {
  const resolution = getResolutionSummary(match);

  if (!resolution.timeline) {
    return (
      <Card className="p-4">
        <SectionTitle icon="🗳️" title="Cuadratura y votación" />
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Aún no existe cierre o historial de cuadratura para este partido.</div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <SectionTitle icon="🗳️" title="Cuadratura y votación" />
        <StatusBadge value={resolution.status} />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Marcador oficial</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{resolution.officialScore.orange} - {resolution.officialScore.blue}</p>
        </div>
        <div className="rounded-2xl bg-amber-50 p-3">
          <p className="text-xs text-slate-500">Goles declarados</p>
          <p className="mt-1 text-xl font-bold text-amber-800">{resolution.reportedScore.orange} - {resolution.reportedScore.blue}</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-3">
          <p className="text-xs text-slate-500">Resultado final cerrado</p>
          <p className="mt-1 text-xl font-bold text-emerald-800">{resolution.finalScore.orange} - {resolution.finalScore.blue}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Historial</p>
          <div className="mt-4 space-y-4">
            {resolution.timeline.map((item, index) => (
              <div key={`${item.title}-${index}`} className="relative flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${index === resolution.timeline.length - 1 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{index + 1}</div>
                  {index < resolution.timeline.length - 1 ? <div className="mt-1 h-full min-h-[24px] w-px bg-slate-200" /> : null}
                </div>
                <div className="pb-1">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
            <b>Diferencia detectada:</b> {resolution.issue}
          </div>
          <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
            <b>Resolución:</b> {resolution.decision}
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            Cerrado por <b>{resolution.admin}</b>{resolution.votesFor ? ` · votos ${resolution.votesFor} a ${resolution.votesAgainst}` : ""}.
          </div>
        </div>
      </div>
    </Card>
  );
}

function MatchComments({ match }) {
  const [comments, setComments] = useState(getCommentsForMatch(match));
  const [draft, setDraft] = useState("");
  const [replyDrafts, setReplyDrafts] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const status = getCommentsStatus(match);
  const visibleComments = expanded ? comments : comments.slice(0, 3);
  const totalReplies = comments.reduce((sum, comment) => sum + (comment.replies?.length || 0), 0);

  function addComment() {
    const cleanText = draft.trim();
    if (!cleanText || !status.isOpen) return;
    setComments((items) => [
      ...items,
      {
        id: `local-${items.length + 1}`,
        player: "Elías",
        time: "2026-04-23T12:10:00",
        text: cleanText,
        highlighted: false,
        replies: [],
      },
    ]);
    setDraft("");
    setExpanded(true);
  }

  function addReply(commentId) {
    const cleanText = (replyDrafts[commentId] || "").trim();
    if (!cleanText || !status.isOpen) return;

    setComments((items) =>
      items.map((comment) => {
        if (comment.id !== commentId) return comment;
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: `${commentId}-local-${(comment.replies || []).length + 1}`,
              player: "Elías",
              time: "2026-04-23T12:12:00",
              text: cleanText,
            },
          ],
        };
      })
    );

    setReplyDrafts((drafts) => ({ ...drafts, [commentId]: "" }));
    setReplyingTo(null);
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-white px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">💬</span>
            <h3 className="text-base font-bold text-slate-900">Comentarios post-partido</h3>
          </div>
          <p className="mt-1 text-xs text-slate-500">Feed compacto · abierto 24h · queda archivado para resumen anual.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge value={status.isOpen ? "Comentarios abiertos" : "Comentarios cerrados"} />
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-100">{comments.length} temas</span>
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-100">{totalReplies} respuestas</span>
        </div>
      </div>

      {status.isOpen ? (
        <div className="border-b border-slate-100 bg-emerald-50/60 px-4 py-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Comentar post-partido..."
              className="min-w-0 flex-1 rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm outline-none ring-emerald-100 transition focus:ring-2"
            />
            <Button onClick={addComment} className="border-0 bg-emerald-600 text-white hover:bg-emerald-700">Comentar</Button>
          </div>
          <p className="mt-1.5 text-xs text-emerald-700">Disponible por {status.hoursLeft}h más.</p>
        </div>
      ) : (
        <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600">
          Comentarios cerrados. Este feed queda como historial del partido.
        </div>
      )}

      <div className="max-h-[360px] overflow-y-auto bg-white">
        {visibleComments.map((comment) => (
          <div key={comment.id} className="border-b border-slate-100 px-4 py-3 last:border-b-0">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                {comment.player.slice(0, 1)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-900">{comment.player}</span>
                  <span className="text-xs text-slate-400">{dateLabel(comment.time.slice(0, 10))}</span>
                  {comment.highlighted ? <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-semibold text-orange-700">Destacado</span> : null}
                </div>
                <p className="mt-1 text-sm leading-snug text-slate-700">{comment.text}</p>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                  <button onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} className="font-semibold text-[#1E5566] hover:underline" disabled={!status.isOpen}>
                    Responder
                  </button>
                  {(comment.replies || []).length ? <span className="text-slate-400">{comment.replies.length} respuestas</span> : null}
                </div>

                {(comment.replies || []).length ? (
                  <div className="mt-2 space-y-2 border-l-2 border-slate-100 pl-3">
                    {(comment.replies || []).map((reply) => (
                      <div key={reply.id} className="rounded-xl bg-slate-50 px-3 py-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-slate-800">{reply.player}</span>
                          <span className="text-[11px] text-slate-400">{dateLabel(reply.time.slice(0, 10))}</span>
                        </div>
                        <p className="mt-0.5 text-sm leading-snug text-slate-600">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {replyingTo === comment.id && status.isOpen ? (
                  <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                    <input
                      value={replyDrafts[comment.id] || ""}
                      onChange={(event) => setReplyDrafts((drafts) => ({ ...drafts, [comment.id]: event.target.value }))}
                      placeholder="Responder comentario..."
                      className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-100 transition focus:ring-2"
                    />
                    <Button onClick={() => addReply(comment.id)} className="px-3 py-2 text-xs">Enviar</Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}

        {!comments.length ? <div className="p-4 text-sm text-slate-500">Sin comentarios para este partido.</div> : null}
      </div>

      {comments.length > 3 ? (
        <button onClick={() => setExpanded((value) => !value)} className="w-full border-t border-slate-100 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100">
          {expanded ? "Contraer comentarios" : `Ver todos los comentarios (${comments.length})`}
        </button>
      ) : null}
    </Card>
  );
}

function MatchPhotos({ match }) {
  const photos = getPhotosForMatch(match);
  const status = getPhotosStatus(match);
  const [selectedPhoto, setSelectedPhoto] = useState(photos[0] || null);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-white px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">📸</span>
            <h3 className="text-base font-bold text-slate-900">Fotos del partido</h3>
          </div>
          <p className="mt-1 text-xs text-slate-500">Máximo 2 fotos comprimidas por partido para cuidar costos y dejar memoria histórica.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge value={status.isOpen ? "Fotos abiertas" : "Fotos cerradas"} />
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-100">{status.photosCount}/{status.limit} fotos</span>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">~{status.estimatedStorageKb} KB</span>
        </div>
      </div>

      {status.canUpload ? (
        <div className="border-b border-slate-100 bg-sky-50/60 px-4 py-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-sky-800">Puedes subir una foto más durante {status.hoursLeft}h. La app debería comprimirla antes de guardar.</p>
            <Button className="border-0 bg-[#1E5566] text-white hover:bg-[#184657]">＋ Subir foto</Button>
          </div>
        </div>
      ) : (
        <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600">
          {status.isOpen ? "Límite de 2 fotos alcanzado. El Admin puede reemplazar una foto si es necesario." : "Carga de fotos cerrada. Las fotos quedan archivadas en el histórico del partido."}
        </div>
      )}

      {photos.length ? (
        <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_220px]">
          <div className={`flex min-h-[220px] items-end overflow-hidden rounded-2xl bg-gradient-to-br ${selectedPhoto?.color || "from-slate-200 to-slate-300"} p-4`}>
            <div className="rounded-2xl bg-white/80 p-3 shadow-sm backdrop-blur">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold text-slate-900">{selectedPhoto?.title}</p>
                {selectedPhoto?.featured ? <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-semibold text-orange-700">Destacada</span> : null}
              </div>
              <p className="mt-1 text-sm text-slate-600">{selectedPhoto?.caption}</p>
              <p className="mt-2 text-xs text-slate-500">Subida por {selectedPhoto?.uploadedBy} · {selectedPhoto?.sizeKb} KB aprox.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {photos.map((photo) => (
              <button key={photo.id} onClick={() => setSelectedPhoto(photo)} className={`overflow-hidden rounded-2xl border p-2 text-left transition hover:bg-slate-50 ${selectedPhoto?.id === photo.id ? "border-[#1E5566] ring-2 ring-sky-100" : "border-slate-200"}`}>
                <div className={`h-20 rounded-xl bg-gradient-to-br ${photo.color}`} />
                <p className="mt-2 truncate text-xs font-semibold text-slate-900">{photo.title}</p>
                <p className="text-[11px] text-slate-500">{photo.sizeKb} KB</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 text-sm text-slate-500">Este partido aún no tiene fotos cargadas.</div>
      )}
    </Card>
  );
}

function MatchDetail({ match }) {
  const winner = getWinner(match);
  const played = winner !== "Pendiente";
  const detail = matchDetails[match.id];
  const roster = detail?.roster || [];
  const finance = getMatchFinancialSummary(match, roster);

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Detalle partido</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">Fecha {match.id} · {dateLabel(match.date)}</h3>
            <p className="mt-1 text-sm text-slate-500">{played ? `Resultado oficial: Naranjo ${match.orange} - ${match.blue} Azul` : "Partido pendiente de jugar."}</p>
          </div>
          <div className="rounded-2xl bg-white px-5 py-3 text-center ring-1 ring-slate-200">
            <p className="text-xs text-slate-500">Ganador</p>
            <p className="text-xl font-bold text-slate-900">{winner}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
        <Kpi icon="👥" label="Jugadores" value={match.players || roster.length || "—"} note="registrados" tone="purple" />
        <Kpi icon="💳" label="Recaudado" value={money(finance.collected)} note={`de ${money(finance.expected)}`} tone="green" />
        <Kpi icon="⚠️" label="Pendientes" value={finance.pending} note="cuotas" tone="amber" />
        <Kpi icon="💰" label="Saldo" value={money(match.balance)} note="asado" tone="orange" />
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-2">
        <div>
          <SectionTitle icon="👥" title="Jugadores del partido" />
          {roster.length ? (
            <div className="overflow-hidden rounded-2xl border border-slate-100">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                  <tr><th className="px-3 py-2 text-left">Jugador</th><th className="px-3 py-2 text-left">Equipo</th><th className="px-3 py-2 text-left">Tipo</th><th className="px-3 py-2 text-right">Goles</th><th className="px-3 py-2 text-left">Cuota</th></tr>
                </thead>
                <tbody>
                  {getVisibleRoster(roster).map((item) => (
                    <tr key={`${match.id}-${item.name}`} className="border-t border-slate-100">
                      <td className="px-3 py-2 font-medium">{item.name}</td>
                      <td className="px-3 py-2"><TeamPill team={item.team} /></td>
                      <td className="px-3 py-2"><StatusBadge value={item.type} /></td>
                      <td className="px-3 py-2 text-right font-semibold">{item.goals}</td>
                      <td className="px-3 py-2"><StatusBadge value={item.payment} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Aún no hay nómina detallada para esta fecha. En la app real se cargará desde asistencia y pagos.</div>
          )}
        </div>

        <div>
          <SectionTitle icon="📝" title="Resumen rápido" />
          <div className="space-y-3">
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">{detail?.notes || "Sin notas registradas para este partido."}</div>
            <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">Pagados: <b>{finance.paid}</b> · Pendientes: <b>{finance.pending}</b> · Recaudado: <b>{money(finance.collected)}</b></div>
            <div className="rounded-2xl bg-orange-50 p-4 text-sm text-orange-800">Al cerrar el partido, los pendientes pasan automáticamente a <b>morosos</b>.</div>
          </div>
        </div>
      </div>

      {played ? (
        <div className="space-y-4 p-4 pt-0">
          <ResolutionTimeline match={match} />
          <MatchComments match={match} />
          <MatchPhotos match={match} />
        </div>
      ) : null}
    </Card>
  );
}

function FameCard({ icon, title, main, detail, className = "", onClick }) {
  const content = (
    <Card className={`relative overflow-hidden p-4 ${className} ${onClick ? "cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md" : ""}`}>
      <div className="relative z-10 flex items-center gap-3">
        <div className="text-4xl" aria-hidden="true">{icon}</div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
          <p className="mt-1 truncate text-2xl font-bold text-slate-900">{main}</p>
          {detail ? <p className="mt-1 text-xs text-slate-500">{detail}</p> : null}
          {onClick ? <p className="mt-2 text-[11px] font-semibold text-[#1E5566]">Abrir</p> : null}
        </div>
      </div>
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/35" />
    </Card>
  );

  if (!onClick) return content;

  return (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={(event) => { if (event.key === "Enter") onClick(); }}>
      {content}
    </div>
  );
}

function YearSelector({ selectedYear, setSelectedYear }) {
  const years = getAvailableYears();

  return (
    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-3 shadow-[0_8px_24px_rgba(15,23,42,0.035)] md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Visualización</p>
        <p className="text-sm text-slate-600">Elige el año o acumulado global que quieres revisar.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {years.map((year) => (
          <Button key={year} active={selectedYear === year} onClick={() => setSelectedYear(year)}>
            {year}
          </Button>
        ))}
      </div>
    </div>
  );
}

function NoSeasonDetail({ selectedYear }) {
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Detalle no cargado</p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{selectedYear} tiene resumen acumulado</h3>
          <p className="mt-1 text-sm text-slate-500">Por ahora este periodo muestra tabla y métricas generales. Cuando carguemos partidos por fecha, aparecerán gráficos, último partido, historial y detalle.</p>
        </div>
        <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 ring-1 ring-amber-100">Resumen disponible</div>
      </div>
    </Card>
  );
}

function Sidebar({ active, setActive }) {
  return (
    <aside className="sticky top-0 hidden min-h-screen w-64 flex-col gap-4 border-r border-slate-200/70 bg-white/70 p-4 backdrop-blur lg:flex">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2B6676] to-[#1E5566] p-4 text-white shadow-md">
        <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full border border-white/10" />
        <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full border border-white/10" />
        <div className="relative flex flex-col gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">⚽</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Futbolito</h1>
            <p className="mt-1 text-xs text-cyan-50/90">Control semanal 2026</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {menu.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                isActive ? "bg-sky-50 text-[#12394a] shadow-sm ring-1 ring-sky-100" : "text-slate-600 hover:bg-white/80"
              }`}
            >
              <span className="text-lg" aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <Card className="mt-auto overflow-hidden p-0">
        <div className="h-24 bg-gradient-to-br from-sky-50 to-emerald-50 p-3">
          <div className="h-full rounded-xl border border-emerald-700/15 bg-white/55 p-2">
            <div className="h-full rounded-lg border border-emerald-900/15" />
          </div>
        </div>
        <div className="p-3 text-center">
          <p className="text-xs font-semibold text-slate-700">Un equipo, una pasión,</p>
          <p className="text-xs text-slate-500">cada semana.</p>
          <div className="mx-auto mt-2 h-0.5 w-8 rounded-full bg-orange-500" />
        </div>
      </Card>
    </aside>
  );
}

function App() {
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMatchId, setSelectedMatchId] = useState(8);
  const showYearSelector = ["dashboard", "matches", "moments", "payments", "playerRankings", "bbq"].includes(active);

  const activeMatches = useMemo(() => getSeasonMatches(selectedYear), [selectedYear]);
  const stats = useMemo(() => calculateStatsForYear(selectedYear), [selectedYear]);
  const playedMatches = stats.played;

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900">
      <div className="flex">
        <Sidebar active={active} setActive={setActive} />

        <main className="mx-auto w-full max-w-7xl flex-1 p-4 lg:p-8">
          <header className="mb-5 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#155e72] text-2xl text-white">⚽</div>
              <div>
                <h1 className="text-2xl font-bold">Futbolito</h1>
                <p className="text-sm text-slate-500">Control semanal 2026</p>
              </div>
            </div>
            <Button onClick={() => setMobileOpen((value) => !value)} aria-label="Abrir menú" className="text-lg">☰</Button>
          </header>

          {mobileOpen ? (
            <div className="mb-5 grid grid-cols-2 gap-2 lg:hidden">
              {menu.map((item) => (
                <Button
                  key={item.key}
                  active={active === item.key}
                  onClick={() => {
                    setActive(item.key);
                    setMobileOpen(false);
                  }}
                  className="flex items-center justify-start gap-2"
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </Button>
              ))}
            </div>
          ) : null}

          {showYearSelector ? <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear} /> : null}

          <div className="transition-all duration-200">
            {active === "dashboard" ? <Dashboard stats={stats} playedMatches={playedMatches} selectedYear={selectedYear} setActive={setActive} setSelectedMatchId={setSelectedMatchId} /> : null}
            {active === "nextMatch" ? <NextMatch /> : null}
            {active === "matches" ? <Matches selectedYear={selectedYear} activeMatches={activeMatches} selectedMatchId={selectedMatchId} setSelectedMatchId={setSelectedMatchId} /> : null}
            {active === "moments" ? <Moments selectedYear={selectedYear} activeMatches={activeMatches} setActive={setActive} setSelectedYear={setSelectedYear} setSelectedMatchId={setSelectedMatchId} /> : null}
            {active === "payments" ? <Payments stats={stats} selectedYear={selectedYear} /> : null}
            {active === "playerRankings" ? <PlayerRankings selectedYear={selectedYear} /> : null}
            {active === "rules" ? <Rules /> : null}
            {active === "settings" ? <Settings setActive={setActive} /> : null}
            {active === "bbq" ? <Bbq stats={stats} playedMatches={playedMatches} selectedYear={selectedYear} /> : null}
          </div>
        </main>
      </div>
    </div>
  );
}

function Dashboard({ stats, playedMatches, selectedYear, setActive, setSelectedMatchId }) {
  const { records } = stats;
  const standings = getPeriodStandings();
  const selectedStandings = standings[selectedYear] || standings.Global;
  const hasMatchDetail = playedMatches.length > 0;
  const bestBalanceText = records.highestBalanceMatches.length ? records.highestBalanceMatches.map((match) => `Fecha ${match.id}`).join(" y ") : "Sin detalle";
  const dominantTeam = stats.orangeWins >= stats.blueWins ? "Naranjo" : "Azul";
  const lethalAttack = stats.orangeGoals >= stats.blueGoals ? "Naranjo" : "Azul";
  const lethalGoals = Math.max(stats.orangeGoals, stats.blueGoals);

  function openLatestMatch() {
    if (stats.latestMatch) setSelectedMatchId(stats.latestMatch.id);
    setActive("matches");
  }

  function openSection(section) {
    setActive(section);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <Header eyebrow={`Temporada ${selectedYear}`} title="Dashboard General" text="Resumen del campeonato, caja semanal y fondo del asado." />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <Kpi icon="⚽" label="Partidos jugados" value={hasMatchDetail ? stats.played.length : getSeasonPeriod(selectedYear).played} note={hasMatchDetail ? `${stats.pending} pendientes` : "acumulado"} tone="green" onClick={() => openSection("matches")} linkLabel="Ver partidos" />
        <Kpi icon="🛡️" label="Naranjo vs Azul" value={`${stats.orangeWins} - ${stats.blueWins}`} note={`${stats.draws} empates`} tone="orange" onClick={() => openSection("matches")} linkLabel="Ver tabla" />
        <Kpi icon="🥅" label="Goles 2026" value={`${stats.orangeGoals} - ${stats.blueGoals}`} note="Naranjo / Azul" tone="blue" onClick={() => openSection("playerRankings")} linkLabel="Ver goleadores" />
        <Kpi icon="💵" label="Saldo asado" value={hasMatchDetail ? money(stats.bbqBalance) : "—"} note={hasMatchDetail ? "Fondo total" : "sin caja cargada"} tone="green" onClick={() => openSection("bbq")} linkLabel="Ver asado" />
        <Kpi icon="👥" label="Promedio jugadores" value={hasMatchDetail ? formatNumber(stats.avgPlayers) : "—"} note={hasMatchDetail ? "por fecha" : "sin nómina"} tone="purple" onClick={() => openSection("playerRankings")} linkLabel="Ver jugadores" />
        <Kpi icon="🎯" label="Promedio goles" value={formatNumber(stats.avgGoals)} note="por partido" tone="amber" onClick={() => openSection("matches")} linkLabel="Ver fechas" />
      </div>

      {hasMatchDetail ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <LastMatchPulse match={stats.latestMatch} onOpen={openLatestMatch} />
          <NextMatchCompact onOpen={() => openSection("nextMatch")} />
        </div>
      ) : (
        <NoSeasonDetail selectedYear={selectedYear} />
      )}

      <section>
        <SectionTitle icon="📊" title="Resumen acumulado" />
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
          <MiniStandingsCard title={selectedYear} rows={selectedStandings} compact />
          <MiniStandingsCard title="2026" rows={standings["2026"]} compact />
          <MiniStandingsCard title="Global" rows={standings.Global} compact />
        </div>
      </section>

      {hasMatchDetail ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <Card className="p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Goles por fecha</h3>
                <p className="text-xs text-slate-500">Naranjo y Azul, partido a partido.</p>
              </div>
              <Button onClick={() => openSection("matches")} className="px-3 py-1.5 text-xs">Ver partidos</Button>
            </div>
            <SimpleLineChart data={playedMatches} />
          </Card>

          <Card className="p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Saldo del asado</h3>
                <p className="text-xs text-slate-500">Crecimiento acumulado del fondo.</p>
              </div>
              <button onClick={() => openSection("bbq")} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100 transition hover:bg-emerald-100">
                {money(stats.bbqBalance)} · Ver asado
              </button>
            </div>
            <BalanceAreaChart data={playedMatches} startingBalance={stats.startingBalance} />
          </Card>
        </div>
      ) : null}

      {hasMatchDetail ? (
        <section>
          <SectionTitle icon="🏆" title="Rachas y récords" />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <RecordCard icon="🔥" title="Mejor racha" main={records.bestStreak.team} detail={`${records.bestStreak.count} partidos`} tone="orange" onClick={() => openSection("matches")} />
            <RecordCard icon="⭐" title="Partido con más goles" main={`Fecha ${records.highestScoring.id}`} detail={`${records.highestScoring.totalGoals} goles`} tone="blue" onClick={() => { setSelectedMatchId(records.highestScoring.id); openSection("matches"); }} />
            <RecordCard icon="👟" title="Mayor goleada" main={`${records.biggestWin.orange} - ${records.biggestWin.blue}`} detail={`Diferencia de ${records.biggestWin.diff}`} tone="orange" onClick={() => { setSelectedMatchId(records.biggestWin.id); openSection("matches"); }} />
            <RecordCard icon="📣" title="Partido más apretado" main={`Fecha ${records.closestMatch.id}`} detail={`${records.closestMatch.orange} - ${records.closestMatch.blue}`} tone="blue" onClick={() => { setSelectedMatchId(records.closestMatch.id); openSection("matches"); }} />
          </div>
        </section>
      ) : null}

      <section>
        <SectionTitle icon="👑" title="Insights y salón de la fama" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <FameCard icon="🏆" title="Dominador" main={dominantTeam} detail={`Periodo ${selectedYear}`} className="bg-gradient-to-br from-orange-50 to-amber-100" onClick={() => openSection("matches")} />
          <FameCard icon="⚽" title="Ataque más letal" main={`${lethalGoals}`} detail={`${lethalAttack} goles`} className="bg-gradient-to-br from-blue-50 to-sky-100" onClick={() => openSection("playerRankings")} />
          <FameCard icon="📈" title="Periodo" main={selectedYear} detail={hasMatchDetail ? `${stats.played.length} fechas cargadas` : "Resumen acumulado"} className="bg-gradient-to-br from-emerald-50 to-green-100" onClick={() => openSection("matches")} />
          <Card className="bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-base font-bold leading-snug text-slate-900">
                  <span className="text-orange-600">{dominantTeam}</span> lidera el periodo {selectedYear}.
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  Goles acumulados: <b className="text-orange-600">{stats.orangeGoals}</b> vs <b className="text-blue-600">{stats.blueGoals}</b>.
                </p>
              </div>
              <div className="hidden text-4xl sm:block" aria-hidden="true">🔥</div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function HistoricRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Matches({ selectedYear, activeMatches, selectedMatchId, setSelectedMatchId }) {
  const standings = getPeriodStandings();
  const stats = calculateStatsForYear(selectedYear);
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const selectedMatch = activeMatches.find((match) => match.id === selectedMatchId) || stats.latestMatch;
  const visibleMatches = filterMatches(activeMatches, filter, query);
  const filterOptions = ["Todos", "Jugados", "Pendientes", "Naranjo", "Azul", "Votación", "Sin diferencias"];
  const selectedStandings = standings[selectedYear] || standings.Global;
  const hasMatchDetail = activeMatches.length > 0;

  return (
    <section className="space-y-5">
      <Header eyebrow={`Historial ${selectedYear}`} title="Partidos por fecha" text="Vista compacta para revisar muchas fechas sin perder el detalle del partido seleccionado." />

      {hasMatchDetail ? <LastMatchPulse match={stats.latestMatch} /> : <NoSeasonDetail selectedYear={selectedYear} />}

      {hasMatchDetail ? (
        <section>
          <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <SectionTitle icon="📅" title="Fechas" />
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar fecha, ganador..."
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-100 transition focus:ring-2"
              />
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <Button key={option} active={filter === option} onClick={() => setFilter(option)} className="px-3 py-2 text-xs">
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(420px,0.95fr)_1.45fr]">
            <Card className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Listado compacto</p>
                  <h3 className="text-base font-bold text-slate-900">{visibleMatches.length} partidos</h3>
                </div>
                <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-100">Click para detalle</span>
              </div>

              <div className="hidden bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 md:grid md:grid-cols-[86px_120px_1fr_130px_110px_110px_90px] md:gap-3">
                <div>Fecha</div>
                <div>Día</div>
                <div>Marcador</div>
                <div>Ganador</div>
                <div>Cierre</div>
                <div>Saldo</div>
                <div>Pend.</div>
              </div>

              <div className="max-h-[620px] overflow-y-auto">
                {visibleMatches.map((match) => (
                  <MatchListItem key={match.id} match={match} selected={selectedMatch?.id === match.id} onClick={() => setSelectedMatchId(match.id)} />
                ))}
                {!visibleMatches.length ? <div className="p-6 text-sm text-slate-500">No hay partidos que coincidan con el filtro.</div> : null}
              </div>
            </Card>

            <div className="xl:sticky xl:top-6 xl:self-start">
              {selectedMatch ? <MatchDetail match={selectedMatch} /> : null}
            </div>
          </div>
        </section>
      ) : null}

      <section>
        <SectionTitle icon="📊" title="Ranking partidos / tabla acumulada" />
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <MiniStandingsCard title={selectedYear} rows={selectedStandings} />
          <MiniStandingsCard title="Año 2026" rows={standings["2026"]} />
          <MiniStandingsCard title="Global" rows={standings.Global} />
        </div>
      </section>
    </section>
  );
}

function NextMatch() {
  const [currentRole, setCurrentRole] = useState("Admin");
  const [scenarioKey, setScenarioKey] = useState("mixed14");
  const [currentUserId] = useState("u1");
  const [roster, setRoster] = useState(fullMixedRosterScenario);
  const [timeline, setTimeline] = useState(initialNextMatchTimeline);
  const [teamsBuilt, setTeamsBuilt] = useState(false);
  const nextMatch = matches2026.find((match) => getWinner(match) === "Pendiente");
  const scenarioNow = rosterScenarios[scenarioKey]?.now || "2026-04-27T10:00:00";
  const stats = getRosterStats(roster, nextMatch?.date || "2026-04-29", new Date(scenarioNow));
  const isAdmin = currentRole === "Admin";
  const currentUser = getCurrentUserRosterItem(roster, currentUserId);

  function updateRosterStatus(id, field, value) {
    const player = roster.find((item) => item.id === id);
    if (field === "confirmation" && player?.confirmation === value) return;

    setRoster((items) => items.map((item) => (item.id === id ? { ...item, [field]: value, changedAt: "2026-04-29T11:05:00" } : item)));

    if (field === "confirmation") {
      setTimeline((items) => [
        ...items,
        {
          id: `local-${items.length + 1}`,
          time: "2026-04-29T11:05:00",
          player: player?.name || "Jugador",
          action: getRosterActionLabel(value),
          status: value,
        },
      ]);
    }
  }

  function quickConfirm(value) {
    if (!currentUser) return;
    updateRosterStatus(currentUser.id, "confirmation", value);
  }

  function applyScenario(key) {
    setScenarioKey(key);
    setRoster(rosterScenarios[key].roster);
    setTeamsBuilt(false);
  }

  function buildTeams() {
    if (!isAdmin) return;
    setRoster((items) => buildBalancedTeams(items));
    setTeamsBuilt(true);
    setTimeline((items) => [
      ...items,
      {
        id: `local-${items.length + 1}`,
        time: "2026-04-29T11:10:00",
        player: "Admin",
        action: "armó equipos y asignó flexibles/galletas",
        status: "Equipos",
      },
    ]);
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <Header eyebrow="Próximo partido" title={nextMatch ? `Fecha ${nextMatch.id} · ${dateLabel(nextMatch.date)}` : "Próximo partido"} text="Aquí vive todo lo previo al partido: asistencia, reservas, galletas y equipos tentativos." />
        <div className="flex flex-wrap gap-2">
          <Button active={currentRole === "Admin"} onClick={() => setCurrentRole("Admin")}>Vista Admin</Button>
          <Button active={currentRole === "Jugador"} onClick={() => setCurrentRole("Jugador")}>Vista Jugador</Button>
        </div>
      </div>

      <Card className="p-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Simulador de estados</p>
            <p className="text-sm text-slate-500">Prueba cómo cambia la tarjeta Partido según confirmados, reservas y bajas.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(rosterScenarios).map(([key, scenario]) => (
              <Button key={key} active={scenarioKey === key} onClick={() => applyScenario(key)} className="px-3 py-1.5 text-xs">
                {scenario.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {currentUser ? (
        <Card className="overflow-hidden border-slate-200 bg-white p-0">
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1E5566]">Confirmación rápida</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold leading-tight text-slate-900">¿Juegas el próximo partido?</h3>
                  <StatusBadge value={currentUser.confirmation} />
                </div>
                <p className={`mt-1 text-sm font-medium ${currentUser.confirmation === "Confirmado" ? "text-emerald-700" : currentUser.confirmation === "Reserva" ? "text-amber-700" : currentUser.confirmation === "Baja" ? "text-red-700" : "text-slate-500"}`}>
                  {getAttendanceStateMessage(currentUser)}
                </p>

                <div className="mt-3 max-w-lg rounded-2xl border border-slate-100 bg-slate-50/60 p-2">
                  <div className="grid grid-cols-3 gap-1.5">
                    <AttendanceChoice status="Confirmado" active={currentUser.confirmation === "Confirmado"} onClick={() => quickConfirm("Confirmado")} />
                    <AttendanceChoice status="Reserva" active={currentUser.confirmation === "Reserva"} onClick={() => quickConfirm("Reserva")} />
                    <AttendanceChoice status="Baja" active={currentUser.confirmation === "Baja"} onClick={() => quickConfirm("Baja")} disabled={!(currentUser.confirmation === "Confirmado" || currentUser.confirmation === "Reserva")} />
                  </div>
                </div>
              </div>

              <CuposCard stats={stats} />
            </div>
          </div>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <RosterMiniCard icon="✅" label="Considerados" value={`${stats.countedPlayers}/${stats.idealPlayers}`} note={`${stats.confirmed} confirmados + ${stats.effectiveReserve} reservas`} tone="green" />
        <RosterMiniCard icon="🐥" label="Reservas" value={stats.reserve} note={`${stats.effectiveReserve} suman · ${stats.reserveWaiting} espera`} tone="yellow" />
        <RosterMiniCard icon="💅🏻" label="Bajas" value={stats.dropped} note="se bajaron" tone="slate" />
        <RosterMiniCard icon="🍪" label="Galletas" value={stats.guests} note="invitados" tone="orange" />
        <RosterMiniCard icon="⏳" label="Sin respuesta" value={stats.notResponded} note="jugadores sin responder" tone="amber" />
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Nómina previa</p>
            <h3 className="text-base font-bold text-slate-900">Confirmación, reservas y galletas</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {isAdmin ? <Button>＋ Agregar galleta</Button> : null}
            {isAdmin ? <Button onClick={buildTeams} active={teamsBuilt}>⚖️ {teamsBuilt ? "Equipos armados" : "Armar equipos"}</Button> : null}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">Llegada / Jugador</th>
                <th className="px-3 py-3 text-left">Tipo</th>
                <th className="px-3 py-3 text-left">Invitado por</th>
                <th className="px-3 py-3 text-left">Equipo base</th>
                <th className="px-3 py-3 text-left">Equipo partido</th>
                <th className="px-3 py-3 text-left">Asistencia</th>
                
              </tr>
            </thead>
            <tbody>
              {(teamsBuilt ? getTeamSortedRoster(roster) : getVisibleRoster(roster)).map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-500">{item.arrivalOrder || "—"}</span>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3"><StatusBadge value={item.type} /></td>
                  <td className="px-3 py-3 text-slate-600">{item.invitedBy || "—"}</td>
                  <td className="px-3 py-3"><TeamPill team={item.baseTeam || item.team || "Pendiente"} /></td>
                  <td className="px-3 py-3">
                    {isAdmin ? (
                      <select value={item.matchTeam || "Pendiente"} onChange={(event) => updateRosterStatus(item.id, "matchTeam", event.target.value)} className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs">
                        <option>Pendiente</option>
                        <option>Naranjo</option>
                        <option>Azul</option>
                      </select>
                    ) : (
                      <TeamPill team={item.matchTeam || "Pendiente"} />
                    )}
                  </td>
                  <td className="px-3 py-3">
                    {isAdmin ? (
                      <select value={item.confirmation} onChange={(event) => updateRosterStatus(item.id, "confirmation", event.target.value)} className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs">
                        <option>Sin confirmar</option>
                        <option>Confirmado</option>
                        <option>Reserva</option>
                        <option>Baja</option>
                      </select>
                    ) : (
                      <StatusBadge value={item.confirmation} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <TeamBalanceCard roster={roster} isAdmin={isAdmin} teamsBuilt={teamsBuilt} onAssign={(id, team) => updateRosterStatus(id, "matchTeam", team)} />
        <RosterTimeline timeline={timeline} />

        <Card className="p-4">
          <SectionTitle icon="🍪" title="Galletas del próximo partido" />
          <p className="text-sm text-slate-600">Los galletas son invitados asociados a un jugador existente. Se cuentan para asistencia, cupos, equipos y goles del partido.</p>
          <div className="mt-4 grid gap-3">
            {roster.filter((item) => item.type === "Galleta").map((guest) => (
              <div key={guest.id} className="flex items-center justify-between rounded-2xl bg-orange-50/70 p-3">
                <div>
                  <p className="font-semibold text-slate-900">{guest.name}</p>
                  <p className="text-xs text-slate-500">Invitado por {guest.invitedBy}</p>
                </div>
                <StatusBadge value={guest.confirmation} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle icon="👤" title="Vista jugador" />
          <p className="text-sm text-slate-600">El jugador debería entrar y resolver en menos de 5 segundos: confirmar, ponerse como reserva o bajarse.</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-800">Botón rápido: Voy</div>
            <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Botón rápido: Me bajo</div>
            <div className="rounded-2xl bg-sky-50 p-3 text-sm text-sky-800">Botón rápido: Reserva</div>
            <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Pago se marca después del partido</div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function PlayerRankings() {
  const ranking = getPlayerRankings(players);
  const playerStats = getPlayerIndicators(players);

  return (
    <section className="space-y-5">
      <Header eyebrow="Ranking jugadores" title="Rendimiento individual" text="Indicadores por jugador: asistencia, goles, cancelaciones, deuda y puntaje general." />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <RecordCard icon="🏅" title="Más asistente" main={playerStats.topAttendance.name} detail={`${playerStats.topAttendance.attendance} partidos`} tone="green" />
        <RecordCard icon="⚽" title="Goleador" main={playerStats.topScorer.name} detail={`${playerStats.topScorer.goals} goles`} tone="blue" />
        <RecordCard icon="🚫" title="Más bajas" main={playerStats.mostCancellations.name} detail={`${playerStats.mostCancellations.cancellations} cancelaciones`} tone="amber" />
        <RecordCard icon="💸" title="Deuda total" main={money(playerStats.totalDebt)} detail="pagos pendientes" tone="orange" />
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-slate-100 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tabla individual</p>
          <h3 className="text-base font-bold text-slate-900">Ranking general</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Jugador</th>
                <th className="px-3 py-3 text-right">Asist.</th>
                <th className="px-3 py-3 text-right">% Asist.</th>
                <th className="px-3 py-3 text-right">Goles</th>
                <th className="px-3 py-3 text-right">Prom.</th>
                <th className="px-3 py-3 text-right">Bajas</th>
                <th className="px-3 py-3 text-right">Deuda</th>
                <th className="px-4 py-3 text-right">Puntaje</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((player, index) => (
                <tr key={player.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-bold text-slate-400">{index + 1}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{player.name}</td>
                  <td className="px-3 py-3 text-right">{player.attendance}</td>
                  <td className="px-3 py-3 text-right">{formatNumber(player.attendanceRate, 0)}%</td>
                  <td className="px-3 py-3 text-right font-semibold">{player.goals}</td>
                  <td className="px-3 py-3 text-right">{formatNumber(player.goalsPerMatch)}</td>
                  <td className="px-3 py-3 text-right">{player.cancellations}</td>
                  <td className="px-3 py-3 text-right">{money(player.debt)}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}

function Moments({ selectedYear, activeMatches, setActive, setSelectedYear, setSelectedMatchId }) {
  const feed = getMomentsFeed(activeMatches);
  const summary = getAnnualPhotosSummary(activeMatches);
  const commentsSummary = getAnnualCommentsSummary(activeMatches);

  function openMatch(matchId) {
    setSelectedYear("2026");
    setSelectedMatchId(matchId);
    setActive("matches");
  }

  return (
    <section className="space-y-5">
      <Header eyebrow={`Momentos ${selectedYear}`} title="Feed visual del campeonato" text="Una publicación por partido: fotos, resultado, comentarios y acceso directo al detalle de la fecha." />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Kpi icon="📸" label="Fotos" value={summary.total} note="máx. 2 por partido" tone="blue" />
        <Kpi icon="📰" label="Publicaciones" value={feed.length} note="una por partido" tone="purple" />
        <Kpi icon="💬" label="Comentarios" value={commentsSummary.totalWithReplies} note="incluye respuestas" tone="amber" />
        <Kpi icon="💾" label="Peso estimado" value={`${formatNumber(summary.estimatedStorageMb, 1)} MB`} note="control de costos" tone="green" />
      </div>

      {feed.length ? (
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
          {feed.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fecha {item.match.id}</p>
                  <h3 className="text-base font-bold text-slate-900">{dateLabel(item.match.date)} · Naranjo {item.match.orange} - {item.match.blue} Azul</h3>
                </div>
                <TeamPill team={item.winner} />
              </div>

              <div className={`grid gap-1 bg-slate-100 ${item.photos.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                {item.photos.map((photo) => (
                  <div key={photo.id} className={`flex min-h-[300px] items-end bg-gradient-to-br ${photo.color} p-4`}>
                    <div className="rounded-2xl bg-white/85 p-3 shadow-sm backdrop-blur">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-slate-900">{photo.title}</p>
                        {photo.featured ? <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-semibold text-orange-700">Destacada</span> : null}
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{photo.caption}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 p-4">
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-slate-50 p-2"><b>{item.winner}</b><br />Ganador</div>
                  <div className="rounded-xl bg-slate-50 p-2"><b>{item.photos.length}</b><br />Fotos</div>
                  <div className="rounded-xl bg-slate-50 p-2"><b>{item.commentsCount}</b><br />Temas</div>
                  <div className="rounded-xl bg-slate-50 p-2"><b>{item.repliesCount}</b><br />Respuestas</div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Comentario destacado</p>
                  <p className="mt-1">“{item.highlightedComment}”</p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Comentarios</p>
                  <div className="space-y-3">
                    {item.comments.map((comment) => (
                      <div key={comment.id} className="rounded-2xl border border-slate-100 bg-white p-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-slate-900">{comment.player}</span>
                          <span className="text-xs text-slate-400">{dateLabel(comment.time.slice(0, 10))}</span>
                          {comment.highlighted ? <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-semibold text-orange-700">Destacado</span> : null}
                        </div>
                        <p className="mt-1 text-sm leading-snug text-slate-700">{comment.text}</p>

                        {(comment.replies || []).length ? (
                          <div className="mt-2 space-y-2 border-l-2 border-slate-100 pl-3">
                            {(comment.replies || []).map((reply) => (
                              <div key={reply.id} className="rounded-xl bg-slate-50 px-3 py-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-sm font-semibold text-slate-800">{reply.player}</span>
                                  <span className="text-[11px] text-slate-400">{dateLabel(reply.time.slice(0, 10))}</span>
                                </div>
                                <p className="mt-0.5 text-sm leading-snug text-slate-600">{reply.text}</p>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <p className="text-xs text-slate-500">{item.photos.length} fotos · ~{item.storageKb} KB · histórico del partido</p>
                  <Button onClick={() => openMatch(item.match.id)} className="px-3 py-2 text-xs">Ver partido</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <NoSeasonDetail selectedYear={selectedYear} />
      )}
    </section>
  );
}

function Rules() {
  const [category, setCategory] = useState("Todas");
  const groupedRules = getRulesByCategory(futbolitoRules);
  const categories = ["Todas", ...Object.keys(groupedRules)];
  const visibleRules = category === "Todas" ? futbolitoRules : futbolitoRules.filter((rule) => rule.category === category);

  return (
    <section className="space-y-5">
      <Header eyebrow="Reglamento" title="Reglas del Futbolito" text="Zona explicativa para que todos entiendan cupos, reservas, bajas, cuotas, galletas, votaciones y cierre de partido." />

      <Card className="overflow-hidden bg-gradient-to-br from-slate-900 to-[#1E5566] p-5 text-white">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_300px] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100">Regla destacada</p>
            <h3 className="mt-1 text-2xl font-bold">Reservas y bajas de último minuto</h3>
            <p className="mt-2 text-sm leading-relaxed text-cyan-50/85">
              La reserva suma mientras haya cupo disponible. Si alguien se baja el mismo día después de las 12:00 y no deja reemplazo/galleta, puede quedar obligado a pagar igual si afecta el partido.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
            <p className="text-xs uppercase tracking-wide text-cyan-100">Objetivo</p>
            <p className="mt-1 text-sm text-white">Evitar confusiones, dejar trazabilidad y que todos sepan las reglas antes de confirmar.</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <Button key={item} active={category === item} onClick={() => setCategory(item)} className="px-3 py-2 text-xs">
            {item}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {visibleRules.map((rule) => (
          <Card key={rule.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{rule.category}</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{rule.title}</h3>
              </div>
              <StatusBadge value={rule.audience} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{rule.summary}</p>
            <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
              <b>Ejemplo:</b> {rule.example}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <SectionTitle icon="🛠️" title="Pendiente para versión Admin" />
        <p className="text-sm text-slate-600">
          En la app real, el Admin debería poder editar estas reglas, definir horario límite de baja, valor de cuota, mínimo/ideal de jugadores y condiciones para galletas o morosos.
        </p>
      </Card>
    </section>
  );
}

function Payments({ stats, selectedYear }) {
  const played = stats.played;
  const hasMatchDetail = played.length > 0;

  return (
    <section className="space-y-5">
      <Header eyebrow={`Cuotas ${selectedYear}`} title="Costos por persona y saldo" text="La antigua “propina” queda como saldo disponible para el asado." />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Kpi icon="👥" label="Promedio jugadores" value={formatNumber(stats.avgPlayers)} note="Según partidos registrados" tone="purple" />
        <Kpi icon="💳" label="Cuota usual" value="$4.000 - $5.000" note="Variable según asistencia" tone="blue" />
        <Kpi icon="🐷" label="Saldo acumulado" value={money(stats.bbqBalance)} note="Incluye fondo inicial" tone="green" />
      </div>

      {hasMatchDetail ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="p-4 text-left">Fecha</th>
                  <th className="p-4 text-right">Jugadores</th>
                  <th className="p-4 text-right">Cuota</th>
                  <th className="p-4 text-right">Saldo semanal</th>
                </tr>
              </thead>
              <tbody>
                {played.map((match) => (
                  <tr key={match.id} className="border-b border-slate-100 last:border-0">
                    <td className="p-4 font-medium">{dateLabel(match.date)}</td>
                    <td className="p-4 text-right">{match.players}</td>
                    <td className="p-4 text-right">{money(match.fee)}</td>
                    <td className="p-4 text-right font-semibold">{money(match.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <NoSeasonDetail selectedYear={selectedYear} />
      )}
    </section>
  );
}

function Settings({ setActive }) {
  const activeUsers = players.filter((player) => player.status === "Activo").length;
  const admins = players.filter((player) => player.role === "Admin").length;
  const pendingUsers = players.filter((player) => player.status !== "Activo").length;

  return (
    <section className="space-y-5">
      <Header eyebrow="Configuración Admin" title="Jugadores y permisos" text="Este módulo debería verlo solo el Admin. Aquí se invitan jugadores, se asignan roles, se activan jugadores y se definen reglas generales de la app." />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Kpi icon="👥" label="Jugadores" value={players.length} note="registrados" tone="purple" />
        <Kpi icon="🛡️" label="Admins" value={admins} note="con permisos" tone="blue" />
        <Kpi icon="⏳" label="Pendientes" value={pendingUsers} note="por activar" tone="amber" />
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Administración</p>
            <h3 className="text-base font-bold text-slate-900">Jugadores de la app</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button>＋ Invitar jugador</Button>
            <Button onClick={() => setActive("rules")}>⚙️ Reglas de partido</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">Jugador</th>
                <th className="px-3 py-3 text-left">Rol</th>
                <th className="px-3 py-3 text-left">Estado</th>
                <th className="px-3 py-3 text-right">Asist.</th>
                <th className="px-3 py-3 text-right">Goles</th>
                <th className="px-3 py-3 text-right">Deuda</th>
                <th className="px-4 py-3 text-left">Acciones Admin</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900">{player.name}</td>
                  <td className="px-3 py-3"><StatusBadge value={player.role === "Admin" ? "Admin" : "Jugador"} /></td>
                  <td className="px-3 py-3"><StatusBadge value={player.status} /></td>
                  <td className="px-3 py-3 text-right">{player.attendance}</td>
                  <td className="px-3 py-3 text-right font-semibold">{player.goals}</td>
                  <td className="px-3 py-3 text-right">{money(player.debt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <Button className="px-2 py-1 text-xs">Editar</Button>
                      <Button className="px-2 py-1 text-xs">Rol</Button>
                      <Button className="px-2 py-1 text-xs">Desactivar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="p-4">
          <SectionTitle icon="🔐" title="Permisos" />
          <p className="text-sm text-slate-600">Admin puede editar asistencias, pagos, goles, jugadores, galletas, cuotas y cierre de partido.</p>
        </Card>
        <Card className="p-4">
          <SectionTitle icon="💳" title="Reglas de cuota" />
          <p className="text-sm text-slate-600">Definir valor por jugador, cuándo un pendiente pasa a moroso y si los galletas pagan igual que jugadores.</p>
        </Card>
        <Card className="p-4">
          <SectionTitle icon="🗳️" title="Reglas de votación" />
          <p className="text-sm text-slate-600">Definir cuándo se abre votación por goles y si votan todos, solo asistentes o solo Admin.</p>
        </Card>
      </div>
    </section>
  );
}

function GoalReconciliationPanel() {
  const goalReconciliation = reconcileGoalReports(goalReportsExample);

  return (
    <Card className="p-4">
      <SectionTitle icon="🗳️" title="Cuadratura y votación de goles" />
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Marcador oficial</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">Naranjo {goalReportsExample.officialScore.orange} - {goalReportsExample.officialScore.blue} Azul</p>
        </div>
        <StatusBadge value={goalReconciliation.status} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-orange-50 p-3">
          <p className="text-xs text-slate-500">Goles anotados por jugadores Naranjo</p>
          <p className="mt-1 text-xl font-bold text-orange-700">{goalReconciliation.totals.orange}</p>
          <p className="text-xs text-slate-500">Diferencia vs oficial: +{goalReconciliation.orangeDiff}</p>
        </div>
        <div className="rounded-2xl bg-blue-50 p-3">
          <p className="text-xs text-slate-500">Goles anotados por jugadores Azul</p>
          <p className="mt-1 text-xl font-bold text-blue-700">{goalReconciliation.totals.blue}</p>
          <p className="text-xs text-slate-500">Diferencia vs oficial: {goalReconciliation.blueDiff}</p>
        </div>
      </div>

      {goalReconciliation.hasDiscrepancy ? (
        <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-sm text-amber-800">
          Hay descuadre de goles. El Admin puede abrir votación, revisar reportes y ajustar los goles reales para cuadrar con el marcador oficial.
        </div>
      ) : null}
    </Card>
  );
}

function StatusBadge({ value }) {
  const styles = {
    Confirmado: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    Pagado: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    Pendiente: "bg-amber-50 text-amber-700 ring-amber-100",
    Duda: "bg-amber-50 text-amber-700 ring-amber-100",
    Reserva: "bg-amber-50 text-amber-700 ring-amber-100",
    Baja: "bg-red-50 text-red-700 ring-red-100",
    Moroso: "bg-rose-50 text-rose-700 ring-rose-100",
    Jugador: "bg-sky-50 text-sky-700 ring-sky-100",
    Galleta: "bg-orange-50 text-orange-700 ring-orange-100",
    "Requiere votación Admin": "bg-amber-50 text-amber-700 ring-amber-100",
    Cuadrado: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    "Comentarios abiertos": "bg-emerald-50 text-emerald-700 ring-emerald-100",
    "Comentarios cerrados": "bg-slate-100 text-slate-600 ring-slate-200",
    "Fotos abiertas": "bg-sky-50 text-sky-700 ring-sky-100",
    "Fotos cerradas": "bg-slate-100 text-slate-600 ring-slate-200",
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[value] || "bg-slate-50 text-slate-700 ring-slate-100"}`}>{value}</span>;
}

function Bbq({ stats, playedMatches, selectedYear }) {
  const target = 250000;
  const pct = Math.min(100, Math.round((stats.bbqBalance / target) * 100));
  const remaining = Math.max(0, target - stats.bbqBalance);

  return (
    <section className="space-y-5">
      <Header eyebrow={`Fondo asado ${selectedYear}`} title="Meta para el asado" text="El saldo semanal se acumula para financiar comida, bebestibles, carbón, cancha o premios." />

      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Saldo actual</p>
            <p className="mt-1 text-4xl font-bold">{money(stats.bbqBalance)}</p>
            <p className="mt-2 text-sm text-slate-500">Meta referencial: {money(target)} · Faltan {money(remaining)}</p>
          </div>
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-100">
            <div className="text-center">
              <p className="text-2xl font-bold">{pct}%</p>
              <p className="text-xs text-slate-500">avance</p>
            </div>
          </div>
        </div>

        <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-orange-500" style={{ width: `${pct}%` }} />
        </div>
      </Card>

      {playedMatches.length ? (
        <Card className="p-5">
          <h3 className="mb-4 text-lg font-semibold">Saldo semanal</h3>
          <SimpleBarChart data={playedMatches} />
        </Card>
      ) : (
        <NoSeasonDetail selectedYear={selectedYear} />
      )}
    </section>
  );
}

export default App;

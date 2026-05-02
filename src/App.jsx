import React from "react";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
          Futbolito App
        </p>
        <h1 className="mt-2 text-3xl font-black">Checkpoint base guardado</h1>
        <p className="mt-3 text-slate-600">
          Este repositorio quedó preparado para pegar aquí el código completo del canvas:
          <strong> Futbolito App Prototipo</strong>.
        </p>
        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <p><strong>Base funcional a preservar:</strong></p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Dashboard General.</li>
            <li>Próximo Partido.</li>
            <li>Confirmación rápida.</li>
            <li>Galletas / flexibles.</li>
            <li>Nómina previa.</li>
            <li>Auto-asignar y armar equipos.</li>
            <li>Rachas, récords e insights.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

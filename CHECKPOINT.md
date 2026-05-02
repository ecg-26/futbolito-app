# Checkpoint funcional — Futbolito App Prototipo

## Estado que se debe preservar

### Dashboard
- Sidebar blanco con bloque superior verde petróleo.
- Menú lateral compacto.
- Selector de visualización: 2026 / 2025 / Global.
- Dashboard General.
- KPIs principales:
  - Partidos jugados.
  - Naranjo vs Azul.
  - Goles 2026.
  - Saldo asado.
  - Promedio jugadores.
  - Promedio goles.
- Último partido destacado.
- Próximo partido compacto.
- Resumen acumulado.
- Gráficos de goles y saldo.
- Rachas y récords.
- Insights y salón de la fama.

### Datos clave 2026
- 8 partidos jugados.
- 4 pendientes.
- Naranjo: 7 triunfos.
- Azul: 1 triunfo.
- Naranjo: 75 goles.
- Azul: 60 goles.
- Total goles: 135.
- Promedio goles: 16,9.
- Promedio jugadores: 13,5.
- Saldo semanal acumulado: $64.000.
- Fondo asado total: $85.000 incluyendo fondo inicial.

### Rachas y récords
- Mejor racha: Naranjo, 6 partidos.
- Partido con más goles: Fecha 2, 23 goles.
- Mayor goleada: Fecha 2, 15 - 8.
- Partido más apretado: Fecha 1, 6 - 5.

### Insights / fama
- Dominador: Naranjo.
- Ataque más letal: Naranjo, 75 goles.
- Fechas más rentables: Fecha 2 y Fecha 3, $11.000 cada una.
- Lectura rápida: Naranjo domina.

### Próximo Partido
- Confirmación rápida:
  - Voy.
  - Reserva.
  - Me bajo.
- “Me bajo” solo activo si el jugador ya estaba confirmado o en reserva.
- Estados:
  - Sin confirmar.
  - Confirmado.
  - Reserva.
  - Baja.
- Jugadores llegan con color base definido:
  - Naranjo.
  - Azul.
  - Flexible.
- Flexible debe verse gris.
- Galletas también son Flexible.
- Nómina previa no debe mostrar jugadores “Sin confirmar”.
- Nómina previa ordenada por número de llegada.
- Al armar equipos:
  - Se ordena por color.
  - Se mantiene número de llegada original.
  - Se respetan colores base.
  - Flexibles y galletas se asignan al equipo con menos jugadores.
- Botones:
  - Agregar galleta.
  - Armar equipos.
  - Auto-asignar.

### Módulos existentes
- Dashboard.
- Próximo Partido.
- Partidos.
- Momentos.
- Cuotas.
- Ranking Jugadores.
- Reglas.
- Asado.
- Configuración.

### Reglas base
- Reserva suma mientras haya cupo.
- Baja el mismo día después de las 12:00 puede dejar cuota pendiente si afecta el partido.
- Galleta queda asociado al jugador que lo invita.
- Cuotas quedan pendientes/morosas después del partido.
- Descuadre de goles puede ir a votación Admin.
- Comentarios y fotos quedan abiertos 24 horas post-partido.

# Base de Datos MVP Futbolito

## Objetivo
Definir la base mínima para que Futbolito deje de usar datos simulados y pueda guardar información real.

## Tablas iniciales

### 1. players

Guarda los jugadores del grupo.

Campos mínimos:
- id
- name
- role
- status
- created_at

Ejemplo:
- Elías
- Juan
- Nico
- Pablo
- Cristian

Roles:
- admin
- player

Estados:
- active
- inactive
- pending

---

### 2. matches

Guarda cada partido semanal.

Campos mínimos:
- id
- match_date
- orange_score
- blue_score
- status
- created_at

Estados:
- scheduled
- played
- cancelled

Ejemplo:
- Fecha 9
- 2026-04-29
- Naranjo vs Azul
- Pendiente o jugado

---

### 3. match_roster

Guarda la nómina de cada partido.

Campos mínimos:
- id
- match_id
- player_id
- player_name
- type
- invited_by
- confirmation
- base_team
- match_team
- payment_status
- arrival_order
- created_at
- updated_at

Tipos:
- player
- guest

Confirmaciones:
- unconfirmed
- confirmed
- reserve
- dropped

Equipos:
- orange
- blue
- flexible
- pending

Pagos:
- pending
- paid
- debtor

## Primera función real a construir
Conectar Próximo Partido para que pueda leer y guardar confirmaciones reales:
- Voy
- Reserva
- Me bajo

## Regla de avance
Primero conectar solo:
- players
- matches
- match_roster

No conectar todavía:
- fotos
- comentarios
- cuotas avanzadas
- ranking avanzado
- asado avanzado
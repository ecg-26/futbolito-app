# Pasos para subir este respaldo a GitHub

## Opción simple desde computador

1. Crear carpeta:
```bash
mkdir futbolito-app
cd futbolito-app
```

2. Descomprimir este ZIP dentro de la carpeta.

3. Inicializar Git:
```bash
git init
git add .
git commit -m "Checkpoint base Futbolito App"
```

4. Crear repositorio vacío en GitHub llamado:
```text
futbolito-app
```

5. Conectar y subir:
```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/futbolito-app.git
git push -u origin main
```

## Para correrlo después con Vite

```bash
npm install
npm run dev
```

## Estrategia de versiones

Cada avance importante:
```bash
git add .
git commit -m "Mejora dashboard"
git push
```

Ejemplos de commits:
- `Checkpoint dashboard recuperado`
- `Mejora próximo partido`
- `Agrega módulo cuotas`
- `Ajusta vista móvil`

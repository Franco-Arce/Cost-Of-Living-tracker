# 🚀 Guía Rápida de Inicio - SOLUCIÓN A PROBLEMAS COMUNES

## ⚠️ Problema: Scripts de PowerShell Bloqueados

Si ves el error: "la ejecución de scripts está deshabilitada"

### Solución 1: Habilitar Scripts (Recomendado)
Ejecuta esto **una sola vez** en PowerShell como Administrador:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Luego ya podrás usar:
```powershell
.\start-backend.ps1
.\start-frontend.ps1
```

### Solución 2: Ejecutar Comandos Directamente

**Terminal 1 - Backend:**
```powershell
cd backend
python -m uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

---

## ⚠️ Problema: "npm no se reconoce"

Esto significa que Node.js no está en el PATH o necesitas reiniciar la terminal.

### Solución:
1. **Cierra TODAS las ventanas de PowerShell/Terminal**
2. **Abre una NUEVA ventana de PowerShell**
3. Verifica que Node.js esté instalado:
   ```powershell
   node --version
   npm --version
   ```
4. Si ves las versiones, ya está listo. Si no, instala Node.js desde: https://nodejs.org/

---

## ✅ Pasos Correctos para Iniciar la Aplicación

### 1. Abrir DOS terminales nuevas

### 2. Terminal 1 - Backend
```powershell
# Navegar al proyecto
cd "C:\Users\franc\OneDrive\Escritorio\Mis Cosas\Proyectos\Global Cost of Living Tracker"

# Ir a backend
cd backend

# Iniciar servidor
python -m uvicorn main:app --reload --port 8000
```

Deberías ver:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### 3. Terminal 2 - Frontend
```powershell
# Navegar al proyecto
cd "C:\Users\franc\OneDrive\Escritorio\Mis Cosas\Proyectos\Global Cost of Living Tracker"

# Ir a frontend
cd frontend

# Iniciar servidor Vite
npm run dev
```

Deberías ver:
```
VITE v6.0.11  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4. Abrir en el Navegador
Ve a: **http://localhost:5173**

---

## 🔧 Comandos Útiles

### Verificar que todo esté instalado:
```powershell
python --version    # Debería mostrar: Python 3.14.2
node --version      # Debería mostrar: v20.x.x o similar
npm --version       # Debería mostrar: 10.x.x o similar
```

### Detener los servidores:
- Presiona `Ctrl + C` en cada terminal

### Reinstalar dependencias del frontend (si hay problemas):
```powershell
cd frontend
rm -r node_modules
rm package-lock.json
npm install
```

---

## 📋 Checklist de Verificación

Antes de iniciar, verifica:

- [ ] Node.js está instalado
- [ ] Abriste una NUEVA terminal después de instalar Node.js
- [ ] Estás en el directorio correcto del proyecto
- [ ] El backend está corriendo (puerto 8000)
- [ ] El frontend está corriendo (puerto 5173)
- [ ] No hay otros programas usando esos puertos

---

## 🎯 Comando Todo-en-Uno (Alternativa)

Si habilitaste la ejecución de scripts, puedes usar:

```powershell
# Terminal 1
.\start-backend.ps1

# Terminal 2
.\start-frontend.ps1
```

Pero si no funciona, usa los comandos directos mencionados arriba.

---

## 💡 Tip: Usar VS Code

Si tienes VS Code, puedes:
1. Abrir el proyecto en VS Code
2. Abrir 2 terminales integradas (Terminal → Split Terminal)
3. En una ejecutar el backend
4. En la otra ejecutar el frontend

---

## ❓ Si Nada Funciona

Ejecuta esto y envíame el resultado:

```powershell
node --version
npm --version
python --version
pwd
```

Esto me ayudará a diagnosticar el problema.

# 🚀 Guía de Instalación Rápida - Node.js

## Paso 1: Descargar Node.js

1. Ve a [https://nodejs.org/](https://nodejs.org/)
2. Descarga la versión **LTS** (Long Term Support) - Recomendada
3. Ejecuta el instalador descargado
4. Sigue el asistente de instalación:
   - ✅ Acepta los términos y condiciones
   - ✅ Mantén la ruta de instalación por defecto
   - ✅ **IMPORTANTE:** Marca la opción "Automatically install the necessary tools"
   - ✅ Completa la instalación

## Paso 2: Verificar la Instalación

Abre una **nueva** ventana de PowerShell y ejecuta:

```powershell
node --version
npm --version
```

Deberías ver algo como:
```
v20.x.x
10.x.x
```

## Paso 3: Instalar Dependencias del Frontend

```powershell
cd "C:\Users\franc\OneDrive\Escritorio\Mis Cosas\Proyectos\Global Cost of Living Tracker\frontend"
npm install
```

Este proceso puede tomar 2-3 minutos. Verás una barra de progreso.

## Paso 4: Iniciar la Aplicación

### Terminal 1 - Backend (FastAPI)
```powershell
cd "C:\Users\franc\OneDrive\Escritorio\Mis Cosas\Proyectos\Global Cost of Living Tracker\backend"
python -m uvicorn main:app --reload --port 8000
```

### Terminal 2 - Frontend (React)
```powershell
cd "C:\Users\franc\OneDrive\Escritorio\Mis Cosas\Proyectos\Global Cost of Living Tracker\frontend"
npm run dev
```

## Paso 5: Abrir en el Navegador

Abre tu navegador en: **http://localhost:5173**

---

## 🎉 ¡Listo!

Deberías ver la aplicación funcionando con:
- 🌍 Diseño premium con efectos glassmorphism
- 💰 Tarjetas KPI animadas
- 📊 Gráficos interactivos
- 🔍 Filtro de países funcional

---

## ⚠️ Solución de Problemas

### Error: "npm no se reconoce"
- Cierra y abre una **nueva** ventana de PowerShell
- Node.js necesita reiniciar la terminal para actualizar las variables de entorno

### Error: "Puerto 5173 en uso"
```powershell
# Cambia el puerto en vite.config.js a otro número (ej: 3000)
```

### Error: "Cannot connect to backend"
- Verifica que el backend esté corriendo en http://localhost:8000
- Abre http://localhost:8000/api/metrics en el navegador para verificar

### El backend no inicia
```powershell
# Reinstala las dependencias de Python
python -m pip install -r requirements.txt
```

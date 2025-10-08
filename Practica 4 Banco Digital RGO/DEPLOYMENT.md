# 🚀 Guía de Despliegue - Banco RGO

Esta guía completa te ayudará a desplegar el sitio web del Banco RGO en diferentes plataformas.

**Desarrollado por:** Randy G. RGO  
**Edad:** 24 años  
**Carrera:** Licenciatura en Informática

## 📋 Requisitos Previos

- Git instalado en tu sistema
- Cuenta de GitHub activa
- Editor de código (recomendado: VS Code)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 🌐 Opciones de Despliegue

### 1. GitHub Pages (Recomendado - GRATUITO)

#### Paso a Paso:

1. **Sube tu código a GitHub:**
```bash
git clone https://github.com/Randy G./banco-RGO-website.git
cd banco-RGO-website
git add .
git commit -m "🚀 Deploy Banco RGO - by Randy G. RGO"
git push origin main
```

2. **Activar GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Click en **Settings** > **Pages**
   - En "Source" selecciona: **Deploy from a branch**
   - Branch: **main** / Folder: **/ (root)**
   - Click **Save**

3. **URL del sitio:**
   ```
   https://Randy G..github.io/banco-RGO-website
   ```

#### Tiempo de despliegue: 2-10 minutos

---

### 2. Netlify (GRATUITO con dominio personalizado)

#### Método 1: Drag & Drop
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta del proyecto a Netlify
3. Tu sitio estará disponible instantáneamente

#### Método 2: Git Integration
1. Conecta tu repositorio de GitHub
2. Netlify desplegará automáticamente en cada push

#### Configuración:
```toml
# netlify.toml
[build]
  publish = "."
  command = "echo 'Static site - no build needed'"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

---

### 3. Vercel (GRATUITO)

```bash
# Instalar Vercel CLI
npm i -g vercel

# En la carpeta del proyecto
vercel

# Seguir las instrucciones
```

#### Configuración vercel.json:
```json
{
  "version": 2,
  "name": "banco-RGO-website",
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

### 4. Firebase Hosting (GRATUITO)

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar proyecto
firebase init hosting

# Configurar:
# - Public directory: . (punto)
# - Single-page app: No
# - GitHub integration: Si (opcional)

# Desplegar
firebase deploy
```

---

### 5. Surge.sh (GRATUITO)

```bash
# Instalar Surge
npm install -g surge

# En la carpeta del proyecto
surge

# Elegir dominio: banco-RGO-Randy G..surge.sh
```

---

## 🔧 Optimizaciones Antes del Despliegue

### 1. Validar Código

```bash
# Verificar HTML
# Online: validator.w3.org

# Verificar CSS
# Online: jigsaw.w3.org/css-validator

# Verificar JavaScript
# ESLint o JSHint
```

### 2. Optimizar Rendimiento

#### Minificar CSS:
```css
/* Usar herramientas online como:
- cssminifier.com
- O mantener código legible para fines académicos */
```

#### Optimizar Imágenes:
```bash
# Comprimir imágenes si tienes
# tinypng.com
# O usar formato WebP
```

### 3. Configurar SEO

#### Meta Tags Verificados:
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Banco RGO - Sitio bancario desarrollado por Randy G. RGO">
<meta name="keywords" content="banco, RGO, Randy G., informática, proyecto">
<meta name="author" content="Randy G. RGO">
```

---

## 📊 Testing Post-Despliegue

### 1. Pruebas Funcionales
- ✅ Navegación entre secciones
- ✅ Menús desplegables
- ✅ Responsividad móvil
- ✅ Animaciones y efectos
- ✅ Enlaces del footer

### 2. Pruebas de Rendimiento

#### Google PageSpeed Insights:
```
URL: https://pagespeed.web.dev/
Ingresa tu URL desplegada
```

#### Lighthouse (DevTools):
```bash
# En Chrome DevTools
F12 > Lighthouse > Generate Report
```

### 3. Pruebas Cross-Browser
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge

---

## 🌍 Dominios Personalizados (Opcional)

### Para GitHub Pages:
1. Compra dominio (ejemplo: bancoRGO.com)
2. Configurar DNS:
   ```
   A Record: 185.199.108.153
   A Record: 185.199.109.153
   A Record: 185.199.110.153
   A Record: 185.199.111.153
   ```
3. En GitHub Settings > Pages > Custom domain

### Para Netlify:
1. Netlify Dashboard > Domain settings
2. Add custom domain
3. Configurar DNS según instrucciones

---

## 🔒 HTTPS y Seguridad

Todas las plataformas mencionadas proporcionan HTTPS automático:
- ✅ GitHub Pages: SSL gratuito
- ✅ Netlify: Let's Encrypt automático
- ✅ Vercel: SSL incluido
- ✅ Firebase: HTTPS por defecto

---

## 🚨 Solución de Problemas Comunes

### Problema: GitHub Pages no actualiza
**Solución:**
```bash
git add .
git commit -m "🔧 Fix: Force update"
git push origin main
# Esperar 5-10 minutos
```

### Problema: CSS/JS no carga
**Verificar rutas:**
```html
<!-- Correcto -->
<link rel="stylesheet" href="css/styles.css">
<script src="js/script.js"></script>

<!-- Incorrecto -->
<link rel="stylesheet" href="/css/styles.css">
```

### Problema: Sitio no responsivo
**Verificar viewport:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 📱 PWA Deployment (Avanzado)

Para convertir en Progressive Web App:

### 1. Service Worker:
```javascript
// sw.js
const CACHE_NAME = 'banco-RGO-v1';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/script.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

### 2. Registrar SW:
```javascript
// En script.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

---

## 📈 Monitoreo Post-Despliegue

### Analytics (Opcional):
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Uptime Monitoring:
- UptimeRobot.com (gratuito)
- StatusPage.io

---

## ✅ Checklist Final

Antes de entregar tu proyecto:

### Funcionalidad:
- [ ] Todas las secciones cargan correctamente
- [ ] Navegación fluida entre páginas
- [ ] Menús desplegables funcionan
- [ ] Responsivo en móviles
- [ ] No hay errores en consola

### SEO y Performance:
- [ ] Meta tags configurados
- [ ] Lighthouse score > 90
- [ ] Tiempo de carga < 3 segundos
- [ ] Imágenes optimizadas

### Documentación:
- [ ] README.md actualizado con URL en vivo
- [ ] Información de contacto correcta
- [ ] Créditos académicos incluidos

---

## 📞 URLs de Ejemplo para Randy G.

### Sugerencias de URL:
```
# GitHub Pages
https://Randy G..github.io/banco-RGO-website

# Netlify
https://banco-RGO-Randy G..netlify.app

# Vercel
https://banco-RGO-website.vercel.app

# Surge
https://banco-RGO-Randy G..surge.sh

# Dominio personalizado (futuro)
https://bancoRGO.com.do
```

---

## 🎯 Entrega del Proyecto

### Formato para profesor:
```
🎓 PROYECTO: BANCO RGO WEBSITE
👨‍💻 DESARROLLADOR: Randy G. RGO (24 años)
📚 CARRERA: Licenciatura en Informática

🌐 SITIO EN VIVO: 
https://Randy G..github.io/banco-RGO-website

📂 REPOSITORIO:
https://github.com/Randy G./banco-RGO-website

📱 MÓVIL FRIENDLY: ✅ Completamente responsive
⚡ PERFORMANCE: ✅ Optimizado y rápido
🎨 DISEÑO: ✅ Profesional y moderno
💻 FUNCIONALIDAD: ✅ JavaScript interactivo
```

---

**💻 Desarrollado con dedicación por Randy G. RGO**  
**🎓 Proyecto Académico Original - 2025**  
**📧 Contacto: Cup.dawn.d@gmail.com**
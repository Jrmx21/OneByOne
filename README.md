# 🌟 OneByOne by ruizz02  

**OneByOne** es una aplicación diseñada para mejorar el bienestar emocional mediante frases motivadoras aleatorias y fotos inspiradoras diarias. Nuestra misión es llenar de positividad el día de los usuarios y ofrecerles la posibilidad de contribuir con sus propias inspiraciones.  

---

## 🌈 **Introducción**  

OneByOne se inspira en aplicaciones como BeReal, pero en lugar de compartir momentos personales, se centra en brindar motivación diaria mediante:  
- ✨ **Frases motivadoras** seleccionadas cuidadosamente.  
- 🖼️ **Fotos del día** que capturan la belleza y la creatividad.  

Los usuarios pueden participar activamente, enviando sus propias frases y fotos para que sean compartidas con la comunidad. ¡Incluso pueden contribuir de forma anónima!  

> 🎯 **Objetivo**: Fomentar un espacio digital donde cada día sea un recordatorio para sonreír y tener una mentalidad positiva.  

---

## 💡 **Idea inicial**  

OneByOne es una aplicación desarrollada con **Ionic**, desplegada en **Android Studio** y con una arquitectura técnica sólida que garantiza una experiencia única.  

- 📋 **Estructura principal**:
  - **Página principal (Home):** Foto y frase del día con opciones para refrescar y compartir.
  - **Buscador:** Encuentra frases aprobadas por el administrador.  
  - **Envío de contenido:** Sube fotos (una cada 4 horas) y frases motivadoras (cada 5 minutos).  
- 🌙 **Modo oscuro y claro:** Personaliza tu experiencia con un tema a tu gusto.  
- 🔐 **Sistema de autenticación seguro:** Protegido con Firebase y reglas claras de acceso.  

---

## 🛠️ **Características técnicas destacadas**  

### 🔗 **Frontend**
- **Framework:** Ionic + Angular.  
- **Enrutamiento inteligente:** Sistema robusto con rutas protegidas por guards.  

### ☁️ **Backend**
- **Base de datos:** Firebase Realtime Database para un CRUD completo.  
- **Autenticación:** Firebase Authentication con verificación por correo electrónico.  

### 🍪 **Gestión de cookies**
- Controla la frecuencia de subida de contenido y muestra modales personalizados.  

---

## 📱 **Funciones clave para el usuario**  

### 🖼️ **Foto y frase del día**  
Los usuarios pueden visualizar cada día:  
- 🌄 Una **foto del día** seleccionada por el administrador.  
- 💬 Una **frase motivadora** para inspirarse.  

### 🔎 **Buscador intuitivo**  
Encuentra frases motivadoras aprobadas y explora contenido inspirador.  

### 📤 **Contribuciones ilimitadas**  
Sube frases sin límite y comparte una foto cada 4 horas.  

### 📤 **Compartir inspiración**  
- 🔗 Comparte frases y fotos en tus redes sociales con el plugin **Share**.  
- 📋 Copia frases con un clic gracias al plugin **Clipboard**.  

---

## 🔧 **Funciones clave para el administrador**  

### 📚 **Gestión de frases y fotos**  
- ✍️ Agregar y aprobar frases enviadas por usuarios.  
- 🖼️ Seleccionar y gestionar las fotos del día.  

### 🌟 **Contenido destacado**  
- Marca frases y fotos como favoritas para ser mostradas como el contenido principal.  

### 📊 **Visualización avanzada**  
- Gestiona tablas detalladas con información sobre autores, fechas y estados del contenido.  

---

## 📒 **Explicación técnica**  

### 🔥 **Firebase**  
- **Realtime Database:** Almacena y recupera frases, fotos y usuarios.  
- **Authentication:** Garantiza un acceso seguro con registro y login.  
- **CRUD:** Gestión completa desde el área de administración.  

### 🎥 **Capacitor Plugins**  
- **Camera:** Permite a los usuarios capturar y subir fotos.  
- **Local Notifications:** Recordatorios diarios para que los usuarios no olviden inspirarse.  
- **Share:** Comparte frases y fotos en redes sociales.  

---

## 🎨 **Interfaz de usuario**  

- **Cabecera personalizada:** Diseño unificado para todas las páginas.  
- **Diseño responsivo:** Optimizado para diferentes dispositivos.  
- **Tema visual adaptable:** Cambia entre modo claro y oscuro fácilmente.  

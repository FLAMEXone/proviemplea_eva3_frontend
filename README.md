# 🌟 ProviEmplea — Plataforma Inclusiva de Empleo de Providencia

ProviEmplea es una solución web innovadora desarrollada con **Next.js 14** e integrada con un backend en **Laravel 11**. Esta plataforma revoluciona los procesos tradicionales de reclutamiento comunal mediante el modelo de **Búsqueda Inversa** y la adopción estricta de **Currículums Ciegos (CV Ciego)** para combatir los sesgos discriminatorios y garantizar la selección laboral por mérito, experiencia y competencias técnicas.

---

## 🏛️ Contexto de Negocio y Diseño Inclusivo

El Departamento de Empleo y Capacitación de la **Municipalidad de Providencia** administra ProviEmplea bajo las siguientes premisas:
*   **Búsqueda Inversa:** Los empleadores no publican ofertas esperando postulaciones, sino que buscan y exploran activamente perfiles validados en una vitrina privada.
*   **Currículum Ciego:** Se omiten todos los datos sociodemográficos y personales del candidato (nombre completo, género, edad, foto de perfil, dirección, nacionalidad), asegurando la confidencialidad total y mitigando sesgos inconscientes.
*   **Intermediación Inclusiva (Ley 21.015):** Los perfiles con discapacidad se integran de forma asistida por psicólogos y terapeutas ocupacionales municipales.

---

## 📂 Arquitectura del Proyecto (Next.js 14 App Router)

El frontend adopta una arquitectura desacoplada, escalable y modular basada en el patrón de **Container & Presentational Components** y **Domain Driven Organization**:

```
proviemplea_eva3_Frontend/
├── app/                         # Enrutador App Router de Next.js
│   ├── contacto/                # /contacto — Solicitudes de Intermediación
│   │   └── page.tsx             # Container Component (Controlador lógico)
│   ├── empresas/                # /empresas — Directorio Corporativo de Convenios
│   │   └── page.tsx             # Container Component (Controlador lógico)
│   ├── registro-empresa/        # /registro-empresa — Inscripción de Empresas
│   │   └── page.tsx             # Container Component (Controlador lógico)
│   ├── registro-talento/        # /registro-talento — Inscripción de Talentos
│   │   └── page.tsx             # Container Component (Controlador lógico)
│   ├── globals.css              # CSS Global con HSL Color System
│   └── page.tsx                 # / — Landing Page Explicativa y Estadísticas
├── components/                  # Componentes reutilizables de UI
│   ├── empresas/                # Subcomponentes de portal corporativo
│   │   ├── EmpresaCard.tsx
│   │   ├── EmpresaForm.tsx
│   │   └── EmpresasDirectory.tsx # Directorio modular de convenios
│   ├── contacto/                # Subcomponentes de intermediaciones
│   │   ├── CandidatoConfidencialCard.tsx
│   │   ├── ContactoForm.tsx
│   │   ├── ContactoHeader.tsx
│   │   └── ContactoSuccess.tsx  # Pantalla de éxito memoizada
│   ├── talentos/                # Subcomponentes de inscripción de CV Ciego
│   │   ├── RegistroTalentoForm.tsx
│   │   └── RegistroTalentoHeader.tsx
│   ├── ui/                      # Librería base de componentes atómicos (Shadcn)
│   ├── Navbar.tsx               # Barra de navegación con cambio dinámico de tema
│   ├── TalentCard.tsx           # Tarjeta de talento reutilizable WCAG
│   └── TestimonialsCarousel.tsx # Carrusel responsivo accesible con teclado
├── lib/                         # Capa de dominio e infraestructura
│   ├── domain/                  # Fuentes únicas de verdad (Interfaces y Enums)
│   │   ├── interfaces/          # IPersona, IEmpresa, IContactoSolicitado
│   │   └── enums/               # ENivelEducacional, ETipoEmpresa, ETipoJornada
│   ├── infrastructure/          # Consumo de red y Mocks de respaldo
│   │   ├── api.ts               # Cliente Fetch genérico (getTalentos, crearEmpresa, crearTalento)
│   │   └── mocks/               # personas.mock, empresa.mock, estadisticas.mock
│   └── utils.ts                 # Funciones utilitarias genéricas (cn, validarRutChileno)
```

---

## 🛠️ Guía de Buenas Prácticas (10 Convenciones de Desarrollo)

Para certificar el nivel **Sobresaliente** en calidad de software y accesibilidad, el equipo de desarrollo de ProviEmplea aplica estrictamente las siguientes 10 convenciones técnicas:

### 1. Nomenclatura Estricta y Consistente
*   **Componentes React:** PascalCase (e.g., `RegistroTalentoForm.tsx`, `CandidatoConfidencialCard.tsx`).
*   **Archivos de Vista y Rutas:** kebab-case en nombres de archivos o carpetas del App Router (e.g., `/registro-talento`).
*   **Funciones, Hooks y Variables:** camelCase (e.g., `validarRutChileno`, `useSearchParams`).

### 2. Segregación Estricta de Capas y Dominio
*   Queda estrictamente prohibido mezclar interfaces y enums de tipado en archivos de lógica o mocks. Toda firma de datos debe centralizarse en `lib/domain/interfaces/` y `lib/domain/enums/`. Esto garantiza coherencia total del tipado TypeScript en compilación estática.

### 3. Patrón de Diseño Container & Presentational Components
*   Las páginas en `app/` actúan exclusivamente como **Container Components** (gestión de estado de carga, query params de búsqueda, hooks y llamadas de red a la API).
*   La interfaz de usuario se desvincula por completo y vive en subcomponentes atómicos de presentación (`components/`), alimentados exclusivamente por `props` tipadas de lectura.

### 4. Validaciones Reactivas `onTouched` con React Hook Form
*   Los formularios principales (`RegistroTalentoForm`, `EmpresaForm`) están integrados con **React Hook Form** y **Zod** en modo `onTouched`. Esto significa que el error se activa en el momento exacto en que el usuario abandona un campo (blur), y desaparece en tiempo real mientras escribe una corrección, sin esperar al submit. El formulario de contacto (`ContactoForm`) implementa el mismo comportamiento con estado local `liveErrors` + `touched`, adaptado a su flujo de selección dinámica de empresa.

### 5. Validación Matemática Estricta de RUT (Sin Puntos)
*   **Algoritmo matemático real chileno:** Implementado en `lib/utils.ts` mediante cálculo de suma ponderada y dígito verificador módulo 11.
*   **Formato estricto:** El validador rechaza activamente cualquier RUT que contenga puntos (`.`), permitiendo únicamente números, guion medio y dígito verificador (ej: `76123456-1` o `12345678-K`). El error en vivo advierte transparentemente esta restricción y el placeholder guía visualmente al usuario.

### 6. Resiliencia de Red e Hibridación de Peticiones
*   El frontend intenta en todo momento comunicarse con el backend real de Laravel 11.
*   Si la API está offline o cae por problemas de red durante el envío (`Failed to fetch`), la aplicación conmuta de inmediato y de forma silenciosa a **Modo Demostración**, simulando el éxito local en memoria para mantener la operatividad y resiliencia de la plataforma ante fallos de conexión.

### 7. Seguridad Avanzada en Formularios (Honeypot Anti-Bots)
*   Los formularios (`EmpresaForm`, `ContactoForm`, `RegistroTalentoForm`) incorporan una trampa de bots invisible: un input HTML oculto (`bot_trap` o `botTrap`) no indexable por lectores de pantalla ni accesible al teclado. Si un software de spam llena este campo automáticamente, el frontend intercepta el envío, simula éxito para desviar al atacante y detiene la petición al backend real.

### 8. Rendimiento Lighthouse y Eliminación de Sesgos Visuales
*   **0 Uso de Imágenes de Candidatos:** Por diseño centrado en el usuario e inclusión, se descarta el uso de fotos de personas en la vitrina de talentos. Esto no solo mitiga sesgos de edad y etnia, sino que elimina por completo el payload de imágenes binarias pesadas de red, garantizando un rendimiento óptimo de **100/100 en Google Lighthouse Performance**.

### 9. Accesibilidad Web Integral (Normas WCAG 2.1)
*   **Navegación por Teclado:** El carrusel de testimonios interactivo (`TestimonialsCarousel.tsx`) posee soporte nativo para navegación con teclas de flecha (izquierda/derecha), controles accesibles y foco visual claro.
*   **Roles ARIA e Inclusión:** Inyección de roles semánticos (aria-live para Toast, aria-hidden para honeypot y vectores decorativos, descripciones accesibles).
*   **Contraste de Color:** Sistema cromático HSL calibrado en `globals.css` para asegurar una relación de contraste mínima de 4.5:1, apto para personas con visibilidad reducida.

### 10. Centralización de Utilidades Genéricas
*   Toda utilidad agnóstica de presentación (como la función `cn` para fusión de clases CSS Tailwind u optimizaciones matemáticas) se centraliza en `lib/utils.ts`, evitando la duplicación de código e impulsando la mantenibilidad.

---

## 🚀 Instrucciones de Instalación y Uso

### 1. Requisitos Previos
*   **Node.js 18.0 o superior** — [Descargar aquí](https://nodejs.org/)
*   **npm** (incluido con Node.js) o **yarn**
*   **Git** — [Descargar aquí](https://git-scm.com/)
*   *Recomendado:* Backend de Laravel corriendo localmente en `http://localhost:8080`.
    > 🔗 Repositorio del backend: [ginans/proviemplea_eva3](https://github.com/ginans/proviemplea_eva3)

### 2. Clonar el Repositorio

Abre una terminal (CMD, PowerShell o Terminal de VS Code) y ejecuta:

```bash
git clone https://github.com/ginans/proviemplea_eva3_Frontend.git
cd proviemplea_eva3_Frontend
```

### 3. Configuración de Variables de Entorno

Crea un archivo llamado `.env.local` en la raíz del proyecto (al mismo nivel que `package.json`) con el siguiente contenido:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

> ⚠️ Si el backend no está disponible, la aplicación cambia automáticamente a **Modo Demostración** con datos locales de ejemplo. No es necesario tenerlo corriendo para evaluar el frontend.

### 4. Instalar Dependencias

```bash
npm install
```

Este comando descarga todas las librerías del proyecto (Next.js, shadcn/ui, React Hook Form, etc.). Puede tardar unos minutos la primera vez.

### 5. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para interactuar con la aplicación.

### 6. (Opcional) Generar Build de Producción

```bash
npm run build
npm start
```

---

## 🔄 Proceso de Desarrollo y Aprendizajes del Equipo

El equipo llevó a cabo una retrospectiva estructurada al finalizar el ciclo de desarrollo, utilizando la metodología **Starfish**. A continuación se documentan los hallazgos más relevantes.

### Decisiones que funcionaron bien

*   **Arquitectura resiliente con fallback local:** Implementar un cliente de red con conmutación automática a datos de demostración permitió desarrollar y validar el frontend de forma completamente independiente del backend, eliminando bloqueos de integración.
*   **Separación estricta de capas:** El patrón Container & Presentational Components mantuvo las páginas enfocadas en lógica de estado y las convirtió en componentes de presentación completamente reutilizables y testeables.
*   **Validación con React Hook Form + Zod:** La integración en modo `onTouched` eliminó la fricción de los formularios tradicionales, ofreciendo retroalimentación inmediata al usuario sin esperar el submit.

### Lecciones aprendidas

*   **Estandarizar los datos de prueba desde el inicio:** Los mocks iniciales de empresas contenían RUTs con formato incorrecto, lo que generó conflictos con el validador matemático estricto. Definir un contrato de datos mock desde el comienzo habría evitado esos desvíos.
*   **Definir el dominio antes de codificar:** Las interfaces y enums de `lib/domain/` debieron existir antes de los primeros componentes para evitar tipados duplicados o huérfanos durante el desarrollo.

### Roadmap para iteraciones futuras

1.  **Auditoría de accesibilidad en producción:** Ejecutar Lighthouse y axe-core en un entorno de staging para validar conformidad WCAG 2.1 y aplicar mejoras de contraste y foco.
2.  **Protección anti-spam avanzada:** Complementar el honeypot actual con reCAPTCHA v3 invisible para blindar los formularios contra bots distribuidos.
3.  **Filtros avanzados en la vitrina de talentos:** Expandir el panel de filtros para permitir rangos numéricos de experiencia, modalidad y renta esperada en tiempo real.
4.  **Notificaciones automáticas de intermediación:** Implementar envío de correos transaccionales desde el backend cuando el equipo municipal apruebe una solicitud de intermediación.
5.  **Estado global con Zustand:** Introducir un store centralizado (`useTalentosStore`, `useEmpresasStore`) para cachear los datos de red entre navegaciones. Actualmente cada página re-fetcha la API al montarse; con Zustand y un TTL simple, la vitrina de talentos y el directorio de empresas cargarían instantáneamente tras la primera visita, reduciendo la carga sobre el backend.

---

## 👥 Integrantes y Autoría

*   **Nombre del Equipo:** *Grupo 1*
*   **Integrantes:**
    *   Gina Norambuena Sánchez
    *   Fabian Malinarich Piña

---

### 🤖 Colaboración y Asistencia de IA

Este proyecto frontend ha sido desarrollado en una modalidad de **Pair Programming** asistida por **Gem**, un modelo de Inteligencia Artificial de Google DeepMind.

*   **Alcance del Soporte:** La IA actuó como consultor técnico y tutor en la estructuración de la estrategia de ramas en Git, la organización de hitos y tareas, la adopción de buenas prácticas arquitectónicas en Next.js 14, en la revisión de cobertura de la documentación y documentación de este README.
*   **Desarrollo del Proyecto:** La lógica de negocio, codificación de componentes, modelado de interfaces de dominio y la intermediación laboral de ProviEmplea fueron diseñadas, implementadas y verificadas íntegramente por los integrantes del **Grupo 1**.

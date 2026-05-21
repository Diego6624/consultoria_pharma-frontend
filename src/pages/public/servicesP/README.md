# Sección de Servicios - Documentación

## Descripción General
Se ha implementado un sistema completo de servicios con búsqueda, filtrado por categorías y navegación por ID.

## Componentes Creados/Modificados

### 1. **SearchServices.jsx** (Modificado)
- **Ubicación**: `src/pages/public/servicesP/components/SearchServices.jsx`
- **Props**:
  - `searchTerm`: string - término de búsqueda actual
  - `onSearchChange`: función - callback para cambios en la búsqueda
  - `selectedCategory`: string - categoría seleccionada
  - `onCategoryChange`: función - callback para cambios de categoría
  - `categories`: array - lista de categorías disponibles

**Features**:
- Input de búsqueda con ícono y botón para limpiar
- Select dinámico con categorías
- Diseño responsive
- Consistencia visual con el proyecto

### 2. **ServicesCard.jsx** (Modificado)
- **Ubicación**: `src/components/ServiceCard.jsx`
- **Props**:
  - `id`: string - identificador único del servicio
  - `category`: string - categoría del servicio
  - `title`: string - título del servicio
  - `description`: string - descripción breve
  - `features`: array - lista de características
  - `image`: string - URL de la imagen
  - `categoryBadgeColor`: string - color personalizado (opcional)

**Features**:
- Card interactivo con efecto hover
- Badge de categoría con color dinámico
- Lista de características con checkmarks
- Botón "Ver detalle" con navegación por ID
- Colores por categoría:
  - **Regulatorio**: Teal (#14B8A6)
  - **Calidad**: Cyan (#06B6D4)
  - **Gestión**: Purple (#A855F7)

### 3. **ServicesList.jsx** (Nuevo)
- **Ubicación**: `src/components/ServicesList.jsx`
- **Props**:
  - `services`: array - lista de servicios a mostrar
  - `searchTerm`: string - término de búsqueda para filtrar
  - `selectedCategory`: string - categoría para filtrar
  - `isLoading`: boolean - estado de carga

**Features**:
- Filtrado por búsqueda (título y descripción)
- Filtrado por categoría
- Grid responsive (1 col mobile, 2 tablet, 3 desktop)
- Estados de carga y sin resultados

### 4. **ServiceDetailPage.jsx** (Nuevo)
- **Ubicación**: `src/pages/public/servicesP/ServiceDetailPage.jsx`
- **Características**:
  - Vista detallada del servicio con ID
  - Navegación con parámetro `:id`
  - Hero section con imagen grande
  - Lista completa de características
  - Sidebar con CTA "Solicitar consultoría"
  - Servicios relacionados (misma categoría)
  - Botón para volver a servicios

### 5. **servicesData.js** (Nuevo)
- **Ubicación**: `src/pages/public/servicesP/data/servicesData.js`
- **Estructura de datos**:
```javascript
{
  id: 'unique-id',
  category: 'Regulatorio|Calidad|Gestión',
  title: 'Título del servicio',
  description: 'Descripción breve',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  image: imageCard
}
```

## Rutas Actualizadas

### `src/routes/routes.jsx`
- Nueva ruta: `/services/:id` → `ServiceDetailPage`
- Ruta existente: `/services` → `ServicesPage`

## Flujo de Uso

1. **Página Principal de Servicios** (`/services`)
   - Usuario ve SearchServices con input y select
   - Usuario ingresa término de búsqueda o selecciona categoría
   - Se filtran servicios en tiempo real
   - Puede hacer clic en una tarjeta o el botón "Ver detalle"

2. **Navegación a Detalle** (`/services/:id`)
   - Usuario ve información completa del servicio
   - Ve características en detalle
   - Puede ver servicios relacionados
   - Puede contactar o volver a servicios

## Integraciones

- **SearchServices**: Se integra con el estado de `ServicesPage`
- **ServicesList**: Recibe datos filtrados y renderiza tarjetas
- **ServicesCard**: Cada tarjeta es clickeable y navega al detalle
- **ServiceDetailPage**: Obtiene datos del ID y muestra información completa

## Estilos y Diseño

- **Colores primarios**: Cyan (#06B6D4), Teal, Purple
- **Tipografía**: Consistente con el proyecto (Tailwind)
- **Espaciado**: Responsive con breakpoints móvil/tablet/desktop
- **Animaciones**: Hover suave, transiciones CSS
- **Accesibilidad**: Botones con hover visible, inputs accesibles

## Datos Incluidos

Servicios predefinidos (6 servicios):
- Registros Sanitarios (Regulatorio)
- Certificaciones BPA (Calidad)
- Autorización de Local (Gestión)
- Certificaciones BPM (Calidad)
- Farmacovigilancia (Regulatorio)
- Apertura de Droguerías (Gestión)

## Extensiones Futuras

- Conectar SearchServices con API backend
- Agregar paginación
- Agregar más filtros (presupuesto, duración, etc.)
- Integrar formulario de contacto real en ServiceDetailPage
- Agregar comentarios/reseñas

## Notas Técnicas

- Usa `react-router-dom` para navegación
- Estado manejado con `useState` en `ServicesPage`
- Componentes reutilizables y composables
- Imágenes importadas como módulos estáticos
- Tailwind CSS para estilos

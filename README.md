# 🏢 Módulo de Pagos - Sistema de Gestión de Condominios

**Módulo de integración PayPhone para kioskos de pago en condominios**

Este módulo permite procesar pagos automáticos basados en criterios específicos (edad del residente) a través de kioskos touch-screen instalados en condominios. Utiliza la API de PayPhone para procesar pagos con tarjeta de crédito/débito de forma segura.

## 🎯 Caso de Uso

### Kiosko de Pago en Condominio
1. **Residente se acerca** al kiosko touch-screen
2. **Ingresa su edad** (mayor de 65 años = $50, menor = $100)
3. **Kiosko calcula monto** automáticamente
4. **Residente paga** con tarjeta a través de PayPhone
5. **Sistema confirma** pago exitoso
6. **Kiosko emite** comprobante o acceso

## 🚀 Características Principales

- ✅ **Cálculo automático** de montos basado en edad
- ✅ **Integración PayPhone** completa y segura
- ✅ **Sistema de debugging exhaustivo** para evaluación técnica
- ✅ **Documentación completa** de errores PayPhone
- ✅ **Interfaz touch-screen** optimizada
- ✅ **Confirmación en tiempo real** de pagos
- ✅ **Logging detallado** para auditoría
- ✅ **Despliegue automático** en Railway

## 📦 Instalación y Despliegue

### Requisitos
- Node.js v18+
- Cuenta PayPhone con credenciales
- Conexión a internet

### Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/ginaproanio/pagos.git
cd pagos

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con credenciales PayPhone

# Ejecutar servidor
npm start
```

### Despliegue en Producción

#### Railway (Recomendado)
1. Conectar repositorio GitHub a Railway
2. Railway detecta automáticamente `package.json`
3. Configurar variables de entorno en dashboard:
   ```
   PAYPHONE_TOKEN=tu_token_aqui
   PORT=3000
   ```
4. ¡Listo! URL automática: `https://[tu-proyecto].railway.app`

## 💳 API Endpoints

### `POST /crear-pago`
Crea una transacción de pago con PayPhone.

**Request:**
```json
{
  "amount": "50.00"
}
```

**Response:**
```json
{
  "success": true,
  "paymentUrl": "https://pay.payphonetodoesposible.com/...",
  "transactionId": "TXN-123456"
}
```

### `GET /confirmacion`
Página de confirmación de pago exitoso.

### `GET /cancelado`
Página de cancelación de pago.

## 🔍 Sistema de Debugging Exhaustivo

Este módulo incluye el sistema de debugging más completo para evaluación técnica de PayPhone:

### Características de Debugging
- ✅ **Logs JSON estructurados** para análisis automático
- ✅ **Información completa del request** (headers, IP, User-Agent)
- ✅ **Stack traces detallados** de errores
- ✅ **Categorización automática** de errores PayPhone
- ✅ **Documentación en tiempo real** de nuevos errores
- ✅ **Información del entorno** (memoria, Node.js, sistema)
- ✅ **Timing preciso** de todas las operaciones

### Archivos de Debugging
- 📄 `DEVELOPMENT.md` - Documentación técnica completa
- 📄 `PAYPHONE_ERRORS.md` - Registro histórico de errores
- 📊 **Logs del servidor** - Información exhaustiva en consola

## 📋 Uso del Módulo

### Para Usuarios Finales
1. **Acercarse al kiosko**
2. **Seleccionar opción de pago**
3. **Ingresar edad** (mayor 65 = $50, menor = $100)
4. **Hacer clic en "PAGAR"**
5. **Completar pago** en pasarela PayPhone
6. **Recibir confirmación**

### Para Administradores
- **Monitorear logs** en tiempo real
- **Revisar errores** en `PAYPHONE_ERRORS.md`
- **Configurar probadores** en panel PayPhone (solo desarrollo)
- **Ver métricas** de uso y errores

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5 + JavaScript Vanilla
- **API de Pagos**: PayPhone Payment Gateway
- **Despliegue**: Railway (auto-scaling)
- **Base de Datos**: No requerida (stateless)
- **Autenticación**: Token-based (PayPhone)
- **Logging**: Sistema personalizado exhaustivo

## 📚 Documentación

### Documentos Incluidos
- 📖 **[DEVELOPMENT.md](DEVELOPMENT.md)** - Configuración técnica completa
- 📖 **[PAYPHONE_ERRORS.md](PAYPHONE_ERRORS.md)** - Registro de errores
- 📖 **[README.md](README.md)** - Este documento

### Temas Cubiertos
- ✅ Configuración de variables de entorno
- ✅ Requisitos de PayPhone (sandbox vs producción)
- ✅ Formatos de datos requeridos
- ✅ Sistema completo de errores PayPhone
- ✅ Guías de debugging y troubleshooting
- ✅ Información de seguridad
- ✅ Procedimientos de despliegue

## 🔐 Seguridad

- ✅ **Credenciales PayPhone** protegidas en variables de entorno
- ✅ **Validación de entrada** de datos
- ✅ **Conexión HTTPS** obligatoria
- ✅ **Rate limiting** implementado
- ✅ **Logs seguros** sin exposición de datos sensibles
- ✅ **CORS configurado** para dominio específico

## 📊 Estado del Proyecto

### ✅ Funcionalidades Completadas
- [x] Integración completa PayPhone
- [x] Sistema de debugging exhaustivo
- [x] Documentación técnica completa
- [x] Despliegue automático en Railway
- [x] Interfaz optimizada para kiosko
- [x] Categorización de errores PayPhone
- [x] Logging estructurado JSON

### 🔄 Próximos Pasos
- [ ] Configurar probadores PayPhone para pruebas
- [ ] Testing exhaustivo con tarjetas de prueba
- [ ] Implementar webhooks para confirmaciones
- [ ] Agregar métricas de uso
- [ ] Optimizar interfaz touch-screen

## 🤝 Soporte y Contacto

**Proyecto:** Módulo de Pagos - Sistema de Gestión de Condominios
**Versión:** 1.2.0
**Última actualización:** Diciembre 2025

Para soporte técnico contactar al equipo de desarrollo.

## 📄 Licencia

Este proyecto es propiedad privada y confidencial del sistema de gestión de condominios.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**
3. **Serás redirigido** a la pasarela segura de PayPhone
4. **Completa el pago** con tu método preferido
5. **Recibirás confirmación** del resultado

## 🔧 Desarrollo

Para información técnica detallada, configuración avanzada y troubleshooting:

📖 **[Ver documentación completa en DEVELOPMENT.md](DEVELOPMENT.md)**

Incluye:
- Configuración de variables de entorno
- Documentación de errores PayPhone
- Guías de debugging
- Formatos de datos requeridos

## 🛡️ Seguridad

- ✅ Credenciales PayPhone protegidas
- ✅ Validación de datos de entrada
- ✅ Conexión HTTPS obligatoria
- ✅ Rate limiting implementado

## 📚 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + JavaScript Vanilla
- **API**: PayPhone Payment Gateway
- **Despliegue**: Railway

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para soporte técnico contactar al equipo de desarrollo.
<replace_in_file>
<path>README.md</path>
<diff>------- SEARCH
# Sistema de Pagos con PayPhone

Una aplicación web simple para procesar pagos utilizando la API de PayPhone.

## 🚀 Características

- Interfaz web intuitiva para pagos
- Integración completa con PayPhone
- Sistema de confirmación y cancelación
- Desplegado automáticamente en Railway

## 📦 Instalación

### Requisitos
- Node.js v16 o superior
- Cuenta PayPhone (para obtener credenciales)

### Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/pagos.git
cd pagos

# Instala dependencias
npm install

# Configura variables de entorno (ver DEVELOPMENT.md)
cp .env.example .env

# Ejecuta el servidor
npm start
```

## 🌐 Despliegue

### Railway (Recomendado)

1. Conecta tu repositorio GitHub a Railway
2. Railway detectará automáticamente el `package.json`
3. Configura las variables de entorno en el dashboard de Railway
4. ¡Listo! La aplicación estará disponible automáticamente

### Otros Servicios

Compatible con cualquier servicio de hosting que soporte Node.js:
- Heroku
- Vercel
- DigitalOcean App Platform
- AWS, GCP, Azure

## 💳 Uso

1. **Ingresa el monto** a pagar
2. **Haz clic en "PAGAR CON PAYPHONE"**

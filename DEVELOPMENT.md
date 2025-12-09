# PayPhone Integration - Desarrollo

Este documento contiene toda la información técnica, errores, debugging y configuración detallada para el desarrollo e integración con PayPhone.

## ⚠️ CONFIGURACIÓN CRÍTICA: CUENTA COMERCIAL PAYPHONE

### 🏪 ¿Quién Cobra el Dinero?

**RESPUESTA IMPORTANTE**: Para RECIBIR pagos, el **CONDOMINIO debe tener una cuenta COMERCIAL en PayPhone**.

#### Flujo de Dinero:
```
Cliente paga con tarjeta → PayPhone procesa → Dinero va a CUENTA BANCARIA del CONDOMINIO

💰 Cliente: Pierde $50/$100 (cargo a su tarjeta)
💳 PayPhone: Cobra comisión (~2-3%)
🏦 Condominio: Recibe $48.50-$97 (depósito automático)
```

#### Requisitos para Cobrar:
1. **Registrar como COMERCIO** en PayPhone (no como cliente individual)
2. **Configurar cuenta bancaria** para recibir depósitos
3. **Obtener credenciales API** (Client ID, Secret, Token)
4. **Configurar establecimiento** con datos del condominio

### 📞 Número de Teléfono del Establecimiento

**Tu caso específico**: Número `0998842547` debe configurarse como **teléfono de contacto del comercio**, NO como probador.

#### Configuración requerida:
- **Tipo**: Teléfono del establecimiento/comercio
- **Propósito**: Contacto administrativo, NO para pagos
- **Uso**: Notificaciones, soporte, verificación

### 🏦 Proceso de Registro como Comercio:

#### **Paso 1: Crear Cuenta Comercial**
- Ir a https://payphone.app/ (o contactar a PayPhone)
- Registrar como **"Comercio/Empresa"** (NO como persona individual)
- Proporcionar RUC del condominio
- Verificar documentación legal

#### **Paso 2: Configurar Cuenta Bancaria**
- En panel PayPhone: Configurar cuenta bancaria del condominio
- PayPhone depositará fondos automáticamente después de cada pago
- Configurar frecuencia de depósitos (diario, semanal, etc.)

#### **Paso 3: Obtener Credenciales API**
- En panel PayPhone: Generar API credentials
- Obtener Client ID, Secret y Token
- Configurar en variables de entorno

#### **Paso 4: Configurar Establecimiento**
- **Razón social**: Nombre del condominio
- **RUC**: Número de registro del condominio
- **Dirección**: Ubicación del condominio
- **Teléfono de contacto**: `0998842547`
- **Correo electrónico**: Email administrativo

### 💰 ¿Cómo Funciona el Cobro?

1. **Cliente paga** en kiosko con tarjeta
2. **PayPhone procesa** el pago (verifica tarjeta con banco)
3. **PayPhone cobra comisión** por el servicio
4. **PayPhone deposita** el monto neto en cuenta bancaria del condominio
5. **Condominio recibe** notificación del depósito

### 📊 Ejemplo de Transacción:

```
Cliente paga: $50.00
Comisión PayPhone: $1.50 (3%)
Monto neto al condominio: $48.50
Depósito automático en cuenta bancaria del condominio
```

### 🔐 Variables de Entorno

**IMPORTANTE**: Estas contienen credenciales de TU cuenta comercial. Nunca las subas al repositorio.

```env
PORT=3000
# Credenciales de TU cuenta COMERCIAL en PayPhone
PAYPHONE_CLIENT_ID=tu_client_id_de_payphone
PAYPHONE_SECRET=tu_secret_de_payphone
PAYPHONE_ENCODE_PASS=tu_encode_pass_de_payphone
PAYPHONE_TOKEN=tu_token_de_payphone
```

## Configuración Técnica

### Formato de Datos PayPhone

**Teléfono**: Sin el código de país, sin el 0 inicial (ej: 999999999)
**CountryCode**: Siempre "593" para Ecuador
**Monto**: Se convierte automáticamente a centavos

### ⚠️ REQUISITOS REALES PAYPHONE - ¡CORREGIDO!

**ERROR EN NUESTRA INTERPRETACIÓN**: Pensamos que teléfono era opcional para tarjetas, pero **NO LO ES**.

#### 🎯 VERDAD sobre PAGOS CON TARJETA:

**Teléfono y CountryCode SON OBLIGATORIOS** ❌
- PayPhone requiere información del **CLIENTE que paga**
- Error 800: "PhoneNumber inválido" + "CountryCode obligatorio"
- Cliente debe proporcionar su teléfono para validación

#### 📱 Tu caso de uso REAL (KIOSKO):

**❌ CÓDIGO ACTUAL NO FUNCIONA:**
- Envía solo monto, sin datos del cliente
- PayPhone rechaza por falta de PhoneNumber/CountryCode
- **Necesitas pedir teléfono del cliente**

**✅ SOLUCIÓN CORRECTA:**
- Kiosko debe pedir: **edad + teléfono del cliente**
- Enviar `phoneNumber` y `countryCode` del cliente
- Para pruebas: teléfono debe estar registrado como "probador"

#### 🔍 ¿Qué pide PayPhone exactamente?

**Para COMERCIO (cobrar):**
- ✅ Cuenta comercial en PayPhone
- ✅ Cuenta bancaria enlazada
- ✅ Credenciales API (Client ID, Secret, Token)
- ✅ Teléfono del establecimiento (tu 0998842547)

**Para CLIENTE (pagar):**
- ✅ Teléfono válido del cliente
- ✅ CountryCode (593 para Ecuador)
- ✅ Para pruebas: teléfono registrado como "probador"

#### 📞 Tu teléfono 0998842547:

**NO es para el cliente**, es para el **ESTABLECIMIENTO**
- Configurar en PayPhone como "teléfono de contacto del comercio"
- **NO** usarlo como teléfono del cliente pagador
- Los clientes necesitan **sus propios** teléfonos registrados como probadores

### URLs de Respuesta

Después del despliegue, actualiza estas URLs en `server.js`:

```javascript
responseUrl: "https://tu-app.up.railway.app/confirmacion",
cancelUrl: "https://tu-app.up.railway.app/cancelado"
```

## Debugging y Troubleshooting

### Sistema de Errores Mejorado

El sistema incluye:
- **Contenedor visual de errores** copiable en la página
- **Logs detallados** en consola del servidor
- **Información estructurada** de errores PayPhone

### Códigos de Error PayPhone

#### Sistema de Categorización de Errores

Los errores se clasifican en las siguientes categorías para mejor diagnóstico:

- **VALIDATION_ERROR**: Errores de validación de datos enviados
- **AUTHENTICATION_ERROR**: Problemas de autenticación y autorización
- **RESOURCE_NOT_FOUND**: Recursos no encontrados (números no registrados)
- **RATE_LIMIT_ERROR**: Límite de solicitudes excedido
- **SERVER_ERROR**: Errores internos de PayPhone
- **NETWORK_ERROR**: Problemas de conectividad
- **INTERNAL_ERROR**: Errores del sistema local

#### Errores Documentados PayPhone

##### VALIDATION_ERROR (Categoría: Validación)
###### 400 - Validaciones fallidas (errorCode: 800)
**Mensaje típico**: "Validation failed"
**Campos comunes que fallan**:
- `PhoneNumber`: "Número de teléfono inválido" (debe ser sin código país, sin 0 inicial)
- `CountryCode`: "Campo obligatorio" (siempre "593" para Ecuador)
- `Amount`: "Monto inválido" (debe ser positivo, en centavos internamente)
- `Currency`: "Moneda no soportada" (solo "USD" soportado)
- `DocumentId`: "Documento de identidad inválido" (máximo 13 caracteres)
- `Email`: "Formato de email inválido"
**Solución**: Verificar formato de datos enviados según documentación PayPhone

##### AUTHENTICATION_ERROR (Categoría: Autenticación)
###### 401 - No autorizado (errorCode: 100)
**Mensaje**: "Unauthorized"
**Causa**: Token inválido, expirado o malformado
**Solución**:
- Verificar `PAYPHONE_TOKEN` en variables de entorno
- Regenerar token si expiró
- Verificar formato del header Authorization

###### 403 - Prohibido (errorCode: 110)
**Mensaje**: "Forbidden"
**Causa**: Credenciales incorrectas o permisos insuficientes
**Solución**:
- Verificar `PAYPHONE_CLIENT_ID` y `PAYPHONE_SECRET`
- Revisar permisos en panel de PayPhone
- Confirmar que la cuenta esté activa

##### RESOURCE_NOT_FOUND (Categoría: Recurso no encontrado)
###### 404 - Número no registrado (errorCode: 120)
**Mensaje**: "Lo sentimos, este número no está registrado en Payphone"
**Comportamiento**: ❌ **NO se genera URL de pasarela** - PayPhone rechaza la transacción antes de crear la URL de pago
**Causa**: El teléfono usado no está registrado como probador en PayPhone
**Validación**: PayPhone valida el número de teléfono ANTES de procesar cualquier otro dato
**Solución**:
- Agregar el número como probador en panel de PayPhone
- Usar números registrados para pruebas en sandbox
- Para producción: cualquier número válido funcionará
**Nota**: Error NORMAL en desarrollo sin probadores configurados
**Timestamp ejemplo**: 2025-12-09T11:02:33.934Z

**¿Por qué no aparece la pasarela?**
Este error ocurre en la fase de **creación de transacción** (`/api/Sale`), no en la pasarela de pago. PayPhone valida primero si el número está autorizado antes de generar la URL de pago. Si no está registrado como probador, la API rechaza directamente la solicitud sin crear ninguna URL de redirección.

##### RATE_LIMIT_ERROR (Categoría: Límite de tasa)
###### 429 - Demasiadas solicitudes (errorCode: 130)
**Mensaje**: "Too many requests"
**Causa**: Límite de rate limiting excedido
**Solución**:
- Esperar antes de reintentar
- Reducir frecuencia de solicitudes
- Implementar backoff exponencial
- Considerar upgrade de plan si es recurrente

##### SERVER_ERROR (Categoría: Error del servidor)
###### 500 - Error interno del servidor (errorCode: 200)
**Mensaje**: "Internal server error"
**Causa**: Error en los servidores de PayPhone
**Solución**:
- Reintentar más tarde
- Verificar estado de servicios PayPhone
- Reportar si persiste

##### NETWORK_ERROR (Categoría: Red)
###### Sin respuesta del servidor
**Causa**: Problemas de conectividad, firewall, DNS
**Solución**:
- Verificar conexión a internet
- Revisar configuración de firewall
- Confirmar DNS de pay.payphonetodoesposible.com

##### NETWORK_ERROR (Categoría: Error de red)
###### Sin respuesta del servidor
**Mensaje**: "Error del servidor PayPhone: Sin conexión"
**Causa**: Problemas de conectividad, firewall o DNS
**Solución**:
- Verificar conexión a internet
- Revisar configuración de red/firewall
- Intentar más tarde (puede ser temporal)
- Confirmar que pay.payphonetodoesposible.com esté accesible

##### INTERNAL_ERROR (Categoría: Error interno)
###### Error de configuración local
**Mensaje**: "Error interno: [mensaje específico]"
**Causa**: Problemas en el código del servidor local
**Solución**:
- Revisar logs del servidor
- Verificar variables de entorno
- Validar formato de datos enviados
- Revisar configuración de la aplicación

#### Errores de Gateway (502/503/504)
**Causa**: Problemas de infraestructura de PayPhone
**Solución**: Reintentar la solicitud con backoff exponencial

#### Errores HTTP Genéricos
- **400 Bad Request**: Datos malformados (ver VALIDATION_ERROR)
- **401 Unauthorized**: Problemas de token (ver AUTHENTICATION_ERROR)
- **403 Forbidden**: Permisos insuficientes (ver AUTHENTICATION_ERROR)
- **404 Not Found**: Recurso no existe (ver RESOURCE_NOT_FOUND)
- **429 Too Many Requests**: Rate limiting (ver RATE_LIMIT_ERROR)
- **500 Internal Server Error**: Error PayPhone (ver SERVER_ERROR)

### Estados de Transacción

**Approved**: Pago exitoso procesado
**Rejected**: Pago rechazado por el banco
**Cancelled**: Usuario canceló el pago
**Pending**: Pago en proceso de verificación

## Logs del Sistema

### Backend Logs
```bash
# Errores se registran automáticamente en:
console.error('Error completo:', error);
console.error('Respuesta del servidor:', error.response?.data);
console.error('Status:', error.response?.status);
```

### Frontend Logs
```javascript
// Errores se muestran en contenedor copiable
console.error("Error completo:", data);
```

## Historial de Cambios

### v1.0.0 - Sistema Básico
- Integración inicial con PayPhone
- Manejo básico de errores

### v1.1.0 - Debugging Mejorado
- Sistema de errores visual copiable
- Logs detallados en backend
- Documentación técnica separada

### v1.2.0 - Validaciones PayPhone
- Corrección de formato teléfono y countryCode
- Documentación completa de errores
- Guía de troubleshooting

## Próximos Pasos

1. **Configurar probadores en PayPhone** para eliminar error 404
2. **Implementar validaciones frontend** para datos de usuario
3. **Agregar manejo de reintentos** para errores temporales
4. **Implementar webhooks** para confirmaciones asíncronas
5. **Testing exhaustivo** con diferentes escenarios

## Notas de Seguridad

- Nunca subir `.env` al repositorio
- Mantener `PAYPHONE_TOKEN` seguro
- Usar HTTPS en producción
- Validar todos los datos de entrada
- Implementar rate limiting en el servidor

## Referencias

- [Documentación PayPhone](https://www.docs.payphone.app/)
- [API PayPhone Sandbox](https://pay.payphonetodoesposible.com/api)

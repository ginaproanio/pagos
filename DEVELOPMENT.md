# PayPhone Integration - Desarrollo

Este documento contiene toda la información técnica, errores, debugging y configuración detallada para el desarrollo e integración con PayPhone.

## Variables de Entorno

**IMPORTANTE**: Estas variables contienen información sensible. Nunca las subas al repositorio público.

```env
PORT=3000
PAYPHONE_CLIENT_ID=wbMFPpdK8EuioYnLZcLvw
PAYPHONE_SECRET=Dj0kiMVN3UGYvHIRhzNWyg
PAYPHONE_ENCODE_PASS=1ec58fe5c20e46d6929d122d3874e745
PAYPHONE_TOKEN=KwZnR4t6DGcgq_8XkME9dMVVtCIUnLOCFPLGLRHA1f_pPvXf8nhvxwtTceVyfK-sD95m6koyd1vvu-rYcDWmKqjAcE2zc2lt9LGqElXwuEmMlrIWEa64PELeQuL4D3t4Iwr2eRrbcqFuhga5n35Gijjuwex6qyoJM7o88emSEsBluZk33W437uUJhVjybA7gRVHsx0wWLdbs7QfVH6o2I0EWwnHVM3Crx7EZziB_g8ueHGi3vkElz52GyMuHCKhfyTa78oh_kvyti36GNm7wXm1H-gVBk7Wz6I4uctjPQywMAfe77eOxgidGVcRBQQljrOCGnA
```

## Configuración Técnica

### Formato de Datos PayPhone

**Teléfono**: Sin el código de país, sin el 0 inicial (ej: 999999999)
**CountryCode**: Siempre "593" para Ecuador
**Monto**: Se convierte automáticamente a centavos

### ⚠️ REQUISITOS PARA ENTORNO DE PRUEBAS

**IMPORTANTE**: Dependiendo del tipo de pago, los requisitos varían.

#### 🎯 Para PAGOS CON TARJETA (como tu kiosko):

**Teléfono y email son OPCIONALES** ✅
- Solo necesitas enviar el **monto** y **URLs de respuesta**
- PayPhone genera la pasarela para que el cliente ingrese datos de tarjeta
- No hay validación de "probadores" para pagos con tarjeta

**Campos mínimos requeridos:**
```json
{
  "amount": 5000,           // Monto en centavos
  "currency": "USD",        // Moneda
  "responseUrl": "...",     // URL de éxito
  "cancelUrl": "..."        // URL de cancelación
}
```

#### 📞 Para PAGOS CON TELÉFONO (si aplicara):

**Teléfono OBLIGATORIO como "probador"** ❌
- Si envías `phoneNumber`, debe estar registrado en PayPhone
- Error 404/120 si el teléfono no es probador
- Solo para pruebas con métodos de pago por teléfono

#### 📱 Tu caso de uso (KIOSKO):

**✅ SOLUCIÓN IMPLEMENTADA:**
- Código actualizado para **NO enviar teléfono por defecto**
- Solo envía teléfono si el frontend lo proporciona
- Para kiosko con tarjeta: **no necesitas teléfono registrado**
- PayPhone aceptará la transacción sin validación de probadores

#### 🔍 ¿Por qué funcionará ahora?

1. **Sin teléfono enviado**: PayPhone no valida probadores
2. **Pago con tarjeta**: Cliente ingresa datos en pasarela segura
3. **Validación automática**: PayPhone procesa con banco
4. **Confirmación**: Kiosko recibe resultado vía webhook/callback

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

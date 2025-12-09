# Pagos - PayPhone Integration

Este proyecto es una aplicación web para realizar pagos de prueba utilizando PayPhone.

## Características

- Interfaz simple para ingresar monto de pago
- Integración con PayPhone para procesamiento de pagos
- Páginas de confirmación y cancelación
- Desplegado en Railway

## Configuración

### Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```
PORT=3000
PAYPHONE_CLIENT_ID=wbMFPpdK8EuioYnLZcLvw
PAYPHONE_SECRET=Dj0kiMVN3UGYvHIRhzNWyg
PAYPHONE_ENCODE_PASS=1ec58fe5c20e46d6929d122d3874e745
PAYPHONE_TOKEN=KwZnR4t6DGcgq_8XkME9dMVVtCIUnLOCFPLGLRHA1f_pPvXf8nhvxwtTceVyfK-sD95m6koyd1vvu-rYcDWmKqjAcE2zc2lt9LGqElXwuEmMlrIWEa64PELeQuL4D3t4Iwr2eRrbcqFuhga5n35Gijjuwex6qyoJM7o88emSEsBluZk33W437uUJhVjybA7gRVHsx0wWLdbs7QfVH6o2I0EWwnHVM3Crx7EZziB_g8ueHGi3vkElz52GyMuHCKhfyTa78oh_kvyti36GNm7wXm1H-gVBk7Wz6I4uctjPQywMAfe77eOxgidGVcRBQQljrOCGnA
```

### Instalación Local (Opcional)

Si deseas probar localmente:

1. Instala las dependencias:
   ```
   npm install
   ```

2. Ejecuta el servidor:
   ```
   npm start
   ```

3. Abre http://localhost:3000 en tu navegador.

### Despliegue en Railway

Este proyecto está configurado para desplegarse automáticamente en Railway.

1. Conecta tu repositorio de GitHub a Railway.
2. Railway detectará el `package.json` y ejecutará `npm start`.
3. Asegúrate de configurar las variables de entorno en Railway Dashboard.

### URLs de Respuesta

Después del despliegue, actualiza las URLs en `server.js`:

- `responseUrl`: `https://tu-app.up.railway.app/confirmacion`
- `cancelUrl`: `https://tu-app.up.railway.app/cancelado`

Reemplaza `tu-app` con el nombre de tu aplicación en Railway.

## Uso

1. Ingresa el monto a pagar.
2. Haz clic en "PAGAR CON PAYPHONE".
3. Serás redirigido a la pasarela de PayPhone.
4. Después del pago, volverás a la página de confirmación.

## Debugging y Troubleshooting

### Errores Comunes

#### Errores del Sistema
**Error: "Error al crear pago"**
- **Causa**: Problema con la integración de PayPhone
- **Solución**: Revisa la consola del navegador y los logs del servidor
- **Información detallada**: El sistema ahora muestra errores detallados incluyendo:
  - Código de status HTTP
  - Respuesta completa del servidor PayPhone
  - Timestamp del error

**Error: "No se pudo conectar con PayPhone"**
- **Causa**: Problemas de conectividad o servidor PayPhone caído
- **Solución**: Verifica conexión a internet y estado de PayPhone

**Error: "Error interno: [mensaje]"**
- **Causa**: Error en el código del servidor
- **Solución**: Revisa logs del servidor y configuración

#### Códigos de Error PayPhone

**400 - Validaciones fallidas (errorCode: 800)**
- **Sub-errores comunes**:
  - `PhoneNumber`: "Número de teléfono inválido"
  - `CountryCode`: "Campo obligatorio"
  - `Amount`: "Monto inválido"
  - `Currency`: "Moneda no soportada"
  - `DocumentId`: "Documento de identidad inválido"
- **Solución**: Verificar formato de datos enviados

**404 - Número no registrado (errorCode: 120)**
- **Mensaje**: "Lo sentimos, este número no está registrado en Payphone"
- **Causa**: El teléfono usado no está registrado como probador en PayPhone
- **Solución**: Agregar el número como probador en el panel de PayPhone o usar un número registrado
- **Nota**: Este error es **NORMAL en desarrollo** cuando no has configurado probadores. Una vez que agregues números de teléfono como probadores en el panel de PayPhone, este error desaparecerá.

**401 - No autorizado (errorCode: 100)**
- **Causa**: Token inválido o expirado
- **Solución**: Verificar `PAYPHONE_TOKEN` en variables de entorno

**403 - Prohibido (errorCode: 110)**
- **Causa**: Credenciales incorrectas o permisos insuficientes
- **Solución**: Verificar `PAYPHONE_CLIENT_ID` y `PAYPHONE_SECRET`

**429 - Demasiadas solicitudes (errorCode: 130)**
- **Causa**: Límite de rate limiting excedido
- **Solución**: Esperar y reducir frecuencia de solicitudes

**500 - Error interno del servidor (errorCode: 200)**
- **Causa**: Error en los servidores de PayPhone
- **Solución**: Reintentar más tarde o contactar soporte de PayPhone

**502/503/504 - Errores de gateway**
- **Causa**: Problemas de infraestructura
- **Solución**: Reintentar la solicitud

#### Estados de Transacción (en URLs de respuesta)

**Approved**
- Pago exitoso procesado

**Rejected**
- Pago rechazado por el banco o procesador

**Cancelled**
- Usuario canceló el pago

**Pending**
- Pago en proceso de verificación

### Cómo Depurar

1. **Frontend**:
   - Los errores ahora se muestran en la página web en un contenedor rojo copiable
   - Usa el botón "Copiar Error" para copiar toda la información técnica
   - Abre la consola del navegador (F12) para ver logs adicionales de JavaScript
2. **Backend**: Los logs del servidor se muestran en la terminal donde corre la aplicación
3. **PayPhone**: Verifica en el panel de desarrolladores que las credenciales sean correctas

### Logs Importantes

El servidor registra información detallada de errores:
- Error completo del objeto
- Respuesta del servidor PayPhone
- Status HTTP
- Headers de respuesta
- Timestamp

### Variables de Entorno

Asegúrate de que estas variables estén correctamente configuradas:
- `PAYPHONE_CLIENT_ID`: ID del cliente de PayPhone
- `PAYPHONE_SECRET`: Clave secreta
- `PAYPHONE_ENCODE_PASS`: Contraseña de codificación
- `PAYPHONE_TOKEN`: Token de autenticación

### Formato de Datos PayPhone

**Teléfono**: Sin el código de país, sin el 0 inicial (ej: 999999999)
**CountryCode**: Siempre "593" para Ecuador
**Monto**: Se convierte automáticamente a centavos

### URLs de Respuesta

Después del despliegue en Railway, actualiza estas URLs en `server.js`:
- `responseUrl`: URL de confirmación
- `cancelUrl`: URL de cancelación

## Tecnologías

- Node.js
- Express
- Axios
- PayPhone API

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

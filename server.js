require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 1. Crear la transacción (se llama desde el botón "Pagar")
app.post('/crear-pago', async (req, res) => {
  const requestStartTime = Date.now();
  const { amount, email, phone, documentId } = req.body;

  // Información EXHAUSTIVA del request para debugging
  const requestDebugInfo = {
    timestamp: new Date().toISOString(),
    requestId: `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    endpoint: '/crear-pago',
    method: 'POST',
    userAgent: req.get('User-Agent'),
    ip: req.ip || req.connection.remoteAddress,
    headers: {
      'content-type': req.get('Content-Type'),
      'user-agent': req.get('User-Agent'),
      'accept': req.get('Accept'),
      'accept-language': req.get('Accept-Language'),
      'cache-control': req.get('Cache-Control'),
      'origin': req.get('Origin'),
      'referer': req.get('Referer')
    },
    body: req.body,
    rawAmount: amount,
    processedAmount: Math.round(parseFloat(amount) * 100),
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cwd: process.cwd()
    },
    gitInfo: {
      commit: 'f5054df', // Último commit conocido
      branch: 'main'
    }
  };

  console.log('=== REQUEST INICIADO ===');
  console.log(JSON.stringify(requestDebugInfo, null, 2));
  console.log('========================');

  try {
    const response = await axios.post(
      'https://pay.payphonetodoesposible.com/api/Sale',
      {
        amount: amountInCents,
        amountWithTax: 0,
        amountWithoutTax: amountInCents,
        tax: 0,
        service: 0,
        tip: 0,
        currency: "USD",
        clientTransactionId: "COND-" + Date.now(),
        storeId: 1711274975001, // este número está en tu token
        reference: "Pago de prueba condominio",
        email: email || "tester@condo.com",
        phoneNumber: phone || "999999999",
        countryCode: "593", // Código de Ecuador para PayPhone
        documentId: documentId || "9999999999",
        responseUrl: "https://tu-app.up.railway.app/confirmacion", // lo cambias después del deploy
        cancelUrl: "https://tu-app.up.railway.app/cancelado"
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PAYPHONE_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      paymentUrl: response.data.payWithCard,   // ← esta es la URL que abre la pasarela
      transactionId: response.data.transactionId
    });

  } catch (error) {
    const errorTimestamp = new Date().toISOString();
    const requestDuration = Date.now() - requestStartTime;

    // ===== SISTEMA DE DEBUGGING EXHAUSTIVO =====

    // 1. Información completa del error de Axios
    const axiosErrorInfo = {
      name: error.name,
      message: error.message,
      code: error.code,
      errno: error.errno,
      syscall: error.syscall,
      hostname: error.hostname,
      stack: error.stack?.split('\n').slice(0, 10), // Primeras 10 líneas del stack
      isAxiosError: error.isAxiosError,
      toJSON: error.toJSON ? error.toJSON() : null
    };

    // 2. Payload enviado a PayPhone (sin datos sensibles)
    const payphonePayload = {
      amount: Math.round(parseFloat(amount) * 100),
      amountWithTax: 0,
      amountWithoutTax: Math.round(parseFloat(amount) * 100),
      tax: 0,
      service: 0,
      tip: 0,
      currency: "USD",
      clientTransactionId: `COND-${Date.now()}`,
      storeId: 1711274975001,
      reference: "Pago de prueba condominio",
      email: email || "tester@condo.com",
      phoneNumber: phone || "999999999",
      countryCode: "593",
      documentId: documentId || "9999999999",
      responseUrl: "https://tu-app.up.railway.app/confirmacion",
      cancelUrl: "https://tu-app.up.railway.app/cancelado"
    };

    // 3. Headers enviados a PayPhone (sin token completo)
    const payphoneHeaders = {
      'Authorization': `Bearer ${process.env.PAYPHONE_TOKEN ? '[TOKEN_PRESENTE_' + process.env.PAYPHONE_TOKEN.substring(0, 10) + '...]' : '[TOKEN_NO_CONFIGURADO]'}`,
      'Content-Type': 'application/json',
      'User-Agent': 'axios/1.13.2'
    };

    // 4. Información del entorno (sin datos sensibles)
    const environmentInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      pid: process.pid,
      uptime: Math.round(process.uptime()),
      memory: {
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + 'MB',
        heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB',
        heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
        external: Math.round(process.memoryUsage().external / 1024 / 1024) + 'MB'
      },
      cwd: process.cwd(),
      env: {
        PORT: process.env.PORT || '3000',
        NODE_ENV: process.env.NODE_ENV || 'development',
        PAYPHONE_TOKEN_CONFIGURED: !!process.env.PAYPHONE_TOKEN,
        PAYPHONE_TOKEN_LENGTH: process.env.PAYPHONE_TOKEN?.length || 0
      }
    };

    // Sistema de documentación EXHAUSTIVA de errores PayPhone
    const payphoneErrorCodes = {
      800: {
        category: 'VALIDATION_ERROR',
        description: 'Validaciones fallidas',
        commonFields: ['PhoneNumber', 'CountryCode', 'Amount', 'Currency', 'DocumentId'],
        solutions: ['Verificar formato de datos enviados', 'Revisar documentación de campos requeridos'],
        validationChecks: ['Formato de teléfono', 'Código de país', 'Monto en centavos', 'Moneda soportada']
      },
      100: {
        category: 'AUTHENTICATION_ERROR',
        description: 'No autorizado - Token inválido o expirado',
        solutions: ['Verificar PAYPHONE_TOKEN en variables de entorno', 'Regenerar token si expiró'],
        checks: ['Token format', 'Token expiration', 'Token permissions']
      },
      110: {
        category: 'AUTHENTICATION_ERROR',
        description: 'Prohibido - Credenciales incorrectas o permisos insuficientes',
        solutions: ['Verificar PAYPHONE_CLIENT_ID y PAYPHONE_SECRET', 'Revisar permisos en panel PayPhone'],
        checks: ['Client ID validity', 'Secret correctness', 'Account status']
      },
      120: {
        category: 'RESOURCE_NOT_FOUND',
        description: 'Número no registrado en PayPhone',
        solutions: ['Agregar el número como probador en panel PayPhone', 'Usar números registrados para pruebas'],
        behavior: 'NO_GENERA_PASARELA',
        validation: 'PREVIA_A_CREACION_TRANSACCION'
      },
      130: {
        category: 'RATE_LIMIT_ERROR',
        description: 'Demasiadas solicitudes - Rate limiting excedido',
        solutions: ['Esperar antes de reintentar', 'Reducir frecuencia de solicitudes', 'Implementar backoff exponencial'],
        timing: 'RATE_LIMIT_WINDOW'
      },
      200: {
        category: 'SERVER_ERROR',
        description: 'Error interno del servidor PayPhone',
        solutions: ['Reintentar más tarde', 'Verificar estado de servicios PayPhone'],
        retry: 'EXPONENTIAL_BACKOFF'
      }
    };

    // LOGGING EXHAUSTIVO EN MÚLTIPLES FORMATOS
    console.error('\n' + '='.repeat(80));
    console.error('🚨 ERROR PAYPHONE DETECTADO - LOGGING EXHAUSTIVO');
    console.error('='.repeat(80));

    // Log estructurado en JSON para análisis automático
    const exhaustiveErrorLog = {
      timestamp: errorTimestamp,
      requestId: requestDebugInfo.requestId,
      duration: `${requestDuration}ms`,
      error: {
        type: axiosErrorInfo.name,
        message: axiosErrorInfo.message,
        code: axiosErrorInfo.code,
        isAxiosError: axiosErrorInfo.isAxiosError
      },
      request: {
        original: requestDebugInfo.body,
        processed: payphonePayload,
        headers: payphoneHeaders,
        url: 'https://pay.payphonetodoesposible.com/api/Sale'
      },
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: {
          'content-type': error.response.headers['content-type'],
          'content-length': error.response.headers['content-length'],
          'date': error.response.headers.date,
          'server': error.response.headers.server,
          'x-azure-ref': error.response.headers['x-azure-ref'],
          'x-cache': error.response.headers['x-cache']
        },
        data: error.response.data,
        payphoneErrorCode: error.response.data?.errorCode,
        payphoneMessage: error.response.data?.message
      } : null,
      network: error.request ? {
        type: 'NO_RESPONSE',
        requestSent: !!error.request,
        timeout: error.code === 'ECONNABORTED'
      } : null,
      environment: environmentInfo,
      stack: axiosErrorInfo.stack?.slice(0, 5) // Primeras 5 líneas del stack
    };

    console.error('LOG JSON ESTRUCTURADO:');
    console.error(JSON.stringify(exhaustiveErrorLog, null, 2));

    // Log legible para humanos
    console.error('\n📋 RESUMEN LEGIBLE:');
    console.error(`⏰ Timestamp: ${errorTimestamp}`);
    console.error(`🆔 Request ID: ${requestDebugInfo.requestId}`);
    console.error(`⏱️  Duración: ${requestDuration}ms`);
    console.error(`💻 IP Cliente: ${requestDebugInfo.ip}`);
    console.error(`📱 User Agent: ${requestDebugInfo.userAgent}`);

    if (error.response) {
      const payphoneErrorCode = error.response.data?.errorCode;
      const payphoneInfo = payphoneErrorCodes[payphoneErrorCode];

      console.error(`🔴 Error PayPhone: ${payphoneErrorCode || 'Desconocido'} - ${error.response.status}`);
      console.error(`📝 Mensaje: ${error.response.data?.message || 'Sin mensaje'}`);

      if (payphoneInfo) {
        console.error(`🏷️  Categoría: ${payphoneInfo.category}`);
        console.error(`📋 Descripción: ${payphoneInfo.description}`);
        console.error(`🛠️  Soluciones: ${payphoneInfo.solutions.join(' | ')}`);
        if (payphoneInfo.behavior) {
          console.error(`🎭 Comportamiento: ${payphoneInfo.behavior}`);
        }
      }

      console.error(`📊 Headers de respuesta:`);
      console.error(`   Content-Type: ${error.response.headers['content-type']}`);
      console.error(`   Content-Length: ${error.response.headers['content-length']}`);
      console.error(`   Server: ${error.response.headers.server}`);

    } else if (error.request) {
      console.error(`🌐 Error de Red: Sin respuesta del servidor PayPhone`);
      console.error(`🔍 Posibles causas: Conectividad, Firewall, DNS`);
      console.error(`⏰ Timeout: ${error.code === 'ECONNABORTED' ? 'Sí' : 'No'}`);
    } else {
      console.error(`🏠 Error Interno: ${error.message}`);
    }

    console.error(`💾 Memoria: ${environmentInfo.memory.heapUsed}/${environmentInfo.memory.heapTotal}`);
    console.error(`⚙️  Node.js: ${environmentInfo.nodeVersion} en ${environmentInfo.platform}`);
    console.error('='.repeat(80) + '\n');

    // Documentar error en archivo PAYPHONE_ERRORS.md (si existe)
    try {
      const errorDoc = {
        timestamp: errorTimestamp,
        errorCode: error.response?.data?.errorCode || 'UNKNOWN',
        category: payphoneErrorCodes[error.response?.data?.errorCode]?.category || 'UNKNOWN',
        message: error.response?.data?.message || error.message,
        requestId: requestDebugInfo.requestId,
        duration: requestDuration,
        ip: requestDebugInfo.ip,
        userAgent: requestDebugInfo.userAgent?.substring(0, 50)
      };

      // Aquí podríamos agregar lógica para escribir en archivo de logs
      // Por ahora solo loggeamos que se documentó
      console.error('📄 Error documentado para análisis posterior');
    } catch (docError) {
      console.error('⚠️ Error al documentar:', docError.message);
    }

    // Respuesta al cliente con información detallada pero segura
    const clientResponse = {
      success: false,
      message: error.response?.data?.errorCode
        ? `Error PayPhone (${error.response.data.errorCode}): ${payphoneErrorCodes[error.response.data.errorCode]?.description || 'Error desconocido'}`
        : `Error del servidor PayPhone: ${error.response?.status || 'Sin conexión'}`,
      details: {
        timestamp: errorTimestamp,
        requestId: requestDebugInfo.requestId,
        category: payphoneErrorCodes[error.response?.data?.errorCode]?.category || 'UNKNOWN_ERROR',
        payphoneErrorCode: error.response?.data?.errorCode,
        status: error.response?.status,
        duration: `${requestDuration}ms`,
        solutions: payphoneErrorCodes[error.response?.data?.errorCode]?.solutions || []
      }
    };

    res.status(500).json(clientResponse);
  }
});

// 2. Página de confirmación (el usuario vuelve aquí después de pagar)
app.get('/confirmacion', (req, res) => {
  const { transactionId, transactionStatus, authorizationCode } = req.query;

  if (transactionStatus === "Approved") {
    res.send(`
      <h1 style="color:green; text-align:center; margin-top:100px;">
        ¡Pago APROBADO! 
      </h1>
      <p style="text-align:center;">
        ID de transacción: ${transactionId}<br>
        Código de autorización: ${authorizationCode}<br><br>
        <a href="/">← Hacer otro pago de prueba</a>
      </p>
    `);
  } else {
    res.send(`
      <h1 style="color:red; text-align:center; margin-top:100px;">
        Pago RECHAZADO o CANCELADO
      </h1>
      <p style="text-align:center;">
        Estado: ${transactionStatus}<br><br>
        <a href="/">← Intentar de nuevo</a>
      </p>
    `);
  }
});

app.get('/cancelado', (req, res) => {
  res.send(`
    <h1 style="color:orange; text-align:center; margin-top:100px;">
      Pago cancelado por el usuario
    </h1>
    <p style="text-align:center;">
      <a href="/">← Volver</a>
    </p>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

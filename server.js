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
  const { amount, email, phone, documentId } = req.body;

  const amountInCents = Math.round(parseFloat(amount) * 100);

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
    console.error('Error completo:', error);
    console.error('Respuesta del servidor:', error.response?.data);
    console.error('Status:', error.response?.status);
    console.error('Headers:', error.response?.headers);

    // Sistema de documentación de errores PayPhone
    const payphoneErrorCodes = {
      // Errores de validación (400)
      800: {
        category: 'VALIDATION_ERROR',
        description: 'Validaciones fallidas',
        commonFields: ['PhoneNumber', 'CountryCode', 'Amount', 'Currency', 'DocumentId'],
        solutions: ['Verificar formato de datos enviados', 'Revisar documentación de campos requeridos']
      },
      // Errores de autenticación (401/403)
      100: {
        category: 'AUTHENTICATION_ERROR',
        description: 'No autorizado - Token inválido o expirado',
        solutions: ['Verificar PAYPHONE_TOKEN en variables de entorno', 'Regenerar token si expiró']
      },
      110: {
        category: 'AUTHENTICATION_ERROR',
        description: 'Prohibido - Credenciales incorrectas o permisos insuficientes',
        solutions: ['Verificar PAYPHONE_CLIENT_ID y PAYPHONE_SECRET', 'Revisar permisos en panel PayPhone']
      },
      // Errores de recursos no encontrados (404)
      120: {
        category: 'RESOURCE_NOT_FOUND',
        description: 'Número no registrado en PayPhone',
        solutions: ['Agregar el número como probador en panel PayPhone', 'Usar números registrados para pruebas']
      },
      // Errores de rate limiting (429)
      130: {
        category: 'RATE_LIMIT_ERROR',
        description: 'Demasiadas solicitudes - Rate limiting excedido',
        solutions: ['Esperar antes de reintentar', 'Reducir frecuencia de solicitudes', 'Implementar backoff exponencial']
      },
      // Errores del servidor (500)
      200: {
        category: 'SERVER_ERROR',
        description: 'Error interno del servidor PayPhone',
        solutions: ['Reintentar más tarde', 'Verificar estado de servicios PayPhone']
      }
    };

    let errorMessage = "Error al crear pago";
    let errorDetails = {};
    let payphoneErrorInfo = null;

    if (error.response) {
      // El servidor respondió con un código de error
      const status = error.response.status;
      const errorData = error.response.data;

      // Extraer información específica de PayPhone
      const payphoneErrorCode = errorData?.errorCode;
      if (payphoneErrorCode && payphoneErrorCodes[payphoneErrorCode]) {
        payphoneErrorInfo = payphoneErrorCodes[payphoneErrorCode];
        errorMessage = `Error PayPhone (${payphoneErrorCode}): ${payphoneErrorInfo.description}`;
      } else {
        errorMessage = `Error del servidor PayPhone: ${status}`;
      }

      errorDetails = {
        status: status,
        statusText: error.response.statusText,
        data: errorData,
        payphoneErrorCode: payphoneErrorCode,
        category: payphoneErrorInfo?.category || 'UNKNOWN_ERROR',
        timestamp: new Date().toISOString()
      };

      // Log detallado para documentación
      console.error('=== ERROR PAYPHONE DOCUMENTADO ===');
      console.error(`Timestamp: ${errorDetails.timestamp}`);
      console.error(`Categoría: ${errorDetails.category}`);
      console.error(`Status HTTP: ${status}`);
      console.error(`Código PayPhone: ${payphoneErrorCode || 'N/A'}`);
      console.error(`Mensaje: ${errorData?.message || 'Sin mensaje'}`);
      if (payphoneErrorInfo) {
        console.error(`Descripción: ${payphoneErrorInfo.description}`);
        console.error(`Soluciones sugeridas: ${payphoneErrorInfo.solutions.join(', ')}`);
      }
      console.error('==================================');

    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      errorMessage = "No se pudo conectar con PayPhone";
      errorDetails = {
        message: "Sin respuesta del servidor",
        category: 'NETWORK_ERROR',
        timestamp: new Date().toISOString()
      };
      console.error('=== ERROR DE RED ===');
      console.error(`Timestamp: ${errorDetails.timestamp}`);
      console.error('Tipo: Sin respuesta del servidor PayPhone');
      console.error('Posibles causas: Problemas de conectividad, firewall, DNS');
      console.error('===================');
    } else {
      // Algo pasó al configurar la petición
      errorMessage = `Error interno: ${error.message}`;
      errorDetails = {
        message: error.message,
        category: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      };
      console.error('=== ERROR INTERNO ===');
      console.error(`Timestamp: ${errorDetails.timestamp}`);
      console.error(`Mensaje: ${error.message}`);
      console.error('====================');
    }

    // Agregar soluciones si están disponibles
    if (payphoneErrorInfo?.solutions) {
      errorDetails.solutions = payphoneErrorInfo.solutions;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      details: errorDetails,
      timestamp: new Date().toISOString()
    });
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

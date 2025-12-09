require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

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

    let errorMessage = "Error al crear pago";
    let errorDetails = {};

    if (error.response) {
      // El servidor respondió con un código de error
      errorMessage = `Error del servidor PayPhone: ${error.response.status}`;
      errorDetails = {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      };
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      errorMessage = "No se pudo conectar con PayPhone";
      errorDetails = { message: "Sin respuesta del servidor" };
    } else {
      // Algo pasó al configurar la petición
      errorMessage = `Error interno: ${error.message}`;
      errorDetails = { message: error.message };
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

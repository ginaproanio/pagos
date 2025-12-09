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
app.get('/', ( '/', (req, res) => {
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
        phoneNumber: phone || "0999999999",
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
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Error al crear pago" });
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
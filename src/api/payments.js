import { get, post } from "./fetchWrapper";

export function initiatePayment(orderId, phoneNumber) {
  return post(`/payments/orders/${orderId}/pay`, {
    phone_number: phoneNumber,
  });
}

export function checkPaymentStatus(orderId) {
  return get(`/payments/status/${orderId}`);
}

export function queryTransaction(checkoutRequestId) {
  return get(`/payments/query/${checkoutRequestId}`);
}

export function pollPaymentStatus(orderId, checkoutRequestId = null, maxAttempts = 60) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const data = await checkPaymentStatus(orderId);
        const payment = data.payment;

        if (payment?.payment_status === "PAID") {
          clearInterval(interval);
          resolve(payment);
        } else if (payment?.payment_status === "FAILED" || payment?.payment_status === "CANCELLED") {
          clearInterval(interval);
          reject(new Error("Payment failed or was cancelled"));
        } else if (checkoutRequestId && attempts % 3 === 0) {
          // Periodically cross-check with M-Pesa query endpoint to handle delayed callbacks
          const query = await queryTransaction(checkoutRequestId);
          if (query?.mpesa_status === "completed") {
            clearInterval(interval);
            resolve(query?.payment || payment);
          }
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          reject(new Error("Payment is still processing. Keep this page open or check My Orders shortly."));
        }
      } catch {
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          reject(new Error("Payment is still processing. Keep this page open or check My Orders shortly."));
        }
      }
    }, 3000);
  });
}

export function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/[\s\-+]/g, "");
  if (!/^254\d{9}$/.test(cleaned)) {
    return { valid: false, error: "Phone must be in format 254XXXXXXXXX (12 digits starting with 254)" };
  }
  return { valid: true, phone: cleaned };
}

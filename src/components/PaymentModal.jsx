
import { useEffect, useState } from "react";
import axios from "axios";

/* ---------------- CURRENCY CONFIG ---------------- */
const currencyMap = {
  NGN: { symbol: "₦", rate: 1600 },
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.78 },
  GHS: { symbol: "GH₵", rate: 11 }, // example rate
  ZAR: { symbol: "R", rate: 19 },   // example rate
  KES: { symbol: "KSh", rate: 135 }, 
  XOF: { symbol: "CFA", rate: 600 },
  RWF: { symbol: "FRw", rate: 1200 },
  UGX: { symbol: "USh", rate: 3700 },
};
const convertAmount = (usdAmount, currency) => {
  return Math.round(usdAmount * currencyMap[currency].rate);
};

/* ---------------- COMPONENT ---------------- */
export default function PaymentModal({ onClose, onPaymentSuccess }) {
  const [baseAmount, setBaseAmount] = useState(100); // USD base
  const [method, setMethod] = useState("");
  const [currency, setCurrency] = useState("USD");

  /* ---------------- DETECT LOCATION ---------------- */
  useEffect(() => {
    const locale = navigator.language || "";

    if (locale.includes("NG")) {
      setCurrency("NGN");
    } else {
      setCurrency("USD");
    }
  }, []);

  /* ---------------- FETCH BASE AMOUNT ---------------- */
  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/payment-amount`
        );
        setBaseAmount(res.data.amount); // now USD base
      } catch (err) {
        console.error("Failed to fetch payment amount", err);
      }
    };
    fetchAmount();
  }, []);

  /* ---------------- USER ---------------- */
  const user = JSON.parse(localStorage.getItem("bloomUser"));
  if (!user) return null;

  const userEmail = user.email;
  const userName = user.username;

  /* ---------------- PAYMENT RULES ---------------- */
 const allowedCurrencies = {
  // Paystack supports these currencies
  paystack: [
   "NGN", "GHS", "ZAR", "KES", "XOF"
  ],

  // Flutterwave supports many more
  flutterwave: ["NGN", "USD", "EUR", "GBP", "GHS", "RWF", "UGX", "ZAR"],
};

  const allowedForMethod = allowedCurrencies[method] || [];

  /* ---------------- AUTO FIX INVALID CURRENCY ---------------- */
  useEffect(() => {
    if (method && !allowedForMethod.includes(currency)) {
      setCurrency(allowedForMethod[0]);
    }
  }, [method]);

  /* ---------------- CONVERTED AMOUNT ---------------- */
  const convertedAmount = convertAmount(baseAmount, currency);

  /* ---------------- GRANT ACCESS ---------------- */
  const grantBloomAccess = async () => {
    const updatedUser = { ...user, bloomAccess: true };
    localStorage.setItem("bloomUser", JSON.stringify(updatedUser));

    onPaymentSuccess(updatedUser);
    onClose();
  };

  /* ---------------- PAYSTACK ---------------- */
  const handlePaystackPayment = () => {
    if (!window.PaystackPop) {
      alert("Paystack not loaded. Please refresh and try again.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_KEY,
      email: userEmail,
      amount: convertedAmount * 100, // convert to kobo
      currency: currency,
      ref: "BLOOM_" + Date.now(),

      callback: function (response) {
        axios
          .post(`${import.meta.env.VITE_SERVER_URL}/api/paystack-verify`, {
            reference: response.reference,
            email: userEmail,
            currency,
          })
          .then(() => {
            grantBloomAccess();
          })
          .catch((err) => {
            console.error("Paystack verification failed", err);
          });
      },

      onClose: function () {
        console.log("Paystack payment closed");
      },
    });

    handler.openIframe();
  };

  /* ---------------- FLUTTERWAVE ---------------- */
  const handleFlutterwavePayment = () => {
    const txRef = "BLOOM_" + Date.now();

    const config = {
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: txRef,
      amount: convertedAmount,
      currency: currency,
      payment_options: "card,banktransfer,ussd",
      customer: { email: userEmail, name: userName },

      customizations: {
        title: "Bloom",
        description: "Access Bloom – a safe space for womxn",
        logo: "https://bloomwomxn.com/logo1.png",
      },

      callback: async (response) => {
        try {
          await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/flutterwave-success`,
            {
              tx_ref: response.tx_ref,
              currency,
            }
          );

          grantBloomAccess();
        } catch (err) {
          console.error("Flutterwave update failed", err);
        }
      },

      onclose: () => {
        console.log("Flutterwave modal closed");
      },
    };

    window.FlutterwaveCheckout(config);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-center text-red-600">
          Welcome to Bloom 🌸
        </h2>
        <h1 className="text-xl font-bold text-center text-red-600">
          EARLY ACCESS
        </h1>

        <p className="text-sm text-center text-gray-600">
          A space built for safety, visibility, and belonging.
        </p>

        {/* 💰 PRICE DISPLAY */}
        <p className="text-center font-bold text-lg">
          Pay {currencyMap[currency].symbol}
          {convertedAmount} ({currency})
        </p>

        {/* PAYMENT METHOD */}
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full border p-3 rounded-lg text-black"
        >
          <option value="">Choose payment method</option>
          <option value="paystack">Paystack</option>
          <option value="flutterwave">Flutterwave</option>
        </select>

        {/* CURRENCY SELECT */}
        {method && (
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full border p-3 rounded-lg text-black"
          >
            {allowedForMethod.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        )}

        {/* BUTTONS */}
        {method === "paystack" && (
          <button
            onClick={handlePaystackPayment}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold"
          >
            Pay with Paystack
          </button>
        )}

        {method === "flutterwave" && (
          <button
            onClick={handleFlutterwavePayment}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold"
          >
            Pay with Flutterwave
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}












// old code working just replace with above code


// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function PaymentModal({ onClose, onPaymentSuccess }) {
//   const [amount, setAmount] = useState(100); // default until fetched
//   const [method, setMethod] = useState(""); // track payment method

//   useEffect(() => {
//     const fetchAmount = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_SERVER_URL}/api/admin/payment-amount`
//         );
//         setAmount(res.data.amount);
//       } catch (err) {
//         console.error("Failed to fetch payment amount", err);
//       }
//     };
//     fetchAmount();
//   }, []);

//   const user = JSON.parse(localStorage.getItem("bloomUser"));
//   if (!user) return null;

//   const userEmail = user.email;
//   const userName = user.username;

//   // Common function to mark user as having Bloom access
// const grantBloomAccess = async () => {
//   const updatedUser = { ...user, bloomAccess: true };
//   localStorage.setItem("bloomUser", JSON.stringify(updatedUser));

//   onPaymentSuccess(updatedUser); // optional but clean
//   onClose();
// };

//   // Paystack payment
// // Paystack payment (FIXED)
// const handlePaystackPayment = () => {
//   if (!window.PaystackPop) {
//     alert("Paystack not loaded. Please refresh and try again.");
//     return;
//   }

//   const handler = window.PaystackPop.setup({
//     key: import.meta.env.VITE_PAYSTACK_KEY,
//     email: userEmail,
//     amount: amount * 100, // Kobo
//     currency: "NGN",
//     ref: "BLOOM_" + Date.now(),

//     callback: function (response) {
//       // IMPORTANT: keep this a plain function
//       axios
//         .post(`${import.meta.env.VITE_SERVER_URL}/api/paystack-verify`, {
//           reference: response.reference,
//           email: userEmail,
//         })
//         .then(() => {
//           grantBloomAccess();
//         })
//         .catch((err) => {
//           console.error("Paystack verification failed", err);
//         });
//     },

//     onClose: function () {
//       console.log("Paystack payment closed");
//     },
//   });

//   handler.openIframe();
// };


// const handleFlutterwavePayment = () => {
//   const txRef = "BLOOM_" + Date.now();

//   const config = {
//     public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
//     tx_ref: txRef,
//     amount: amount,
//     currency: "NGN",
//     payment_options: "card,banktransfer,ussd",
//     customer: { email: userEmail, name: userName },
//     customizations: {
//       title: "Bloom",
//       description: "Access Bloom – a safe space for womxn",
//       logo: "https://bloomwomxn.com/logo1.png",
//     },

//     callback: async (response) => {
//       console.log("FLW RESPONSE:", response);

//       try {
//         const res = await axios.post(
//           `${import.meta.env.VITE_SERVER_URL}/api/flutterwave-success`,
//           {
//             tx_ref: response.tx_ref,
//           }
//         );

//         console.log("BACKEND RESPONSE:", res.data);

//         grantBloomAccess();
//       } catch (err) {
//         console.error("Flutterwave update failed", err);
//       }
//     },

//     onclose: () => {
//       console.log("Flutterwave modal closed");
//     },
//   };

//   FlutterwaveCheckout(config);
// };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-white w-[90%] max-w-md rounded-xl p-6 space-y-4">
//         <h2 className="text-xl font-bold text-center text-red-600">Welcome to Bloom 🌸</h2>
//         <h1 className="text-xl font-bold text-center text-red-600">EARLY ACCESS</h1>
//         <p className="text-sm text-center text-gray-600">
//           A space built for safety, visibility, and belonging.
//         </p>

//         <select
//           value={method}
//           onChange={(e) => setMethod(e.target.value)}
//           className="w-full border p-3 rounded-lg text-black"
//         >
//           <option value="">Choose payment method</option>
//           <option value="paystack">Paystack</option>
//           <option value="flutterwave">Flutterwave</option>
//         </select>

//         {method === "paystack" && (
//           <button
//             onClick={handlePaystackPayment}
//             className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold"
//           >
//             Pay with Paystack
//           </button>
//         )}

//         {method === "flutterwave" && (
//           <button
//             onClick={handleFlutterwavePayment}
//             className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold"
//           >
//             Pay with Flutterwave
//           </button>
//         )}

//         <button
//           onClick={onClose}
//           className="w-full text-sm text-gray-500 mt-2"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }


































// first working code 






// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function PaymentModal({ onClose, onPaymentSuccess }) {
//   const [amount, setAmount] = useState(100); // default until fetched
//   const [method, setMethod] = useState(""); // track payment method

//   useEffect(() => {
//     const fetchAmount = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_SERVER_URL}/api/admin/payment-amount`
//         );
//         setAmount(res.data.amount);
//       } catch (err) {
//         console.error("Failed to fetch payment amount", err);
//       }
//     };
//     fetchAmount();
//   }, []);

//   const user = JSON.parse(localStorage.getItem("bloomUser"));
//   if (!user) return null;

//   const userEmail = user.email;
//   const userName = user.username;

//   // Common function to mark user as having Bloom access
// const grantBloomAccess = async () => {
//   const updatedUser = { ...user, bloomAccess: true };
//   localStorage.setItem("bloomUser", JSON.stringify(updatedUser));

//   onPaymentSuccess(updatedUser); // optional but clean
//   onClose();
// };

//   // Paystack payment
// // Paystack payment (FIXED)
// const handlePaystackPayment = () => {
//   if (!window.PaystackPop) {
//     alert("Paystack not loaded. Please refresh and try again.");
//     return;
//   }

//   const handler = window.PaystackPop.setup({
//     key: import.meta.env.VITE_PAYSTACK_KEY,
//     email: userEmail,
//     amount: amount * 100, // Kobo
//     currency: "NGN",
//     ref: "BLOOM_" + Date.now(),

//     callback: function (response) {
//       // IMPORTANT: keep this a plain function
//       axios
//         .post(`${import.meta.env.VITE_SERVER_URL}/api/paystack-verify`, {
//           reference: response.reference,
//           email: userEmail,
//         })
//         .then(() => {
//           grantBloomAccess();
//         })
//         .catch((err) => {
//           console.error("Paystack verification failed", err);
//         });
//     },

//     onClose: function () {
//       console.log("Paystack payment closed");
//     },
//   });

//   handler.openIframe();
// };


//   const handleFlutterwavePayment = () => {
//     const txRef = "BLOOM_" + Date.now();

//     const config = {
//       public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
//       tx_ref: txRef,
//       amount: amount,
//       currency: "NGN",
//       payment_options: "card,banktransfer,ussd",
//       customer: { email: userEmail, name: userName },
//       customizations: {
//         title: "Bloom",
//         description: "Access Bloom – a safe space for womxn",
//         logo: "https://bloomwomxn.com/logo.png",
//       },
//       callback: async () => {
//         try {
//           const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/flutterwave-success`, { tx_ref: txRef });
//           grantBloomAccess(res.data?.paymentAmount || amount);
//         } catch (err) {
//           console.error("Flutterwave update failed", err);
//         }
//       },
//       onclose: () => console.log("Flutterwave payment closed"),
//     };

//     FlutterwaveCheckout(config);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-white w-[90%] max-w-md rounded-xl p-6 space-y-4">
//         <h2 className="text-xl font-bold text-center text-red-600">Welcome to Bloom 🌸</h2>
//         <h1 className="text-xl font-bold text-center text-red-600">EARLY ACCESS</h1>
//         <p className="text-sm text-center text-gray-600">
//           A space built for safety, visibility, and belonging.
//         </p>

//         <select
//           value={method}
//           onChange={(e) => setMethod(e.target.value)}
//           className="w-full border p-3 rounded-lg text-black"
//         >
//           <option value="">Choose payment method</option>
//           <option value="paystack">Paystack</option>
//           <option value="flutterwave">Flutterwave</option>
//         </select>

//         {method === "paystack" && (
//           <button
//             onClick={handlePaystackPayment}
//             className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold"
//           >
//             Pay with Paystack
//           </button>
//         )}

//         {method === "flutterwave" && (
//           <button
//             onClick={handleFlutterwavePayment}
//             className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold"
//           >
//             Pay with Flutterwave
//           </button>
//         )}

//         <button
//           onClick={onClose}
//           className="w-full text-sm text-gray-500 mt-2"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }
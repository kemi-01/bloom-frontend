// import { useState } from "react";
// import axios from "axios";

// export default function PaymentModal({ onClose, onPaymentSuccess }) {
//   const [method, setMethod] = useState("");

//   const user = JSON.parse(localStorage.getItem("bloomUser"));
//   if (!user) return null;

//   const userEmail = user.email;
//   const userName = user.username;

//   const updateBloomAccess = async () => {
//     try {
//       await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/flutterwave-success`, {
//         customer_email: userEmail,
//         status: "successful",
//         tx_ref: "BLOOM_" + Date.now(),
//       });

//       localStorage.setItem("bloomUser", JSON.stringify({ ...user, bloomAccess: true }));
//       onPaymentSuccess(); // navigate to /home
//     } catch (err) {
//       console.error("Failed to update bloom access", err);
//     }
//   };

//   const handleFlutterwavePayment = () => {
//     const config = {
//       public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
//       tx_ref: "BLOOM_" + Date.now(),
//       amount: 100,
//       currency: "NGN",
//       payment_options: "card,banktransfer,ussd",
//       customer: { email: userEmail, name: userName },
//       customizations: {
//         title: "Bloom",
//         description: "Access Bloom – a safe space for womxn",
//         logo: "https://bloomwomxn.com/logo.png",
//       },
//       callback: async (response) => {
//         if (response.status === "successful") {
//           console.log("Flutterwave payment successful", response);
//           await updateBloomAccess();
//           onClose();
//         }
//       },
//       onclose: () => {
//         console.log("Payment closed");
//       },
//     };

//     FlutterwaveCheckout(config); // global function loaded via script in index.html
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-white w-[90%] max-w-md rounded-xl p-6 space-y-4">
//         <h2 className="text-xl font-bold text-center">Welcome to Bloom 🌸</h2>
//         <p className="text-sm text-center text-gray-600">
//           A space built for safety, visibility, and belonging.
//         </p>

//         <select
//           value={method}
//           onChange={(e) => setMethod(e.target.value)}
//           className="w-full border p-3 rounded-lg"
//         >
//           <option value="">Choose payment method</option>
//           <option value="paystack">Paystack</option>
//           <option value="flutterwave">Flutterwave</option>
//         </select>

//       {method === "paystack" && (
//   <button
//     onClick={() => {
//       const handler = window.PaystackPop.setup({
//         key: import.meta.env.VITE_PAYSTACK_KEY,
//         email: userEmail,
//         amount: 100 * 100, // 100 NGN in Kobo
//         currency: "NGN",
//         callback: async function (response) {
//           console.log("Payment successful", response);
//           try {
//             await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/paystack-verify`, {
//               reference: response.reference,
//               email: userEmail,
//             });

//             localStorage.setItem(
//               "bloomUser",
//               JSON.stringify({ ...user, bloomAccess: true })
//             );

//             onPaymentSuccess();
//             onClose();
//           } catch (err) {
//             console.error("Failed to verify payment", err);
//           }
//         },
//         onClose: function () {
//           console.log("Payment closed");
//         },
//       });
//       handler.openIframe();
//     }}
//     className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold"
//   >
//     Pay with Paystack
//   </button>
// )}


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


















// import { useState } from "react";
// import axios from "axios";

// export default function PaymentModal({ onClose, onPaymentSuccess, amount = 100 }) {
//   const [method, setMethod] = useState("");

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


//   // Flutterwave payment
//  const handleFlutterwavePayment = () => {
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
//       logo: "https://bloomwomxn.com/logo.png",
//     },
//     callback: async (response) => {
//       try {
//         await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/flutterwave-success`, {
//           customer_email: userEmail,
//           tx_ref: txRef, // send the exact tx_ref used
//         });
//         grantBloomAccess();
//       } catch (err) {
//         console.error("Flutterwave update failed", err);
//       }
//     },
//     onclose: () => {
//       console.log("Flutterwave payment closed");
//     },
//   };

//   FlutterwaveCheckout(config); // global script from index.html
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















// import { useState } from "react";
// import axios from "axios";

// export default function PaymentModal({ onClose, onPaymentSuccess, amount = 100 }) {
//   const [method, setMethod] = useState("");

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





















import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentModal({ onClose, onPaymentSuccess }) {
  const [amount, setAmount] = useState(100); // default until fetched
  const [method, setMethod] = useState(""); // track payment method

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/payment-amount`
        );
        setAmount(res.data.amount);
      } catch (err) {
        console.error("Failed to fetch payment amount", err);
      }
    };
    fetchAmount();
  }, []);

  const user = JSON.parse(localStorage.getItem("bloomUser"));
  if (!user) return null;

  const userEmail = user.email;
  const userName = user.username;

  // Common function to mark user as having Bloom access
const grantBloomAccess = async () => {
  const updatedUser = { ...user, bloomAccess: true };
  localStorage.setItem("bloomUser", JSON.stringify(updatedUser));

  onPaymentSuccess(updatedUser); // optional but clean
  onClose();
};

  // Paystack payment
// Paystack payment (FIXED)
const handlePaystackPayment = () => {
  if (!window.PaystackPop) {
    alert("Paystack not loaded. Please refresh and try again.");
    return;
  }

  const handler = window.PaystackPop.setup({
    key: import.meta.env.VITE_PAYSTACK_KEY,
    email: userEmail,
    amount: amount * 100, // Kobo
    currency: "NGN",
    ref: "BLOOM_" + Date.now(),

    callback: function (response) {
      // IMPORTANT: keep this a plain function
      axios
        .post(`${import.meta.env.VITE_SERVER_URL}/api/paystack-verify`, {
          reference: response.reference,
          email: userEmail,
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


  const handleFlutterwavePayment = () => {
    const txRef = "BLOOM_" + Date.now();

    const config = {
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: txRef,
      amount: amount,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: { email: userEmail, name: userName },
      customizations: {
        title: "Bloom",
        description: "Access Bloom – a safe space for womxn",
        logo: "https://bloomwomxn.com/logo.png",
      },
      callback: async () => {
        try {
          const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/flutterwave-success`, { tx_ref: txRef });
          grantBloomAccess(res.data?.paymentAmount || amount);
        } catch (err) {
          console.error("Flutterwave update failed", err);
        }
      },
      onclose: () => console.log("Flutterwave payment closed"),
    };

    FlutterwaveCheckout(config);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-center text-red-600">Welcome to Bloom 🌸</h2>
        <h1 className="text-xl font-bold text-center text-red-600">EARLY ACCESS</h1>
        <p className="text-sm text-center text-gray-600">
          A space built for safety, visibility, and belonging.
        </p>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full border p-3 rounded-lg text-black"
        >
          <option value="">Choose payment method</option>
          <option value="paystack">Paystack</option>
          <option value="flutterwave">Flutterwave</option>
        </select>

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

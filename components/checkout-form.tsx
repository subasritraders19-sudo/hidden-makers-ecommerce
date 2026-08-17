"use client"

import { useState, useEffect } from "react"
import confetti from "canvas-confetti"
import { useStore } from "@/components/store-provider"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutForm() {

  const {
    cart,
    cartTotal,
    setCartOpen,
    clearCart
  } = useStore()

  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showCurrencyConfirm, setShowCurrencyConfirm] = useState(false)

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    country: "India" // ✅ NEW
  })

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  function change(e: any) {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value
    })
  }

  function successBlast() {
    const duration = 3000
    const end = Date.now() + duration

    function frame() {
      confetti({
        particleCount: 15,
        spread: 100,
        startVelocity: 50,
        origin: { x: 0, y: 0.6 },
        colors: ["#000000", "#D4AF37"]
      })

      confetti({
        particleCount: 15,
        spread: 100,
        startVelocity: 50,
        origin: { x: 1, y: 0.6 },
        colors: ["#000000", "#D4AF37"]
      })

      if (Date.now() < end) requestAnimationFrame(frame)
    }

    frame()
  }

  async function startPayment() {
    if (!window.Razorpay) {
      alert("Payment system loading...")
      return
    }

    if (!cart || cart.length === 0 || cartTotal <= 0) {
      alert("Cart is empty")
      return
    }

    if (
      !shipping.name ||
      !shipping.email ||
      !shipping.phone ||
      !shipping.address ||
      !shipping.city ||
      !shipping.pincode
    ) {
      alert("Fill all details")
      return
    }

    setShowCurrencyConfirm(true)
  }

  async function payment() {
    setShowCurrencyConfirm(false)

    try {
      setLoading(true)

      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cart,
          shipping
        })
      })

      const order = await orderRes.json()

      if (!order.order_id) {
        alert("Order failed")
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Hidden Makers",
        description: "Premium Order",
        order_id: order.order_id,

        prefill: {
          name: shipping.name,
          email: shipping.email,
          contact: shipping.phone
        },

        theme: {
          color: "#D4AF37"
        },

        handler: async function (response: any) {

          const deliveryCharge =
            shipping.country === "India" ? 60 : 1500

          const totalWithDelivery =
            cartTotal + deliveryCharge

          await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(response)
          })

          await fetch("/api/save-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              shipping,
              payment: response,
              amount: totalWithDelivery,
              items: cart
            })
          })

          const invoiceRes = await fetch("/api/generate-invoice", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              shipping,
              items: cart,
              amount: totalWithDelivery
            })
          })

          const invoiceData = await invoiceRes.json()

          let invoice_pdf = null

          if (invoiceData.success) {
            invoice_pdf = invoiceData.pdf
          }

          await fetch("/api/order-mail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              shipping,
              payment: response,
              amount: totalWithDelivery,
              items: cart,
              invoice_pdf
            })
          })

          clearCart()
          setSuccess(true)
          successBlast()
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()

    } catch (err) {
      console.log(err)
      alert("Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-primary text-white py-3 rounded"
      >
        Checkout
      </button>

      {open && !success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="bg-[#111] p-6 rounded w-[95%] max-w-md">

            {[
              { name: "name", label: "Name" },
              { name: "email", label: "Email" },
              { name: "phone", label: "Phone" },
              { name: "address", label: "Address" },
              { name: "city", label: "City" },
              { name: "pincode", label: "Pincode" }
            ].map((f) => (
              <input
                key={f.name}
                name={f.name}
                placeholder={f.label}
                onChange={change}
                className="w-full mb-3 p-3 bg-black text-white"
              />
            ))}

            {/* ✅ COUNTRY */}
            <select
              name="country"
              value={shipping.country}
              onChange={change}
              className="w-full mb-3 p-3 bg-black text-white"
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="UAE">UAE</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Singapore">Singapore</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>
              <option value="South Korea">South Korea</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Qatar">Qatar</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Oman">Oman</option>
              <option value="South Africa">South Africa</option>
              <option value="Brazil">Brazil</option>
              <option value="Russia">Russia</option>
              <option value="Turkey">Turkey</option>
              <option value="Thailand">Thailand</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Philippines">Philippines</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Egypt">Egypt</option>

            </select>
            <div className="mb-4 text-white text-sm">
              <p>
                Delivery: ₹{shipping.country === "India" ? 60 : 1500}
              </p>

              <p className="font-semibold">
                Total: ₹
                {cartTotal + (shipping.country === "India" ? 60 : 1500)}
              </p>
            </div>
            <button
              onClick={startPayment}
              className="w-full bg-black text-white py-3"
            >
              Pay Now
            </button>

          </div>
        </div>
      )}

      {showCurrencyConfirm && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">

        <div className="bg-[#111] border border-gray-700 p-6 rounded-xl w-[90%] max-w-sm text-center shadow-lg">

          <h2 className="text-xl text-white font-semibold mb-3">
            Confirm Payment
          </h2>

          <p className="text-gray-400 text-sm mb-5">
            Payment will be processed in <span className="text-white font-medium">INR (₹)</span>.
            Do you want to continue?
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setShowCurrencyConfirm(false)}
              className="w-full border border-gray-600 text-gray-300 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Cancel
            </button>

            <button
              onClick={payment}
              className="w-full bg-[#D4AF37] text-black font-semibold py-2 rounded-lg hover:opacity-90 transition"
            >
              Continue
            </button>
          </div>

        </div>
      </div>
    )}

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
          <div className="bg-white p-10 text-center">
            <h1>Payment Success</h1>
          </div>
        </div>
      )}
    </>
  )
}
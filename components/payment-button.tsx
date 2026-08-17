"use client"

import { useState } from "react"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { useStore } from "@/components/store-provider"

export default function PaymentButton({ shipping }: any) {

  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    cart,
    cartTotal,
    clearCart
  } = useStore()

  async function handlePayment() {

    if (!shipping?.name || !shipping?.email) {
      alert("Please fill shipping details ❗")
      return
    }

    try {

      setLoading(true)

      // ✅ CREATE ORDER
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: cartTotal
        })
      })

      const order = await orderRes.json()

      if (!order?.order_id) {
        alert("Order creation failed ❌")
        return
      }

      const options = {

        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: "INR",

        name: "Hidden Makers",

        description: "Order Payment",

        order_id: order.order_id,

        handler: async function (response: any) {

  console.log("💰 PAYMENT SUCCESS", response)

  try {

    // VERIFY
    const verify = await fetch("/api/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(response)
    })

    const result = await verify.json()
    console.log("VERIFY RESULT:", result)

    if (!result.success) {
      alert("Payment verification failed ❌")
      return
    }

    console.log("✅ VERIFY SUCCESS")

    // SAVE ORDER
    await fetch("/api/save-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        shipping,
        payment: response,
        amount: cartTotal,
        items: cart
      })
    })

    console.log("💾 ORDER SAVED")

    // 🔥 FORCE CHECK
    console.log("👉 CALLING INVOICE API")

    const invoiceRes = await fetch("/api/generate-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        shipping,
        items: cart,
        amount: cartTotal
      })
    })

    const invoiceData = await invoiceRes.json()
    console.log("📄 INVOICE RESPONSE:", invoiceData)

    console.log("👉 CALLING MAIL API")

    const mailRes = await fetch("/api/order-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        shipping,
        payment: response,
        amount: cartTotal,
        items: cart,
        invoice_pdf: invoiceData?.pdf
      })
    })

    const mailData = await mailRes.json()
    console.log("📩 MAIL RESPONSE:", mailData)

    setSuccess(true)
    clearCart()

  } catch (err) {
    console.log("❌ FULL HANDLER ERROR:", err)
  }
},

        prefill: {
          name: shipping?.name,
          email: shipping?.email,
          contact: shipping?.phone
        },

        theme: {
          color: "#000000"
        }

      }

      const razorpay = new (window as any).Razorpay(options)

      razorpay.on("payment.failed", (err: any) => {
        console.log("❌ PAYMENT FAILED", err)
        alert("Payment failed ❌")
      })

      razorpay.open()

    } catch (err) {

      console.log("❌ ERROR", err)
      alert("Payment error ❌")

    } finally {

      setLoading(false)

    }
  }

  return (
    <>
      {/* <Button
        onClick={handlePayment}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Processing..." : `Pay ₹${cartTotal}`}
      </Button> */}

      {
        success && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70">
            <div className="rounded-xl bg-white p-10 text-center shadow-xl">

              <h1 className="text-3xl font-bold text-green-600">
                🎉 Payment Successful!
              </h1>

              <p className="mt-3 text-gray-600">
                Your order has been confirmed.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Invoice & order details sent to your email 📩
              </p>

              <Button
                onClick={() => {
                  setSuccess(false)
                  window.location.href = "/"
                }}
                className="mt-6"
              >
                Continue Shopping
              </Button>

            </div>
          </div>
        )
      }
    </>
  )
}
import Razorpay from "razorpay"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { cart, shipping } = body

    if (!cart || cart.length === 0) {
      return Response.json(
        { error: "Cart is empty" },
        { status: 400 }
      )
    }

    // ✅ Cart total
    const cartTotal = cart.reduce((total: number, item: any) => {
      return total + item.product.price * item.quantity
    }, 0)

    // ✅ Delivery charge
    const deliveryCharge =
      shipping?.country === "India" ? 0 : 1500

    const totalWithDelivery = cartTotal + deliveryCharge

    if (totalWithDelivery < 1) {
      return Response.json(
        { error: "Invalid amount" },
        { status: 400 }
      )
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!
    })

    const order = await razorpay.orders.create({
      amount: Math.round(totalWithDelivery * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now()
    })

    return Response.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      total: totalWithDelivery,
      deliveryCharge
    })

  } catch (error) {
    console.log(error)
    return Response.json(
      { error: "Order creation failed" },
      { status: 500 }
    )
  }
}
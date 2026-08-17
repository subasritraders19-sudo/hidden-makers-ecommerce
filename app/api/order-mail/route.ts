import nodemailer from "nodemailer"

export async function POST(req: Request) {

  try {

    const {
      shipping,
      payment,
      amount,
      items,
      invoice_pdf
    } = await req.json()

    console.log("📩 MAIL API HIT")

    // ❗ BASIC VALIDATION
    if (!shipping?.email || !payment?.razorpay_payment_id) {
      return Response.json({
        success: false,
        error: "Missing required fields"
      }, { status: 400 })
    }

    // ✅ GMAIL SMTP (BEST PRACTICE)
    const transporter = nodemailer.createTransport({
      service: "gmail", // 🔥 better than host config
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // 🔥 App Password only
      }
    })

    // ✅ VERIFY SMTP
    await transporter.verify()
    console.log("✅ SMTP CONNECTED")

    // ✅ ATTACHMENT (SAFE)
    let attachments: any[] = []

    if (invoice_pdf && invoice_pdf.startsWith("data:application/pdf")) {
      attachments.push({
        filename: "Hidden-Makers-Invoice.pdf",
        content: invoice_pdf.split("base64,")[1],
        encoding: "base64"
      })
      console.log("📎 PDF ATTACHED")
    } else {
      console.log("⚠️ NO INVOICE ATTACHED")
    }

    // ✅ PRODUCTS LIST (SAFE)
    const productList = items?.map((item: any) => `
      <p>${item?.product?.name || "Product"} × ${item?.quantity || 1}</p>
    `).join("") || "<p>No products</p>"

    // ✅ EMAIL HTML
    const htmlContent = `
      <h2>🎉 New Order Received</h2>

      <h3>Customer Details</h3>
      <p><b>Name :</b> ${shipping.name}</p>
      <p><b>Email :</b> ${shipping.email}</p>
      <p><b>Phone :</b> ${shipping.phone}</p>
      <p><b>Address :</b> ${shipping.address}</p>
      <p><b>City :</b> ${shipping.city}</p>
      <p><b>Pincode :</b> ${shipping.pincode}</p>

      <hr/>

      <h3>Payment Details</h3>
      <p><b>Payment ID :</b> ${payment.razorpay_payment_id}</p>
      <p><b>Order ID :</b> ${payment.razorpay_order_id}</p>
      <p><b>Amount :</b> ₹${amount}</p>

      <hr/>

      <h3>Products</h3>
      ${productList}

      <hr/>

      <p>🧾 Invoice attached (if generated)</p>

      <p><b>Hidden Makers</b></p>
    `

    // ✅ SEND MAIL (TO YOU + CUSTOMER 🔥)
    const mail = await transporter.sendMail({

      from: `"Hidden Makers" <${process.env.EMAIL_USER}>`,

      to: process.env.EMAIL_USER, // 👉 YOUR BUSINESS MAIL

      cc: shipping.email, // 🔥 CUSTOMER ALSO GETS MAIL

      subject: "🎉 New Order Received",

      html: htmlContent,

      attachments

    })

    console.log("📨 MAIL SENT:", mail.messageId)

    return Response.json({
      success: true
    })

  } catch (error: any) {

    console.log("❌ MAIL ERROR:", error)

    return Response.json({
      success: false,
      error: error.message
    }, {
      status: 500
    })
  }
}
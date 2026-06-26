import nodemailer from "nodemailer"



const transporter = nodemailer.createTransport({

host: process.env.SMTP_HOST, // smtpout.secureserver.net

port: Number(process.env.SMTP_PORT), // 465

secure: Number(process.env.SMTP_PORT) === 465,

auth: {

user: process.env.EMAIL_USER,

pass: process.env.EMAIL_PASS,

},


pool:true,

maxConnections:5,

maxMessages:100,


connectionTimeout:10000,

socketTimeout:10000


})





export async function POST(req: Request) {


try {


const body = await req.json()


console.log("📦 ORDER MAIL DATA:",body)



const {

shipping,

payment,

amount,

items

}=body





const info = await transporter.sendMail({



from:`"Hidden Makers" <${process.env.EMAIL_USER}>`,



to:"info@hiddenmakers.com",



subject:"🛒 New Order Received - Hidden Makers",



html:`

<div style="font-family:Arial;padding:20px">


<h2 style="color:#16a34a">

🎉 New Order Received

</h2>


<hr/>


<h3>👤 Customer Details</h3>


<p><b>Name:</b> ${shipping?.name || "N/A"}</p>


<p><b>Phone:</b> ${shipping?.phone || "N/A"}</p>


<p><b>Address:</b> ${shipping?.address || "N/A"}</p>


<p><b>City:</b> ${shipping?.city || "N/A"}</p>


<p><b>Pincode:</b> ${shipping?.pincode || "N/A"}</p>



<h3>💳 Payment Details</h3>


<p><b>Payment ID:</b> ${payment?.razorpay_payment_id}</p>


<p><b>Order ID:</b> ${payment?.razorpay_order_id}</p>


<p><b>Total:</b> ₹${amount}</p>




<h3>🛍️ Products</h3>


${
items?.map((item:any)=>(

`
<p>
• ${item?.product?.name || "Product"} 
× ${item?.quantity || 1}
</p>
`

)).join("")
}


<hr/>


<p style="color:gray">

Automated order notification from Hidden Makers

</p>


</div>

`

})





console.log("✅ MAIL SENT:",info.messageId)



return Response.json({

success:true,

messageId:info.messageId

})



}


catch(error:any){


console.error("❌ ORDER MAIL ERROR:",error)


return Response.json({

success:false,

error:error.message

},

{

status:500

})


}


}
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


<<<<<<< HEAD
console.log("📦 ORDER MAIL DATA:",body)
=======
console.log("ORDER MAIL DATA:",body)
>>>>>>> ffda4a7cb1017b6a711e1f0df8c388cd96f05bf8



const {

shipping,

payment,

amount,

items

<<<<<<< HEAD
=======

>>>>>>> ffda4a7cb1017b6a711e1f0df8c388cd96f05bf8
}=body




<<<<<<< HEAD

const info = await transporter.sendMail({



from:`"Hidden Makers" <${process.env.EMAIL_USER}>`,
=======
const transporter = nodemailer.createTransport({



host: process.env.SMTP_HOST,


port:Number(process.env.SMTP_PORT),


secure:true,


auth:{


user:process.env.EMAIL_USER,


pass:process.env.EMAIL_PASS


}


})





await transporter.verify()


console.log("SMTP CONNECTED")






await transporter.sendMail({



from:process.env.EMAIL_USER,
>>>>>>> ffda4a7cb1017b6a711e1f0df8c388cd96f05bf8



to:"info@hiddenmakers.com",



<<<<<<< HEAD
subject:"🛒 New Order Received - Hidden Makers",
=======
subject:"New Order Received - Hidden Makers",


>>>>>>> ffda4a7cb1017b6a711e1f0df8c388cd96f05bf8



html:`

<<<<<<< HEAD
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
=======

<h2>🎉 New Order Received</h2>


<h3>Customer Details</h3>


<p>
<b>Name:</b> ${shipping.name}
</p>


<p>
<b>Phone:</b> ${shipping.phone}
</p>


<p>
<b>Address:</b> ${shipping.address}
</p>


<p>
<b>City:</b> ${shipping.city}
</p>


<p>
<b>Pincode:</b> ${shipping.pincode}
</p>
>>>>>>> ffda4a7cb1017b6a711e1f0df8c388cd96f05bf8




<<<<<<< HEAD
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

=======
<h3>Payment Details</h3>


<p>
<b>Payment ID:</b> ${payment.razorpay_payment_id}
</p>


<p>
<b>Order ID:</b> ${payment.razorpay_order_id}
</p>


<p>
<b>Total:</b> ₹${amount}
</p>





<h3>Products</h3>


${
items?.map((item:any)=>`


<p>

${item.product.name}

x ${item.quantity}

</p>


`).join("")

}



`


>>>>>>> ffda4a7cb1017b6a711e1f0df8c388cd96f05bf8
})





<<<<<<< HEAD
console.log("✅ MAIL SENT:",info.messageId)
=======
console.log("ORDER MAIL SENT")

>>>>>>> ffda4a7cb1017b6a711e1f0df8c388cd96f05bf8



return Response.json({

<<<<<<< HEAD
success:true,

messageId:info.messageId
=======
success:true
>>>>>>> ffda4a7cb1017b6a711e1f0df8c388cd96f05bf8

})



<<<<<<< HEAD
}


catch(error:any){


console.error("❌ ORDER MAIL ERROR:",error)
=======


}catch(error){


console.log("ORDER MAIL ERROR:",error)

>>>>>>> ffda4a7cb1017b6a711e1f0df8c388cd96f05bf8


return Response.json({

success:false,

<<<<<<< HEAD
error:error.message

},

{
=======
error:"Mail failed"


},{
>>>>>>> ffda4a7cb1017b6a711e1f0df8c388cd96f05bf8

status:500

})


}


}
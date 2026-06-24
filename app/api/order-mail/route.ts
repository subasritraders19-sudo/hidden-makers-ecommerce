import nodemailer from "nodemailer"



export async function POST(req:Request){


try{


const body = await req.json()


console.log("ORDER MAIL DATA:",body)



const {

shipping,

payment,

amount,

items


}=body




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



to:"info@hiddenmakers.com",



subject:"New Order Received - Hidden Makers",





html:`


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


})





console.log("ORDER MAIL SENT")




return Response.json({

success:true

})





}catch(error){


console.log("ORDER MAIL ERROR:",error)



return Response.json({

success:false,

error:"Mail failed"


},{

status:500

})


}


}
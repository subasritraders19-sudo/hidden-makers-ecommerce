import nodemailer from "nodemailer"



export async function POST(req:Request){


try{


const {

shipping,

payment,

amount,

items,

invoice_pdf


}=await req.json()



console.log(
"MAIL PDF RECEIVED:",
invoice_pdf ? "YES":"NO"
)





const transporter = nodemailer.createTransport({


host:"smtpout.secureserver.net",


port:587,


secure:false,


auth:{


user:process.env.EMAIL_USER,


pass:process.env.EMAIL_PASS


},



connectionTimeout:20000,


greetingTimeout:20000,


socketTimeout:20000,



tls:{


rejectUnauthorized:false


}


})





// CHECK SMTP CONNECTION

await transporter.verify()



console.log(
"SMTP CONNECTED"
)





let attachments:any[]=[]




if(invoice_pdf){



attachments.push({


filename:"Hidden-Makers-GST-Invoice.pdf",



content:invoice_pdf.replace(

"data:application/pdf;base64,",

""

),



encoding:"base64"


})


}





const mail = await transporter.sendMail({



from:`"Hidden Makers" <${process.env.EMAIL_USER}>`,



to:"info@hiddenmakers.com",



subject:"🛒 New Order Received - Hidden Makers",



html:`


<h2>🎉 New Order Received</h2>



<h3>Customer Details</h3>


<p>Name : ${shipping.name}</p>

<p>Email : ${shipping.email}</p>

<p>Phone : ${shipping.phone}</p>

<p>Address : ${shipping.address}</p>

<p>City : ${shipping.city}</p>

<p>Pincode : ${shipping.pincode}</p>



<hr/>


<h3>Payment Details</h3>


<p>
Payment ID : ${payment.razorpay_payment_id}
</p>


<p>
Order ID : ${payment.razorpay_order_id}
</p>


<p>
Amount : ₹${amount}
</p>




<h3>Products</h3>


${
items.map((item:any)=>`

<p>
${item.product.name} × ${item.quantity}
</p>

`).join("")
}




<hr/>


<p>
🧾 GST Invoice attached
</p>


<p>
Hidden Makers
</p>


`,



attachments


})





console.log(
"MAIL SENT:",
mail.messageId
)



return Response.json({

success:true

})




}

catch(error:any){


console.log(
"MAIL ERROR:",
error
)



return Response.json({

success:false,

error:error.message

},{

status:500

})


}



}
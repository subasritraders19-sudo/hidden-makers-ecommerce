"use client"

import { useState } from "react"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { useStore } from "@/components/store-provider"


export default function PaymentButton() {


const [success,setSuccess] = useState(false)
const [loading,setLoading] = useState(false)

const {
cart,
cartTotal,
clearCart
}=useStore()



async function handlePayment(){


try{

setLoading(true)



// create order

const orderRes = await fetch("/api/create-order",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

amount:cartTotal

})

})



const order = await orderRes.json()



const options = {


key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,


amount:order.amount,


currency:"INR",


name:"Hidden Makers",


description:"Order Payment",


order_id:order.order_id,



handler:async function(response:any){



// verify payment


const verify = await fetch("/api/verify-payment",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(response)

})



const result = await verify.json()



if(result.success){


// send mail

await fetch("/api/order-mail",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

paymentId:response.razorpay_payment_id,

orderId:response.razorpay_order_id,

amount:cartTotal,

items:cart


})

})




// success popup


setSuccess(true)

clearCart()



// confetti

confetti({

particleCount:200,

spread:120,

origin:{
y:0.6
}

})


}



}


}



const razorpay = new window.Razorpay(options)



razorpay.on("payment.failed",()=>{

alert("Payment failed")

})



razorpay.open()



}

catch(err){

console.log(err)

alert("Payment error")

}

finally{

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

{

loading

?

"Processing..."

:

"Pay Now"

}


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

Thank you for shopping with Hidden Makers

</p>




<Button


onClick={()=>{

setSuccess(false)

window.location.href="/"

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
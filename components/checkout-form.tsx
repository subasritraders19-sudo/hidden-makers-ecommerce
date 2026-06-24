"use client"

import { useState } from "react"
import confetti from "canvas-confetti"
import { useStore } from "@/components/store-provider"


declare global {
  interface Window {
    Razorpay:any
  }
}



export default function CheckoutForm(){


const {
cart,
cartTotal,
setCartOpen,
clearCart
}=useStore()



const [open,setOpen]=useState(false)
const [success,setSuccess]=useState(false)
const [loading,setLoading]=useState(false)



const [shipping,setShipping]=useState({

name:"",
phone:"",
address:"",
city:"",
pincode:""

})



function change(e:any){

setShipping({

...shipping,

[e.target.name]:e.target.value

})

}




// BLACK + GOLD BLAST

function successBlast(){


const duration = 3000

const end = Date.now()+duration



function frame(){


confetti({

particleCount:15,

spread:100,

startVelocity:50,

origin:{
x:0,
y:0.6
},

colors:[
"#000000",
"#D4AF37"
]

})



confetti({

particleCount:15,

spread:100,

startVelocity:50,

origin:{
x:1,
y:0.6
},

colors:[
"#000000",
"#D4AF37"
]

})



if(Date.now()<end){

requestAnimationFrame(frame)

}


}


frame()


}





async function payment(){


if(
!shipping.name ||
!shipping.phone ||
!shipping.address ||
!shipping.city ||
!shipping.pincode
){

alert("Please fill all shipping details")

return

}



try{


setLoading(true)



const orderRes = await fetch("/api/create-order",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

amount:cartTotal * 100

})

})



const order = await orderRes.json()



if(!order.order_id){

throw new Error("Order failed")

}





const options={


key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,


amount:order.amount,


currency:"INR",


name:"Hidden Makers",


description:"Premium Order",


order_id:order.order_id,



prefill:{


name:shipping.name,

contact:shipping.phone


},



theme:{


color:"#D4AF37"

},





handler:async function(response:any){



const verifyRes = await fetch("/api/verify-payment",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(response)

})




const verify = await verifyRes.json()



if(verify.success){



await fetch("/api/order-mail",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

shipping,

payment:response,

amount:cartTotal,

items:cart

})


})





clearCart()



setSuccess(true)



successBlast()



}



}



}





const razorpay = new window.Razorpay(options)



razorpay.on("payment.failed",()=>{

alert("Payment Failed")

})



razorpay.open()



}



catch(err){

console.log(err)

alert("Something went wrong")

}



finally{

setLoading(false)

}


}







return(

<>



<button

onClick={()=>setOpen(true)}

className="w-full bg-primary text-primary-foreground py-3 rounded"

>

Proceed to Checkout

</button>








{
open && !success &&

<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">


<div className="bg-card p-8 rounded-xl w-[90%] max-w-md">


<h2 className="text-2xl font-serif mb-5">

Shipping Details

</h2>



<input
name="name"
placeholder="Full Name"
onChange={change}
className="w-full border p-3 mb-3 rounded"
/>



<input
name="phone"
placeholder="Phone Number"
onChange={change}
className="w-full border p-3 mb-3 rounded"
/>



<input
name="address"
placeholder="Address"
onChange={change}
className="w-full border p-3 mb-3 rounded"
/>



<input
name="city"
placeholder="City"
onChange={change}
className="w-full border p-3 mb-3 rounded"
/>



<input
name="pincode"
placeholder="Pincode"
onChange={change}
className="w-full border p-3 mb-5 rounded"
/>





<button

disabled={loading}

onClick={payment}

className="w-full bg-primary text-primary-foreground py-3 rounded"

>


{
loading
?
"Processing Payment..."
:
"Pay Now"
}


</button>



</div>


</div>

}










{
success &&


<div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md">


<div className="bg-white w-[90%] max-w-md rounded-3xl p-10 text-center shadow-2xl border border-[#D4AF37]">


<div className="text-6xl mb-5">

🎉

</div>



<h1 className="text-4xl font-bold text-green-600">

Payment Successful

</h1>



<p className="mt-4 text-gray-700 text-lg">

Your order has been confirmed.

</p>



<p className="mt-2 text-gray-500">

Thank you for shopping with Hidden Makers

</p>





<button


onClick={()=>{


setSuccess(false)

setOpen(false)

setCartOpen(false)

window.location.href="/"

}}


className="mt-8 bg-black text-[#D4AF37] px-10 py-3 rounded-full font-semibold hover:bg-gray-900"

>


Continue Shopping


</button>



</div>


</div>


}





</>

)


}
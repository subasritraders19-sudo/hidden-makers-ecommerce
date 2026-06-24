import Razorpay from "razorpay"


export async function POST(req:Request){

try{


const {amount}=await req.json()


if(!amount || amount < 100){

return Response.json(
{
error:"Minimum amount is 1 rupee"
},
{
status:400
}
)

}



const razorpay = new Razorpay({

key_id:process.env.RAZORPAY_KEY_ID!,

key_secret:process.env.RAZORPAY_KEY_SECRET!

})




const order = await razorpay.orders.create({

amount,

currency:"INR",

receipt:"receipt_"+Date.now()

})




return Response.json({

order_id:order.id,

amount:order.amount,

currency:order.currency

})



}catch(error:any){


console.log(error)


return Response.json({

error:"Razorpay order creation failed"

},
{
status:500
}
)


}


}
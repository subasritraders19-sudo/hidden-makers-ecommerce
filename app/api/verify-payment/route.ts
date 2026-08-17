import crypto from "crypto"



export async function POST(req:Request){


try{


const {

razorpay_order_id,

razorpay_payment_id,

razorpay_signature


}=await req.json()



if(
!razorpay_order_id ||
!razorpay_payment_id ||
!razorpay_signature

){

return Response.json({

success:false,

message:"Missing payment details"

},
{
status:400
})

}




const generated_signature = crypto

.createHmac(
"sha256",
process.env.RAZORPAY_KEY_SECRET!
)

.update(
razorpay_order_id + "|" + razorpay_payment_id
)

.digest("hex")





if(generated_signature !== razorpay_signature){


return Response.json({

success:false,

message:"Invalid signature"

},
{
status:400
})


}




return Response.json({

success:true,

message:"Payment verified"

})




}catch(error:any){


return Response.json({

success:false,

message:error.message

},
{
status:500
})


}


}
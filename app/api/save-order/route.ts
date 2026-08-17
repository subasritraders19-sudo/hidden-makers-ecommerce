import { createClient } from "@supabase/supabase-js"


const supabaseAdmin = createClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.SUPABASE_SERVICE_ROLE_KEY!

)





export async function POST(req:Request){


try{


const body = await req.json()


console.log("SAVE ORDER DATA:",body)



const {

shipping,

payment,

amount,

items

}=body






const {data,error}=await supabaseAdmin

.from("orders")

.insert({


customer_name:shipping.name,


phone:shipping.phone,


address:shipping.address,


city:shipping.city,


pincode:shipping.pincode,


payment_id:payment.razorpay_payment_id,


order_id:payment.razorpay_order_id,


amount:amount,


items:items



})

.select()






if(error){


console.log("DATABASE ERROR:",error)



return Response.json({

success:false,

error:error.message


},{

status:500

})


}







console.log("ORDER SAVED:",data)





return Response.json({

success:true,

data

})





}
catch(error:any){


console.log("SAVE ORDER ERROR:",error)



return Response.json({

success:false,

error:error.message || "Order save failed"


},{

status:500

})



}


}
import { NextResponse } from "next/server"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"



export async function POST(req:Request){


try{


const {
shipping,
items,
amount
}=await req.json()



const pdfDoc = await PDFDocument.create()


const page = pdfDoc.addPage([595,842])



const normalFont =
await pdfDoc.embedFont(StandardFonts.Helvetica)


const boldFont =
await pdfDoc.embedFont(StandardFonts.HelveticaBold)



function text(
value:string,
x:number,
y:number,
size:number=10,
bold=false
){

page.drawText(value,{
x,
y,
size,
font:bold ? boldFont : normalFont
})

}




// HEADER


text(
"GST INVOICE",
220,
790,
22,
true
)



const invoiceNumber =
"INV-"+Date.now()



text(
`Invoice Number: ${invoiceNumber}`,
380,
755,
9
)



text(
`Date: ${new Date().toLocaleDateString("en-IN")}`,
380,
740,
9
)




// SELLER BOX


page.drawRectangle({

x:40,
y:590,
width:250,
height:130,

borderWidth:1,
borderColor:rgb(0,0,0)

})



text(
"Seller Details:",
50,
700,
12,
true
)


text(
"Subasri Traders",
50,
680
)


text(
"119/4,Muthuvel complex, old hospital road",
50,
665
)


text(
"PUDUKKOTTAI,TAMIL NADU",
50,
650
)


text(
"Pincode: 614616",
50,
635
)


text(
"Contact: 9894192384",
50,
620
)


text(
"Email: info@hiddenmakers.com",
50,
605
)


text(
"IEC: AVOPV0052C",
50,
590
)


text(
"GSTN: 33AVOPV0052C1ZS",
50,
575
)





// CUSTOMER BOX


page.drawRectangle({

x:310,
y:590,
width:240,
height:130,

borderWidth:1,
borderColor:rgb(0,0,0)

})



text(
"Consignee Details:",
320,
700,
12,
true
)


text(
`Name: ${shipping.name}`,
320,
680
)


text(
`Email: ${shipping.email}`,
320,
665
)


text(
`Phone: ${shipping.phone}`,
320,
650
)


text(
`Address: ${shipping.address}`,
320,
635
)


text(
`City: ${shipping.city}`,
320,
620
)


text(
`Pincode: ${shipping.pincode}`,
320,
605
)






// TABLE


let y=520



page.drawRectangle({

x:40,
y:y,
width:510,
height:30,

borderWidth:1,
borderColor:rgb(0,0,0)

})


text(
"Description",
50,
530,
10,
true
)


text(
"Quantity",
300,
530,
10,
true
)


text(
"Amount",
430,
530,
10,
true
)





y-=30



items.forEach((item:any)=>{


page.drawRectangle({

x:40,
y:y,
width:510,
height:25,

borderWidth:1,
borderColor:rgb(0,0,0)

})



text(
String(item.product.name),
50,
y+8
)



text(
String(item.quantity),
310,
y+8
)



text(
"Rs "+String(item.product.price),
430,
y+8
)



y-=25


})






// TOTAL


text(
"Total Amount : Rs "+amount,
350,
y-20,
12,
true
)



text(
"Incl. of all taxes",
350,
y-40
)



text(
"Place : Tamil Nadu",
350,
y-60
)






// FOOTER


text(
"WHERE FLAVOR MEETS FASION",
160,
80,
16,
true
)






const pdfBytes =
await pdfDoc.save()



const base64 =
Buffer.from(pdfBytes)
.toString("base64")




return NextResponse.json({

success:true,

pdf:
`data:application/pdf;base64,${base64}`,

invoice_number:invoiceNumber

})




}
catch(error:any){


console.log(
"INVOICE ERROR:",
error
)



return NextResponse.json({

success:false,

error:error.message


},
{
status:500
})


}


}
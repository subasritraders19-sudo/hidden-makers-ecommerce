import nodemailer from "nodemailer"


export async function POST(req: Request) {


  try {


    const {
      name,
      email,
      message

    } = await req.json()



    const transporter = nodemailer.createTransport({


      host:"smtpout.secureserver.net",


      port:465,


      secure:true,


      auth:{


        user:process.env.EMAIL_USER,


        pass:process.env.EMAIL_PASS


      },


      tls:{


        rejectUnauthorized:false

      }


    })





    await transporter.sendMail({


      from:process.env.EMAIL_USER,


      to:"info@hiddenmakers.com",


      replyTo:email,


      subject:`New Contact Message - ${name}`,



      html:`


      <h2>New Contact Message</h2>


      <p><b>Name:</b> ${name}</p>


      <p><b>Email:</b> ${email}</p>


      <p><b>Message:</b> ${message}</p>


      `


    })




    return Response.json({


      success:true


    })




  } catch(error:any){


    console.log(error.message)



    return Response.json({


      success:false


    },{


      status:500

    })


  }


}
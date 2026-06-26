'use client'

import { useState, FormEvent } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { socialLinks } from '@/components/site-footer'
import { Button } from '@/components/ui/button'


export default function ContactPage() {


  const [submitted, setSubmitted] = useState(false)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")




  async function handleSubmit(e: FormEvent<HTMLFormElement>) {


    e.preventDefault()


    setLoading(true)

    setError("")



    const formData = new FormData(e.currentTarget)



    const data = {

      name: formData.get("name"),

      email: formData.get("email"),

      message: formData.get("message")

    }



    console.log("FORM DATA:", data)




    try {


      const response = await fetch("/api/contact", {


        method:"POST",


        headers:{


          "Content-Type":"application/json"


        },


        body:JSON.stringify(data)


      })




      const result = await response.json()



      console.log("API RESPONSE:", result)




      if(result.success){


        setSubmitted(true)


      }else{


        setError("Message sending failed")


      }



    }catch(err){


      console.log(err)


      setError("Something went wrong")


    }



    setLoading(false)



  }






  return (


    <SiteShell>


      <PageHero

        eyebrow="We&apos;d Love to Hear From You"

        title="Contact Us"

        description="Questions about our products or your order? Reach out — our team is always happy to help."

      />



      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2">


        <div>


          <h2 className="font-serif text-3xl">

            Get in Touch

          </h2>



          <div className="mt-8 space-y-6">


            <div className="flex gap-4">

              <Mail className="text-primary"/>

              <p>

              info@hiddenmakers.com

              </p>

            </div>



            <div className="flex gap-4">

              <Phone className="text-primary"/>

              <p>

              +91 9677434383 <br/>

              

              </p>

            </div>



            <div className="flex gap-4">

              <MapPin className="text-primary"/>

              <address>

              Subasri Traders, Pudukottai,Tamil Nadu,India<br/>

              </address>

            </div>


          </div>


        </div>






        <div className="rounded-sm border p-8">


        {

        submitted ? (


          <h2 className="text-xl text-primary">

          Message Sent Successfully!

          </h2>


        ) : (


        <form

        onSubmit={handleSubmit}

        className="flex flex-col gap-5"

        >



          <input

          name="name"

          required

          placeholder="Your Name"

          className="border px-4 py-3"

          />




          <input

          name="email"

          type="email"

          required

          placeholder="Your Email"

          className="border px-4 py-3"

          />





          <textarea

          name="message"

          required

          rows={5}

          placeholder="Your Message"

          className="border px-4 py-3"

          />





          {
            error &&

            <p className="text-red-500">

            {error}

            </p>

          }




          <Button

          type="submit"

          disabled={loading}

          >


          <Send className="mr-2 h-4 w-4"/>


          {

          loading

          ? "Sending..."

          : "Send Message"

          }


          </Button>



        </form>


        )


        }



        </div>



      </section>


    </SiteShell>


  )

}
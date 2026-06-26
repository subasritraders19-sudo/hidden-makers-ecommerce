"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { fireConfetti } from "@/lib/confetti";


export default function SignupPage() {


  const router = useRouter();


  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const [success,setSuccess] = useState(false);




  const handleSignup = async(e:React.FormEvent)=>{


    e.preventDefault();


    if(loading) return;


    setLoading(true);
    setError("");



    try{


      const {data,error}=await supabase.auth.signUp({


        email,

        password,


        options:{


          data:{


            first_name:firstName,

            last_name:lastName


          }


        }


      });





      if(error){


        setError(error.message);

        return;


      }







      if(data.user){


        fireConfetti();


        setSuccess(true);



        setTimeout(()=>{


          router.push("/");


        },2000);



      }



    }

    catch(err){


      console.log(err);

      setError("Something went wrong");


    }


    finally{


      setLoading(false);


    }


  };







return(


<div className="min-h-screen flex items-center justify-center bg-gray-50">


<div className="w-[420px] bg-white p-8 rounded-xl shadow-md">



<h1 className="text-2xl font-semibold text-center mb-6">

Create Account

</h1>





{
error &&

<div className="bg-red-100 text-red-700 p-3 rounded mb-4">

{error}

</div>

}





<form

onSubmit={handleSignup}

className="space-y-4"

>




<input

placeholder="First Name"

value={firstName}

onChange={(e)=>setFirstName(e.target.value)}

required

className="w-full border p-3 rounded"

/>





<input

placeholder="Last Name"

value={lastName}

onChange={(e)=>setLastName(e.target.value)}

required

className="w-full border p-3 rounded"

/>







<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

required

className="w-full border p-3 rounded"

/>







<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

required

className="w-full border p-3 rounded"

/>







<button

disabled={loading}

type="submit"

className="w-full bg-[#556b4f] text-white py-3 rounded"

>


{

loading

?

"Creating..."

:

"Create Account"

}


</button>





</form>






<p className="text-center mt-5 text-sm">


Already have account?{" "}


<button

onClick={()=>router.push("/login")}

className="text-green-700"

>

Login

</button>


</p>





</div>





{


success &&


<div className="fixed inset-0 bg-black/60 flex items-center justify-center">


<div className="bg-white rounded-xl p-8 text-center">


<h2 className="text-3xl font-bold text-green-600">

🎉 Account Created!

</h2>


<p className="mt-3 text-gray-600">

Welcome to Hidden Makers

</p>


</div>


</div>


}




</div>


)


}
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { SiteShell } from '@/components/site-shell'
import { ProductCard } from '@/components/product-card'
import PaymentButton from '@/components/payment-button'

import { products } from '@/lib/products'


const categories = [

  {
    title:'Clothing',
    description:
      'Handwoven lungis and pure silk pattu pudavai, crafted in the South Indian tradition.',
    image:'/images/cat-clothing.png',
    href:'/shop#clothing',
  },


  {
    title:'Health Mix Food',
    description:
      'Naturally prepared health mixes and herbal powders for everyday wellbeing.',
    image:'/images/cat-food.png',
    href:'/shop#food',
  },


]



export default function HomePage(){


const featured = products.slice(0,4)



return(


<SiteShell>



{/* HERO */}


<section className="relative overflow-hidden">


<div className="absolute inset-0">


<Image

src="/images/hero.png"

alt="Hidden Makers traditional crafts and health foods"

fill

priority

className="object-cover opacity-30"

/>


<div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background"/>


</div>




<div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center md:py-40">


<div className="mb-6 flex items-center gap-3">


<span className="font-serif text-4xl font-semibold tracking-[0.25em] text-primary md:text-5xl">

HIDDEN

</span>


<span className="font-serif text-4xl font-light tracking-[0.25em] text-foreground md:text-5xl">

MAKERS

</span>


</div>



<p className="h-px w-16 bg-primary"/>



<h1 className="mt-8 text-balance font-serif text-3xl leading-tight text-foreground md:text-5xl">


Crafted with Tradition.

<br/>

Delivered with Style.


</h1>




<p className="mt-6 max-w-xl text-muted-foreground">


A premium house of heritage — bringing together authentic clothing and natural health foods with a refined, modern touch.


</p>





<div className="mt-10 flex flex-col gap-4 sm:flex-row">


<Link

href="/shop#clothing"

className="rounded-sm bg-primary px-8 py-3 text-sm uppercase text-primary-foreground"

>

Shop Clothing

</Link>



<Link

href="/shop#food"

className="rounded-sm border border-primary px-8 py-3 text-sm uppercase text-primary"

>

Shop Health Foods

</Link>



</div>



</div>


</section>






{/* CATEGORIES */}



<section className="mx-auto max-w-7xl px-6 py-20">


<div className="mb-12 text-center">


<p className="text-xs uppercase tracking-[0.25em] text-primary">

Explore

</p>


<h2 className="mt-3 font-serif text-3xl text-foreground">


Two Worlds, One Heritage


</h2>


</div>





<div className="grid gap-6 md:grid-cols-2">


{
categories.map((cat)=>(


<Link

key={cat.title}

href={cat.href}

className="group relative h-80 overflow-hidden rounded-sm border"

>


<Image

src={cat.image}

alt={cat.title}

fill

className="object-cover group-hover:scale-105 transition"

/>



<div className="absolute inset-0 bg-gradient-to-t from-background"/>



<div className="absolute bottom-0 p-8">


<h3 className="font-serif text-2xl">

{cat.title}

</h3>


<p className="mt-2 text-sm text-muted-foreground">

{cat.description}

</p>



</div>



</Link>


))

}



</div>



</section>







{/* PRODUCTS */}



<section className="mx-auto max-w-7xl px-6 pb-20">



<div className="mb-12 flex justify-between">


<div>


<p className="text-xs uppercase tracking-[0.25em] text-primary">

Curated

</p>



<h2 className="mt-3 font-serif text-3xl">

Featured Products

</h2>


</div>



<PaymentButton/>


</div>





<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">


{

featured.map((product)=>(


<ProductCard

key={product.id}

product={product}

/>


))


}


</div>



</section>







{/* STORY */}



<section className="border-t bg-card">


<div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">


<div>


<p className="text-xs uppercase tracking-[0.25em] text-primary">

Our Story

</p>



<h2 className="mt-3 font-serif text-3xl">

Where heritage meets the modern home

</h2>



<p className="mt-6 text-muted-foreground">

Hidden Makers is a brand dedicated to delivering traditional foods and authentic clothing with a modern premium touch.

</p>


<Link

href="/about"

className="mt-8 inline-flex items-center gap-2 text-primary"

>

Read Our Story

<ArrowRight className="h-4 w-4"/>

</Link>



</div>






<div className="relative h-80 overflow-hidden rounded-sm">


<Image

src="/images/cat-food.png"

alt="Traditional health mix preparation"

fill

className="object-cover"

/>


</div>



</div>



</section>



</SiteShell>



)


}
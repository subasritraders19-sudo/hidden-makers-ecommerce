export type Category = 'clothing' | 'food'

export type Product = {
  id: string
  name: string
  price: number
  category: Category
  subtitle: string
  description: string
  image: string
  comboEligible?: boolean
}

export const products: Product[] = [
  // {
  //   id: 'mens-lungi',
  //   name: "Men's Lungi",
  //   price: 799,
  //   category: 'clothing',
  //   subtitle: 'Handwoven Cotton',
  //   description:
  //     'Breathable handwoven cotton lungi with a refined checked weave and a subtle gold border. A timeless staple of South Indian tradition.',
  //   image: '/images/products/lungi.png',
  // },
  // {
  //   id: 'pattu-pudavai',
  //   name: "Women's Pattu Pudavai",
  //   price: 4999,
  //   category: 'clothing',
  //   subtitle: 'Pure Silk Saree',
  //   description:
  //     'A comfortable and adorable Jabla Frock Knot designed specially for little ones. Made with soft, lightweight fabric, this frock-style jabla offers a gentle feel on delicate baby skin while providing easy movement and comfort throughout the day.The knot-style design makes dressing easy and convenient, while the cute frock pattern gives your little one a charming and stylish look. Perfect for everyday wear, playtime, outings, and special occasions.',
  //   image: '/images/products/pattu.png',
  // },
  {
    id: 'Jabla-Frock-Knot',
    name: " Muslin Jabla-Frock-Knot(0-3 months)",
    price: 225,
    category: 'clothing',
    subtitle: 'Pure cotton',
    description:
      'A cute and comfortable Baby Jabla Frock Knot made with soft, lightweight fabric to keep your little one comfortable throughout the day. The adorable frock-style design gives a charming traditional look, while the convenient knot closure makes dressing easy and hassle-free.Perfect for everyday wear, playtime, outings, festive occasions, and special moments. Designed to provide gentle comfort and easy movement for your baby while keeping them looking adorable.',
    image: '/images/products/JablaFrockKnot.png',
  },
  {
    id: 'Jabla-Knot',
    name: "Muslin Jabla-Knot(0-3 months)",
    price: 162,
    category: 'clothing',
    subtitle: 'Pure cotton',
    description:
      'A cute and comfortable Baby Jabla Frock Knot made with soft, lightweight fabric to keep your little one comfortable throughout the day. The adorable frock-style design gives a charming traditional look, while the convenient knot closure makes dressing easy and hassle-free.Perfect for everyday wear, playtime, outings, festive occasions, and special moments. Designed to provide gentle comfort and easy movement for your baby while keeping them looking adorable.',
    image: '/images/products/1.png',
  },
  {
    id: 'Jabla-side-Knot',
    name: " Muslin Jabla-side-Knot(0-3 months)",
    price: 195,
    category: 'clothing',
    subtitle: 'Pure cotton',
    description:
      'A cute and comfortable Baby Jabla Frock Knot made with soft, lightweight fabric to keep your little one comfortable throughout the day. The adorable frock-style design gives a charming traditional look, while the convenient knot closure makes dressing easy and hassle-free.Perfect for everyday wear, playtime, outings, festive occasions, and special moments. Designed to provide gentle comfort and easy movement for your baby while keeping them looking adorable.',
    image: '/images/products/JablaKnotside.png',
  },
  {
    id:'co-order set',
    name:"Muslin Boxy style co-order set(0-3 months)",
    price:336,
    category: 'clothing',
    subtitle: 'Pure cotton',
    description:
      'A cute and comfortable Baby Jabla Frock Knot made with soft, lightweight fabric to keep your little one comfortable throughout the day. The adorable frock-style design gives a charming traditional look, while the convenient knot closure makes dressing easy and hassle-free.Perfect for everyday wear, playtime, outings, festive occasions, and special moments. Designed to provide gentle comfort and easy movement for your baby while keeping them looking adorable.',
    image: '/images/products/coorderset.png',
  },
  {
    id: 'combo pack',
    name: 'Mudavatukal Powder,Kollu Kanji Mix,Valaipoo Powder,Sweet Potato Mix,Pirandai Powder,Ash gourd',
    price: 1099,
    category: 'food',
    subtitle: 'Traditional Health Mix',
    description:
        'A wholesome traditional combo featuring Mudavattukal Powder, Kollu Kanji Mix, Pirandai Powder, Valaipoo Powder, and Sweet Potato Mix. Made for those who appreciate traditional ingredients and the goodness of time-honoured food practices, this versatile collection brings authentic traditional flavours to your everyday routine.',
    image: '/images/products/combo.png',
    // comboEligible: true,
  },
  {
    id: 'mudavatukal-powder',
    name: 'Mudavatukal Powder',
    price: 299,
    category: 'food',
    subtitle: 'Traditional Health Mix',
    description:
      'A time-honoured bone and joint wellness blend, ground from carefully selected natural ingredients.',
    image: '/images/products/mudavatukal.png',
    // comboEligible: true,
  },
  {
    id: 'kollu-kanji',
    name: 'Kollu Kanji Mix',
    price: 199,
    category: 'food',
    subtitle: 'Horse Gram Porridge',
    description:
      'Protein-rich horse gram porridge mix, naturally roasted for a wholesome, comforting meal.',
    image: '/images/products/kollu.png',
    // comboEligible: true,
  },
  {
    id: 'pirandai-powder',
    name: 'Pirandai Powder',
    price: 279,
    category: 'food',
    subtitle: 'Adamant Creeper Herb',
    description:
      'A revered herbal powder traditionally used to support bone strength and digestion.',
    image: '/images/products/pirandai.png',
  },
  // {
  //   id: 'abc-malt',
  //   name: 'ABC Malt',
  //   price: 199,
  //   category: 'food',
  //   subtitle: 'Apple Beetroot Carrot',
  //   description:
  //     'A nourishing malt drink mix from apple, beetroot and carrot — naturally sweet and rich in nutrients.',
  //   image: '/images/products/abc-malt.png',
  // },
  {
    id: 'sweet-potato-mix',
    name: 'Sweet Potato Mix',
    price: 199,
    category: 'food',
    subtitle: 'Wholesome Energy Blend',
    description:
      'A gently roasted sweet potato flour mix that makes a warm, energising porridge for any time of day.',
    image: '/images/products/sweet-potato.png',
  },
  {
    id: 'ash-gourd-mix',
    name: 'Ash Gourd Mix',
    price: 249,
    category: 'food',
    subtitle: 'Cooling Wellness Mix',
    description:
      'A cooling, mineral-rich ash gourd blend prized in traditional kitchens for everyday wellbeing.',
    image: '/images/products/ash-gourd.png',
  },
  {
    id: 'valaipoo-powder',
    name: 'Valaipoo Powder',
    price: 119,
    category: 'food',
    subtitle: 'Banana Flower Herb',
    description:
      'Nutrient-dense banana flower powder, a heritage ingredient celebrated for its natural goodness.',
    image: '/images/products/valaipoo.png',
  },
  {
  id: 'Dates-powder',
  name: 'Dates Powder',
  price: 169,
  category: 'food',
  subtitle: 'Naturally Sweet Dates Goodness',
  description:
    'Made from dates, this naturally sweet powder is a convenient ingredient for adding date flavour and sweetness to milk, porridge, smoothies, desserts, and homemade recipes.',
  image: '/images/products/dates1.png',
  },
  {
  id: 'Raw-Nendran-Powder',
  name: 'Raw Nendran Banana Powder',
  price: 158,
  category: 'food',
  subtitle: 'Traditional Nendran Banana Goodness for Little Ones',
  description:
    'Made from raw Nendran bananas, this traditional banana powder is a versatile ingredient for preparing homemade baby porridge and other age-appropriate recipes. Easy to prepare and convenient for everyday cooking, it can be included in your little one’s diet according to their age and feeding needs.',
  image: '/images/products/raw banana.png',
},
]

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export const DEMO_CREDENTIALS = {
  email: 'admin@hiddenmakers.com',
  password: 'Hidden@123',
}

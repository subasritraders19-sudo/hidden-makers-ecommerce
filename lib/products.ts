export type Category = 'clothing' | 'food'

export type Product = {
  id: string
  name: string
  price: number
  category: Category
  subtitle: string
  description: string
  image: string
}

export const products: Product[] = [
  {
    id: 'mens-lungi',
    name: "Men's Lungi",
    price: 799,
    category: 'clothing',
    subtitle: 'Handwoven Cotton',
    description:
      'Breathable handwoven cotton lungi with a refined checked weave and a subtle gold border. A timeless staple of South Indian tradition.',
    image: '/images/products/lungi.png',
  },
  {
    id: 'pattu-pudavai',
    name: "Women's Pattu Pudavai",
    price: 4999,
    category: 'clothing',
    subtitle: 'Pure Silk Saree',
    description:
      'Luxurious pure silk pattu pudavai in deep maroon, woven with intricate gold zari borders for occasions that matter.',
    image: '/images/products/pattu.png',
  },
  {
    id: 'mudavatukal-powder',
    name: 'Mudavatukal Powder',
    price: 349,
    category: 'food',
    subtitle: 'Traditional Health Mix',
    description:
      'A time-honoured bone and joint wellness blend, ground from carefully selected natural ingredients.',
    image: '/images/products/mudavatukal.png',
  },
  {
    id: 'kollu-kanji',
    name: 'Kollu Kanji Mix',
    price: 299,
    category: 'food',
    subtitle: 'Horse Gram Porridge',
    description:
      'Protein-rich horse gram porridge mix, naturally roasted for a wholesome, comforting meal.',
    image: '/images/products/kollu.png',
  },
  {
    id: 'pirandai-powder',
    name: 'Pirandai Powder',
    price: 329,
    category: 'food',
    subtitle: 'Adamant Creeper Herb',
    description:
      'A revered herbal powder traditionally used to support bone strength and digestion.',
    image: '/images/products/pirandai.png',
  },
  {
    id: 'abc-malt',
    name: 'ABC Malt',
    price: 399,
    category: 'food',
    subtitle: 'Apple Beetroot Carrot',
    description:
      'A nourishing malt drink mix from apple, beetroot and carrot — naturally sweet and rich in nutrients.',
    image: '/images/products/abc-malt.png',
  },
  {
    id: 'sweet-potato-mix',
    name: 'Sweet Potato Mix',
    price: 359,
    category: 'food',
    subtitle: 'Wholesome Energy Blend',
    description:
      'A gently roasted sweet potato flour mix that makes a warm, energising porridge for any time of day.',
    image: '/images/products/sweet-potato.png',
  },
  {
    id: 'ash-gourd-mix',
    name: 'Ash Gourd Mix',
    price: 369,
    category: 'food',
    subtitle: 'Cooling Wellness Mix',
    description:
      'A cooling, mineral-rich ash gourd blend prized in traditional kitchens for everyday wellbeing.',
    image: '/images/products/ash-gourd.png',
  },
  {
    id: 'valaipoo-powder',
    name: 'Valaipoo Powder',
    price: 339,
    category: 'food',
    subtitle: 'Banana Flower Herb',
    description:
      'Nutrient-dense banana flower powder, a heritage ingredient celebrated for its natural goodness.',
    image: '/images/products/valaipoo.png',
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

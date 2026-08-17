import { notFound } from "next/navigation";
import { products, formatPrice } from "@/lib/products";
import { SiteShell } from "@/components/site-shell";
import Image from "next/image";
import AddToCartButton from '@/components/add-to-cart-button'

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Hidden Makers`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={700}
            height={700}
            className="rounded-xl border"
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-gray-500">
            {product.subtitle}
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {product.name}
          </h1>

          <p className="mt-6 text-gray-600 leading-8">
            {product.description}
          </p>

          <h2 className="mt-8 text-3xl font-bold text-amber-600">
            {formatPrice(product.price)}
          </h2>

          <AddToCartButton product={product} />
        </div>
      </section>
    </SiteShell>
  );
}
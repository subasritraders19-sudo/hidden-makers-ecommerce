import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    // Read current index
    const { data, error } = await supabaseAdmin
      .from("automation_settings")
      .select("current_product_index")
      .eq("id", 1)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Automation settings not found" },
        { status: 500 }
      );
    }

    const currentIndex = data.current_product_index;

    // Safety check
    if (currentIndex < 0 || currentIndex >= products.length) {
      return NextResponse.json(
        { error: "Invalid product index" },
        { status: 500 }
      );
    }

    const product = products[currentIndex];

    // Next index
    const nextIndex =
      currentIndex >= products.length - 1 ? 0 : currentIndex + 1;

    // Update next product index
    await supabaseAdmin
      .from("automation_settings")
      .update({
        current_product_index: nextIndex,
      })
      .eq("id", 1);

    return NextResponse.json({
      id: product.id,
      name: product.name,
      price: product.price,
      image: `https://www.hiddenmakers.com${product.image}`,
      description: product.description,
      category: product.category,
      subtitle: product.subtitle,
      productUrl: `https://www.hiddenmakers.com/products/${product.id}`,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
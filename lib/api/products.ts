export async function fetchProductById(id: string) {
    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
      next: { revalidate: 60 }, // ISR: revalidate every 1 min
    });
  
    if (!res.ok) return null;
    return res.json();
  }
  
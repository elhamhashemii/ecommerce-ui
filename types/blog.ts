
export type BlogCategory = {
    id: number,
    title: string;
}

export type BlogItem = {
    id: number;
    title: string;
    intro: string;
    content: string;
    categories: BlogCategory[];
    imageUrls: string;
    status?: string;
}
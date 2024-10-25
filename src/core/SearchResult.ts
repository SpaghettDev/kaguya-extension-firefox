export type SearchResultType = {
    id: string;
    title: string;
    thumbnail: string;
    extra?: Record<string, string>;
};

export default function SearchResult(data: SearchResultType) {
    return data;
}

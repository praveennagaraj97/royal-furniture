import SearchResults from '@/components/search/search-results';

interface SearchPageProps {
  params: Promise<{
    locale: string;
    country: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const searchQuery = q || '';

  return <SearchResults searchQuery={searchQuery} />;
}

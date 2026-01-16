import SearchResults from '@/components/search/search-results';

interface SearchPageProps {
  params: Promise<{
    locale: string;
    country: string;
  }>;
}

export default async function SearchPage({}: SearchPageProps) {
  return <SearchResults />;
}

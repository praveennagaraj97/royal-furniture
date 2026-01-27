import SearchResults from '@/components/search';

interface SearchPageProps {
  params: Promise<{
    locale: string;
    country: string;
  }>;
}

export default async function SearchPage({}: SearchPageProps) {
  return <SearchResults />;
}

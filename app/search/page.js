import SearchView from '@/components/search/SearchView';

export const metadata = { title: 'Search' };

export default function SearchPage({ searchParams }) {
  const q = typeof searchParams?.q === 'string' ? searchParams.q : '';
  return <SearchView q={q} />;
}

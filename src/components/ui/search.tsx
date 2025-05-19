'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search, X } from 'lucide-react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  
  // Avoid unnecessary rerenders with debounce
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(window.location.search);
    
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    
    router.push(`/search?${params.toString()}`);
  }, 300);
  
  return (
    <div className="relative flex w-full max-w-md items-center">
      <div className="relative flex h-10 w-full items-center overflow-hidden rounded-lg border bg-background">
        <div className="grid h-full w-12 place-items-center text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search..."
          className="h-full w-full border-0 bg-transparent px-0 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        {searchTerm && (
          <button 
            onClick={() => {
              setSearchTerm('');
              handleSearch('');
            }}
            className="flex h-full w-12 items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
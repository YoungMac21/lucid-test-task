import { fetchAutocomplete } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";

export function useAutocomplete(query: string) {
    const debounced = useDebounce(query);

    return useQuery({
        queryKey: ['autocomplete', debounced],
        queryFn: () => fetchAutocomplete(debounced),
        enabled: !!debounced && debounced?.length > 1,
    })
}
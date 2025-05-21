export async function fetchAutocomplete(query: string): Promise<any> {
    const resp = await fetch('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete')
    console.log('query:', query)
    console.log('autocomplete response', resp)

    return resp.json()
}
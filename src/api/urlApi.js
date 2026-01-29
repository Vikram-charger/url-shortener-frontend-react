const  apiBaseURL = import.meta.env.VITE_API_BASE
//`${apiBaseURL}/api/shorturl`
export async function shortenUrl(longUrl){
    const response = await fetch(`${apiBaseURL}/api/shorturl`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({longUrl})
    })
    if(!response.ok){
        throw new Error("Failed to shorten url")
    }
    return response.json();
}
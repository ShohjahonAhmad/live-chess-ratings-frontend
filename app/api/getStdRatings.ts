export async function getStdRatings() {
    try {
        const response = await fetch("http://localhost:8080/std-ratings");
        const data = await response.json();
        return data;
    } catch(err) {
        console.log("Error happened with fetching getStdRatings");
    }
}
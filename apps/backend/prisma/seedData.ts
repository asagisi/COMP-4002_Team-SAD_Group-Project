export const showSeedData = [
    { title: "Better Call Saul", genre: "Drama", year: 2015, episodes: 63 },
    { title: "Stranger Things", genre: "Sci-Fi", year: 2016, episodes: 34 },
    { title: "Family Guy", genre: "Comedy", year: 1999, episodes: 400 },
    { title: "Game of Thrones", genre: "Drama", year: 2011, episodes: 73 },
    { title: "The Simpsons", genre: "Comedy", year: 1989, episodes: 750 },
    { title: "The Walking Dead", genre: "Post-apocalyptic", year: 2010, episodes: 177 },
    { title: "Fallout", genre: "Sci-fi", year: 2024, episodes: 8 },
    { title: "Dexter", genre: "Crime Thriller", year: 2006, episodes: 96 },
    { title: "Spongebob Squarepants", genre: "Comedy", year: 1999, episodes: 250 },
    { title: "My Hero Academia", genre: "Action", year: 2016, episodes: 113 },
    { title: "The Crown", genre: "Historical Drama", year: 2016, episodes: 60 },
    { title: "Breaking Bad", genre: "Crime Drama", year: 2008, episodes: 62 },
    { title: "Black Mirror", genre: "Sci-fi", year: 2011, episodes: 22 },
    { title: "The Office", genre: "Comedy", year: 2005, episodes: 201 },
    { title: "Narcos", genre: "Crime Drama", year: 2015, episodes: 30 },
    { title: "Rick and Morty", genre: "Comedy", year: 2013, episodes: 61 },
    { title: "Avatar The Last Airbender", genre: "Fantasy/adventure", year: 2005, episodes: 61 },
    { title: "The Mandalorian", genre: "Sci-Fi", year: 2019, episodes: 24 },
    { title: "Supernatural", genre: "Horror/supernatural", year: 2005, episodes: 327 },
    { title: "Brooklyn Nine-Nine", genre: "Comedy", year: 2013, episodes: 153 },
    { title: "The Witcher", genre: "Fantasy", year: 2019, episodes: 24 },
    { title: "Dragon Ball Z", genre: "Action", year: 1986, episodes: 291 },
    { title: "House of The Dragon", genre: "Fantasy", year: 2022, episodes: 18 },
    { title: "The Pitt", genre: "Medical Drama", year: 2025, episodes: 15 },
    { title: "The Last of Us", genre: "Post-apocalyptic", year: 2023, episodes: 16 },
    { title: "House M.D", genre: "Medical Drama", year: 2004, episodes: 177 },
    { title: "Invincible", genre: "Action", year: 2021, episodes: 24 },
    { title: "The Boys", genre: "Action", year: 2019, episodes: 32 },
    { title: "Shameless", genre: "Comedy-drama", year: 2011, episodes: 134 },
    { title: "Pluribus", genre: "Sci-Fi", year: 2025, episodes: 10 },
];

const myShowsByTitle: Record<string, { rating: number; isFavourite: boolean }> = {
    "Dragon Ball Z":              { rating: 5, isFavourite: true },
    "Breaking Bad":               { rating: 5, isFavourite: false },
    "The Office":                 { rating: 4, isFavourite: false },
    "Stranger Things":            { rating: 4, isFavourite: false },
    "The Boys":                   { rating: 5, isFavourite: true },
    "Invincible":                 { rating: 4, isFavourite: false },
    "Narcos":                     { rating: 3, isFavourite: false },
    "Brooklyn Nine-Nine":         { rating: 5, isFavourite: true },
    "The Witcher":                { rating: 3, isFavourite: false },
    "Avatar The Last Airbender":  { rating: 5, isFavourite: true },
};

const watchProgressByTitle: Record<string, { currentEpisode: number; totalEpisodes: number; status: "NOT_STARTED" | "WATCHING" | "FINISHED" }> = {
    "Better Call Saul":       { currentEpisode: 1,   totalEpisodes: 63,  status: "NOT_STARTED" },
    "Stranger Things":        { currentEpisode: 5,   totalEpisodes: 42,  status: "WATCHING" },
    "Family Guy":             { currentEpisode: 100, totalEpisodes: 450, status: "WATCHING" },
    "Game of Thrones":        { currentEpisode: 73,  totalEpisodes: 73,  status: "FINISHED" },
    "The Simpsons":           { currentEpisode: 50,  totalEpisodes: 800, status: "WATCHING" },
    "The Walking Dead":       { currentEpisode: 1,   totalEpisodes: 177, status: "NOT_STARTED" },
    "Fallout":                { currentEpisode: 1,   totalEpisodes: 24,  status: "NOT_STARTED" },
    "Dexter":                 { currentEpisode: 96,  totalEpisodes: 96,  status: "FINISHED" },
    "Spongebob Squarepants":  { currentEpisode: 200, totalEpisodes: 261, status: "WATCHING" },
    "My Hero Academia":       { currentEpisode: 113, totalEpisodes: 113, status: "FINISHED" },
};

export function buildUserShowSeedData(titleToId: Record<string, number>, userId: number) {
    return Object.entries(titleToId).map(([title, showId]) => {
        const myShow = myShowsByTitle[title];
        const progress = watchProgressByTitle[title];

        return {
            userId,
            showId,
            isFavourite:    myShow?.isFavourite ?? false,
            rating:         myShow?.rating ?? null,
            review:         null,
            currentEpisode: progress?.currentEpisode ?? 0,
            totalEpisodes:  progress?.totalEpisodes ?? 0,
            status:         progress?.status ?? "NOT_STARTED",
            isHidden:       false,
        };
    });
}

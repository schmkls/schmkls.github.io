# Find to Watch

Spotify Blend for movies

## Inspiration

Living on a sports high school campus, we had a lot of movie nights. But finding the movie to watch was always a pain — *“No I've already seen that one”*, *“I can't watch too scary movies”*, *“Trust me, City of God is the best”*, *“No foreign languages please”*... A solution that often came was everyone got to recommend 3 movies and then we had a vote.

## Problem

Finding a movie to watch with friends or a partner is harder than it should be. You end up asking ChatGPT, but it doesn't get the vibe, gives generic suggestions, and recommends things on streaming services you don't have. When you finally pick something and it turns out to be bad, whoever championed it the hardest gets the blame.

All the data needed to make a great group recommendation already exists on IMDB — we just need to use it.

## How it works

**1. Create a session** and invite friends via link or code.

**2. Taste profiling** — each person picks a set of movies they like and feel like watching tonight. These are used to build an individual taste profile. Optionally, connect your IMDB ratings instead.

**3. Nominations** — each person also nominates a few movies they want to put directly into the vote pool.

**4. Recommendations** — the system finds movies that match the group's combined taste profiles and merges them with all nominations into a single vote pool.

**5. Vote** — everyone votes anonymously. Results are shown as a ranked list, with each movie labeled by which streaming services it's available on.

## Feasibility

A recommendation engine can be built on IMDB ratings using collaborative filtering: *“People who rate this movie highly (relative to their other ratings) also tend to rate these movies highly.”* Streaming availability can be sourced via an API like JustWatch.

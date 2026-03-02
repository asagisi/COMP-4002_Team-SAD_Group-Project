# Architecture Sprint 3

- hook: useMyShows
- service: MyShowsService
- repository: MyShowsRepo
- component: MyShowsList

useMyShows handles state and logic: it loads shows via the service, keeps them in state, and exposes setRating and toggleFavourite. After each update it refetches so the UI stays in sync.

MyShowsService holds business logic (e.g.rating 1–5, decide add vs remove favourite) and calls the repo to read or write. The repo only does CRUD on the test data; the service applies the rules.

MyShowsList only handles the UI. MyShowsPage uses the hook and passes myShows plus the callbacks down. The component doesn’t manage state or call the service or repo.

# My reasoning

I wanted the component to only deal with the UI, so I moved state and logic out. The repo does CRUD, the service does the rules, and the hook uses the service and holds state. The component just renders from props and calls the handlers.

# Where this is all used?

MyShowsPage uses useMyShows and renders MyShowsList, in App.tsx. The user can view shows, change ratings, and toggle favourites there.

# Architecture Sprint 3

- hook: useShowlists
- repository: showRepository
- component: ShowList

- The useShowList hook exists to perform logic and state management
- such as querying a show and toggling hidden or unhidden shows. It uses
- shows repository via its crud function getAllShows to make a const so the
- logic can use it.

- The showRepository retrieves the test data of shows from data folder
- and also has CRUD functions implemented, so those can be called upon and used
- with the data if necessary. As said, the useShowList hook does exactly this
- via the getAllShows function to make a const of shows so the hook can complete
- its logic and state management.

- The component ShowList now only has to deal with the UI and render
- the show list based on the state and logic instance. This completes separation
- of concerns; jobs for the component now sit in their respective folders.

# My reasoning

- I chose to do the logic this way based on my understanding of 
- that I only want the component to deal with the UI. 
- Any other thing it was doing needed to be taken out such as state.
- I know the repository needed to do CRUD and I knew that the 
- hook needed to use a CRUD function, and just using getAllShows to make a const
- for the logic to manipulate was the easiest way to meet this.
- Now the component can call upon these functions and doesnt have so many
- concerns to deal with.

# Where this is all used?

- All of this is encapsulated in the ShowList component, which is used in app.tsx.
- now the user can query the show list, hide, or unhide shows. 
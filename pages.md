There's a couple of technologies that can be used to store website data on a client, each with some limitations.
There's also a lot of possible applications for these technologies, each with some requirements.
To help design good API's for these applications, it helps to match their requirements to the limitations of the technologies we'd like to use to back these API's.

## Examples of applications using client-based storage

### A chat application
It persists chat messages to be able to show these directly upon loading.
This is a relatively simple use case because the fallback for any conflict case is to not use the cache.

### Cache for surviving page refresh
A page that contains a form that survives browser refreshes.

This is simple in the sense that data does not need to be persisted very long.

Requirements:
- **Convenience for developer**: Ideally a developer should be able to add this behavior to an application without a lot of lower-level work.

### A media library
It allows you to download music, so you can listen to it offline (think Spotify).

Requirements:
- **Migrations:** When the format of the locally stored data changes a migration needs to happen.
- **Persistence:** If the user decides to save something offline, and then the browser decides to delete that again, that's a bad experience.
- **Fallback:** Regardless of choice of technology, some platforms / browsers are going to offer limited (or no) space.
  The application should know how to handle everything from having enough space, to having limited space, to having no space.

### Content editing applications
An application for editing text / diagrams / whatever, offline (think Google Docs).

Requirements:
- All requirements from 'A media library'.
- **Conflict resolution:** If by the time the browser comes back online the document that is being worked on has changed somewhere else, the conflicts between these versions need to be resolved.
  Because the way to do this is domain-specific, it's the application, not the API, which must implement the resolving logic.

## Technologies

### Local storage
- Is limited to 10 MB of storage.

### Indexed DB
- Missing support in some browsers.
- Currently allows storage of gigabytes of data.
  It seem unlikely it will stay that way forever.
  When it is going to change, how will it change?

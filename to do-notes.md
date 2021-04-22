# TO DO and notes
---
## Specific sections
### DATA STORIES:
- Figure out Hero Image / Title Overlay approach
- Enhanced Data Story landing page with stories sorted by 'topic' 
- Stories:
    - Resources at the end via markdown
    - Tagged items (keywords? subtopics?) in sidebar


### KEY TOPICS:
 - Build out individual pages.

### DATA EXPLORER
- Reposition indicators to be on top on mobile
- Add indicators as an indicators array - can I loop through that? 
- Subtopic single page:
    - Ingest related data stories
    - Ingest related Key Topics
    - Keyword array with HTML? 

---
## BIG QUESTIONS as we learn/develop
- How to override template items? EG, suppress nav menu on Home, or header on Data Stories. (Is the answer to rearrange our partials scheme?)
- how to get nav menu highlighted upon content area? See partials/header.html and [.isMenuCurrent documentation](https://gohugo.io/templates/menu-templates/) and .hasChildren ?
- Why tweaking better/worse text breaks Hugo.
- How do we create an array of keywords and use them later? See [.Site.Pages documentation](https://gohugo.io/variables/site/)
- Can we access metadata from anotehr content section? Yes, using [.Site.Pages](https://gohugo.io/variables/site/), .Site.Sections, and if functions.
- What is our tagging/category/variable scheme that lets us:
    - Support search;
    - Ingest data stories onto Subtopic and Key Topic pages
    - Link subtopics to related subtopics (like, ones that share Key Topics??? Or a "related" variable?)

<<<<<<< Updated upstream
PUBLISH:
- run hugo build
- deploy via Github pages (/public vs /docs issue)


LAYOUT NOTES:
Right now, DE is using container-fluid and col-md-8 / col-sm-12 ... KT and others are using container and col-md-10 col-sm-12 ... figure out what's best and try to make it consistent. 


NOTES:
- Search work is to use Lunar.js to index markdown documents. This creates json 'database' of all markdown headers. Search term looks at this database and returns results on this basis. Database will have hierarchy; categorized results. ?? Similar terms ??
- 


LIST FUNCTIONS WE WANT TO ACCOMPLISH AROUND TAGGING, linking, indicators, etc. 
=======
---

## Tagging scheme notes: what do we want to accomplish?
- On a subtopic page, show related Data Stories 
    - do we want to do this on Indicator pages?
    - what's the plan for when we standalone subtopic pages expire and Subtopic About gets combined with Default Indicator displaying?
- On a Data Story, show related Key Topics
    - Do we want to show related indicators and subtopics, or can we just handle that manually?
- On a Key Topic, show related Data Stories
    - we could manually manage this but it would be better to have it automatic, since we publish Data Stories more often than we publish new Indicators
    - Do we want Key Topics to automatically display related Indicators, or manually manage it?
- What do we want to display on an Indicator page? 
    - Related indicators determined via Linked Data?
    - Related Key Topics? 
- Should we use frontmatter, or a separate data file? 
- Is manually managing content better than managing a complex cross-area multidirectional tagging scheme?
>>>>>>> Stashed changes

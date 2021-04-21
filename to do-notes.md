TO DO:


DATA STORIES:
- Add a custom variable and use it to inform sorting/layout of data stories display (keyword array?)
    - Put resources at the end using markdown.
    - Put related Key Topics in the sidebar and associate content on the level of Key Topics and/or subtopics? 
- Figure out Hero Image / Title Overlay approach


KEY TOPICS:
 - Build out individual pages.

DATA EXPLORER
- Build out subtopic single.html pages. 
- How do we ingest relevant data stories? What is our tagging scheme? 


BIG QUESTIONS
- How to override template items? EG, suppress nav menu on Home, or header on Data Stories.
- how to get nav menu highlighted upon content area - this happens SOMETIMES on section page but not on subpages of a section page.
- Why tweaking better/worse text breaks Hugo.
- How do we create an array of keywords and use them later?
- Can we access metadata from anotehr content section?
- What is our tagging/category/variable scheme that lets us:
    - Support search;
    - Ingest data stories onto Subtopic and Key Topic pages
    - Link subtopics to related subtopics (like, ones that share Key Topics??? Or a "related" variable?)

PUBLISH:
- run hugo build
- deploy via Github pages (/public vs /docs issue)


LAYOUT NOTES:
Right now, DE is using container-fluid and col-md-8 / col-sm-12 ... KT and others are using container and col-md-10 col-sm-12 ... figure out what's best and try to make it consistent. 


NOTES:
- Search work is to use Lunar.js to index markdown documents. This creates json 'database' of all markdown headers. Search term looks at this database and returns results on this basis. Database will have hierarchy; categorized results. ?? Similar terms ??
- 


LIST FUNCTIONS WE WANT TO ACCOMPLISH AROUND TAGGING, linking, indicators, etc. 
const searchTerm = new URL(location.href).searchParams.get("search");
let lunrIndex,
$results,
pagesIndex;


// Initialize lunrjs using our generated index file
function initLunr() {
    var request = new XMLHttpRequest();
    request.open('GET', '/js/lunr/PagesIndex.json', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            pagesIndex = JSON.parse(request.responseText);
            console.log("index:", pagesIndex);

            // Set up lunrjs by declaring the fields we use
            // Also provide their boost level for the ranking
            lunrIndex = lunr(function () {
                this.field("title", {
                    boost: 10
                });
                this.field("tags", {
                    boost: 5
                });
                this.field("categories", {
                    boost: 5
                });
                this.field("keywords", {
                    boost: 5
                });
                this.field("indicators", {
                    boost: 5
                });
                this.field("neighborhood", {
                    boost: 5
                });
                this.field("seo_description", {
                    boost: 5
                });
                this.field("seo_title", {
                    boost: 5
                });
                this.field("type", {
                    boost: 5
                });
                this.field("content_yml", {
                    boost: 5
                });
                this.field("data_json", {
                    boost: 5
                });
                this.field("content");

                // ref is the result item identifier (I chose the page URL)
                this.ref("href");
                for (var i = 0; i < pagesIndex.length; ++i) {
                    this.add(pagesIndex[i]);
                }
            });
            initUI();
        } else {
            var err = textStatus + ", " + error;
            console.error("Error getting Hugo index flie:", err);
        }
    };

    request.send();
}

// Nothing crazy here, just hook up a event handler on the input field
function initUI() {
    const textSearchTerms = document.querySelectorAll('.search_term');

    if (searchTerm) {
        textSearchTerms.forEach(term => {
            term.innerHTML = `'${searchTerm}'`
        })
        
        // add some fuzzyness to the string matching to help with spelling mistakes.
        var fuzzLength = Math.round(Math.min(Math.max(searchTerm.length / 4, 1), 3));
        var fuzzyQuery = searchTerm + '~' + fuzzLength;

        // var results = search(fuzzyQuery);
        var results = search(searchTerm);
        renderResults(results);
    } else {
        // redirect to the homepage if there is no search term
        window.location.href = '/'
    }
}

/**
* Trigger a search in lunr and transform the result
*
* @param  {String} query
* @return {Array}  results
*/
function search(query) {
    // Find the item in our index corresponding to the lunr one to have more info
    // Lunr result: 
    //  {ref: "/section/page1", score: 0.2725657778206127}
    // Our result:
    //  {title:"Page1", href:"/section/page1", ...}
    return lunrIndex.search(query).map(function (result) {
        return pagesIndex.filter(function (page) {
            return page.href === result.ref;
        })[0];
    });
}

/**
* Display the results
*
* @param  {Array} results to display
*/
function renderResults(results) {
    const $searchResultsTitle = document.querySelector('.search-results-title');
    const $otherResults = document.getElementById("other_results");
    const $nieghborhoodReports = document.getElementById("neighborhood_reports");
    const $dataStories = document.getElementById("data_stories");
    const $keyTopics = document.getElementById("key_topics");
    const $dataExplorer = document.getElementById("data_explorer");

    let resultsCount = 0;
    let nieghborhoodReportsCount = 0;
    let dataStoriesCount = 0;
    let keyTopicsCount = 0;
    let dataExplorerCount = 0;
    let othersCount = 0;

    if (!results.length) {
        $searchResultsTitle.innerHTML = `We couldn't find any results for '${searchTerm}'`
        return;
    }

    results.forEach(function (result) {
        var li = document.createElement('li');
        var ahref = document.createElement('a');
        ahref.href = result.href;
        ahref.text = result.title;
        li.append(ahref);
        resultsCount = resultsCount += 1

        const section = (str) => {
            if (result.href.includes(str)) {
                return true
            } else {
                return false
            }
        }

        if (section('neighborhood_reports')) {
            nieghborhoodReportsCount = nieghborhoodReportsCount += 1;
            ahref.text = result.seo_title;
            li.append(ahref);
            $nieghborhoodReports.querySelector('ol').appendChild(li);
        } else if (section('data_stories')) {
            dataStoriesCount = dataStoriesCount += 1;
            $dataStories.querySelector('ol').appendChild(li);
        } else if (section('key_topics')) {
            keyTopicsCount = keyTopicsCount += 1;
            $keyTopics.querySelector('ol').appendChild(li);
        } else if (section('data_explorer')) {
            dataExplorerCount = dataExplorerCount += 1;
            $dataExplorer.querySelector('ol').appendChild(li);
        } else {
            othersCount = othersCount += 1;
            $otherResults.querySelector('ol').appendChild(li);
        }
    });

    const displaySection = (count, section) => {
        if (count > 0) {
            section.querySelector('.search-results-info').innerHTML = `<strong>${count}</strong> results for <strong>'${searchTerm}'</strong>`
            section.removeAttribute('hidden')
        }
    }

    $searchResultsTitle.innerHTML = `<span class="fas fa-search fa-md"></span> ${resultsCount} results for '${searchTerm}'`

    displaySection(nieghborhoodReportsCount, $nieghborhoodReports)
    displaySection(dataStoriesCount, $dataStories)
    displaySection(keyTopicsCount, $keyTopics)
    displaySection(dataExplorerCount, $dataExplorer)    
}

// Init
initLunr();

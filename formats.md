# Format Notes
This markdown contains directions on how we handle specific content in this prototype.

## Indicators
Indicators can be displayed on subtopic pages. If Indicators are stored as json within subtopic content markdown file's front matter - see [asthma.md](https://github.com/nycehs/ehs-neighborhoodprofiles/blob/main/content/data_explorer/asthma.md) or below:

```
indicators: {
    "Indicator1": {
        "name" : "ED visits (adults)",
        "URL": "http://a816-dohbesp.nyc.gov/IndicatorPublic/VisualizationData.aspx?id=2380,4466a0,11,Summarize"
    },

    "Indicator2": {
        "name" : "ED visits (age 0-4)",
        "URL": "http://a816-dohbesp.nyc.gov/IndicatorPublic/VisualizationData.aspx?id=2048,4466a0,11,Summarize"
    }
}
```


...then the template page can loop through the Indicator JSON and display each indicator:

```
{{ range .Params.indicators}}
    <a href="{{.url}}" onclick="protoPopup()">{{.name}}</a>
    <hr>
{{end}}
```
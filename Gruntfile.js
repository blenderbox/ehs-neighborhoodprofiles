
var YAML = require('yamljs');
var S = require("string");
const { pathToFileURL } = require('url');



var CONTENT_PATH_PREFIX = "./content";
var HTML_PATH_PREFIX = "./public";

module.exports = function(grunt) {

    grunt.registerTask("lunr-index", function() {

        grunt.log.writeln("Build pages index");

        var indexPages = function() {
            var mdPagesIndex = [];
            var htmlPagesIndex = [];
            var pagesIndex = [];
              
            grunt.file.recurse(CONTENT_PATH_PREFIX, function(abspath, rootdir, subdir, filename) {
              if (S(filename).endsWith(".md")) {
          console.log('test')
                grunt.verbose.writeln("Parse file:",abspath);
                pageObj = processFile(abspath, filename);

                console.log('xxxxxxxx', pageObj)
                pagesIndex.push(processFile(abspath, filename));
                mdPagesIndex[pageObj.href] = pageObj;
              }
            });

            grunt.file.recurse(HTML_PATH_PREFIX, function(abspath, rootdir, subdir, filename) {
              if (S(filename).endsWith(".html")) {
                grunt.verbose.writeln("Parse file:",abspath);
                pageObj = processFile(abspath, filename);
                htmlPagesIndex[pageObj.href] = pageObj;
              }
            });

            mdPagesIndex.forEach(function(page){
              
              pageObj = {
                content: htmlPagesIndex[page.href].content,
                keywords: page.keywords 
              };
              console.log('OBJ =========== ', pageObj)
              pagesIndex.push(pageObj);
            })

            return pagesIndex;
        };

        

        var processFile = function(abspath, filename) {
            var pageIndex;

            
            if (filename !== '.DS_Store') {
              if (S(filename).endsWith(".html")) {
                pageIndex = processHTMLFile(abspath, filename);
              } else if (S(filename).endsWith(".md")) {
                  pageIndex = processMDFile(abspath, filename);
              }

              return pageIndex;
            }
            
        };

        var processHTMLFile = function(abspath, filename) {
            var content = grunt.file.read(abspath);
            var pageName = S(filename).chompRight(".html").s;
            var href = S(abspath)
                .chompLeft(CONTENT_PATH_PREFIX).s;
            return {
                title: pageName,
                href: href,
                content: S(content).trim().stripTags().stripPunctuation().s
            };
        };

        var processMDFile = function(abspath, filename) {
            var content = grunt.file.read(abspath);
            var pageIndex;
            // First separate the Front Matter from the content and parse it
            content = content.split("---");

          console.log('path: ', abspath)
            if (abspath.includes('public')) {
                console.log('public path: ', abspath)
            } else {
                console.log('content path: ', abspath)
            }

            var frontMatter;
            try {
                frontMatter = YAML.parse(content[1].trim());
            } catch (e) {
                console.log(e.message);
            }

            var href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(".md").s;
            // href for index.md files stops at the folder name
            if (filename === "_index.md") {
                href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).s;
            }

            console.log('hit here');
            console.log(frontMatter);
            // Build Lunr index for this page
            pageIndex = {
                title: frontMatter.title,
                tags: frontMatter.tags,
                categories: frontMatter.categories,
                keywords: frontMatter.keywords,
                indicators: frontMatter.indicators,
                neighborhood: frontMatter.neighborhood,
                summary: frontMatter.summary,
                data_json: frontMatter.data_json,
                content_yml: frontMatter.content_yml,
                type: frontMatter.type,
                seo_title: frontMatter.seo_title,
                seo_description: frontMatter.seo_description,
                seo_image: frontMatter.seo_image,
                href: href.replace('content', '').toLowerCase(),
                content: S(content[2]).trim().stripTags().stripPunctuation().s
            };

            return pageIndex;
        };
        console.log(indexPages());
        grunt.file.write("./static/js/lunr/PagesIndex.json", JSON.stringify(indexPages()));
        grunt.log.ok("Index built");
    });
};








// var YAML = require('yamljs');
// var S = require("string");

// var CONTENT_PATH_PREFIX = "./content";

// module.exports = function(grunt) {

//     grunt.registerTask("lunr-index", function() {

//         grunt.log.writeln("Build pages index");

//         var indexPages = function() {
//             var pagesIndex = [];
//             grunt.file.recurse(CONTENT_PATH_PREFIX, function(abspath, rootdir, subdir, filename) {
//               if (filename !== '.DS_Store') {
//                 grunt.verbose.writeln("Parse file:",abspath);
//                 pagesIndex.push(processFile(abspath, filename));
//                 console.log('see: ', abspath, filename)
//               }
//             });

//             return pagesIndex;
//         };

//         var processFile = function(abspath, filename) {
//             var pageIndex;

//             if (S(filename).endsWith(".html")) {
//               console.log('html: ', filename)
//                 pageIndex = processHTMLFile(abspath, filename);
//             } else if (S(filename).endsWith(".md"))  {
//               console.log('md: ', filename)
//                 pageIndex = processMDFile(abspath, filename);
//             }

//             return pageIndex;
//         };

//         var processHTMLFile = function(abspath, filename) {
//             var content = grunt.file.read(abspath);
//             var pageName = S(filename).chompRight(".html").s;
//             var href = S(abspath)
//                 .chompLeft(CONTENT_PATH_PREFIX).s;
//             return {
//                 title: pageName,
//                 href: href,
//                 content: S(content).trim().stripTags().stripPunctuation().s
//             };
//         };

//         var processMDFile = function(abspath, filename) {
//             var content = grunt.file.read(abspath);
//             var pageIndex;
//             // First separate the Front Matter from the content and parse it
//             content = content.split("+++");
//             var frontMatter;
//             try {
//                 if (content[1]) {
//                   console.log('test: ', content[1])
//                   frontMatter = YAML.parse(content[1].trim());
//                 }
//             } catch (e) {
//                 console.log(e.message);
//             }

//             var href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(".md").s;
//             // href for index.md files stops at the folder name
//             if (filename === "index.md") {
//                 href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).s;
//             }

//             // Build Lunr index for this page
//             pageIndex = {
//                 title: frontMatter.title,
//                 tags: frontMatter.tags,
//                 href: href,
//                 content: S(content[2]).trim().stripTags().stripPunctuation().s
//             };

//             return pageIndex;
//         };

//         grunt.file.write("./static/js/lunr/PagesIndex.json", JSON.stringify(indexPages()));
//         grunt.log.ok("Index built");
//     });
// };


// var toml = require("toml");
// var YAML = require('yamljs');
// var S = require("string");
// const { pathToFileURL } = require('url');



// var CONTENT_PATH_PREFIX = "./content/data_stories";
// var HTML_PATH_PREFIX = "./public";

// module.exports = function(grunt) {

//     grunt.registerTask("lunr-index", function() {

//         grunt.log.writeln("Build pages index");

//         var indexPages = function() {
//             var mdPagesIndex = [];
//             var htmlPagesIndex = [];
//             var pagesIndex = [];
              
//             grunt.file.recurse(CONTENT_PATH_PREFIX, function(abspath, rootdir, subdir, filename) {

//               if (S(filename).endsWith(".md")) {
//                 grunt.verbose.writeln("Parse file:",abspath);
//                 pageObj = processFile(abspath, filename);
//                 // pagesIndex.push(processFile(abspath, filename));
//                 mdPagesIndex[pageObj.href] = pageObj;
//               }
//             });

//             grunt.file.recurse(HTML_PATH_PREFIX, function(abspath, rootdir, subdir, filename) {
//               if (S(filename).endsWith(".html")) {
//                 grunt.verbose.writeln("Parse file:",abspath);
//                 pageObj = processFile(abspath, filename);
//                 htmlPagesIndex[pageObj.href] = pageObj;
//               }
//             });

//             mdPagesIndex.forEach(function(page){
              
//               pageObj = {
//                 content: htmlPagesIndex[page.href].content,
//                 keywords: page.keywords 
//               };
//               pagesIndex.push(pageObj);
//             })

//             return pagesIndex;
//         };

        

//         var processFile = function(abspath, filename) {
//             var pageIndex;

//             console.log('FILENAME: ', filename)
        

//             if (S(filename).endsWith(".html")) {
//                 pageIndex = processHTMLFile(abspath, filename);
//             } else if (S(filename).endsWith(".md")) {
//                 pageIndex = processMDFile(abspath, filename);
//             }

//             return pageIndex;
//         };

//         var processHTMLFile = function(abspath, filename) {
//             var content = grunt.file.read(abspath);
//             var pageName = S(filename).chompRight(".html").s;
//             var href = S(abspath)
//                 .chompLeft(CONTENT_PATH_PREFIX).s;
//             return {
//                 title: pageName,
//                 href: href,
//                 content: S(content).trim().stripTags().stripPunctuation().s
//             };
//         };

//         var processMDFile = function(abspath, filename) {
//             var content = grunt.file.read(abspath);
//             var pageIndex;
//             // First separate the Front Matter from the content and parse it
//             content = content.split("---");

//           console.log('path: ', abspath)
//             if (abspath.includes('public')) {
//                 console.log('public path: ', abspath)
//             } else {
//                 console.log('content path: ', abspath)
//             }

//             var frontMatter;
//             try {
//                 frontMatter = YAML.parse(content[1].trim());
//             } catch (e) {
//                 console.log(e.message);
//             }

//             var href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(".md").s;
//             // href for index.md files stops at the folder name
//             if (filename === "_index.md") {
//                 href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).s;
//             }

//             // Build Lunr index for this page
//             pageIndex = {
//                 title: frontMatter.title,
//                 tags: frontMatter.tags,
//                 href: href,
//                 categories: frontMatter.categories,
//                 content: S(content[2]).trim().stripTags().stripPunctuation().s
//             };

//             return pageIndex;
//         };

//         grunt.file.write("./static/js/lunr/PagesIndex.json", JSON.stringify(indexPages()));
//         grunt.log.ok("Index built");
//     });
// };

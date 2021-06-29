
$('form[role="search"] .btn-primary').on('click', () => {
  const search = $('form[role="search"] input').val()
  if (search.length > 2) {
    window.location.href = `/ehs-neighborhoodprofiles/search_results/index.html?search=${search}`;
  }
})

$("#global-search").on('show.bs.collapse', function () {
  $(this).keypress(function(e){
    if (e.keyCode == 13) {
      const search = $('form[role="search"] input').val()
      e.preventDefault();
      if (search.length > 2) {
        window.location.href = `/ehs-neighborhoodprofiles/search_results/index.html?search=${search}`;
      }
      return false;
    }
  })
});


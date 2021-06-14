
$('form[role="search"] .btn-primary').on('click', () => {
  const search = $('form[role="search"] input').val()
  if (search.length > 2) {
    window.location.href = `/search_results/index.html?search=${search}`;
  }
})

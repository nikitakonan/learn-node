import dompurify from 'dompurify';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;

const activeClassName = 'search__result--active';

const searchResultsHTML = (stores) =>
  stores
    .map(
      (store) => `
        <a href="/stores/${store.slug}" class="search__result">
          <strong>${store.name}</strong>
        </a>
      `
    )
    .join();

function typeAhead(search) {
  if (!search) return;
  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  searchInput.on('input', async (e) => {
    if (!e.target.value) {
      searchResults.style.display = 'none';
      return;
    }

    searchResults.style.display = 'block';

    const res = await fetch(`/api/search?q=${e.target.value}`);
    const data = await res.json();

    if (data.length) {
      const html = dompurify.sanitize(searchResultsHTML(data));
      searchResults.innerHTML = html;
    } else {
      searchResults.innerHTML = dompurify.sanitize(
        `<div class="search__result">No results for ${e.target.value} found!</div>`
      );
    }
  });

  searchInput.on('keyup', (e) => {
    if (![KEY_DOWN, KEY_UP, KEY_ENTER].includes(e.keyCode)) {
      return;
    }

    const current = searchResults.querySelector(`.${activeClassName}`);
    const items = searchResults.querySelectorAll('.search__result');

    if (e.keyCode === KEY_DOWN) {
      if (!current) {
        items[0].classList.add(activeClassName);
      } else {
        current.classList.remove(activeClassName);
        const nextSibling = current.nextElementSibling || items[0];
        nextSibling.classList.add(activeClassName);
      }
    } else if (e.keyCode === KEY_UP) {
      if (!current) {
        items[items.length - 1].classList.add(activeClassName);
      } else {
        current.classList.remove(activeClassName);
        const prevSibling =
          current.previousElementSibling || items[items.length - 1];
        prevSibling.classList.add(activeClassName);
      }
    } else if (e.keyCode === KEY_ENTER) {
      if (current) {
        window.location.assign(current.href);
      }
    }
  });
}

export default typeAhead;

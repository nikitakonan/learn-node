import { $ } from './bling';
import dompurify from 'dompurify';

const container = $('.flash-messages');
const removeBtnClass = 'js-added-remove';

container.on('click', (e) => {
  if (e.target.classList.contains(removeBtnClass)) {
    e.target.parentElement.remove();
  }
});

function flash(message, type = 'error') {
  const container = $('.flash-messages');
  const el = document.createElement('div');
  el.classList.add('flash', `flash--${type}`);
  el.innerHTML = dompurify.sanitize(`
    <p class="flash__text">${message}</p>
    <button class="flash__remove ${removeBtnClass}">&times;</button>
  `);
  container.append(el);
}

export default flash;

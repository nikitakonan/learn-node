import { $ } from './bling';
import flash from './flash';

async function ajaxHeart(e) {
  e.preventDefault();
  const res = await fetch(this.action, {
    method: 'post',
  });
  const body = await res.json();

  if (!res.ok) {
    flash(body.msg || `Oooooups! Something happened`);
  } else {
    const isHearted = this.heart.classList.toggle('heart__button--hearted');
    if (isHearted) {
      this.heart.classList.add('heart__button--float');
      this.heart.on('animationend', function () {
        this.classList.remove('heart__button--float');
      });
    }
    $('.heart-count').textContent = body.hearts.length;
  }
}

export default ajaxHeart;

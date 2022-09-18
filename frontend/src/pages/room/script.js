const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  const background = document.getElementsByClassName('modal-background');

  background.classList.toggle('show--modal');
});

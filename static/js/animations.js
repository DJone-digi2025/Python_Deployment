/* animations.js
   Contains:
   - floating animations for hero
   - collapsible sections
   - simple maze click-to-reveal logic
   - animated card entrance
*/

document.addEventListener('DOMContentLoaded', function () {
  // Floating animations: gentle translate
  const floats = document.querySelectorAll('.floating');
  floats.forEach((el, i) => {
    const dx = (i % 2 === 0 ? 1 : -1) * (6 + i*2);
    const dy = 6 + i*3;
    let t = 0;
    function floatStep() {
      t += 0.01;
      const x = Math.sin(t * (0.5 + i*0.05)) * dx;
      const y = Math.cos(t * (0.4 + i*0.03)) * dy;
      el.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(floatStep);
    }
    floatStep();
  });

  // Animated card entrance
  const cards = document.querySelectorAll('.anim-card');
  cards.forEach((c, idx) => {
    c.style.opacity = 0;
    c.style.transform = 'translateY(18px)';
    setTimeout(() => {
      c.style.transition = 'opacity 420ms ease, transform 420ms cubic-bezier(.2,.9,.3,1)';
      c.style.opacity = 1;
      c.style.transform = 'translateY(0)';
    }, 80 + idx*80);
  });

  // Collapsible sections (custom for extra animation)
  const toggles = document.querySelectorAll('.collapse-toggle');
  toggles.forEach(t => {
    t.addEventListener('click', () => {
      const body = document.querySelector(t.dataset.target);
      if (!body) return;
      if (body.style.maxHeight && body.style.maxHeight !== '0px') {
        body.style.maxHeight = 0;
      } else {
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Maze interactive reveal
  const mazeRoot = document.querySelectorAll('.js-maze');
  mazeRoot.forEach(root => {
    initializeMaze(root);
  });

  // Helper: initialize maze instance in an element
  function initializeMaze(root) {
    if (!root) return;
    // topics mapping (data-topic attribute on cells will match keys)
    const topics = JSON.parse(root.dataset.topics || '{}');
    const cells = root.querySelectorAll('.maze-cell');
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (cell.classList.contains('revealed')) return;
        const key = cell.dataset.topic;
        revealCell(root, cell, topics[key] || 'No definition available.');
      });
    });
  }

  function revealCell(root, cell, content) {
    // show short overlay or expand cell with text
    cell.classList.add('revealed');
    const overlay = document.createElement('div');
    overlay.className = 'p-3 text-xs';
    overlay.style.textAlign = 'center';
    overlay.innerHTML = `<div style="font-weight:700;margin-bottom:6px">${cell.dataset.label || ''}</div>
                         <div style="font-size:0.78rem;line-height:1.1rem">${content}</div>`;
    // flip content into cell
    cell.innerHTML = '';
    cell.appendChild(overlay);

    // Optionally unlock neighbor cells (a simple reveal chain) - find next sibling cells
    const index = Array.from(root.querySelectorAll('.maze-cell')).indexOf(cell);
    const neighbors = [index-1, index+1, index - parseInt(root.style.getPropertyValue('--cols')||6), index + parseInt(root.style.getPropertyValue('--cols')||6)];
    neighbors.forEach(i => {
      const all = root.querySelectorAll('.maze-cell');
      if (i >= 0 && i < all.length) {
        all[i].classList.remove('locked');
      }
    });
  }

});

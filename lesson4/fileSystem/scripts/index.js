(function () {
   document.addEventListener('DOMContentLoaded', function () {
      const rootFs = readFs();
      const rootElement = document.querySelector('.wrapper');
      renderFs(rootFs, rootElement);

      document.addEventListener('click', select);
      document.addEventListener('click', toggleCollapsed);

      document.addEventListener('keydown', setMultiSelect);
      document.addEventListener('keyup', resetMultiSelect);
   });

   let isMultiSelect = false;

   function setMultiSelect(event) {
      if (event.keyCode === 16) {
         isMultiSelect = true;
      }
   }

   function resetMultiSelect(event) {
      if (event.keyCode === 16) {
         isMultiSelect = false;
      }
   }

   function select(event) {
      const { target } = event;
      const isTitle = target.classList.contains('title');
      if (!isTitle && !isMultiSelect) {
         unSelectAll();
         return;
      }
      if (!isTitle) return;

      const wasSelected = event.target.parentElement.dataset.selected;

      if (!isMultiSelect) {
         unSelectAll();
      }

      if (wasSelected === undefined) {
         event.target.parentElement.dataset.selected = '';
      } else {
         delete event.target.parentElement.dataset.selected;
      }

      event.stopPropagation();
   }

   function unSelectAll() {
      const allElements = document.querySelectorAll('[data-selected]');
      allElements.forEach(el => delete el.dataset.selected);
   }

   function toggleCollapsed(event) {
      const { target } = event;
      const isMarker = target.classList.contains('marker');
      if (!isMarker) return;

      const folder = target.closest('.folder');
      const emptyFolder = folder.querySelector('.fs').children.length === 0;
      if (emptyFolder) return;

      if (folder.classList.contains('expanded')) {
         folder.classList.add('collapsed');
         folder.classList.remove('expanded');
         target.setAttribute('title', 'expand');
      } else {
         folder.classList.remove('collapsed');
         folder.classList.add('expanded');
         target.setAttribute('title', 'collapse');
      }
   }

   function renderFs(fsData, rootFsElement) {
      fsData.forEach(function (fsDatum) {
         const { type, title, fs } = fsDatum;

         const fsItemElement = createElement(type);
         const titleElement = createElement('title');
         titleElement.innerText = title;

         fsItemElement.appendChild(titleElement);

         if (type === 'folder' && fs) {
            const fsElement = createElement('fs');
            if (fs.length !== 0) {
               const marker = createElement('marker');
               marker.setAttribute('title', 'collapse');

               fsItemElement.classList.add('expanded');
               fsItemElement.appendChild(marker);

               renderFs(fs, fsElement);
            }
            fsItemElement.appendChild(fsElement);
         }
         rootFsElement.appendChild(fsItemElement);
      });
   }

   function createElement(className) {
      const element = document.createElement('div');
      element.className = className;
      return element;
   }

})();

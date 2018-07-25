(function () {
   document.addEventListener('DOMContentLoaded', function () {
      const rootFs = [];
      const rootFsEl = document.querySelector('.wrapper');

      getFs(rootFsEl, rootFs);
   });

   function getFs(element, elementFs) {
      for (const item of element.children) {
         const fsItem = {};
         fsItem.type =  item.classList.contains('folder') ? 'folder':
                        item.classList.contains('file') ? 'file': null;
         fsItem.title =  item.firstChild.data.trim();

         if (fsItem.type === 'folder') {
            fsItem.fs = [];
            getFs(item, fsItem.fs);
         }
         elementFs.push(fsItem);
      }
   }
})()
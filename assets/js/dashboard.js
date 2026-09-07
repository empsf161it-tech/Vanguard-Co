/* ==========================================================================
   VANGUARD & PARTNERS - CLIENT & ATTORNEY DASHBOARD CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardTabs();
  initCaseFilters();
});

function initDashboardTabs() {
  const tabLinks = document.querySelectorAll('.dash-nav-link');
  const tabPanes = document.querySelectorAll('.dash-pane');

  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-tab');

      tabLinks.forEach(l => l.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      link.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

function initCaseFilters() {
  const filterBtns = document.querySelectorAll('.case-filter-btn');
  const caseRows = document.querySelectorAll('.case-table-row');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      caseRows.forEach(row => {
        if (filterValue === 'all' || row.getAttribute('data-status') === filterValue) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

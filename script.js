document.addEventListener('DOMContentLoaded', function() {
    // Get all toggle buttons
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    // Add click event to each button
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the closest week section
            const weekSection = this.closest('.week-section');
            // Find the additional content within this section
            const additionalContent = weekSection.querySelector('.additional-content');
            
            // Toggle the 'hidden' class
            additionalContent.classList.toggle('hidden');
            
            // Change button text based on state
            if (additionalContent.classList.contains('hidden')) {
                this.textContent = 'See More';
                this.classList.remove('active');
            } else {
                this.textContent = 'Show Less';
                this.classList.add('active');
            }
        });
    });

    // Month navigation toggle functionality
    const monthLinks = document.querySelectorAll('.month-link');
    const monthContainers = document.querySelectorAll('.month-container');

    monthLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            // Hide all month containers
            monthContainers.forEach(container => {
                container.classList.add('hidden');
            });

            // Show the selected month container
            const targetContainer = document.getElementById(targetId);
            if (targetContainer) {
                targetContainer.classList.remove('hidden');
            }
        });
    });

    // Show the first month container by default
    if (monthContainers.length > 0) {
        monthContainers.forEach(container => container.classList.add('hidden'));
        monthContainers[0].classList.remove('hidden');
    }

    // Function to show month container by id and hide others
    function showMonth(monthId) {
        monthContainers.forEach(container => {
            if (container.id === monthId) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        });
    }

    // Function to expand a week section by id
    function expandWeek(weekId) {
        const weekSection = document.getElementById(weekId);
        if (weekSection) {
            const additionalContent = weekSection.querySelector('.additional-content');
            const toggleBtn = weekSection.querySelector('.toggle-btn');
            if (additionalContent && additionalContent.classList.contains('hidden')) {
                additionalContent.classList.remove('hidden');
                if (toggleBtn) {
                    toggleBtn.textContent = 'Show Less';
                    toggleBtn.classList.add('active');
                }
            }
        }
    }

    // Handle hash on page load and hash change
    function handleHash() {
        const hash = window.location.hash.substring(1);
        if (!hash) {
            // No hash, show first month by default
            if (monthContainers.length > 0) {
                showMonth(monthContainers[0].id);
            }
            return;
        }

        if (hash.startsWith('month')) {
            if (document.getElementById(hash)) {
                if (hash.includes('week')) {
                    // Hash is for a specific week
                    const parts = hash.split('-');
                    const monthId = parts[0];
                    showMonth(monthId);
                    expandWeek(hash);
                } else {
                    // Hash is for a month
                    showMonth(hash);
                }
            }
        }
    }

    window.addEventListener('hashchange', handleHash);
    handleHash();
});

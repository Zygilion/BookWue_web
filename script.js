document.addEventListener('DOMContentLoaded', () => {
    const resultsSection = document.getElementById('results');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const notifyForm = document.getElementById('notifyForm');
    const bookCovers = document.querySelectorAll('.book-cover');
    const generateBtn = document.getElementById('generateBtn');
    const generateBtnContainer = document.querySelector('.generate-button-container');

    let selectedBook = null;
    let currentlyDisplayedBook = null;

    const bookData = {
        'oz': {
            title: 'The Wonderful Wizard of Oz',
            coverUrl: 'https://placecats.com/200/300',
            illustrations: {
                characters: [
                    'https://picsum.photos/300/400?random=1',
                    'https://picsum.photos/300/400?random=2',
                    'https://picsum.photos/300/400?random=3'
                ],
                scenes: [
                    'https://picsum.photos/300/400?random=4',
                    'https://picsum.photos/300/400?random=5',
                    'https://picsum.photos/300/400?random=6'
                ],
                settings: [
                    'https://picsum.photos/300/400?random=7',
                    'https://picsum.photos/300/400?random=8',
                    'https://picsum.photos/300/400?random=9'
                ],
                objects: [
                    'https://picsum.photos/300/400?random=10',
                    'https://picsum.photos/300/400?random=11',
                    'https://picsum.photos/300/400?random=12'
                ],
                maps: [
                    'https://picsum.photos/300/400?random=13',
                    'https://picsum.photos/300/400?random=14'
                ]
            },
            merchandise: [
                'https://picsum.photos/300/400?random=15',
                'https://picsum.photos/300/400?random=16',
                'https://picsum.photos/300/400?random=17',
                'https://picsum.photos/300/400?random=18'
            ]
        },
        'alice': {
            title: 'Alice in Wonderland',
            coverUrl: 'https://placecats.com/201/300',
            illustrations: {
                characters: [
                    'https://picsum.photos/300/400?random=1',
                    'https://picsum.photos/300/400?random=2',
                    'https://picsum.photos/300/400?random=3'
                ],
                scenes: [
                    'https://picsum.photos/300/400?random=4',
                    'https://picsum.photos/300/400?random=5',
                    'https://picsum.photos/300/400?random=6'
                ],
                settings: [
                    'https://picsum.photos/300/400?random=7',
                    'https://picsum.photos/300/400?random=8',
                    'https://picsum.photos/300/400?random=9'
                ],
                objects: [
                    'https://picsum.photos/300/400?random=10',
                    'https://picsum.photos/300/400?random=11',
                    'https://picsum.photos/300/400?random=12'
                ],
                maps: [
                    'https://picsum.photos/300/400?random=13',
                    'https://picsum.photos/300/400?random=14'
                ]
            },
            merchandise: [
                'https://picsum.photos/300/400?random=15',
                'https://picsum.photos/300/400?random=16',
                'https://picsum.photos/300/400?random=17',
                'https://picsum.photos/300/400?random=18'
            ]
        },
        'hobbit': {
            title: 'The Hobbit',
            coverUrl: 'https://placecats.com/202/300',
            illustrations: {
                characters: [
                    'https://picsum.photos/300/400?random=1',
                    'https://picsum.photos/300/400?random=2',
                    'https://picsum.photos/300/400?random=3'
                ],
                scenes: [
                    'https://picsum.photos/300/400?random=4',
                    'https://picsum.photos/300/400?random=5',
                    'https://picsum.photos/300/400?random=6'
                ],
                settings: [
                    'https://picsum.photos/300/400?random=7',
                    'https://picsum.photos/300/400?random=8',
                    'https://picsum.photos/300/400?random=9'
                ],
                objects: [
                    'https://picsum.photos/300/400?random=10',
                    'https://picsum.photos/300/400?random=11',
                    'https://picsum.photos/300/400?random=12'
                ],
                maps: [
                    'https://picsum.photos/300/400?random=13',
                    'https://picsum.photos/300/400?random=14'
                ]
            },
            merchandise: [
                'https://picsum.photos/300/400?random=15',
                'https://picsum.photos/300/400?random=16',
                'https://picsum.photos/300/400?random=17',
                'https://picsum.photos/300/400?random=18'
            ]
        },
        'narnia': {
            title: 'The Chronicles of Narnia',
            coverUrl: 'https://placecats.com/203/300',
            illustrations: {
                characters: [
                    'https://picsum.photos/300/400?random=1',
                    'https://picsum.photos/300/400?random=2',
                    'https://picsum.photos/300/400?random=3'
                ],
                scenes: [
                    'https://picsum.photos/300/400?random=4',
                    'https://picsum.photos/300/400?random=5',
                    'https://picsum.photos/300/400?random=6'
                ],
                settings: [
                    'https://picsum.photos/300/400?random=7',
                    'https://picsum.photos/300/400?random=8',
                    'https://picsum.photos/300/400?random=9'
                ],
                objects: [
                    'https://picsum.photos/300/400?random=10',
                    'https://picsum.photos/300/400?random=11',
                    'https://picsum.photos/300/400?random=12'
                ],
                maps: [
                    'https://picsum.photos/300/400?random=13',
                    'https://picsum.photos/300/400?random=14'
                ]
            },
            merchandise: [
                'https://picsum.photos/300/400?random=15',
                'https://picsum.photos/300/400?random=16',
                'https://picsum.photos/300/400?random=17',
                'https://picsum.photos/300/400?random=18'
            ]
        }
    };

    function populateImages(book) {
        // Clear previous images first
        document.querySelector('.results-content').classList.add('hidden');
        
        // Update selected book
        document.querySelector('.selected-cover').src = book.coverUrl;
        document.querySelector('.book-title').textContent = book.title;

        // Update illustrations
        const categories = ['characters', 'scenes', 'settings', 'objects', 'maps'];
        categories.forEach(category => {
            const containers = document.querySelectorAll(`[data-category="${category}"] .image-placeholder`);
            book.illustrations[category].forEach((url, index) => {
                if (containers[index]) {
                    // Reset background first
                    containers[index].style.backgroundImage = 'none';
                    // Create new image to preload
                    const img = new Image();
                    img.src = url;
                    img.onload = () => {
                        containers[index].style.backgroundImage = `url(${url})`;
                    };
                }
            });
        });

        // Update merchandise
        const merchContainers = document.querySelectorAll('.merch-grid .image-placeholder');
        book.merchandise.forEach((url, index) => {
            if (merchContainers[index]) {
                // Reset background first
                merchContainers[index].style.backgroundImage = 'none';
                // Create new image to preload
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    merchContainers[index].style.backgroundImage = `url(${url})`;
                };
            }
        });
    }

    bookCovers.forEach(cover => {
        cover.addEventListener('click', () => {
            bookCovers.forEach(c => c.classList.remove('active'));
            cover.classList.add('active');
            
            selectedBook = bookData[cover.dataset.book];
            
            generateBtn.disabled = (currentlyDisplayedBook === selectedBook.title);
        });
    });

    generateBtn.addEventListener('click', () => {
        if (!selectedBook) {
            alert('Please select a book first');
            return;
        }

        if (currentlyDisplayedBook === selectedBook.title) {
            alert('This book\'s illustrations are already generated. Please select a different book.');
            return;
        }

        // Hide both the results content and the results section
        resultsSection.classList.add('hidden');
        document.querySelector('.results-content').classList.add('hidden');

        // Show only after a small delay to ensure proper hiding
        setTimeout(() => {
            // Show only the loading spinner
            resultsSection.classList.remove('hidden');
            loadingSpinner.classList.remove('hidden');

            // Start preloading images during the loading animation
            const imagesToPreload = [
                selectedBook.coverUrl,
                ...selectedBook.illustrations.characters,
                ...selectedBook.illustrations.scenes,
                ...selectedBook.illustrations.settings,
                ...selectedBook.illustrations.objects,
                ...selectedBook.illustrations.maps,
                ...selectedBook.merchandise
            ];

            let loadedImages = 0;
            const totalImages = imagesToPreload.length;

            imagesToPreload.forEach(url => {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        // All images are preloaded, wait for the minimum loading time
                        setTimeout(() => {
                            loadingSpinner.classList.add('hidden');
                            populateImages(selectedBook);
                            document.querySelector('.results-content').classList.remove('hidden');
                            currentlyDisplayedBook = selectedBook.title;
                            resultsSection.scrollIntoView({ behavior: 'smooth' });
                        }, 2000);
                    }
                };
            });
        }, 50);
    });

    notifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = e.target.querySelector('input[type="email"]');
        const submitButton = e.target.querySelector('button[type="submit"]');
        const email = emailInput.value;

        // Disable form while sending
        emailInput.disabled = true;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Send email using EmailJS
        emailjs.send(
            "service_dxvod9n", // Add your EmailJS service ID
            "template_72opr7p", // Add your EmailJS template ID
            {
                to_email: "zygisluk@gmail.com", // Add your email address
                from_email: email,
                message: `New subscription request from: ${email}`
            }
        ).then(
            function(response) {
                alert("Thank you! We'll notify you when we launch.");
                emailInput.value = '';
            },
            function(error) {
                alert("Sorry, there was an error. Please try again later.");
                console.error("Email error:", error);
            }
        ).finally(() => {
            // Re-enable form
            emailInput.disabled = false;
            submitButton.disabled = false;
            submitButton.textContent = 'Notify Me';
        });
    });
}); 
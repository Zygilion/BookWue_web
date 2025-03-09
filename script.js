document.addEventListener('DOMContentLoaded', () => {
    // Hide initial loader
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
        initialLoader.classList.add('hidden');
    }

    const resultsSection = document.getElementById('results');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const notifyForm = document.getElementById('notifyForm');
    const bookCovers = document.querySelectorAll('.book-cover');
    const generateBtn = document.getElementById('generateBtn');
    const generateBtnContainer = document.querySelector('.generate-button-container');

    let selectedBook = null;
    let currentlyDisplayedBook = null;

    const bookData = {
        'carol': {
            title: 'A Christmas Carol',
            coverUrl: 'https://i.imgur.com/k6Hocpi.png',
            illustrations: {
                characters: [
                    'https://i.imgur.com/1xItFpP.png',
                    'https://i.imgur.com/nUhontc.png',
                    'https://i.imgur.com/RRynh4J.png'
                ],
                scenes: [
                    'https://i.imgur.com/4bc6hmR.png',
                    'https://i.imgur.com/YxZH0Nf.jpeg',
                    'https://i.imgur.com/YxZH0Nf.jpeg'
                ],
                objects: [
                    'https://i.imgur.com/byRtv3c.png',
                    'https://i.imgur.com/hQnAyO2.png',
                    'https://i.imgur.com/ZqBYUO2.png'
                ],
                maps: [
                    'https://i.imgur.com/1GtSyTi.jpeg',
                    'https://i.imgur.com/vdLNtl7.png'
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
            coverUrl: 'https://i.imgur.com/n3mvRWJ.png',
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
        'peter': {
            title: 'Peter Pan',
            coverUrl: 'https://i.imgur.com/HWdriee.png',
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
        'oz': {
            title: 'The Wonderful Wizard of Oz',
            coverUrl: 'https://i.imgur.com/97RlAIN.png',
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

        // Update illustrations with removed settings category
        const categories = ['characters', 'scenes', 'objects', 'maps'];
        categories.forEach(category => {
            const containers = document.querySelectorAll(`[data-category="${category}"] .image-placeholder`);
            book.illustrations[category].forEach((url, index) => {
                if (containers[index]) {
                    containers[index].style.backgroundImage = 'none';
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
                merchContainers[index].style.backgroundImage = 'none';
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

    // Add error handling for image loading
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.src = '/path-to-fallback-image.jpg'; // Add a fallback image
        }
    }, true);

    // Add this to your existing JavaScript
    window.addEventListener('scroll', () => {
        const scrollBtn = document.getElementById('scrollToTop');
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    document.getElementById('scrollToTop').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 
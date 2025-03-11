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
                    'https://i.imgur.com/Xjhm7BA.png',
                    'https://i.imgur.com/zylV5p0.png',
                    'https://i.imgur.com/aFdZPJn.png'
                ],
                scenes: [
                    'https://i.imgur.com/nF3WBNh.png',
                    'https://i.imgur.com/eGEJTu1.png',
                    'https://i.imgur.com/Nel0Yh0.png'
                ],
                objects: [
                    'https://i.imgur.com/gyFEoaP.png',
                    'https://i.imgur.com/XStve5B.png',
                    'https://i.imgur.com/4K30FVt.png'
                ],
                maps: [
                    'https://i.imgur.com/UEVeXIm.png',
                    'https://i.imgur.com/nZok61l.png'
                ]
            },
            merchandise: [
                'https://i.imgur.com/USnnqp2.png',
                'https://i.imgur.com/1vsBOd8.png',
                'https://i.imgur.com/Td55eV1.png',
                'https://i.imgur.com/JAYcAj7.png'
            ]
        },
        'alice': {
            title: 'Alice in Wonderland',
            coverUrl: 'https://i.imgur.com/n3mvRWJ.png',
            illustrations: {
                characters: [
                    'https://i.imgur.com/kZFOnph.png',
                    'https://i.imgur.com/naDqg0S.png',
                    'https://i.imgur.com/lYBwiMm.png'
                ],
                scenes: [
                    'https://i.imgur.com/GkzL37m.png',
                    'https://i.imgur.com/Nlndova.png',
                    'https://i.imgur.com/kxB1FcM.png'
                ],
                objects: [
                    'https://i.imgur.com/iiLuhjT.png',
                    'https://i.imgur.com/eYG62ek.png',
                    'https://i.imgur.com/m3HF8No.png'
                ],
                maps: [
                    'https://i.imgur.com/ryYU7S6.png',
                    'https://i.imgur.com/Ujds25I.png'
                ]
            },
            merchandise: [
                'https://i.imgur.com/fIvDTUX.png',
                'https://i.imgur.com/Zy6Ujcb.png',
                'https://i.imgur.com/tCruT6v.png',
                'https://i.imgur.com/9zahhKX.png'
            ]
        },
        'peter': {
            title: 'Peter Pan',
            coverUrl: 'https://i.imgur.com/HWdriee.png',
            illustrations: {
                characters: [
                    'https://i.imgur.com/tvKMcGZ.png',
                    'https://i.imgur.com/1uarDVU.png',
                    'https://i.imgur.com/v9vVlkN.png',
                ],
                scenes: [
                    'https://i.imgur.com/h8gG4yG.png',
                    'https://i.imgur.com/a59joZq.png',
                    'https://i.imgur.com/HVZ6S9l.png'
                ],
                objects: [
                    'https://i.imgur.com/DgIdEMm.png',
                    'https://i.imgur.com/0s7YwZM.png',
                    'https://i.imgur.com/6V1eZV1.png'
                ],
                maps: [
                    'https://i.imgur.com/lwTXALY.png',
                    'https://i.imgur.com/A807nWg.png'
                ]
            },
            merchandise: [
                'https://i.imgur.com/7AeF3xX.png',
                'https://i.imgur.com/S864beo.png',
                'https://i.imgur.com/mJEnntC.png',
                'https://i.imgur.com/DaOjZs9.png'
            ]
        },
        'oz': {
            title: 'The Wonderful Wizard of Oz',
            coverUrl: 'https://i.imgur.com/97RlAIN.png',
            illustrations: {
                characters: [
                    'https://i.imgur.com/tJgNthW.png',
                    'https://i.imgur.com/wuWzv5y.png',
                    'https://i.imgur.com/Sdj2MkP.png'
                ],
                scenes: [
                    'https://i.imgur.com/5XgpsrO.png',
                    'https://i.imgur.com/b5I4960.png',
                    'https://i.imgur.com/J7FICgy.png'
                ],
                objects: [
                    'https://i.imgur.com/tHOCe7b.png',
                    'https://i.imgur.com/lsdscAv.png',
                    'https://i.imgur.com/RHWSy43.png'
                ],
                maps: [
                    'https://i.imgur.com/JO2bMfG.png',
                    'https://i.imgur.com/xu65rWI.png'
                ]
            },
            merchandise: [
                'https://i.imgur.com/7q8LRpV.png',
                'https://i.imgur.com/7RSDVTK.png',
                'https://i.imgur.com/ETZO25L.png',
                'https://i.imgur.com/nfX4vF5.png'
            ]
        }
    };

    function populateImages(book) {
        // Clear previous images first
        document.querySelector('.results-content').classList.add('hidden');
        
        // Update selected book
        const selectedCover = document.querySelector('.selected-cover');
        selectedCover.style.opacity = '0'; // Hide the image while loading
        selectedCover.src = book.coverUrl;
        selectedCover.onload = () => {
            selectedCover.style.opacity = '1'; // Show image when loaded
        };
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
                to_email: "hello@bookwue.com", // Add your email address
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

    // Update the image loading error handler
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'placeholder.jpg'; // Add placeholder image path
        }
    }, true);
}); 
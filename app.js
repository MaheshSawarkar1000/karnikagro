/* -------------------------------------------------------------
   Karnika Agro - Custom Interactive Application Script
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navigation & Scroll Highlighting ---
    const header = document.querySelector('.main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Sticky Header Toggle
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load


    // --- 2. Mobile Nav Toggle ---
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileNav = () => {
        mobileToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        
        // Change toggle span styling to represent a close 'X'
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    };

    mobileToggle.addEventListener('click', toggleMobileNav);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('active')) {
                toggleMobileNav();
            }
        });
    });


    // --- 3. Product Marketplace Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button class
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filter product cards
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'slideUp 0.3s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --- 4. Interactive Crop Advisory Assistant ---
    const advisoryData = {
        wheat: {
            name: "Wheat (Kanak)",
            symptoms: {
                yellow_rust: {
                    title: "Yellow Rust (Fungal Infection)",
                    diagnosis: "Identified by yellow/orange powdery pustules forming stripes on leaves. Inhibits photosynthesis and stunts crop development.",
                    solution: "Apply foliar sprays of eco-friendly sulfur formulations. Maintain proper field drainage and avoid overhead irrigation.",
                    product: "Karnika Bio-Grow Liquid Nutrient (Organic Shield Edition)"
                },
                aphids: {
                    title: "Wheat Aphids Attack",
                    diagnosis: "Tiny green or black insects clustered on young stems and under leaves, secreting sticky honeydew.",
                    solution: "Spray cold-pressed Neem seed kernel extract (NSKE 5%) or wash crops with a mild bio-soap solution to disrupt pest feeding.",
                    product: "Karnika Neem Shield Organic Pest Protection (available upon custom FPC order)"
                }
            }
        },
        rice: {
            name: "Rice (Paddy)",
            symptoms: {
                blast: {
                    title: "Rice Blast (Magnaporthe oryzae)",
                    diagnosis: "Spindle-shaped lesions with gray/whitish centers on leaves or necks. Highly active in humid conditions.",
                    solution: "Avoid excessive urea/nitrogen applications. Introduce copper-based biological spray and dry field intervals.",
                    product: "Karnika Bio-Grow Liquid Nutrient"
                },
                stem_borer: {
                    title: "Yellow Stem Borer Infestation",
                    diagnosis: "Larvae bore into stems causing 'dead hearts' in young plants and unfilled grains ('whiteheads') later.",
                    solution: "Utilize pheromone traps (10-12 traps per acre) and apply Trichogramma japonicum bio-parasitoid cards.",
                    product: "Karnika Neem Shield Organic Pest Protection (available upon custom FPC order)"
                }
            }
        },
        tomato: {
            name: "Tomato (Tamatar)",
            symptoms: {
                early_blight: {
                    title: "Early Blight (Alternaria)",
                    diagnosis: "Dark spots with concentric target-board rings on older foliage, spreading upwards and leading to leaf drop.",
                    solution: "Prune lower leaves to enhance airflow. Apply bio-fungicide sprays containing Bacillus subtilis.",
                    product: "Karnika Bio-Grow Liquid Nutrient"
                },
                leaf_miner: {
                    title: "Serpentine Leaf Miner",
                    diagnosis: "Winding white trails inside leaf tissues caused by feeding larvae. Severely limits leaf photosynthesis.",
                    solution: "Deploy yellow sticky traps near foliage and spray bio-formulations of neem extract.",
                    product: "Karnika Neem Shield Organic Pest Protection (available upon custom FPC order)"
                }
            }
        },
        cotton: {
            name: "Cotton (Kapaas)",
            symptoms: {
                bollworm: {
                    title: "American/Pink Bollworm",
                    diagnosis: "Larvae burrowing inside cotton bolls, destroying developing cotton fibers and causing premature drop.",
                    solution: "Deploy pheromone traps to monitor adult moths and spray bio-agents containing Beauveria bassiana.",
                    product: "Karnika Neem Shield Organic Pest Protection (available upon custom FPC order)"
                },
                wilt: {
                    title: "Fusarium Wilt",
                    diagnosis: "Gradual leaf yellowing and sudden wilting of branches, with brown discoloration inside the stem.",
                    solution: "Apply bio-control agent Trichoderma viride in soil. Ensure deep plowing during summer.",
                    product: "Karnika Bio-Grow Liquid Nutrient"
                }
            }
        }
    };

    const cropSelect = document.getElementById('advisory-crop');
    const symptomSelect = document.getElementById('advisory-symptom');
    const diagnoseBtn = document.getElementById('btn-diagnose');
    const resultBox = document.getElementById('advisory-result');

    const resultIssueTitle = document.getElementById('result-issue-title');
    const resultDiagnosis = document.getElementById('result-diagnosis');
    const resultSolution = document.getElementById('result-solution');
    const resultProductSuggest = document.getElementById('result-product-suggest');
    const resultEnquireBtn = document.getElementById('btn-advisory-enquire');

    // Populate Symptoms when Crop changes
    cropSelect.addEventListener('change', () => {
        const cropKey = cropSelect.value;
        symptomSelect.innerHTML = '';
        
        if (!cropKey || !advisoryData[cropKey]) {
            symptomSelect.innerHTML = '<option value="">-- Select Crop First --</option>';
            symptomSelect.disabled = true;
            diagnoseBtn.disabled = true;
            resultBox.classList.add('hidden');
            return;
        }

        symptomSelect.disabled = false;
        diagnoseBtn.disabled = false;
        
        symptomSelect.innerHTML = '<option value="">-- Choose Symptom --</option>';
        const symptomsObj = advisoryData[cropKey].symptoms;
        for (const key in symptomsObj) {
            let label = "";
            if (key === 'yellow_rust') label = "Yellow powdery spots on leaves";
            else if (key === 'aphids') label = "Tiny sticky insects on stems/leaves";
            else if (key === 'blast') label = "Spindle-shaped leaf spots";
            else if (key === 'stem_borer') label = "Dry central shoot / Dead hearts";
            else if (key === 'early_blight') label = "Concentric brown rings on lower leaves";
            else if (key === 'leaf_miner') label = "White winding trails on leaves";
            else if (key === 'bollworm') label = "Damaged/hollowed cotton bolls";
            else if (key === 'wilt') label = "Sudden drooping & wilting of branches";
            
            symptomSelect.innerHTML += `<option value="${key}">${label || symptomsObj[key].title}</option>`;
        }
    });

    // Run Diagnosis
    diagnoseBtn.addEventListener('click', () => {
        const cropKey = cropSelect.value;
        const symptomKey = symptomSelect.value;

        if (!cropKey || !symptomKey) {
            alert('Please select both crop and symptom.');
            return;
        }

        const report = advisoryData[cropKey].symptoms[symptomKey];
        if (report) {
            resultIssueTitle.textContent = report.title;
            resultDiagnosis.textContent = report.diagnosis;
            resultSolution.textContent = report.solution;
            resultProductSuggest.textContent = report.product;
            
            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Hook advisory enquiry button
            resultEnquireBtn.onclick = () => {
                openEnquiryModal(report.product, `Farmer reported ${advisoryData[cropKey].name} crop having ${report.title}. Advisory recommended this solution.`);
            };
        }
    });


    // --- 5. Fertilizer Dosage Calculator ---
    const calcCrop = document.getElementById('calc-crop');
    const calcAcreage = document.getElementById('calc-acreage');
    const calcBtn = document.getElementById('btn-calculate');
    const calcResultBox = document.getElementById('calc-result');

    const totalLitersText = document.getElementById('calc-total-liters');
    const totalBottlesText = document.getElementById('calc-total-bottles');
    const totalCostText = document.getElementById('calc-cost');
    const calcEnquireBtn = document.getElementById('btn-calc-enquire');

    // Dosage rates (Liters per Acre)
    const cropDosageRates = {
        wheat: 3.0,
        rice: 4.0,
        tomato: 5.0,
        cotton: 3.5
    };

    const BOTTLE_PRICE = 450; // Price of 1 Litre bottle

    calcBtn.addEventListener('click', () => {
        const cropKey = calcCrop.value;
        const acreage = parseFloat(calcAcreage.value);

        if (!cropKey) {
            alert('Please select a crop type.');
            return;
        }
        if (isNaN(acreage) || acreage <= 0) {
            alert('Please enter a valid field size in acres (greater than 0).');
            return;
        }

        const ratePerAcre = cropDosageRates[cropKey];
        const totalLiters = acreage * ratePerAcre;
        const totalBottles = Math.ceil(totalLiters); // Since it comes in 1L bottles
        const totalCost = totalBottles * BOTTLE_PRICE;

        // Display results
        totalLitersText.textContent = `${totalLiters.toFixed(1)} L`;
        totalBottlesText.textContent = `${totalBottles} Bottle${totalBottles > 1 ? 's' : ''}`;
        totalCostText.textContent = `₹${totalCost.toLocaleString('en-IN')}`;

        calcResultBox.classList.remove('hidden');
        calcResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hook calculator enquiry button
        calcEnquireBtn.onclick = () => {
            const cropLabel = calcCrop.options[calcCrop.selectedIndex].text;
            openEnquiryModal(
                'Karnika Bio-Grow Liquid Nutrient',
                `Dosage calculation results: Field size: ${acreage} Acres of ${cropLabel}. Calculated Bio-Grow requirement: ${totalLiters.toFixed(1)} L (${totalBottles} bottles).`,
                totalBottles
            );
        };
    });


    // --- 6. Testimonial Slider System ---
    const testimonialTrack = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const slideIntervalTime = 6000;
    let slideInterval;

    const showSlide = (index) => {
        if (index >= cards.length) index = 0;
        if (index < 0) index = cards.length - 1;

        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentIndex = index;
    };

    const startAutoSlide = () => {
        slideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, slideIntervalTime);
    };

    const stopAutoSlide = () => {
        clearInterval(slideInterval);
    };

    // Dot clicks
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(idx);
            startAutoSlide();
        });
    });

    // Start sliding on load
    if (cards.length > 0) {
        startAutoSlide();
    }


    // --- 7. Modal System for Product Enquiry ---
    const modal = document.getElementById('enquiry-modal');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductHiddenName = document.getElementById('modal-product-hidden-name');
    const modalQty = document.getElementById('modal-qty');
    const modalMsg = document.getElementById('modal-msg');
    const modalForm = document.getElementById('modal-form');

    // Global Modal Functions (Attached to window so HTML click handlers can trigger them)
    window.openEnquiryModal = (productName, prefilledNotes = '', prefilledQty = 5) => {
        modalProductName.textContent = productName;
        modalProductHiddenName.value = productName;
        modalQty.value = prefilledQty;
        modalMsg.value = prefilledNotes;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Disable page scrolling
    };

    window.closeEnquiryModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Enable page scrolling
        modalForm.reset();
    };

    // Close modal when clicking outside contents
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeEnquiryModal();
        }
    });

    // Handle Enquiry Form Submission
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const customerName = document.getElementById('modal-name').value;
        const customerPhone = document.getElementById('modal-phone').value;
        const product = modalProductHiddenName.value;
        const qty = modalQty.value;
        const village = document.getElementById('modal-village').value;
        const remarks = modalMsg.value;

        // Simulate form processing
        console.log("Enquiry Submitted:", { customerName, customerPhone, product, qty, village, remarks });

        // Close modal
        closeEnquiryModal();

        // Show Success Toast
        showToast(
            'Enquiry Submitted!',
            `Thank you, ${customerName}. Our local FPC representative will call you at ${customerPhone} regarding ${product} order.`
        );
    });


    // --- 8. Contact & Shareholder Membership Form Submission ---
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value;
        const phone = document.getElementById('form-phone').value;
        const state = document.getElementById('form-state').value;
        const interest = document.getElementById('form-interest').value;
        const message = document.getElementById('form-message').value;

        // Simulate processing
        console.log("Cooperative Enrollment Request:", { name, phone, state, interest, message });

        // Reset Form
        contactForm.reset();

        // Show Success Toast
        let toastTitle = "Request Registered!";
        let toastMsg = `Welcome aboard, ${name}! A representative will connect with you on ${phone}.`;
        
        if (interest === "FPC Membership") {
            toastTitle = "FPC Membership Initiated!";
            toastMsg = `Thank you for choosing Karnika FPC, ${name}. A membership counselor will contact you.`;
        }

        showToast(toastTitle, toastMsg);
    });


    // --- 9. Toast Notification Helper ---
    const toast = document.getElementById('success-toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout;

    const showToast = (title, message) => {
        // Clear any active timeout
        clearTimeout(toastTimeout);

        toastTitle.textContent = title;
        toastMessage.textContent = message;

        toast.classList.remove('hidden');

        // Auto-dismiss after 5 seconds
        toastTimeout = setTimeout(() => {
            toast.classList.add('hidden');
        }, 5000);
    };

});

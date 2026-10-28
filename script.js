document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Мобильное меню (Бургер)
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Закрываем меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // 2. Аккордеон (Программа курса)
    const accordionHeaders = document.querySelectorAll('.accordion__header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('span');
            
            // Если открыт - закрываем
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.textContent = '+';
            } else {
                // Закрываем все остальные (опционально, если хотим чтобы открыт был только один)
                document.querySelectorAll('.accordion__content').forEach(item => {
                    item.style.maxHeight = null;
                });
                document.querySelectorAll('.accordion__header span').forEach(item => {
                    item.textContent = '+';
                });

                // Открываем текущий
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = '-';
            }
        });
    });

    // 3. Обработка формы
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        
        // Имитация отправки данных
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Отправка...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами.');
            form.reset();
            btn.textContent = originalText;
            btn.style.opacity = '1';
        }, 1000);
    });

    // 4. Анимация появления секций при скролле (простая)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Применяем к карточкам и тарифам
    document.querySelectorAll('.card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
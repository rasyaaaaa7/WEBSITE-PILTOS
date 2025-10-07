document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    // FUNGSI UNTUK TOGGLE NAVIGASI MOBILE
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        // Mengubah ikon burger menjadi ikon close (opsional)
        const icon = menuToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // FUNGSI UNTUK MENUTUP NAVIGASI KETIKA LINK DIKLIK (di mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Cek apakah mode mobile aktif (nav memiliki class 'active')
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                // Kembalikan ikon ke burger
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // PENGATURAN LAIN (Opsional: animasi saat scroll)
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = 'white';
        }
    });
});

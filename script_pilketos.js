document.addEventListener('DOMContentLoaded', () => {
    // --- DATA KANDIDAT DAN HASIL (STATIS) ---
    const kandidatData = [
        { 
            id: 1, 
            ketua: "Aditya Pratama", wakil: "Shinta Dewi", 
            visi: "OSIS Kreatif & Berintegritas",
            suara: 185, // Data suara untuk tab Hasil
            img_ketua: "https://via.placeholder.com/100/1e3c72/FFFFFF?text=KC1", 
            img_wakil: "https://via.placeholder.com/100/1e3c72/FFFFFF?text=WC1" 
        },
        { 
            id: 2, 
            ketua: "Bagas Setiawan", wakil: "Rina Amelia", 
            visi: "Sekolah Unggul, Siswa Berprestasi",
            suara: 250, 
            img_ketua: "https://via.placeholder.com/100/2ecc71/FFFFFF?text=KC2", 
            img_wakil: "https://via.placeholder.com/100/2ecc71/FFFFFF?text=WC2" 
        },
        { 
            id: 3, 
            ketua: "Daffa Ramadhan", wakil: "Maya Sari", 
            visi: "Mewujudkan Lingkungan Sekolah Inovatif",
            suara: 155, 
            img_ketua: "https://via.placeholder.com/100/f1c40f/FFFFFF?text=KC3", 
            img_wakil: "https://via.placeholder.com/100/f1c40f/FFFFFF?text=WC3" 
        }
    ];
    
    // Total pemilih untuk perhitungan persentase hasil
    const totalDPT = 600; 

    const kandidatContainer = document.getElementById('kandidatContainer');
    const konfirmasiArea = document.getElementById('konfirmasiArea');
    const pilihanAndaText = document.getElementById('pilihanAnda');
    const btnKonfirmasi = document.getElementById('btnKonfirmasi');
    const btnBatal = document.getElementById('btnBatal');
    const popupSuccess = document.getElementById('popupSuccess');
    
    let pilihanPaslonId = null;
    const totalSuaraMasuk = kandidatData.reduce((sum, k) => sum + k.suara, 0);
    const pemenang = kandidatData.reduce((prev, current) => (prev.suara > current.suara) ? prev : current);

    // --- FUNGSI UTAMA ---

    // 1. Tampilkan Kartu Kandidat (untuk Tab Voting)
    function renderVotingCards() {
        kandidatContainer.innerHTML = '';
        kandidatData.forEach(kandidat => {
            const card = document.createElement('div');
            card.className = 'kandidat-card';
            card.dataset.id = kandidat.id;
            card.innerHTML = `
                <div class="nomor-paslon">${kandidat.id}</div>
                <div class="paslon-photos">
                    <img src="${kandidat.img_ketua}" alt="Foto Ketua ${kandidat.ketua}">
                    <img src="${kandidat.img_wakil}" alt="Foto Wakil ${kandidat.wakil}">
                </div>
                <h3>${kandidat.ketua} & ${kandidat.wakil}</h3>
                <p>Visi: ${kandidat.visi}</p>
            `;
            
            card.addEventListener('click', () => {
                handlePilih(kandidat.id, kandidat.ketua, kandidat.wakil);
            });

            kandidatContainer.appendChild(card);
        });
    }

    // 2. Tampilkan Hasil (untuk Tab Hasil)
    function renderResultContent() {
        // Render Statistik Dashboard
        const persentaseMemilih = ((totalSuaraMasuk / totalDPT) * 100).toFixed(1);
        const statsGrid = document.querySelector('#hasil .stats-grid');
        
        statsGrid.innerHTML = `
            <div class="stat-card"><h3>Total DPT</h3><p>${totalDPT}</p></div>
            <div class="stat-card"><h3>Total Suara Masuk</h3><p>${totalSuaraMasuk}</p></div>
            <div class="stat-card"><h3>Partisipasi</h3><p>${persentaseMemilih}%</p></div>
            <div class="stat-card"><h3>Pemenang Sementara</h3><p>Paslon No. ${pemenang.id}</p></div>
        `;

        // Render Kartu Hasil Paslon
        const hasilKandidatContainer = document.getElementById('hasilKandidatContainer');
        hasilKandidatContainer.innerHTML = '';

        kandidatData.forEach(kandidat => {
            const persentaseSuara = ((kandidat.suara / totalSuaraMasuk) * 100).toFixed(1);
            const isWinner = kandidat.id === pemenang.id;
            const winnerBadge = isWinner ? '<span style="color:#2ecc71; font-weight:700;"><i class="fas fa-trophy"></i> PEMENANG</span>' : '';

            const card = document.createElement('div');
            card.className = `kandidat-card result-card ${isWinner ? 'winner' : ''}`;
            card.innerHTML = `
                ${winnerBadge}
                <div class="nomor-paslon">${kandidat.id}</div>
                <h3>${kandidat.ketua} & ${kandidat.wakil}</h3>
                <p class="votes">${kandidat.suara} Suara</p>
                <p>(${persentaseSuara}%)</p>
            `;
            hasilKandidatContainer.appendChild(card);
        });
    }


    // 3. Logika Pemilihan (Handler)
    function handlePilih(id, ketua, wakil) {
        document.querySelectorAll('.kandidat-card').forEach(card => {
            card.classList.remove('selected');
        });

        const selectedCard = document.querySelector(`#vote .kandidat-card[data-id="${id}"]`);
        selectedCard.classList.add('selected');
        
        pilihanPaslonId = id;
        pilihanAndaText.innerHTML = `Anda telah memilih **Paslon No. ${id}** (${ketua} & ${wakil}).`;
        konfirmasiArea.style.display = 'block';
    }


    // 4. Konfirmasi Pilihan
    btnKonfirmasi.addEventListener('click', () => {
        if (pilihanPaslonId !== null) {
            // Dalam aplikasi nyata: AJAX request untuk mengirim suara ke server dan menandai pemilih sudah memilih.
            console.log(`Pilihan dikirim: Paslon No. ${pilihanPaslonId}`);
            
            document.querySelector('.main-content').style.display = 'none';
            popupSuccess.style.display = 'flex';
        }
    });

    // 5. Batal Pilihan
    btnBatal.addEventListener('click', () => {
        document.querySelectorAll('.kandidat-card').forEach(card => {
            card.classList.remove('selected');
        });
        konfirmasiArea.style.display = 'none';
        pilihanPaslonId = null;
    });


    // 6. Pengaturan Tab Navigasi
    document.querySelectorAll('.tabs-nav .tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const tabName = e.currentTarget.getAttribute('data-tab');

            // Hapus 'active' dari semua tombol dan konten
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Tambahkan 'active' ke tombol dan konten yang dipilih
            e.currentTarget.classList.add('active');
            document.getElementById(tabName).classList.add('active');

            // Khusus untuk tab hasil, render ulang data agar "fresh"
            if (tabName === 'hasil') {
                renderResultContent();
            }
        });
    });


    // Inisialisasi: Render kartu voting saat halaman dimuat
    renderVotingCards();
    renderResultContent(); // Pre-render hasil, meskipun tab 'vote' yang aktif
});

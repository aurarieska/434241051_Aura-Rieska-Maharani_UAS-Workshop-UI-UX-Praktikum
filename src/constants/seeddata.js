import { IMG, svcImg } from './images';

export const INIT_CATEGORIES = [
  { id: 1, name: "Woman's Haircut", desc: 'Cuts designed for women' },
  { id: 2, name: "Man's Haircut", desc: 'Cuts designed for men' },
  { id: 3, name: 'Hair Coloring', desc: 'Color services' },
  { id: 4, name: 'Hair Treatment', desc: 'Restorative care' },
  { id: 5, name: 'Hair Styling', desc: 'Styling for events' },
  { id: 6, name: 'Basic Nails', desc: 'Essential nail care' },
  { id: 7, name: 'Nail Art', desc: 'Creative nail designs' },
  { id: 8, name: 'Facial', desc: 'Skin treatments' },
  { id: 9, name: 'Advanced Treatment', desc: 'Specialised skincare' },
  { id: 10, name: 'Makeup', desc: 'Professional makeup' },
];

const IS = [
  ['Wolf Cut', 1, 60, 180000, 'https://i.pinimg.com/736x/23/3f/d9/233fd96a409eb09b6e08f0154fd256d2.jpg'],
  ['Butterfly Cut', 1, 75, 220000, 'https://i.pinimg.com/1200x/09/94/47/099447dd11a3c2952603f66401d61d67.jpg'],
  ['Hush Cut', 1, 60, 200000, 'https://i.pinimg.com/736x/2a/5c/a5/2a5ca5aee360d71f35c0b04602313a0a.jpg'],
  ['Bob Cut', 1, 50, 170000, 'https://i.pinimg.com/736x/41/02/65/410265a09cf0f6ce0804ed3f17aa823f.jpg'],
  ['Pixie Cut', 1, 45, 160000, 'https://i.pinimg.com/736x/45/67/58/456758c8d584cd735ec93e8127b0cc3a.jpg'],
  ['Shaggy Cut', 1, 60, 190000, 'https://i.pinimg.com/1200x/fd/73/d5/fd73d55cbf3a2e3a902d3119300cd5f8.jpg'],
  ['Two Block', 2, 45, 130000, 'https://i.pinimg.com/736x/a7/bf/34/a7bf3402a1fe07b4c1bc62d16f8879c8.jpg'],
  ['Comma Hair', 2, 45, 140000, 'https://i.pinimg.com/1200x/70/ae/fc/70aefc6637945f391b63c1401d5589ba.jpg'],
  ['Mullet', 2, 50, 150000, 'https://i.pinimg.com/1200x/6e/58/d2/6e58d20de780115f4084491b91af0938.jpg'],
  ['Taper Fade', 2, 45, 135000, 'https://i.pinimg.com/736x/10/5e/83/105e838380120a6df4573ac6172f20c4.jpg'],
  ['Low Fade', 2, 45, 135000, 'https://i.pinimg.com/736x/22/2c/77/222c77a82eb473ca1115a01722944ce9.jpg'],
  ['Undercut', 2, 50, 150000, 'https://i.pinimg.com/736x/4c/11/1a/4c111abafc5b79c6a922b7b6315ee365.jpg'],
  ['Buzz Cut', 2, 30, 90000, 'https://i.pinimg.com/736x/7b/b4/44/7bb4443957a7fab6e6683cac26dd8c49.jpg'],
  ['Full Color', 3, 180, 650000, 'https://i.pinimg.com/736x/97/60/d9/9760d9b1498c3865e80375fc9769cbe5.jpg'],
  ['Retouch', 3, 90, 350000, 'https://i.pinimg.com/736x/5d/64/8e/5d648e055aebfecd1f9390992c142b90.jpg'],
  ['Highlight', 3, 150, 580000, 'https://i.pinimg.com/1200x/98/be/92/98be92589c902c3af4ade91fe5442e9c.jpg'],
  ['Balayage', 3, 180, 750000, 'https://i.pinimg.com/1200x/5f/5d/d6/5f5dd636c2a8f8f60f3f7960f6c4ab77.jpg'],
  ['Ombre', 3, 180, 700000, 'https://i.pinimg.com/1200x/2f/20/a7/2f20a79f4ed7c52b3bca5c8d010b1013.jpg'],
  ['Fantasy Color', 3, 240, 950000, 'https://i.pinimg.com/736x/69/a4/d4/69a4d4218a0970d3ad2aa544aaf15ffa.jpg'],
  ['Hair Spa', 4, 60, 220000, 'https://i.pinimg.com/1200x/38/f3/18/38f318aef30437250ffaabba1a6f3558.jpg'],
  ['Keratin', 4, 150, 850000, 'https://i.pinimg.com/1200x/cb/47/fa/cb47fab4890d95412e5da0995c40c769.jpg'],
  ['Smoothing', 4, 180, 950000, 'https://i.pinimg.com/736x/1a/9c/12/1a9c1273d6eef23251f6b7d1c9b9f614.jpg'],
  ['Scalp Treatment', 4, 75, 280000, 'https://i.pinimg.com/736x/1d/b5/b6/1db5b6835b843529a2096dd15959c8da.jpg'],
  ['Hair Mask', 4, 45, 150000, 'https://i.pinimg.com/1200x/df/12/44/df1244821d674c87518bf52fbec8206a.jpg'],
  ['Blow Dry', 5, 30, 100000, 'https://i.pinimg.com/1200x/fe/05/49/fe05497baab449a2868689df946b2183.jpg'],
  ['Curl Styling', 5, 45, 180000, 'https://i.pinimg.com/736x/7b/e6/a1/7be6a12c3622d9a9b105f1ab2f33599a.jpg'],
  ['Korean Styling', 5, 60, 250000, 'https://i.pinimg.com/1200x/3b/b0/ac/3bb0ac0c1526e67f958cfa5c6f5aabf2.jpg'],
  ['Party Hairdo', 5, 60, 350000, 'https://i.pinimg.com/736x/09/ae/58/09ae58b390f608c94039473033fd1819.jpg'],
  ['Wedding Hairdo', 5, 90, 750000, 'https://i.pinimg.com/1200x/b1/f1/71/b1f17106cc5e7b9d32680ba03d36f903.jpg'],
  ['Manicure', 6, 45, 120000, 'https://i.pinimg.com/736x/8b/16/ce/8b16ce6e0c96ffe6d6a5b61f3124313e.jpg'],
  ['Pedicure', 6, 60, 150000, 'https://i.pinimg.com/1200x/23/cc/b4/23ccb43295b9be3bb575066c1bbe8f8d.jpg'],
  ['Gel Polish', 6, 60, 180000, 'https://i.pinimg.com/736x/36/c6/d2/36c6d220c7600be2cf542bfe5cf92905.jpg'],
  ['Nail Extension', 6, 90, 280000, 'https://i.pinimg.com/1200x/c3/5e/73/c35e73fafacc97b9c0b0e2b93f7a4605.jpg'],
  ['Nail Repair', 6, 30, 80000, 'https://i.pinimg.com/736x/96/32/ca/9632cab9816e54f4d187d227736653e2.jpg'],
  ['Basic Design', 7, 60, 200000, 'https://i.pinimg.com/736x/3d/5b/b4/3d5bb44f057f493d05b4beb0a665aa6f.jpg'],
  ['Medium Design', 7, 90, 300000, 'https://i.pinimg.com/736x/ca/e3/07/cae307001f9431970e5568f56c1f3f09.jpg'],
  ['Advanced Design', 7, 120, 450000, 'https://i.pinimg.com/1200x/07/59/61/0759617007390e88fdd9ac7b4bc60321.jpg'],
  ['3D Nail Art', 7, 150, 550000, 'https://i.pinimg.com/736x/b1/f7/d1/b1f7d1eef28d5b667e966faa621cae66.jpg'],
  ['Character Nail Art', 7, 180, 650000, 'https://i.pinimg.com/736x/0e/d5/fe/0ed5fe68842bec2bc0167afd0d269817.jpg'],
  ['Custom Design', 7, 180, 700000, 'https://i.pinimg.com/1200x/fc/ae/21/fcae2124662d500fde77d2ed5f758328.jpg'],
  ['Basic Facial', 8, 60, 180000, 'https://i.pinimg.com/1200x/0c/03/31/0c0331bfb27d9a21941ab88e76f6ac95.jpg'],
  ['Acne Facial', 8, 75, 250000, 'https://i.pinimg.com/736x/f9/4a/8f/f94a8fe9bfb9ed43ababa33e42619bda.jpg'],
  ['Brightening Facial', 8, 75, 280000, 'https://i.pinimg.com/736x/2a/be/04/2abe04fb7d6764fc31f8eb0d37d9fab9.jpg'],
  ['Hydrating Facial', 8, 75, 260000, 'https://i.pinimg.com/736x/94/cc/3d/94cc3df90dabb778c06e100244dc8269.jpg'],
  ['Chemical Peeling', 9, 90, 550000, 'https://i.pinimg.com/736x/4c/e7/87/4ce787923972db5c00072b4fd541a929.jpg'],
  ['LED Therapy', 9, 45, 350000, 'https://i.pinimg.com/1200x/ff/d8/53/ffd853c828506511ab8f024425b162ec.jpg'],
  ['Microdermabrasion', 9, 75, 450000, 'https://i.pinimg.com/1200x/58/09/03/5809033518bad27fe4048fca5b490257.jpg'],
  ['Daily Makeup', 10, 45, 200000, 'https://i.pinimg.com/1200x/ee/6b/e8/ee6be89dc9f998e3f5fae17698983eee.jpg'],
  ['Party Makeup', 10, 75, 400000, 'https://i.pinimg.com/736x/82/2d/05/822d05b1ff972a5e3f4ae40b15062949.jpg'],
  ['Graduation Makeup', 10, 90, 550000, 'https://i.pinimg.com/736x/41/24/52/4124522d5130137629e5d09777c0ddbf.jpg'],
  ['Wedding Makeup', 10, 120, 1200000, 'https://i.pinimg.com/1200x/eb/96/08/eb96088cca1db92c5a62032720463fa2.jpg'],
  ['Photoshoot Makeup', 10, 90, 650000, 'https://i.pinimg.com/736x/16/32/c2/1632c208239dea93d9f9ad56b4aa0e28.jpg'],
];

export const INIT_SERVICES = IS.map((s, i) => ({
  id: i + 1, name: s[0], categoryId: s[1], duration: s[2], price: s[3], image: svcImg(s[4]),
}));

export const INIT_STYLISTS = [
  {
    id: 1, name: 'Aria Chen', specialty: 'Color Specialist', rating: 4.9, photo: IMG.s1,
    bio: 'With over 8 years crafting bespoke color stories, Aria turns hair into wearable art. Trained in Tokyo and Paris.',
    serviceIds: [14, 15, 16, 17, 18, 19, 1, 2, 3, 4],
    portfolio: [IMG.galA, IMG.galB, IMG.galC, IMG.galD, IMG.galE, IMG.galF, IMG.galG, IMG.galH, IMG.galA, IMG.galC],
  },
  {
    id: 2, name: 'Sophia Rinaldi', specialty: 'Bridal & Editorial', rating: 4.8, photo: IMG.s2,
    bio: 'Sophia brings runway sophistication to your special day. A trusted name for brides and editorial shoots.',
    serviceIds: [25, 26, 27, 28, 29, 47, 48, 49, 50],
    portfolio: [IMG.galB, IMG.galD, IMG.galF, IMG.galH, IMG.galA, IMG.galC, IMG.galE, IMG.galG],
  },
  {
    id: 3, name: 'Marcus Lee', specialty: "Men's Cuts & Fades", rating: 4.9, photo: IMG.s3,
    bio: 'Sharp lines, sharper details. Marcus is the destination for the modern gentleman.',
    serviceIds: [7, 8, 9, 10, 11, 12, 13],
    portfolio: [IMG.galC, IMG.galA, IMG.galG, IMG.galB, IMG.galD, IMG.galE, IMG.galF, IMG.galH],
  },
  {
    id: 4, name: 'Yuki Tanaka', specialty: 'Nail Artist', rating: 5.0, photo: IMG.s4,
    bio: 'Miniature canvases of bold ideas. Yuki has been featured in Vogue Japan for her sculptural 3D work.',
    serviceIds: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
    portfolio: [IMG.galE, IMG.galF, IMG.galB, IMG.galH, IMG.galC, IMG.galA, IMG.galD, IMG.galG],
  },
  {
    id: 5, name: 'Camille Dubois', specialty: 'Skincare Expert', rating: 4.8, photo: IMG.s5,
    bio: 'Camille treats every skin as a story to be told gently. Certified in clinical aesthetics from Lyon.',
    serviceIds: [42, 43, 44, 45, 46, 47, 48, 49],
    portfolio: [IMG.galD, IMG.galB, IMG.galH, IMG.galF, IMG.galA, IMG.galC, IMG.galE, IMG.galG],
  },
  {
    id: 6, name: 'Isabella Reyes', specialty: 'Cut & Style', rating: 4.7, photo: IMG.s6,
    bio: 'Modern, effortless, distinctly you. Isabella is known for cuts that grow out beautifully.',
    serviceIds: [1, 2, 3, 4, 5, 6, 25, 26, 27],
    portfolio: [IMG.galG, IMG.galC, IMG.galA, IMG.galE, IMG.galB, IMG.galD, IMG.galF, IMG.galH],
  },
];

export const INIT_APPOINTMENTS = [
  { stylistId: 1, date: 'today', startHour: 10, duration: 90, customerName: 'Booked', serviceName: 'Hair Coloring', id: 'a1' },
  { stylistId: 1, date: 'today', startHour: 14, duration: 60, customerName: 'Booked', serviceName: 'Haircut', id: 'a2' },
  { stylistId: 2, date: 'today', startHour: 11, duration: 120, customerName: 'Booked', serviceName: 'Wedding', id: 'a3' },
  { stylistId: 3, date: 'today', startHour: 13, duration: 45, customerName: 'Booked', serviceName: 'Fade', id: 'a4' },
  { stylistId: 3, date: 'today', startHour: 16, duration: 60, customerName: 'Booked', serviceName: 'Cut', id: 'a5' },
  { stylistId: 4, date: 'today', startHour: 12, duration: 90, customerName: 'Booked', serviceName: 'Nail Art', id: 'a6' },
  { stylistId: 5, date: 'today', startHour: 15, duration: 60, customerName: 'Booked', serviceName: 'Facial', id: 'a7' },
  { stylistId: 6, date: 'today', startHour: 11, duration: 60, customerName: 'Booked', serviceName: 'Cut', id: 'a8' },
];

export const TESTIMONIALS = [
  {
    name: 'Larasati P.', rating: 5,
    text: 'Suasananya menenangkan banget, dan stylist-nya benar-benar paham model yang aku mau. Aria itu jenius!',
    service: 'Balayage oleh Aria',
  },
  {
    name: 'Michelle T.', rating: 5,
    text: 'Tempatnya kayak potongan kecil Paris di Jakarta. Pulang dari sini rasanya kayak orang baru. Pasti bakal balik tiap bulan.',
    service: 'Hydrating Facial oleh Camille',
  },
  {
    name: 'Dimas R.', rating: 5,
    text: 'Marcus tahu persis bagaimana bikin cowok tampak rapi tanpa terasa berlebihan. Fade terbaik di kota ini.',
    service: 'Taper Fade oleh Marcus',
  },
  {
    name: 'Putri A.', rating: 5,
    text: 'Yuki mengubah kuku aku jadi karya seni beneran. Sampai sekarang masih banyak yang nanya bikinnya di mana.',
    service: '3D Nail Art oleh Yuki',
  },
];

export const INIT_TRANSACTIONS = [
  { id: 'TRX-100231', customerName: 'Larasati Putri', serviceName: 'Balayage', stylistName: 'Aria Chen', price: 750000, paymentMethod: 'gopay', date: '2026-06-04', time: 10, status: 'completed', serviceStatus: 'selesai' },
  { id: 'TRX-100232', customerName: 'Michelle Tanuwijaya', serviceName: 'Hydrating Facial', stylistName: 'Camille Dubois', price: 260000, paymentMethod: 'card', date: '2026-06-04', time: 13, status: 'completed', serviceStatus: 'selesai' },
  { id: 'TRX-100233', customerName: 'Dimas Restu', serviceName: 'Taper Fade', stylistName: 'Marcus Lee', price: 135000, paymentMethod: 'ovo', date: '2026-06-04', time: 15, status: 'completed', serviceStatus: 'selesai' },
  { id: 'TRX-100234', customerName: 'Putri Anindya', serviceName: '3D Nail Art', stylistName: 'Yuki Tanaka', price: 550000, paymentMethod: 'dana', date: '2026-06-05', time: 11, status: 'completed', serviceStatus: 'proses' },
  { id: 'TRX-100235', customerName: 'Aisha Pramudita', serviceName: 'Wedding Makeup', stylistName: 'Sophia Rinaldi', price: 1200000, paymentMethod: 'transfer', date: '2026-06-05', time: 9, status: 'completed', serviceStatus: 'proses' },
  { id: 'TRX-100236', customerName: 'Bella Christine', serviceName: 'Full Color', stylistName: 'Aria Chen', price: 650000, paymentMethod: 'card', date: '2026-06-05', time: 14, status: 'pending', serviceStatus: 'belum' },
  { id: 'TRX-100237', customerName: 'Nadia Sari', serviceName: 'Korean Styling', stylistName: 'Isabella Reyes', price: 250000, paymentMethod: 'gopay', date: '2026-06-05', time: 16, status: 'completed', serviceStatus: 'belum' },
];

export const INIT_ARTICLES = [
  {
    id: 1, title: 'Ritual Slow Beauty',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    excerpt: 'Mengapa terburu-buru saat merawat diri justru menggagalkan tujuannya — dan bagaimana cara menikmati waktu di kursi salon.',
    author: 'Aria Chen', date: '2026-05-28', tag: 'Wellness',
    body: `Ada revolusi kecil yang tengah berlangsung di dunia kecantikan, dan ini tidak ada kaitannya dengan produk ajaib terbaru. Revolusi itu adalah kembalinya kita pada kelambatan.\n\nSaat kamu duduk di kursi kami, yang pertama kami tanyakan bukan apa yang ingin dilakukan, melainkan bagaimana kabarmu minggu ini. Kecantikan, pada wujud terbaiknya, adalah sebuah percakapan. Potong rambut bukanlah transaksi; ia adalah empat puluh lima menit ketika dunia di luar pintu diizinkan untuk menunggu.\n\nKami menyarankan setiap tamu datang sepuluh menit lebih awal — bukan untuk urusan administrasi, melainkan untuk jeda. Nikmati tehnya. Amati cahaya yang bergerak di ruangan. Biarkan bahumu rileks. Hasilnya selalu lebih baik ketika tubuh tenang, dan ritual itu sendiri adalah separuh alasan kamu datang.\n\nSlow beauty juga lebih ramah untuk rambut dan kulit. Perawatan menyerap lebih sempurna ketika diberi waktu. Warna rambut keluar lebih merata ketika tidak ada yang sibuk melihat jam. Pendekatan yang tidak tergesa-gesa bukanlah kemewahan — ia adalah teknik.`,
  },
  {
    id: 2, title: 'Memilih Warna Rambut yang Tetap Cantik Saat Tumbuh',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    excerpt: 'Colorist yang baik merencanakan untuk bulan ketiga, bukan hanya hari pertama. Ini yang perlu kamu tanyakan.',
    author: 'Aria Chen', date: '2026-05-15', tag: 'Hair Color',
    body: `Tanda dari colorist yang ahli bukanlah seberapa cantik warna rambutmu di hari kamu meninggalkan salon — melainkan seberapa cantik ia delapan minggu kemudian.\n\nBanyak orang memilih warna demi satu foto, lalu menghabiskan dua bulan menyembunyikan akar rambutnya. Colorist yang teliti bekerja selaras dengan warna alami rambutmu sehingga pertumbuhan baru berbaur, bukan bertentangan. Teknik balayage dan lived-in hadir justru untuk alasan ini: keduanya dirancang agar memudar seperti cahaya matahari, bukan seperti garis tajam yang patah.\n\nKetika memesan jadwal pewarnaan rambut, beri tahu stylist seberapa sering kamu realistis bisa kembali. Jika jujurnya jawabanmu "sejarang mungkin", kami akan mengarahkanmu pada dimensi dan kelembutan, bukan tampilan kontras tinggi yang menuntut perawatan rutin.\n\nWarna adalah hubungan jangka panjang dengan pantulan dirimu di cermin. Kami merencanakan semuanya, dari awal hingga akhir.`,
  },
  {
    id: 3, title: 'Merawat Kuku di Antara Kunjungan Salon',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    excerpt: 'Kebiasaan sederhana yang membuat manikurmu tetap terlihat segar lama setelah kamu meninggalkan studio.',
    author: 'Yuki Tanaka', date: '2026-04-30', tag: 'Nails',
    body: `Manikur yang indah adalah komitmen kecil setiap hari, dan ganjarannya adalah berminggu-minggu tampak rapi tanpa usaha berlebih.\n\nKebiasaan paling penting adalah minyak kutikula. Pakaikan setiap malam. Ia menjaga kuku tetap lentur, mencegah kuku terangkat di tepinya, dan memperpanjang umur gel atau cat kuku secara signifikan. Kebanyakan retakan dimulai dari tepi yang kering dan rapuh.\n\nSarung tangan adalah sahabat keduamu. Sabun cuci piring, semprotan pembersih, dan air panas adalah musuh diam-diam dari manikur yang masih segar. Sepasang sarung tangan karet murah akan menyelamatkan karya senimu jauh lebih baik daripada top coat manapun.\n\nTerakhir, tahan godaan untuk menggunakan kukumu sebagai alat. Kuku adalah perhiasan, bukan obeng. Perlakukan dengan lembut dan ia akan membalasmu.`,
  },
  {
    id: 4, title: 'Membangun Rutinitas Skincare yang Bertahan Lama',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    excerpt: 'Lupakan tren sepuluh langkah. Rutinitas terbaik adalah yang benar-benar kamu jalani.',
    author: 'Camille Dubois', date: '2026-04-12', tag: 'Skincare',
    body: `Industri skincare hidup dari kerumitan. Sementara kulitmu, sebaliknya, justru menyukai konsistensi.\n\nRutinitas yang sanggup kamu jalani bertahun-tahun akan selalu mengalahkan rangkaian rumit yang kamu tinggalkan setelah dua minggu. Mulailah dengan tiga hal saja: pembersih yang lembut, pelembap sesuai jenis kulitmu, dan tabir surya harian. Itu sudah rutinitas yang lengkap. Sisanya hanyalah penyempurnaan.\n\nKetika kamu menambah bahan aktif — retinoid, vitamin C, atau acid — tambahkan satu per satu, dan beri waktu enam minggu sebelum menilai hasilnya. Kulit berubah perlahan. Kesabaran adalah bahan paling diremehkan di setiap rak skincare.\n\nDatanglah ke kami untuk konsultasi jika kamu masih ragu harus mulai dari mana. Kami lebih suka merekomendasikan tiga produk yang akan kamu cintai, daripada tiga puluh produk yang akan kamu lupakan.`,
  },
  {
    id: 5, title: 'Persiapan Sebelum Hair Trial Pernikahan',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
    excerpt: 'Sesi uji coba adalah tempat keputusan dirangkai. Datang dengan persiapan, pulang dengan keyakinan.',
    author: 'Sophia Rinaldi', date: '2026-03-22', tag: 'Bridal',
    body: `Hair trial untuk pernikahan bukan sekadar gladi resik yang harus dilewati — ia adalah sesi desain, dan semakin banyak yang kamu bawa, semakin sempurna hari pernikahanmu.\n\nDatanglah dengan rambut yang bersih dan kering, ditata seperti biasanya kamu memakai. Bawa juga veil, aksesori rambut, atau hiasan apa pun yang akan kamu kenakan. Foto sangat membantu: bawa gambar tampilan yang kamu suka, dan yang sama pentingnya, tampilan yang ingin kamu hindari. Mengetahui apa yang tidak diinginkan adalah separuh dari arahan kerjamu.\n\nKenakan atasan dengan garis leher serupa dengan gaunmu. Itu memengaruhi tampilan rambut lebih dari yang kamu bayangkan. Dan jadwalkan trial pada waktu yang sama dengan jam acara, kalau memungkinkan, agar kami bisa melihat bagaimana tatanannya bertahan dalam pencahayaan yang sama.\n\nPulanglah dari sesi trial dengan foto dari segala sudut. Di pagi hari pernikahanmu, keyakinan adalah kemewahan terbesar.`,
  },
];

export const INIT_USERS = [
  { id: 1, name: 'Studio Admin', email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Aisha Pramudita', email: 'user@gmail.com', password: 'user123', role: 'user' },
  { id: 3, name: 'Larasati Putri', email: 'lara@gmail.com', password: 'lara123', role: 'user' },
  { id: 4, name: 'Michelle Tanuwijaya', email: 'michelle@gmail.com', password: 'michelle123', role: 'user' },
];
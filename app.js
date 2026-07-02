// app.js: Sayfanın davranışı (veri, çizim, arama...).

// tools: Panelde gösterilecek araçların listesi (bir array).
// Array = köşeli parantez [ ] ile yazılan sıralı liste.
// İçindeki her araç bir object { } -> "isim: değer" çiftleriyle bilgi tutar.
const tools = [
  {
    name: "ChatGPT",
    category: "Metin",
    purpose: "Soru yanıtlama ve metin üretme için sohbet tabanlı yapay zeka.",
    owner: "OpenAI",
    note: "Genel amaçlı, başlangıç için popüler.",
  },
  {
    name: "Claude",
    category: "Metin",
    purpose: "Uzun metinlerde ve kod yazımında güçlü sohbet asistanı.",
    owner: "Anthropic",
    note: "Uzun belgelerle çalışmada iyi.",
  },
  {
    name: "Gemini",
    category: "Metin",
    purpose: "Google servisleriyle bütünleşik sohbet ve arama asistanı.",
    owner: "Google",
    note: "Google araçlarını kullananlar için pratik.",
  },
  {
    name: "Midjourney",
    category: "Görsel",
    purpose: "Yazdığın açıklamadan sanatsal görseller üreten araç.",
    owner: "Midjourney",
    note: "Görsel kalitesi yüksek.",
  },
  {
    name: "GitHub Copilot",
    category: "Kod",
    purpose: "Kod yazarken satır ve fonksiyon önerileri sunan asistan.",
    owner: "GitHub",
    note: "Editör içinde çalışır.",
  },
  {
    name: "Canva",
    category: "Tasarım",
    purpose: "Sürükle-bırak ile afiş, sunum ve sosyal medya tasarımı.",
    owner: "Canva",
    note: "Tasarım bilgisi gerektirmez.",
  },
];

// kartOlustur: TEK bir araç için hazır bir kart (<section>) elementi üretir.
// (renderTools'tan ayrıldı: "bir kartı nasıl kurarım" ayrı bir sorumluluk.)
function kartOlustur(arac) {
  const kart = document.createElement("section");
  kart.className = "kart"; // CSS'teki .kart stilini uygula.

  // Bu araç favori mi? Dolu (★) / boş (☆) yıldız ve ekstra class buna göre.
  const favori = favoriMi(arac.name);
  const yildiz = favori ? "★" : "☆";
  const aktifSinif = favori ? " aktif" : "";

  // Kartın içi: en üstte favori butonu, ardından araç bilgileri.
  kart.innerHTML = `
    <button class="favori-btn${aktifSinif}" data-isim="${arac.name}"
            title="Favori" aria-label="Favorilere ekle veya çıkar">
      ${yildiz}
    </button>
    <h2>${arac.name}</h2>
    <p><strong>Kategori:</strong> ${arac.category}</p>
    <p>${arac.purpose}</p>
    <p><strong>Geliştiren:</strong> ${arac.owner}</p>
    <p><em>${arac.note}</em></p>
  `;

  return kart; // hazır kartı geri ver
}

// renderTools: verilen araç listesini <main> içine kart olarak basar.
// Parametre boş bırakılırsa tüm "tools" çizilir.
function renderTools(gosterilecekAraclar = tools) {
  const kartKabi = document.querySelector("main");
  kartKabi.innerHTML = ""; // önce temizle (kartlar üst üste binmesin)

  // Her araç için bir kart üret ve kaba ekle.
  gosterilecekAraclar.forEach(function (arac) {
    kartKabi.appendChild(kartOlustur(arac));
  });
}

// --- FAVORİLER (localStorage) ---

// localStorage'da favorilerin saklandığı anahtarın adı.
const FAVORI_ANAHTARI = "favoriler";

// localStorage'dan favori isim listesini oku (kayıt yoksa boş dizi döndür).
function favorileriYukle() {
  const kayit = localStorage.getItem(FAVORI_ANAHTARI);
  // localStorage sadece METİN saklar; JSON.parse ile diziye geri çeviriyoruz.
  return kayit ? JSON.parse(kayit) : [];
}

// Favori listesini metne (JSON) çevirip localStorage'a kaydet.
function favorileriKaydet(liste) {
  localStorage.setItem(FAVORI_ANAHTARI, JSON.stringify(liste));
}

// Verilen araç adı favori listesinde var mı? (true / false)
function favoriMi(isim) {
  return favorileriYukle().includes(isim);
}

// Favori durumunu tersine çevir: listede varsa çıkar, yoksa ekle; sonra kaydet.
function favoriDegistir(isim) {
  let favoriler = favorileriYukle();
  if (favoriler.includes(isim)) {
    favoriler = favoriler.filter((ad) => ad !== isim); // çıkar
  } else {
    favoriler.push(isim); // ekle
  }
  favorileriKaydet(favoriler);
}

// Yıldız tıklamasını TEK dinleyiciyle yakala (olay delegasyonu).
// Kartlar her çizimde yeniden oluştuğu için her yıldıza ayrı dinleyici bağlamak
// yerine üst kap <main>'i dinliyoruz; tıklanan yıldızı data-isim'den buluruz.
document.querySelector("main").addEventListener("click", function (olay) {
  const favoriButonu = olay.target.closest(".favori-btn");
  if (!favoriButonu) return; // tıklanan şey yıldız değilse görmezden gel
  favoriDegistir(favoriButonu.dataset.isim); // durumu değiştir + kaydet
  applyFilters(); // listeyi yeniden çiz ki yıldız dolu/boş güncellensin
});

// Sayfa açılınca kartları çiz (favori durumları da otomatik yansır).
renderTools();

// --- ARAMA / FİLTRELEME ---

// 1) Arama kutusunu DOM'dan bul (index.html'deki id="arama").
const aramaKutusu = document.querySelector("#arama");


// 2) Kategori kutusunu da DOM'dan bul (index.html'deki id="kategori").
const kategoriKutusu = document.querySelector("#kategori");

// 3) Kategori seçeneklerini veriden üret (elle yazıp tekrar etmeyelim).
function kategorileriDoldur() {
  // Set, tekrar eden kategorileri otomatik eler -> benzersiz liste.
  const kategoriler = [...new Set(tools.map((tool) => tool.category))];

  // İlk seçenek "Tümü" (value="all"), ardından her kategori bir <option>.
  let secenekler = '<option value="all">Tüm kategoriler</option>';
  kategoriler.forEach(function (kategori) {
    secenekler += `<option value="${kategori}">${kategori}</option>`;
  });
  kategoriKutusu.innerHTML = secenekler;
}

// aracFiltreyeUyuyor: bir araç, hem arama metnine HEM seçili kategoriye uyuyor mu?
// (applyFilters'tan ayrıldı: "eşleşme kuralı" kendini anlatan ayrı bir parça.)
function aracFiltreyeUyuyor(arac, aramaMetni, secilenKategori) {
  // İsim + kategori + açıklamayı tek metinde arıyoruz.
  // Böylece "tasarım" yazınca Canva'yı kategorisinden de bulabiliriz.
  const aranabilirMetin = (
    arac.name + " " + arac.category + " " + arac.purpose
  ).toLowerCase();

  const metinUyuyor = aranabilirMetin.includes(aramaMetni);
  const kategoriUyuyor =
    secilenKategori === "all" || arac.category === secilenKategori;
  return metinUyuyor && kategoriUyuyor; // ikisi de doğru olmalı (&&)
}

// applyFilters: kullanıcının girdilerini okur, listeyi süzer ve çizer.
function applyFilters() {
  const aramaMetni = aramaKutusu.value.toLowerCase();
  const secilenKategori = kategoriKutusu.value; // "all" ya da bir kategori adı

  const filtrelenmisAraclar = tools.filter(function (arac) {
    return aracFiltreyeUyuyor(arac, aramaMetni, secilenKategori);
  });

  renderTools(filtrelenmisAraclar);
}

// 5) Kategorileri doldur, sonra iki olayı da aynı fonksiyona bağla.
kategorileriDoldur();
aramaKutusu.addEventListener("input", applyFilters); // her harf değişiminde
kategoriKutusu.addEventListener("change", applyFilters); // seçim değişince

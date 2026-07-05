// app.js: Sayfanın davranışı (veri, çizim, arama, favoriler, düzenle/sil, tema).

// VARSAYILAN_ARACLAR: ilk açılışta kullanılacak hazır liste.
// Kullanıcı silme/düzenleme yaparsa çalışan liste localStorage'da tutulur.
const VARSAYILAN_ARACLAR = [
  {
    name: "ChatGPT",
    category: "Metin",
    purpose: "Soru yanıtlama ve metin üretme için sohbet tabanlı yapay zeka.",
    owner: "OpenAI",
    note: "Genel amaçlı, başlangıç için popüler.",
    url: "https://chat.openai.com",
  },
  {
    name: "Claude",
    category: "Metin",
    purpose: "Uzun metinlerde ve kod yazımında güçlü sohbet asistanı.",
    owner: "Anthropic",
    note: "Uzun belgelerle çalışmada iyi.",
    url: "https://claude.ai",
  },
  {
    name: "Gemini",
    category: "Metin",
    purpose: "Google servisleriyle bütünleşik sohbet ve arama asistanı.",
    owner: "Google",
    note: "Google araçlarını kullananlar için pratik.",
    url: "https://gemini.google.com",
  },
  {
    name: "Midjourney",
    category: "Görsel",
    purpose: "Yazdığın açıklamadan sanatsal görseller üreten araç.",
    owner: "Midjourney",
    note: "Görsel kalitesi yüksek.",
    url: "https://www.midjourney.com",
  },
  {
    name: "GitHub Copilot",
    category: "Kod",
    purpose: "Kod yazarken satır ve fonksiyon önerileri sunan asistan.",
    owner: "GitHub",
    note: "Editör içinde çalışır.",
    url: "https://github.com/features/copilot",
  },
  {
    name: "Canva",
    category: "Tasarım",
    purpose: "Sürükle-bırak ile afiş, sunum ve sosyal medya tasarımı.",
    owner: "Canva",
    note: "Tasarım bilgisi gerektirmez.",
    url: "https://www.canva.com",
  },
  {
    name: "Adobe Firefly",
    category: "Görsel",
    purpose: "Metin komutlarından görsel ve tasarım öğeleri üreten yapay zeka.",
    owner: "Adobe",
    note: "Adobe uygulamalarıyla entegre çalışır.",
    url: "https://firefly.adobe.com",
  },
  {
    name: "Leonardo.ai",
    category: "Görsel",
    purpose: "Oyun ve konsept sanatı için görsel üreten araç.",
    owner: "Leonardo.ai",
    note: "Ücretsiz kredilerle başlanabilir.",
    url: "https://leonardo.ai",
  },
  {
    name: "ElevenLabs",
    category: "Ses/Müzik",
    purpose: "Gerçekçi yapay ses ve seslendirme üreten araç.",
    owner: "ElevenLabs",
    note: "Çok dilli seslendirme desteği.",
    url: "https://elevenlabs.io",
  },
  {
    name: "Suno",
    category: "Ses/Müzik",
    purpose: "Metinden şarkı ve müzik üreten yapay zeka.",
    owner: "Suno",
    note: "Sözlü şarkı bile oluşturabilir.",
    url: "https://suno.com",
  },
  {
    name: "Runway",
    category: "Video",
    purpose: "Metin ve görselden video üreten/düzenleyen araç.",
    owner: "Runway",
    note: "Video düzenlemede güçlü.",
    url: "https://runwayml.com",
  },
  {
    name: "Pika",
    category: "Video",
    purpose: "Kısa videolar üreten ve görselleri canlandıran yapay zeka.",
    owner: "Pika Labs",
    note: "Hızlı klip üretimi.",
    url: "https://pika.art",
  },
  {
    name: "Notion AI",
    category: "Verimlilik",
    purpose: "Notlar ve belgeler için yazma/özetleme asistanı.",
    owner: "Notion",
    note: "Notion içine gömülü çalışır.",
    url: "https://www.notion.so/product/ai",
  },
  {
    name: "Otter.ai",
    category: "Verimlilik",
    purpose: "Toplantıları otomatik yazıya döken ve özetleyen araç.",
    owner: "Otter.ai",
    note: "Canlı transkripsiyon yapar.",
    url: "https://otter.ai",
  },
  {
    name: "Perplexity",
    category: "Araştırma",
    purpose: "Kaynak gösteren yapay zeka tabanlı arama asistanı.",
    owner: "Perplexity AI",
    note: "Cevapları kaynaklarıyla verir.",
    url: "https://www.perplexity.ai",
  },
  {
    name: "NotebookLM",
    category: "Araştırma",
    purpose: "Yüklediğin belgelerden özet ve yanıt üreten araştırma aracı.",
    owner: "Google",
    note: "Sadece verdiğin kaynaklara dayanır.",
    url: "https://notebooklm.google.com",
  },
  {
    name: "Cursor",
    category: "Kod",
    purpose: "Yapay zeka destekli kod editörü.",
    owner: "Anysphere",
    note: "Kod tabanınla sohbet edebilirsin.",
    url: "https://cursor.com",
  },
  {
    name: "Replit",
    category: "Kod",
    purpose: "Tarayıcıda kod yazma ortamı ve yapay zeka asistanı.",
    owner: "Replit",
    note: "Kurulum gerektirmez.",
    url: "https://replit.com",
  },
];

// --- ARAÇ VERİSİNİN KALICILIĞI (localStorage) ---

// Projeye özel önek: aynı origin'deki diğer anahtarlarla çakışmayı önler.
const ARAC_ANAHTARI = "ai-araclari-paneli:araclar";

// Kayıtlı listeyi oku; yoksa/bozuksa varsayılan listenin KOPYASINI ver.
function araclariYukle() {
  try {
    const kayit = localStorage.getItem(ARAC_ANAHTARI);
    if (!kayit) return VARSAYILAN_ARACLAR.map((a) => ({ ...a }));
    const liste = JSON.parse(kayit);
    if (!Array.isArray(liste)) return VARSAYILAN_ARACLAR.map((a) => ({ ...a }));

    // Geriye dönük uyum: url'siz kayıtlara adı eşleşen varsayılandan url ekle.
    const kayitli = liste.map((arac) => {
      if (arac.url) return arac;
      const varsayilan = VARSAYILAN_ARACLAR.find((v) => v.name === arac.name);
      return varsayilan ? { ...arac, url: varsayilan.url } : arac;
    });

    // BİRLEŞTİRME:
    // - kayitli = kullanıcının mevcut aktif listesi (düzenleme + eklemeler dahil).
    // - Silinen adları hariç tut ki tekrar çıkmasınlar.
    // - Kayıtlıda OLMAYAN ve silinmemiş sabit araçları ekle
    //   (koda yeni eklenen varsayılanlar da böylece otomatik görünür).
    const kayitliAdlar = new Set(kayitli.map((a) => a.name));
    const silinenAdlar = new Set(silinenAraclar.map((a) => a.name));
    const eksikSabitler = VARSAYILAN_ARACLAR.filter(
      (v) => !kayitliAdlar.has(v.name) && !silinenAdlar.has(v.name)
    ).map((v) => ({ ...v }));

    return [...kayitli, ...eksikSabitler];
  } catch (hata) {
    console.warn("Araçlar okunamadı, varsayılan liste kullanılıyor:", hata);
    return VARSAYILAN_ARACLAR.map((a) => ({ ...a }));
  }
}

// Çalışan araç listesini localStorage'a kaydet.
function araclariKaydet() {
  try {
    localStorage.setItem(ARAC_ANAHTARI, JSON.stringify(tools));
  } catch (hata) {
    console.warn("Araçlar kaydedilemedi:", hata);
  }
}

// --- SİLİNEN ARAÇLAR (çöp kutusu) kalıcılığı ---
const SILINEN_ANAHTARI = "ai-araclari-paneli:silinenler";

// Silinen araç NESNELERİNİN listesini oku (bozuk/kapalıysa boş liste).
function silinenleriYukle() {
  try {
    const kayit = localStorage.getItem(SILINEN_ANAHTARI);
    if (!kayit) return [];
    const liste = JSON.parse(kayit);
    return Array.isArray(liste) ? liste : [];
  } catch (hata) {
    console.warn("Silinenler okunamadı, boş liste kullanılıyor:", hata);
    return [];
  }
}

// Silinenler listesini localStorage'a kaydet.
function silinenleriKaydet() {
  try {
    localStorage.setItem(SILINEN_ANAHTARI, JSON.stringify(silinenAraclar));
  } catch (hata) {
    console.warn("Silinenler kaydedilemedi:", hata);
  }
}

// silinenAraclar'ı ÖNCE yükle: araclariYukle() birleştirme yaparken
// "bu araç silinmiş mi?" kontrolü için bu listeye ihtiyaç duyar.
let silinenAraclar = silinenleriYukle();
// tools: sabit varsayılanlar + kullanıcının eklemeleri birleştirilerek yüklenir.
let tools = araclariYukle();
let duzenlenenArac = null;

// guvenliMetin: HTML özel karakterlerini kaçırır. Kullanıcı artık araç
// bilgilerini düzenleyebildiği için bu, XSS ve bozuk nitelik riskini kapatır.
function guvenliMetin(deger) {
  return String(deger)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// duzenlemeFormuHTML: bir aracı düzenlemek için kart içi form üretir.
function duzenlemeFormuHTML(arac) {
  const ad = guvenliMetin(arac.name);
  return `
    <div class="duzenle-form">
      <label>İsim
        <input class="duzenle-alan" data-alan="name" value="${guvenliMetin(arac.name)}" />
      </label>
      <label>Kategori
        <input class="duzenle-alan" data-alan="category" value="${guvenliMetin(arac.category)}" />
      </label>
      <label>Açıklama
        <input class="duzenle-alan" data-alan="purpose" value="${guvenliMetin(arac.purpose)}" />
      </label>
      <label>Geliştiren
        <input class="duzenle-alan" data-alan="owner" value="${guvenliMetin(arac.owner)}" />
      </label>
      <label>Not
        <input class="duzenle-alan" data-alan="note" value="${guvenliMetin(arac.note)}" />
      </label>
      <label>Site adresi (URL)
        <input class="duzenle-alan" data-alan="url" value="${guvenliMetin(arac.url || "")}" />
      </label>
      <div class="duzenle-aksiyonlar">
        <button class="kaydet-btn" data-isim="${ad}">💾 Kaydet</button>
        <button class="iptal-btn">İptal</button>
      </div>
    </div>
  `;
}

// kartOlustur: bir araç için kart üretir. Düzenleniyorsa form, değilse görünüm.
function kartOlustur(arac) {
  const kart = document.createElement("section");
  kart.className = "kart";

  // Bu araç düzenleniyorsa, bilgiler yerine düzenleme formunu göster.
  if (arac.name === duzenlenenArac) {
    kart.innerHTML = duzenlemeFormuHTML(arac);
    return kart;
  }

  const favori = favoriMi(arac.name);
  const yildiz = favori ? "★" : "☆";
  const aktifSinif = favori ? " aktif" : "";
  const ad = guvenliMetin(arac.name);

  // url varsa "Siteye Git" bağlantısı üret; yoksa boş (kullanıcı eklediği araçta olmayabilir).
  // <a target="_blank"> yeni sekmede açar; rel="noopener noreferrer" güvenlik içindir.
  const siteBaglantisi = arac.url
    ? `<a class="site-btn" href="${guvenliMetin(arac.url)}"
          target="_blank" rel="noopener noreferrer">🔗 Siteye Git</a>`
    : "";

  kart.innerHTML = `
    <button class="favori-btn${aktifSinif}" data-isim="${ad}"
            title="Favori" aria-label="Favorilere ekle veya çıkar">${yildiz}</button>
    <h2>${ad}</h2>
    <p><strong>Kategori:</strong> ${guvenliMetin(arac.category)}</p>
    <p>${guvenliMetin(arac.purpose)}</p>
    <p><strong>Geliştiren:</strong> ${guvenliMetin(arac.owner)}</p>
    <p><em>${guvenliMetin(arac.note)}</em></p>
    <div class="kart-aksiyonlar">
      ${siteBaglantisi}
      <button class="duzenle-btn" data-isim="${ad}">✏️ Düzenle</button>
      <button class="sil-btn" data-isim="${ad}">🗑 Sil</button>
    </div>
  `;
  return kart;
}

// renderTools: verilen araç listesini <main> içine kart olarak basar.
function renderTools(gosterilecekAraclar = tools) {
  renderOzet(); // özet kutularını her çizimde güncel tut

  const kartKabi = document.querySelector("main");
  kartKabi.innerHTML = ""; // önce temizle (kartlar üst üste binmesin)

  // Liste boşsa (arama/filtre hiçbir şey bulamadıysa) bilgi mesajı göster ve çık.
  if (gosterilecekAraclar.length === 0) {
    kartKabi.innerHTML = '<p class="bos-sonuc">Araç bulunamadı.</p>';
    return;
  }

  gosterilecekAraclar.forEach(function (arac) {
    kartKabi.appendChild(kartOlustur(arac));
  });
}

// renderOzet: üstteki özet kutularını günceller.
// Toplam = aktif araç sayısı (silinenler ayrı listede olduğu için hariç).
// Favori = aktif araçlar içinde yıldızlı olanların sayısı.
function renderOzet() {
  const toplam = tools.length;
  const favoriSayisi = tools.filter((arac) => favoriMi(arac.name)).length;
  document.querySelector("#ozet-toplam").textContent = toplam;
  document.querySelector("#ozet-favori").textContent = favoriSayisi;
}

// --- FAVORİLER (localStorage) ---

const FAVORI_ANAHTARI = "favoriler";

// Favori isim listesini oku; localStorage kapalı/bozuksa boş listeye dön.
function favorileriYukle() {
  try {
    const kayit = localStorage.getItem(FAVORI_ANAHTARI);
    if (!kayit) return [];
    const liste = JSON.parse(kayit);
    return Array.isArray(liste) ? liste : [];
  } catch (hata) {
    console.warn("Favoriler okunamadı, boş liste kullanılıyor:", hata);
    return [];
  }
}

function favorileriKaydet(liste) {
  localStorage.setItem(FAVORI_ANAHTARI, JSON.stringify(liste));
}

function favoriMi(isim) {
  return favorileriYukle().includes(isim);
}

// Favori durumunu tersine çevir: listede varsa çıkar, yoksa ekle; sonra kaydet.
function favoriDegistir(isim) {
  let favoriler = favorileriYukle();
  if (favoriler.includes(isim)) {
    favoriler = favoriler.filter((ad) => ad !== isim);
  } else {
    favoriler.push(isim);
  }
  favorileriKaydet(favoriler);
}

// favoriYenidenAdlandir: araç yeniden adlandırılınca favori kaydını da güncelle.
// (İsim = kimlik olduğu için, eski ad favorideyse yeni ada taşınmalı.)
function favoriYenidenAdlandir(eskiAd, yeniAd) {
  const favoriler = favorileriYukle();
  if (!favoriler.includes(eskiAd)) return;
  const guncel = favoriler.filter((ad) => ad !== eskiAd);
  if (!guncel.includes(yeniAd)) guncel.push(yeniAd);
  favorileriKaydet(guncel);
}

// --- SİL / DÜZENLE ---

// aracSil: onay al, aracı ÇÖP KUTUSUNA taşı, favoriden temizle, kaydet, çiz.
function aracSil(isim) {
  if (!confirm(`"${isim}" aracını silmek istediğine emin misin?`)) return;
  const arac = tools.find((a) => a.name === isim);
  if (!arac) return;

  tools = tools.filter((a) => a.name !== isim); // aktif listeden çıkar
  silinenAraclar.push(arac); // çöp kutusuna ekle (tüm alanlarıyla)
  if (favoriMi(isim)) favoriDegistir(isim); // hayalet favoriyi önle

  araclariKaydet();
  silinenleriKaydet();
  kategorileriDoldur();
  renderSilinenler(); // çöp menüsünü güncelle
  applyFilters();
}

// aracGeriYukle: çöp kutusundaki bir aracı ana panele geri getir.
function aracGeriYukle(isim) {
  const arac = silinenAraclar.find((a) => a.name === isim);
  if (!arac) return;

  // İsim = kimlik. Aynı adlı aktif araç varsa çakışmayı önle.
  if (tools.some((a) => a.name === isim)) {
    alert(`"${isim}" adlı bir araç zaten listede. Geri yüklenemedi.`);
    return;
  }

  silinenAraclar = silinenAraclar.filter((a) => a.name !== isim); // çöpten çıkar
  tools.push(arac); // aktif listeye geri ekle

  araclariKaydet();
  silinenleriKaydet();
  kategorileriDoldur();
  renderSilinenler();
  applyFilters();
}

// duzenlemeyeBasla: ilgili kartı form moduna al.
function duzenlemeyeBasla(isim) {
  duzenlenenArac = isim;
  applyFilters();
}

// duzenlemeyiIptalEt: form modundan çık, değişiklikleri kaydetmeden.
function duzenlemeyiIptalEt() {
  duzenlenenArac = null;
  applyFilters();
}

// duzenlemeyiKaydet: formdaki değerleri oku, aracı güncelle, kaydet, çiz.
function duzenlemeyiKaydet(eskiIsim, kartEl) {
  const arac = tools.find((a) => a.name === eskiIsim);
  if (!arac) {
    duzenlenenArac = null;
    applyFilters();
    return;
  }

  // Formdaki tüm alanları data-alan adına göre topla.
  const alanlar = {};
  kartEl.querySelectorAll(".duzenle-alan").forEach(function (girdi) {
    alanlar[girdi.dataset.alan] = girdi.value.trim();
  });

  if (!alanlar.name) {
    alert("İsim boş olamaz.");
    return; // form modunda kal
  }

  // İsim değiştiyse favori kaydını da taşı (çakışmayı önle).
  if (eskiIsim !== alanlar.name) {
    favoriYenidenAdlandir(eskiIsim, alanlar.name);
  }

  arac.name = alanlar.name;
  arac.category = alanlar.category;
  arac.purpose = alanlar.purpose;
  arac.owner = alanlar.owner;
  arac.note = alanlar.note;
  arac.url = urlDuzenle(alanlar.url || ""); // boşsa "" -> kartta buton çıkmaz

  duzenlenenArac = null;
  araclariKaydet();
  kategorileriDoldur(); // kategori değişmiş olabilir
  applyFilters();
}

// --- KART TIKLAMALARI (olay delegasyonu) ---
// Tek dinleyici; tıklanan butonu sınıfından ayırt eder.
document.querySelector("main").addEventListener("click", function (olay) {
  const hedef = olay.target;
  const kart = hedef.closest(".kart");

  const favoriButonu = hedef.closest(".favori-btn");
  if (favoriButonu) {
    favoriDegistir(favoriButonu.dataset.isim);
    applyFilters();
    return;
  }

  const duzenleButonu = hedef.closest(".duzenle-btn");
  if (duzenleButonu) {
    duzenlemeyeBasla(duzenleButonu.dataset.isim);
    return;
  }

  const silButonu = hedef.closest(".sil-btn");
  if (silButonu) {
    aracSil(silButonu.dataset.isim);
    return;
  }

  const kaydetButonu = hedef.closest(".kaydet-btn");
  if (kaydetButonu) {
    duzenlemeyiKaydet(kaydetButonu.dataset.isim, kart);
    return;
  }

  const iptalButonu = hedef.closest(".iptal-btn");
  if (iptalButonu) {
    duzenlemeyiIptalEt();
    return;
  }
});

// Sayfa açılınca kartları çiz.
renderTools();

// --- ARAMA / FİLTRELEME ---

const aramaKutusu = document.querySelector("#arama");
const kategoriKutusu = document.querySelector("#kategori");

// Kategori seçeneklerini veriden üret; mevcut seçimi mümkünse koru.
function kategorileriDoldur() {
  const oncekiSecim = kategoriKutusu.value; // seçili kategoriyi hatırla
  const kategoriler = [...new Set(tools.map((tool) => tool.category))];

  let secenekler = '<option value="all">Tüm kategoriler</option>';
  kategoriler.forEach(function (kategori) {
    secenekler += `<option value="${guvenliMetin(kategori)}">${guvenliMetin(
      kategori
    )}</option>`;
  });
  kategoriKutusu.innerHTML = secenekler;

  // Önceki seçim hâlâ mevcutsa geri yükle (silme/düzenleme sonrası kaymasın).
  const halaVar = [...kategoriKutusu.options].some((o) => o.value === oncekiSecim);
  if (halaVar) kategoriKutusu.value = oncekiSecim;
}

// aracFiltreyeUyuyor: araç hem arama metnine HEM seçili kategoriye uyuyor mu?
function aracFiltreyeUyuyor(arac, aramaMetni, secilenKategori) {
  const aranabilirMetin = (
    arac.name + " " + arac.category + " " + arac.purpose
  ).toLowerCase();

  const metinUyuyor = aranabilirMetin.includes(aramaMetni);
  const kategoriUyuyor =
    secilenKategori === "all" || arac.category === secilenKategori;
  return metinUyuyor && kategoriUyuyor;
}

// applyFilters: kullanıcının girdilerini okur, listeyi süzer ve çizer.
function applyFilters() {
  const aramaMetni = aramaKutusu.value.toLowerCase();
  const secilenKategori = kategoriKutusu.value;

  const filtrelenmisAraclar = tools.filter(function (arac) {
    return aracFiltreyeUyuyor(arac, aramaMetni, secilenKategori);
  });

  renderTools(filtrelenmisAraclar);
}

kategorileriDoldur();
aramaKutusu.addEventListener("input", applyFilters);
kategoriKutusu.addEventListener("change", applyFilters);

// --- TEMA (açık / koyu) ---

const TEMA_ANAHTARI = "ai-araclari-paneli:tema";
const temaButonu = document.querySelector("#tema-btn");

function temayiUygula(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  temaButonu.textContent = tema === "dark" ? "☀️ Açık tema" : "🌙 Koyu tema";
}

function temayiDegistir() {
  const suanki = document.documentElement.getAttribute("data-theme");
  const yeni = suanki === "dark" ? "light" : "dark";
  temayiUygula(yeni);
  try {
    localStorage.setItem(TEMA_ANAHTARI, yeni);
  } catch (hata) {
    console.warn("Tema kaydedilemedi:", hata);
  }
}

function kayitliTemayiYukle() {
  let tema = "light";
  try {
    tema = localStorage.getItem(TEMA_ANAHTARI) || "light";
  } catch (hata) {
    console.warn("Tema okunamadı:", hata);
  }
  temayiUygula(tema);
}

kayitliTemayiYukle();
temaButonu.addEventListener("click", temayiDegistir);

// --- SİLİNEN ARAÇLAR MENÜSÜ (sağ üst) ---

const silinenButonu = document.querySelector("#silinen-btn");
const silinenListesi = document.querySelector("#silinen-liste");

// Butonun sayacını ve açılır listenin içeriğini güncelle.
function renderSilinenler() {
  silinenButonu.textContent = `🗑 Silinen Araçlar (${silinenAraclar.length})`;

  if (silinenAraclar.length === 0) {
    silinenListesi.innerHTML = '<p class="silinen-bos">Silinen araç yok.</p>';
    return;
  }

  // Her silinen araç için, tıklanınca geri yüklenecek bir buton.
  let html = "";
  silinenAraclar.forEach(function (arac) {
    const ad = guvenliMetin(arac.name);
    html += `<button class="silinen-oge" data-isim="${ad}">↩︎ ${ad}</button>`;
  });
  silinenListesi.innerHTML = html;
}

// Butona tıklayınca listeyi aç/kapa.
silinenButonu.addEventListener("click", function () {
  silinenListesi.classList.toggle("gizli");
});

// Listedeki bir araca tıklayınca geri yükle (olay delegasyonu).
silinenListesi.addEventListener("click", function (olay) {
  const oge = olay.target.closest(".silinen-oge");
  if (!oge) return;
  aracGeriYukle(oge.dataset.isim);
});

renderSilinenler(); // açılışta menüyü doğru sayı/liste ile çiz

// --- YENİ ARAÇ EKLEME FORMU ---

const ekleAcBtn = document.querySelector("#ekle-ac-btn");
const ekleForm = document.querySelector("#ekle-form");
const ekleIptalBtn = document.querySelector("#ekle-iptal-btn");
const ekleName = document.querySelector("#ekle-name");
const ekleCategory = document.querySelector("#ekle-category");
const eklePurpose = document.querySelector("#ekle-purpose");
const ekleOwner = document.querySelector("#ekle-owner");
const ekleNote = document.querySelector("#ekle-note");
const ekleUrl = document.querySelector("#ekle-url");

// urlDuzenle: kullanıcının girdiği adresi güvenli/temiz hale getirir.
// - Boşsa "" döner (kartta buton hiç çıkmaz).
// - Protokol yoksa başına https:// ekler (kullanıcı dostu).
// - Yalnızca http/https'e izin verir; "javascript:" gibi şemalar etkisizleşir.
function urlDuzenle(ham) {
  const deger = ham.trim();
  if (!deger) return "";
  if (/^https?:\/\//i.test(deger)) return deger;
  return "https://" + deger.replace(/^\/+/, "");
}

// Aç/kapa: butona basınca form görünür/gizlenir.
ekleAcBtn.addEventListener("click", function () {
  ekleForm.classList.toggle("gizli");
});

// İptal: formu temizle ve gizle.
ekleIptalBtn.addEventListener("click", function () {
  ekleForm.reset();
  ekleForm.classList.add("gizli");
});

// Form gönderilince (Ekle butonu veya Enter) yeni aracı ekle.
ekleForm.addEventListener("submit", function (olay) {
  olay.preventDefault(); // sayfanın yenilenmesini engelle

  const yeniArac = {
    name: ekleName.value.trim(),
    category: ekleCategory.value.trim() || "Diğer", // boşsa "Diğer"
    purpose: eklePurpose.value.trim(),
    owner: ekleOwner.value.trim(),
    note: ekleNote.value.trim(),
    url: urlDuzenle(ekleUrl.value), // boşsa "" -> kartta "Siteye Git" çıkmaz
  };

  // Ad zorunlu.
  if (!yeniArac.name) {
    alert("Ad alanı zorunludur.");
    return;
  }
  // İsim = kimlik: aynı adlı aktif araç olmamalı.
  if (tools.some((a) => a.name === yeniArac.name)) {
    alert(`"${yeniArac.name}" adlı bir araç zaten var.`);
    return;
  }

  tools.push(yeniArac);
  araclariKaydet();
  kategorileriDoldur(); // yeni kategori menüye yansısın
  ekleForm.reset();
  ekleForm.classList.add("gizli");
  applyFilters(); // listeyi yeniden çiz
});

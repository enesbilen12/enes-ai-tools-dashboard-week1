// app.js: Sayfanın davranışı (veri, çizim, arama, favoriler, düzenle/sil, tema).

// VARSAYILAN_ARACLAR: GÖMÜLÜ YEDEK liste.
// Normalde başlangıç verisi data.json'dan fetch ile gelir (bkz. baslat()).
// fetch başarısız olursa (örn. çift-tıkla file:// açılışı) bu liste devreye girer.
// `let`: fetch başarılıysa üzerine data.json'daki liste yazılır.
let VARSAYILAN_ARACLAR = [
  {
    name: "ChatGPT",
    category: "Metin",
    purpose: "Soru yanıtlama ve metin üretme için sohbet tabanlı yapay zeka.",
    owner: "OpenAI",
    note: "Genel amaçlı, başlangıç için popüler.",
    url: "https://chat.openai.com",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Claude",
    category: "Metin",
    purpose: "Uzun metinlerde ve kod yazımında güçlü sohbet asistanı.",
    owner: "Anthropic",
    note: "Uzun belgelerle çalışmada iyi.",
    url: "https://claude.ai",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Gemini",
    category: "Metin",
    purpose: "Google servisleriyle bütünleşik sohbet ve arama asistanı.",
    owner: "Google",
    note: "Google araçlarını kullananlar için pratik.",
    url: "https://gemini.google.com",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Midjourney",
    category: "Görsel",
    purpose: "Yazdığın açıklamadan sanatsal görseller üreten araç.",
    owner: "Midjourney",
    note: "Görsel kalitesi yüksek.",
    url: "https://www.midjourney.com",
    subscription: "Ücretli",
    status: "Aktif",
  },
  {
    name: "GitHub Copilot",
    category: "Kod",
    purpose: "Kod yazarken satır ve fonksiyon önerileri sunan asistan.",
    owner: "GitHub",
    note: "Editör içinde çalışır.",
    url: "https://github.com/features/copilot",
    subscription: "Ücretli",
    status: "Aktif",
  },
  {
    name: "Canva",
    category: "Tasarım",
    purpose: "Sürükle-bırak ile afiş, sunum ve sosyal medya tasarımı.",
    owner: "Canva",
    note: "Tasarım bilgisi gerektirmez.",
    url: "https://www.canva.com",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Adobe Firefly",
    category: "Görsel",
    purpose: "Metin komutlarından görsel ve tasarım öğeleri üreten yapay zeka.",
    owner: "Adobe",
    note: "Adobe uygulamalarıyla entegre çalışır.",
    url: "https://firefly.adobe.com",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Leonardo.ai",
    category: "Görsel",
    purpose: "Oyun ve konsept sanatı için görsel üreten araç.",
    owner: "Leonardo.ai",
    note: "Ücretsiz kredilerle başlanabilir.",
    url: "https://leonardo.ai",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "ElevenLabs",
    category: "Ses/Müzik",
    purpose: "Gerçekçi yapay ses ve seslendirme üreten araç.",
    owner: "ElevenLabs",
    note: "Çok dilli seslendirme desteği.",
    url: "https://elevenlabs.io",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Suno",
    category: "Ses/Müzik",
    purpose: "Metinden şarkı ve müzik üreten yapay zeka.",
    owner: "Suno",
    note: "Sözlü şarkı bile oluşturabilir.",
    url: "https://suno.com",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Runway",
    category: "Video",
    purpose: "Metin ve görselden video üreten/düzenleyen araç.",
    owner: "Runway",
    note: "Video düzenlemede güçlü.",
    url: "https://runwayml.com",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Pika",
    category: "Video",
    purpose: "Kısa videolar üreten ve görselleri canlandıran yapay zeka.",
    owner: "Pika Labs",
    note: "Hızlı klip üretimi.",
    url: "https://pika.art",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Notion AI",
    category: "Verimlilik",
    purpose: "Notlar ve belgeler için yazma/özetleme asistanı.",
    owner: "Notion",
    note: "Notion içine gömülü çalışır.",
    url: "https://www.notion.so/product/ai",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Otter.ai",
    category: "Verimlilik",
    purpose: "Toplantıları otomatik yazıya döken ve özetleyen araç.",
    owner: "Otter.ai",
    note: "Canlı transkripsiyon yapar.",
    url: "https://otter.ai",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Perplexity",
    category: "Araştırma",
    purpose: "Kaynak gösteren yapay zeka tabanlı arama asistanı.",
    owner: "Perplexity AI",
    note: "Cevapları kaynaklarıyla verir.",
    url: "https://www.perplexity.ai",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "NotebookLM",
    category: "Araştırma",
    purpose: "Yüklediğin belgelerden özet ve yanıt üreten araştırma aracı.",
    owner: "Google",
    note: "Sadece verdiğin kaynaklara dayanır.",
    url: "https://notebooklm.google.com",
    subscription: "Ücretsiz",
    status: "Aktif",
  },
  {
    name: "Cursor",
    category: "Kod",
    purpose: "Yapay zeka destekli kod editörü.",
    owner: "Anysphere",
    note: "Kod tabanınla sohbet edebilirsin.",
    url: "https://cursor.com",
    subscription: "Freemium",
    status: "Aktif",
  },
  {
    name: "Replit",
    category: "Kod",
    purpose: "Tarayıcıda kod yazma ortamı ve yapay zeka asistanı.",
    owner: "Replit",
    note: "Kurulum gerektirmez.",
    url: "https://replit.com",
    subscription: "Freemium",
    status: "Aktif",
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

    // Geriye dönük uyum: url veya subscription'ı olmayan kayıtlara,
    // adı eşleşen varsayılandan bu alanları ekle (kullanıcı verisi korunur).
    const kayitli = liste.map((arac) => {
      const varsayilan = VARSAYILAN_ARACLAR.find((v) => v.name === arac.name);
      const guncel = { ...arac };
      if (!guncel.url && varsayilan) guncel.url = varsayilan.url;
      if (!guncel.subscription && varsayilan) {
        guncel.subscription = varsayilan.subscription;
      }
      return guncel;
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
// tools: başlangıçta boş; asıl veri dosyanın sonundaki baslat() içinde
// (localStorage veya data.json'dan) yüklenir.
let tools = [];
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

// abonelikSecenekleriHTML: abonelik dropdown'ı için <option>'lar üretir.
// Mevcut değer "selected" olarak işaretlenir.
function abonelikSecenekleriHTML(secili) {
  return ["Ücretsiz", "Freemium", "Ücretli"]
    .map(
      (tip) =>
        `<option value="${tip}"${tip === secili ? " selected" : ""}>${tip}</option>`
    )
    .join("");
}

// durumSecenekleriHTML: durum dropdown'ı için <option>'lar üretir.
// abonelikSecenekleriHTML ile aynı mantık; liste Aktif/Deneme/Pasif.
function durumSecenekleriHTML(secili) {
  return ["Aktif", "Deneme", "Pasif"]
    .map(
      (durum) =>
        `<option value="${durum}"${durum === secili ? " selected" : ""}>${durum}</option>`
    )
    .join("");
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
      <label>Abonelik
        <select class="duzenle-alan" data-alan="subscription">
          ${abonelikSecenekleriHTML(arac.subscription)}
        </select>
      </label>
      <label>Durum
        <select class="duzenle-alan" data-alan="status">
          ${durumSecenekleriHTML(arac.status || "Aktif")}
        </select>
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

  // Abonelik tipi varsa küçük bir rozet göster (yoksa boş).
  const abonelikRozeti = arac.subscription
    ? `<span class="abonelik">${guvenliMetin(arac.subscription)}</span>`
    : "";

  // Durum rozeti: status yoksa "Aktif" varsayılır (eski kullanıcı araçları için).
  const durumRozeti = `<span class="abonelik">${guvenliMetin(arac.status || "Aktif")}</span>`;

  kart.innerHTML = `
    <button class="favori-btn${aktifSinif}" data-isim="${ad}"
            title="Favori" aria-label="Favorilere ekle veya çıkar">${yildiz}</button>
    <h2>${ad}</h2>
    ${abonelikRozeti}
    ${durumRozeti}
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
  arac.subscription = alanlar.subscription || "";
  arac.status = alanlar.status || "Aktif"; // status boşsa Aktif kabul et

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

// Not: ilk çizim, dosyanın sonundaki baslat() içinde (veri yüklendikten sonra) yapılır.

// --- ARAMA / FİLTRELEME ---

const aramaKutusu = document.querySelector("#arama");
const kategoriKutusu = document.querySelector("#kategori");
const durumKutusu = document.querySelector("#durum");
const sifirlaBtn = document.querySelector("#filtre-sifirla-btn");

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

// aracFiltreyeUyuyor: araç arama metnine, kategoriye VE duruma birden uyuyor mu?
function aracFiltreyeUyuyor(arac, aramaMetni, secilenKategori, secilenDurum) {
  const aranabilirMetin = (
    arac.name + " " + arac.category + " " + arac.purpose
  ).toLowerCase();

  const metinUyuyor = aranabilirMetin.includes(aramaMetni);
  const kategoriUyuyor =
    secilenKategori === "all" || arac.category === secilenKategori;
  // status alanı olmayan araçları "Aktif" kabul et.
  const aracDurumu = arac.status || "Aktif";
  const durumUyuyor = secilenDurum === "all" || aracDurumu === secilenDurum;
  return metinUyuyor && kategoriUyuyor && durumUyuyor;
}

// applyFilters: kullanıcının girdilerini okur, listeyi süzer ve çizer.
function applyFilters() {
  const aramaMetni = aramaKutusu.value.toLowerCase();
  const secilenKategori = kategoriKutusu.value;
  const secilenDurum = durumKutusu.value;

  const filtrelenmisAraclar = tools.filter(function (arac) {
    return aracFiltreyeUyuyor(arac, aramaMetni, secilenKategori, secilenDurum);
  });

  renderTools(filtrelenmisAraclar);
}

// Not: kategorileriDoldur() ilk kez baslat() içinde çağrılır (veri gelince).
aramaKutusu.addEventListener("input", applyFilters);
kategoriKutusu.addEventListener("change", applyFilters);
durumKutusu.addEventListener("change", applyFilters);

// Reset: üç filtreyi de varsayılana döndür, sonra listeyi yeniden çiz.
function filtreleriSifirla() {
  aramaKutusu.value = "";
  kategoriKutusu.value = "all";
  durumKutusu.value = "all";
  applyFilters();
}
sifirlaBtn.addEventListener("click", filtreleriSifirla);

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
const ekleSubscription = document.querySelector("#ekle-subscription");
const ekleDurum = document.querySelector("#ekle-durum");

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
    subscription: ekleSubscription.value, // dropdown -> her zaman bir değer var
    status: ekleDurum.value, // dropdown -> varsayılan "Aktif"
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

// --- BAŞLATMA ---

// Sayfa açılışında bir kez çalışır: veriyi hazırlar, sonra ekranı çizer.
async function baslat() {
  try {
    const yanit = await fetch("data.json");
    if (!yanit.ok) throw new Error(`data.json okunamadı (HTTP ${yanit.status})`);

    const veri = await yanit.json();
    // Boş/bozuk dosya gömülü yedeği ezmesin diye dolu dizi şartı arıyoruz.
    if (Array.isArray(veri) && veri.length > 0) {
      VARSAYILAN_ARACLAR = veri;
    }
  } catch (hata) {
    // Tipik sebep: dosyaya çift tıklayıp file:// ile açmak (tarayıcı engeller).
    // Sorun değil: gömülü VARSAYILAN_ARACLAR yedeği olduğu gibi kalır.
    console.warn("data.json alınamadı, gömülü liste kullanılıyor:", hata);
  }

  // Doğrudan atama yapmıyoruz: araclariYukle() varsayılanları localStorage'daki
  // kullanıcı verisiyle birleştirir ve silinenleri eler.
  tools = araclariYukle();
  kategorileriDoldur();
  applyFilters(); // ilk çizim
}

baslat();

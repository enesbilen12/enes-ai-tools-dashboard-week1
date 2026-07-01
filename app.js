// script.js: Sayfanın davranışı (veri, çizim, arama...).

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

// renderTools: verilen araç listesini <main> içine kart olarak basar.
// Parametre "liste": çizilecek araçlar. Boş bırakılırsa tüm "tools" çizilir.
function renderTools(liste = tools) {
  // 1) Kartların yazılacağı kabı DOM'dan bul (<main> etiketi).
  const container = document.querySelector("main");

  // 2) İçini temizle ki fonksiyon her çağrıldığında kartlar üst üste binmesin.
  container.innerHTML = "";

  // 3) Gelen listedeki her aracı tek tek gez. "tool" = o turdaki araç (object).
  liste.forEach(function (tool) {
    // 4) Bu araç için yeni bir kart kutusu (<section>) oluştur.
    const card = document.createElement("section");
    card.className = "kart"; // CSS'teki .kart stilini uygula.

    // 5) Kartın içini aracın bilgileriyle doldur.
    //    ${...} = o araca ait değeri metnin içine yerleştirir (template literal).
    card.innerHTML = `
      <h2>${tool.name}</h2>
      <p><strong>Kategori:</strong> ${tool.category}</p>
      <p>${tool.purpose}</p>
      <p><strong>Geliştiren:</strong> ${tool.owner}</p>
      <p><em>${tool.note}</em></p>
    `;

    // 6) Hazır kartı kabın (<main>) içine ekle.
    container.appendChild(card);
  });
}

// Fonksiyonu çağır ki sayfa açılınca kartlar hemen çizilsin.
// (Fonksiyonu yazmak çalıştırmaz; ayrıca çağırmak gerekir.)
// Parametre vermedik -> varsayılan olarak tüm "tools" çizilir.
renderTools();

// --- ARAMA / FİLTRELEME ---

// 1) Arama kutusunu DOM'dan bul (index.html'deki id="arama").
const aramaKutusu = document.querySelector("#arama");


// 2) Kutuyu dinle: içeriği her değiştiğinde ("input" olayı) çalış.
aramaKutusu.addEventListener("input", function () {
  // 3) Kullanıcının yazdığı metni al ve küçük harfe çevir
  //    (böylece "Chat" ile "chat" aynı sayılır).
  const metin = aramaKutusu.value.toLowerCase();

  // 4) tools içinden, adında bu metin geçen araçları süz (filter).
  //    includes -> "bu metni içeriyor mu?" true/false döner.
  const sonuclar = tools.filter(function (tool) {
    return tool.name.toLowerCase().includes(metin);
  });

  // 5) Sadece süzülen listeyi çiz. Kutu boşsa metin "" olur,
  //    her isim "" içerdiği için tüm araçlar geri gelir.
  renderTools(sonuclar);
});

# 🤖 AI Araçları Paneli

Yapay zeka araçlarını (ChatGPT, Claude, Gemini, Midjourney, GitHub Copilot,
Canva...) tek ekranda listeleyen basit bir web paneli. Kullanıcı araçları
kart olarak görür, arayabilir, kategoriye göre süzebilir ve beğendiklerini
favorilere ekleyebilir.

Saf **HTML + CSS + JavaScript** ile yazılmıştır; hiçbir kütüphane/paket
gerektirmez. Yazılım eğitimi 1. hafta projesi.

## 🔗 Canlı demo

**[https://enesbilen12.github.io/enes-ai-tools-dashboard-week1](https://enesbilen12.github.io/enes-ai-tools-dashboard-week1)**

## 📸 Ekran görüntüsü

![AI Araçları Paneli ekran görüntüsü](screenshot.png)

## ✨ Özellikler

- **Veriden kart üretimi** — Araçlar JavaScript'teki bir listeden okunur ve
  otomatik olarak kart halinde çizilir.
- **Arama** — İsim, kategori ve açıklama içinde canlı arama (yazdıkça süzülür).
- **Kategori filtresi** — Açılır menüden kategoriye göre filtreleme.
- **Favoriler** — Yıldıza tıklayarak favori ekle/çıkar; favoriler
  `localStorage`'da saklanır, sayfa yenilenince korunur.
- **Responsive tasarım** — Grid düzeni; masaüstünde yan yana, telefonda alt alta.
- **Erişilebilir arama kutusu** — Hover ve focus durumları için görsel geri bildirim.

## 🚀 Nasıl çalıştırılır?

Kurulum gerektirmez. İki yol var:

**1) Hızlı yol — çift tıklama**
1. `index.html` dosyasına çift tıkla; varsayılan tarayıcında açılır.

> ⚠️ **Uyarı:** Bu yöntemde sayfa `file://` adresinden açılır. Bazı tarayıcılar
> `file://` kökeninde `localStorage`'ı kısıtladığı için **favoriler
> kaydolmayabilir veya sayfa yenilenince kaybolabilir.** Favori özelliğini
> tam kullanmak için aşağıdaki Live Server yöntemini tercih et.

**2) Önerilen yol — Live Server (VS Code)**
1. VS Code'da **Live Server** eklentisini kur.
2. `index.html`'i aç → sağ alttaki **"Go Live"** butonuna tıkla.
3. Sayfa `http://127.0.0.1:5500/...` adresinden açılır.

> 💡 Live Server önerilir: sayfayı `file://` yerine `http://` üzerinden servis
> ettiği için tarayıcı güvenlik uyarıları çıkmaz, **favoriler güvenilir şekilde
> saklanır** ve dosyayı kaydettikçe sayfa otomatik yenilenir.

## 📂 Dosyalar

| Dosya | Görevi |
|-------|--------|
| `index.html` | Sayfanın iskeleti (yapı) |
| `style.css` | Görünüm (renk, grid, kartlar, hover/focus) |
| `app.js` | Davranış (veri, kart çizimi, arama, filtre, favoriler) |
| `README.md` | Bu tanıtım dosyası |

## ✅ Tamamlananlar

- [x] Temel iskeleti kur (HTML + CSS + JS)
- [x] Responsive grid düzeni
- [x] Araçları veriden kart olarak çiz
- [x] İsim + kategori + açıklama araması
- [x] Kategori filtresi
- [x] localStorage ile kalıcı favoriler

## 🔭 İleride (fikirler)

- [ ] "Sadece favorileri göster" filtresi
- [ ] Boş sonuç için "Araç bulunamadı" mesajı
- [ ] Her kartı aracın web sitesine götüren bağlantı
- [ ] Açık / koyu tema seçeneği

## 📄 Lisans

Bu proje **MIT Lisansı** ile açık kaynaktır; herkes özgürce kullanabilir,
kopyalayabilir ve değiştirebilir.

> ℹ️ Bu bir özet nottur. Tam yasal metin için proje köküne ayrıca bir
> `LICENSE` dosyası eklemen önerilir (MIT'in standart metni).

# Günlük Çalışma Kaydı (Daily Log)

Her gün ne yaptığımı kısaca not aldığım dosya. En yeni gün en üstte.

---

## Gün 5

- **Tarih:** 2026-07-20
- **Bugünkü hedef:** JSON export butonu eklemek.
- **İzlediğim / okuduğum kaynaklar:**
- **Yaptığım değişiklikler:** "JSON Dışa Aktar" butonu eklendi; tıklayınca
  mevcut araç listesi okunabilir JSON formatında (girintili) bir readonly
  textarea içinde gösteriliyor, tekrar tıklayınca kapanıyor. localStorage/
  silme/kaydetme fonksiyonlarına dokunulmadı (yalnız okuma).
- **Değişen dosyalar:** index.html, app.js
- **Claude Code'a verdiğim ana prompt:** "JSON export butonu eklemek...
  Butona tıklanınca mevcut araç listesi okunabilir JSON formatında gösterilsin
  (textarea veya pre alanında)... Sadece export özelliği eklensin."
- **Test ettiklerim:** butonun açılıp kapanması, JSON'un güncel listeyi
  yansıtması, yeni araç ekleyince JSON'un güncellenmesi.
- **Geçen testler:** Export butonu açılıp kapanıyor; JSON güncel listeyi
  yansıtıyor; yeni araç ekleyince JSON güncelleniyor.
- **Kalan sorunlar:**
- **Bugün öğrendiğim kavram:** JSON.stringify, readonly textarea, toggle
  görünüm.
- **Yarın yapacağım iş:** README güncelleme ve hafta sonu hazırlığı.
- **Commit mesajı:** feat: add JSON export button

---

## Gün 4

- **Tarih:** 2026-07-19
- **Bugünkü hedef:** Form validasyonunu güçlendirmek.
- **İzlediğim / okuduğum kaynaklar:**
- **Yaptığım değişiklikler:** validateForm() fonksiyonu eklendi;
  hatalariGoster() eklendi; alert() (ekleme formunda) kaldırılıp inline hata
  mesajlarıyla değiştirildi; URL için http:// / https:// protokol kontrolü
  eklendi; tekrar (aynı isim) kontrolü büyük/küçük harf duyarsız yapıldı.
- **Değişen dosyalar:** index.html, app.js
- **Claude Code'a verdiğim ana prompt:** "Mevcut araç ekleme formunun
  validasyonunu güçlendirmek... validateForm() adında ayrı bir fonksiyon yaz...
  Hata mesajları inline gösterilsin (alert() kullanma)."
- **Test ettiklerim:** boş form, hatalı URL (protokolsüz), aynı isim
  (büyük/küçük harf), geçerli kayıt, kısmi düzeltme.
- **Geçen testler:** boş form dört alanda hata veriyor; protokolsüz URL
  reddediliyor; aynı isim büyük/küçük harf fark etmeksizin yakalanıyor; geçerli
  kayıt ekleniyor ve ekranda görünüyor.
- **Kalan sorunlar:** İki alert() hâlâ kapsam dışı yerlerde duruyor (çöp kutusu
  geri yükleme, düzenleme formu boş isim); düzenleme formunda tekrar-isim
  kontrolü yok.
- **Bugün öğrendiğim kavram:** form validation, regex (URL kontrolü), inline
  hata mesajları.
- **Yarın yapacağım iş:** localStorage ve JSON export.
- **Commit mesajı:** feat: add form validation with inline errors and
  case-insensitive duplicate check

---

## Gün 3

- **Tarih:** 2026-07-18
- **Bugünkü hedef:** Status filtresi (Aktif / Deneme / Pasif) ve reset butonu
  eklemek.
- **İzlediğim / okuduğum kaynaklar:**
- **Yaptığım değişiklikler:** index.html'e durum menüsü ve "Filtreleri Temizle"
  butonu eklendi; app.js'e status filtreleme mantığı eklendi (status alanı
  olmayan araç "Aktif" kabul edilir; üç filtre AND mantığıyla birlikte çalışır).
- **Değişen dosyalar:** index.html, app.js
- **Claude Code'a verdiğim ana prompt:** "Mevcut arama ve kategori filtresine ek
  olarak status filtresi eklemek (Aktif / Deneme / Pasif)... Reset butonu tüm
  filtreleri temizlesin."
- **Test ettiklerim:** Durum filtresi (Aktif / Deneme / Pasif), üç filtrenin
  birlikte çalışması, reset butonu.
- **Geçen testler:** Aktif filtresi tüm araçları gösteriyor; Deneme/Pasif boş
  liste gösteriyor (henüz status atanmış araç yok); reset butonu tüm filtreleri
  temizliyor.
- **Kalan sorunlar:**
- **Bugün öğrendiğim kavram:** event listener, DOM manipülasyonu, AND mantığıyla
  filtre.
- **Yarın yapacağım iş:** Inline form validation eklemek.
- **Commit mesajı:** feat: add status filter and reset button

---

## Gün 2

- **Tarih:** 2026-07-17
- **Bugünkü hedef:** data.json oluşturma ve fetch ile veri yükleme.
- **İzlediğim / okuduğum kaynaklar:**
- **Yaptığım değişiklikler:** data.json oluşturuldu (18 araç); app.js'e baslat()
  fonksiyonu eklendi — data.json'ı fetch eder, hata olursa gömülü
  VARSAYILAN_ARACLAR yedeğine düşer, sonra araclariYukle() ile localStorage
  verisini birleştirip ekranı çizer.
- **Değişen dosyalar:** data.json, app.js
- **Claude Code'a verdiğim ana prompt:** "Sayfa açılınca 0 araç görünüyor.
  baslat() fonksiyonunu incele ve neden araçların ekrana basılmadığını açıkla"
- **Test ettiklerim:** Live Server ile açılış, file:// ile açılış, localStorage
  kalıcılığı.
- **Geçen testler:** Live Server'da 18 araç göründü; file:// ile açınca yedek
  liste devreye girdi; localStorage kalıcılığı çalışıyor.
- **Kalan sorunlar:**
- **Bugün öğrendiğim kavram:** fetch, async/await, try/catch, CORS. Ayrıca hata
  ayıklama yöntemi: "console'da hata yok" demek "kod çalışıyor" demek değilmiş —
  fetch'i elle test edip sorunu daraltmak, hiç yazılmamış fonksiyonu bulmayı
  sağladı.
- **Yarın yapacağım iş:** Form doğrulamasını (inline validation) eklemek;
  alert() yerine hatayı formun içinde kırmızı mesaj olarak göstermek.
- **Commit mesajı:** feat: load initial data with fetch and fallback

---

## Gün 1

- **Tarih:** 2026-07-17
- **Bugünkü hedef:** Proje düzeni kurma.
- **İzlediğim / okuduğum kaynaklar:**
- **Yaptığım değişiklikler:** CLAUDE.md, DAILY_LOG.md, TEST_CHECKLIST.md
  oluşturuldu; README'ye 2. hafta hedefleri eklendi.
- **Değişen dosyalar:** CLAUDE.md, DAILY_LOG.md, TEST_CHECKLIST.md, README.md
- **Claude Code'a verdiğim ana prompt:**
- **Test ettiklerim:**
- **Geçen testler:**
- **Kalan sorunlar:**
- **Bugün öğrendiğim kavram:** data.json nedir, fetch nedir, branch nedir.
- **Yarın yapacağım iş:** data.json oluşturma ve fetch ile veri yükleme.
- **Commit mesajı:** chore: prepare week 2 project structure

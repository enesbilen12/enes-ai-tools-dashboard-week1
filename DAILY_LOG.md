# Günlük Çalışma Kaydı (Daily Log)

Her gün ne yaptığımı kısaca not aldığım dosya. En yeni gün en üstte.

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

# Test Checklist — AI Araçları Paneli

Her değişiklikten sonra elle (manuel) çalıştırılan test senaryoları.
Durum sütununu test ederken doldur: **Geçti** / **Kaldı**.

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Sayfa açılış** | Sayfayı Live Server ile aç | Tüm araçlar kart olarak listelenir, konsolda hata yok | |
| **Arama** | Arama kutusuna "chat" yaz | Sadece isim/kategori/açıklamada "chat" geçen kartlar kalır | |
| **Kategori filtre** | Kategori menüsünden "Görsel" seç | Sadece "Görsel" kategorisindeki araçlar görünür | |
| **Boş form** | "Yeni Araç Ekle" → Ad'ı boş bırak → Ekle | Araç eklenmez, form içinde inline hata mesajı çıkar | |
| **Geçerli form** | Formu geçerli bilgilerle doldur → Ekle | Yeni kart listeye eklenir, form kapanır/temizlenir | |
| **localStorage** | Bir araç ekle/sil → sayfayı yenile | Değişiklikler korunur (kaybolmaz) | |
| **Silme** | Bir kartta "Sil" → onayla | Kart listeden çıkar, "Silinen Araçlar" sayacı artar | |
| **JSON export** | Verinin data.json ile aynı yapıda olduğunu doğrula | Araç nesneleri data.json şemasıyla uyumlu (name, category, purpose, owner, note, url, subscription) | |
| **Status filtresi Aktif** | Durum menüsünden "Aktif" seç | Tüm araçlar görünür (status alanı olmayan araç Aktif kabul edilir) | Geçti |
| **Status filtresi Deneme/Pasif** | Durum menüsünden "Deneme" veya "Pasif" seç | Liste boşalır (henüz status atanmış araç yok) | Geçti |
| **Reset butonu** | Arama/kategori/durum seç → "Filtreleri Temizle" tıkla | Üç filtre de varsayılana döner, tüm araçlar geri gelir | Geçti |

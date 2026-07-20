# Test Checklist — AI Araçları Paneli

Özellik bazlı test matrisi. Her değişiklikten sonra ilgili bölüm elle (manuel)
çalıştırılır. **Durum** sütununu test ederken doldur: **Geçti** / **Kaldı**.

> Not: "Geçti" işaretli satırlar daha önce doğrulandı. Boş bırakılan satırlar
> henüz elle test edilmedi — Live Server ile çalıştırıp doldur.

---

### 1. Veri yükleme & başlangıç

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Sayfa açılış** | Sayfayı Live Server ile aç | 18 araç kart olarak listelenir, konsolda hata yok | |
| **fetch fallback** | Dosyayı `file://` ile aç (çift tıkla) | fetch engellenir; gömülü VARSAYILAN_ARACLAR yedeğiyle araçlar yine görünür, konsolda sadece uyarı (warn) | |
| **localStorage birleştirme** | Bir araç ekle/düzenle → sayfayı yenile | Kullanıcı verisi korunur; koda eklenen yeni varsayılanlar da görünür, silinenler geri gelmez | |

### 2. Listeleme & özet

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Kart render** | Sayfayı aç | Her araç için kart: ad, kategori, açıklama, geliştiren, not, rozetler | |
| **Özet kutuları** | Sayfayı aç / favori ekle | "Toplam Araç" aktif araç sayısını, "Favoriler" yıldızlı sayısını doğru gösterir | |
| **Boş sonuç** | Hiçbir araca uymayan arama yaz | "Araç bulunamadı." mesajı görünür | |

### 3. Arama

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Arama** | Arama kutusuna "chat" yaz | Sadece isim/kategori/açıklamada "chat" geçen kartlar kalır | |
| **Büyük/küçük harf** | "CHAT" yaz | Küçük harfle aynı sonuç (arama harf duyarsız) | |

### 4. Kategori filtresi

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Kategori seç** | Kategori menüsünden "Görsel" seç | Sadece "Görsel" kategorisindeki araçlar görünür | |
| **Tüm kategoriler** | "Tüm kategoriler"e dön | Tüm araçlar geri gelir | |

### 5. Durum filtresi

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Durum = Aktif** | Durum menüsünden "Aktif" seç | Tüm araçlar görünür (status'ü olmayan araç Aktif sayılır) | Geçti |
| **Durum = Deneme/Pasif** | "Deneme" veya "Pasif" seç | Sadece o duruma sahip araçlar görünür (hiç yoksa liste boşalır) | Geçti |

### 6. Filtreleri temizle (Reset)

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Reset butonu** | Arama/kategori/durum seç → "Filtreleri Temizle" | Üç filtre de varsayılana döner, tüm araçlar geri gelir | Geçti |

### 7. Araç ekleme & doğrulama

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Boş form gönderimi** | Formu boş bırak → Ekle | name/category/purpose/url altında kırmızı hata; araç eklenmez | Geçti |
| **Hatalı URL** | URL'ye `example.com` (protokolsüz) → Ekle | "URL http:// veya https:// ile başlamalı." mesajı; eklenmez | Geçti |
| **Aynı isim (harf duyarsız)** | Var olan adı farklı harfle gir (`chatgpt`) → Ekle | "zaten var" mesajı; ChatGPT/chatgpt/CHATGPT aynı sayılır | Geçti |
| **Geçerli kayıt** | name+category+purpose dolu, URL `https://ornek.com` → Ekle | Yeni kart listede, form kapanır, localStorage'a yazılır | Geçti |
| **Kısmi düzeltme** | Çok hatalı alan varken tek alanı düzelt → Ekle | Sadece düzeltilen alanın hatası kaybolur, kalanlar durur | Geçti |

### 8. Araç düzenleme

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Düzenlemeye başla** | Bir kartta "✏️ Düzenle" | Kart form moduna geçer, alanlar mevcut değerlerle dolu | |
| **Kaydet** | Alanları + abonelik + durum değiştir → "💾 Kaydet" | Kart güncellenir, değişiklik yenilemede kalıcı | |
| **İptal** | Düzenlemede "İptal" | Değişiklik kaydedilmez, kart eski haline döner | |

### 9. Silme & çöp kutusu

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Silme** | Bir kartta "🗑 Sil" → onayla | Kart listeden çıkar, "Silinen Araçlar" sayacı artar | |
| **Geri yükleme** | Silinen menüsünde bir araca tıkla | Araç ana panele geri döner, sayaç azalır | |

### 10. Favoriler

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Favori aç/kapa** | Kartta yıldıza (☆/★) tıkla | Yıldız dolar/boşalır, "Favoriler" sayacı değişir | |
| **Favori kalıcılığı** | Favori ekle → sayfayı yenile | Favori korunur | |
| **Yeniden adlandırma** | Favori bir aracın adını düzenle | Favori yeni ada taşınır (yıldız kalır) | |

### 11. Rozetler (abonelik & durum)

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Kart rozetleri** | Sayfayı aç | Her kartta abonelik ve durum rozeti görünür | |
| **Formda durum** | Ekleme/düzenlemede durum seç | Seçilen durum karta rozet olarak yansır | |

### 12. Tema (açık / koyu)

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Tema değiştir** | "🌙 Koyu tema" butonuna bas | Tema değişir, buton metni güncellenir | |
| **Tema kalıcılığı** | Tema seç → sayfayı yenile | Seçilen tema korunur | |

### 13. localStorage kalıcılığı

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Kalıcılık** | Ekle/sil/düzenle/favori/tema → yenile | Tüm değişiklikler korunur (kaybolmaz) | |

### 14. JSON export

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **Export aç/kapa** | "📤 JSON Dışa Aktar"a bas, tekrar bas | İlk basışta textarea + JSON görünür, ikincide gizlenir | Geçti |
| **İçerik eşleşir** | Butona bas → çıktıyı incele | Girintili geçerli JSON; nesne sayısı listeyle eşit, alanlar (name/.../status) uyumlu | Geçti |
| **Güncellik** | Yeni araç ekle → Export'a bas | Yeni araç JSON çıktısında görünür | Geçti |

### 15. Güvenlik (XSS kaçırma)

| Test adı | Adımlar | Beklenen sonuç | Durum |
|----------|---------|----------------|-------|
| **HTML kaçırma** | Ad/not alanına `<b>test</b>` veya `<script>` gir → Ekle | Kartta düz metin olarak görünür, HTML çalışmaz (`guvenliMetin`) | |

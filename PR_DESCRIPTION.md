# 2. Hafta: data.json + fetch, durum filtresi/alanı, form doğrulama, JSON export

## Ne değişti?

- **`data.json` + `fetch`:** Başlangıç araç verisi koddan ayrılıp `data.json`'a
  taşındı; `baslat()` fonksiyonu veriyi `fetch` ile yüklüyor, hata olursa koda
  gömülü `VARSAYILAN_ARACLAR` yedeği devreye giriyor.
- **Durum (status) filtresi ve alanı:** Araçlara Aktif / Deneme / Pasif durumu
  eklendi (form + kart rozeti + veriye `status: "Aktif"`). Durum menüsünden
  filtreleme ve "Filtreleri Temizle" (reset) butonu geldi.
- **Inline form doğrulama:** Ayrı `validateForm()` fonksiyonu; zorunlu alan ve
  URL protokol (`http://`/`https://`) kontrolü; hatalar `alert()` yerine form
  içinde kırmızı mesajla gösteriliyor; aynı isim büyük/küçük harf duyarsız
  engelleniyor. Aynı doğrulama düzenleme formunda da kullanılıyor.
- **JSON dışa aktarma:** Butona basınca mevcut liste okunabilir JSON olarak
  (readonly textarea) gösteriliyor.
- **Kod review düzeltmeleri:** Düzenleme formunda tekrar-isim kontrolü;
  geri yüklemede harf duyarsız çakışma kontrolü; düzenlemeye tam doğrulama.
- **Temizlik:** Ölü kod `urlDuzenle` silindi; `favorileriKaydet`'e try/catch
  eklendi (diğer kaydetme fonksiyonlarıyla tutarlı).
- **Dokümantasyon:** README 2. haftaya güncellendi; `TEST_CHECKLIST.md` özellik
  bazlı matrise (15 özellik / 39 satır) genişletildi; `DAILY_LOG.md`'ye 7 günlük
  kayıt + haftalık özet eklendi.

## Neden değişti?

- Veriyi koddan ayırmak (`data.json`) ileride veriyi düzenlemeyi kolaylaştırır.
- `alert()` tabanlı doğrulama kullanıcıyı akıştan koparıyordu; inline hata daha
  iyi bir deneyim.
- Kod review'da "isim = kimlik" ilkesini kıran üç risk bulundu (düzenlemede
  tekrar isim, harf duyarlı geri yükleme, eksik düzenleme doğrulaması) ve
  giderildi.
- Bunlar 2. hafta eğitim hedefleriydi (fetch, form validation, JSON export).

## Nasıl test edildi?

- **Otomatik (mantık düzeyi):** JavaScriptCore (`jsc`) ile sahte DOM üzerinde,
  gerçek `app.js` çalıştırılarak doğrulama/filtre/export/düzenleme senaryoları
  test edildi (ör. düzenleme doğrulaması 14/14 geçti). Her değişiklikten sonra
  sözdizimi kontrolü yapıldı; console temiz.
- **Elle (tarayıcı):** `file://` ile açılışta gömülü yedeğin devreye girmesi ve
  18 aracın görünmesi tarayıcıda doğrulandı.
- **Sınır:** Bu otomatik testler geçici betiklerdi, repoya dahil **değil**.
  `TEST_CHECKLIST.md`'deki birçok satır hâlâ elle (Live Server) çalıştırılıp
  doldurulmayı bekliyor; "Geçti" işaretli satırlar otomatik doğrulandı, elle
  değil.

## Riskli alan var mı?

- **Form davranışı değişti:** URL artık hem ekleme hem düzenlemede **zorunlu** ve
  protokolle (`http://`/`https://`) başlamalı — eskiden düzenlemede opsiyoneldi
  ve otomatik `https://` ekleniyordu. Ayrıca kategori boş bırakılınca artık
  "Diğer" varsayılmıyor, zorunlu. Mevcut kullanıcı alışkanlığını etkileyebilir.
- **Tutarsızlık:** `aracGeriYukle` içindeki bir `alert()` hâlâ duruyor (panelin
  geri kalanı inline hataya geçmişken).
- `localStorage` cihaza/tarayıcıya özel — veri cihazlar arası taşınmaz (bu
  projenin bilinen kısıtı).

## Bilinen eksikler

- Repoda otomatik test altyapısı yok (testler geçici `jsc` betikleriydi).
- Küçük iyileştirmeler yapılmadı: `favoriMi` her çağrıda localStorage okuyor;
  `abonelikSecenekleriHTML` ve `durumSecenekleriHTML` birleştirilebilir (DRY);
  `aracGeriYukle`'deki `alert()` inline'a çevrilebilir.
- `TEST_CHECKLIST.md`'deki elle test satırlarının çoğu henüz doldurulmadı.

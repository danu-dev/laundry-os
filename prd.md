Bisa. Gue pilih **sistem pencatatan order untuk laundry kecil** sebagai produk, tapi gue mau lurusin satu hal: **“kompleks” bukan berarti dashboard penuh grafik.** Untuk laundry kecil, UX harus terasa lebih sederhana daripada buku catatan/WhatsApp yang sekarang mereka pakai.

Di bawah ini PRD yang bisa langsung lu jadikan blueprint development.

# PRD — LaundryOS

**Product:** LaundryOS
**Jenis:** SaaS web untuk operasional laundry kecil
**Target:** Laundry kiloan / laundry satu outlet / laundry rumahan
**Platform:** Responsive Web / PWA
**Primary goal:** Membantu pemilik laundry mencatat order, mengontrol status cucian, mengelola pelanggan, dan mengetahui omzet tanpa pencatatan manual.

---

## 1. Product Vision

**LaundryOS = kasir + order management + tracking laundry dalam satu layar sederhana.**

Pemilik laundry seharusnya bisa melakukan alur utama:

> **Terima pakaian → catat order → cetak/kirim nota → proses → selesai → pelanggan ambil → pembayaran tercatat**

tanpa membutuhkan kemampuan komputer khusus.

### Prinsip UX

1. **3 klik atau kurang** untuk pekerjaan rutin.
2. Informasi penting selalu terlihat.
3. Jangan memaksa user membaca banyak teks.
4. Gunakan bahasa sehari-hari, bukan istilah software.
5. Mobile-first untuk pekerja.
6. Desktop-friendly untuk owner.
7. Semua aksi penting punya feedback yang jelas.
8. Kesalahan harus bisa dibatalkan.

---

# 2. Target User

### Primary — Owner

Biasanya:

* mengelola 1 outlet
* 1–5 pegawai
* menggunakan WhatsApp
* pencatatan masih buku/Excel
* tidak punya waktu belajar software kompleks

**Goal:**

* tahu omzet
* tahu order yang belum selesai
* tahu pelanggan
* tahu stok
* mengurangi order hilang/salah catat

---

### Secondary — Staff

Tugas:

* menerima order
* menimbang
* mencatat layanan
* mengubah status
* menerima pembayaran
* menyerahkan laundry

**Goal:**

> melakukan pekerjaan secepat mungkin.

---

### Tertiary — Customer

Customer tidak harus membuat akun.

Mereka cukup mendapatkan:

> **Nomor Order: LD-260825-018**

Kemudian bisa mengecek:

> “Laundry saya sudah selesai belum?”

---

# 3. Core User Journey

```text
CUSTOMER DATANG
       ↓
+ Buat Order
       ↓
Pilih Customer
       ↓
Pilih Layanan
       ↓
Masukkan Berat
       ↓
Harga otomatis
       ↓
Pembayaran
       ↓
Order dibuat
       ↓
Cetak / WhatsApp nota
       ↓
CUCI
       ↓
SETRIKA
       ↓
SELESAI
       ↓
CUSTOMER AMBIL
       ↓
ORDER CLOSED
```

---

# 4. Information Architecture

```text
Dashboard
│
├── Orders
│   ├── Semua
│   ├── Baru
│   ├── Diproses
│   ├── Siap Diambil
│   └── Selesai
│
├── Customers
│
├── Services
│
├── Inventory
│
├── Finance
│   ├── Sales
│   ├── Expenses
│   └── Reports
│
├── Employees
│
└── Settings
```

Mobile navigation:

```text
Home
Orders
+
Customers
More
```

**Tombol `+` menjadi primary action.**

---

# 5. Visual Design System

## Color

Jangan pakai warna-warni untuk dekorasi.

Gunakan **solid color system** dengan satu primary brand color.

### Primary

**Indigo / Blue**

```text
Primary 900  #1E1B4B
Primary 700  #4338CA
Primary 600  #4F46E5
Primary 500  #6366F1
Primary 100  #E0E7FF
Primary 50   #EEF2FF
```

Primary dipakai untuk:

* CTA
* active navigation
* link
* selected state
* progress

---

### Neutral

```text
Black       #111827
Gray 900    #1F2937
Gray 700    #374151
Gray 500    #6B7280
Gray 300    #D1D5DB
Gray 200    #E5E7EB
Gray 100    #F3F4F6
Gray 50     #F9FAFB
White       #FFFFFF
```

---

### Semantic

```text
Success
#16A34A

Warning
#D97706

Danger
#DC2626

Info
#2563EB
```

**Rule:**

Jangan menjadikan status sebagai satu-satunya indikator.

Contoh:

🟢 **Siap diambil**

bukan hanya:

🟢

Karena warna saja buruk untuk accessibility.

---

# 6. Typography

Gue sarankan:

### Font

**Plus Jakarta Sans**

Modern, friendly, dan cocok untuk SaaS.

Alternative:

* Inter
* Geist

### Type scale

```text
Display     32px / 40px / 700

H1          28px / 36px / 700
H2          22px / 30px / 700
H3          18px / 26px / 600

Body        14px / 22px / 400
Body Large  16px / 24px / 400

Caption     12px / 18px / 500
```

Jangan menggunakan terlalu banyak ukuran font.

---

# 7. Design Language

### Border radius

```text
Button      10px
Input       10px
Card        14px
Modal       16px
Badge       999px
```

### Shadow

Gunakan sangat tipis.

Card lebih baik dibedakan dengan:

```text
background
+
border
```

daripada shadow besar.

---

# 8. Dashboard

Dashboard bukan tempat memamerkan data.

Dashboard harus menjawab **4 pertanyaan**:

> Berapa order hari ini?

> Berapa yang harus dikerjakan?

> Berapa yang siap diambil?

> Berapa uang yang masuk?

### Layout

```text
┌─────────────────────────────────────────────┐
│ Good morning, Budi                 + Order │
├─────────────────────────────────────────────┤
│                                             │
│  Today's Revenue    Orders    Ready         │
│  Rp1.240.000        34        12            │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ Order perlu perhatian                       │
│                                             │
│ LD-018   Andi       Cuci       4.2 kg       │
│ LD-019   Sari       Setrika    2.0 kg       │
│ LD-020   Dimas      Siap       —            │
│                                             │
├─────────────────────────────────────────────┤
│ Revenue overview                            │
│                                             │
│             ╭──────────────╮                │
│             │              ╰────            │
│       ──────╯                              │
│                                             │
└─────────────────────────────────────────────┘
```

---

# 9. Order Management

Ini adalah **core feature**.

## Order list

Filter:

```text
All
New
Processing
Ready
Completed
```

Search:

```text
Cari nomor order / nama / nomor HP
```

Setiap order:

```text
┌─────────────────────────────────┐
│ LD-260825-018           READY   │
│ Andi Pratama                    │
│ 4.5 kg · Cuci + Setrika         │
│ Rp31.500                        │
│                                 │
│ Dibuat 09:32                    │
│                        Detail → │
└─────────────────────────────────┘
```

---

# 10. Create Order

Ini harus menjadi **flow paling cepat di aplikasi**.

## Step 1 — Customer

```text
Customer

[ 🔍 Cari nomor HP / nama ]

+ Customer baru
```

Kalau nomor HP sudah dikenal:

> Andi Pratama
> 0812••••8899
> 12 orders

---

## Step 2 — Service

Contoh:

```text
Pilih layanan

┌────────────┐ ┌────────────┐
│ Cuci       │ │ Cuci +     │
│ Rp7.000/kg │ │ Setrika    │
│            │ │ Rp10.000/kg│
└────────────┘ └────────────┘

┌────────────┐ ┌────────────┐
│ Express    │ │ Selimut    │
│ Rp12.000/kg│ │ Rp25.000   │
└────────────┘ └────────────┘
```

Gunakan card/button besar.

Jangan dropdown kecil.

---

# 11. Weight Input

```text
Berat laundry

        4.5
       ─────
         kg

[ − ]                  [ + ]

Harga:
4.5 × Rp10.000

Rp45.000
```

Input manual tetap tersedia.

---

# 12. Additional Items

Misalnya:

```text
+ Tambahkan item

☐ Pewangi premium       +Rp3.000
☐ Express               +Rp10.000
☐ Antar                 +Rp5.000
```

---

# 13. Order Summary

Sebelum submit:

```text
ORDER SUMMARY

Andi Pratama
0812••••8899

Cuci + Setrika
4.5 kg                  Rp45.000

Pewangi                  Rp3.000

────────────────────────
Subtotal                Rp48.000

Bayar                   Rp50.000
Kembalian                Rp2.000

[ SIMPAN ORDER ]
```

---

# 14. Order Detail

```text
LD-260825-018

Andi Pratama
0812••••8899

┌────────────────────────────┐
│ ● Siap Diambil             │
│                            │
│ Order selesai diproses.    │
└────────────────────────────┘

TIMELINE

✓ Order dibuat
  25 Aug · 09:32

✓ Dicuci
  25 Aug · 11:20

✓ Disetrika
  25 Aug · 14:10

✓ Siap diambil
  25 Aug · 15:02


ITEM
Cuci + Setrika
4.5 kg


TOTAL
Rp48.000

[ WhatsApp ]
[ Cetak Nota ]
[ Ubah Status ]
```

---

# 15. Status System

Status harus konsisten di seluruh aplikasi.

```text
NEW
↓
WASHING
↓
IRONING
↓
READY
↓
PICKED_UP
```

Optional:

```text
CANCELLED
```

### Status transition

Tidak boleh:

```text
NEW → PICKED_UP
```

kecuali user memiliki permission tertentu.

Normalnya:

```text
NEW
 ↓
WASHING
 ↓
IRONING
 ↓
READY
 ↓
PICKED_UP
```

---

# 16. Customer Management

Customer list:

```text
Andi Pratama
0812••••8899
12 orders
Rp840.000

Sari
0813••••2241
8 orders
Rp520.000
```

Customer detail:

```text
Andi Pratama

0812••••8899
Customer sejak Jan 2026

Total orders       12
Total spending     Rp840.000
Average order      Rp70.000

ORDER HISTORY

LD-018   Rp48.000   Ready
LD-014   Rp75.000   Completed
LD-011   Rp52.000   Completed
```

---

# 17. Customer Loyalty

Jangan langsung bikin sistem poin rumit.

Mulai dengan:

```text
Customer level

New
Regular
VIP
```

Berdasarkan jumlah order.

Contoh:

```text
New       0–2 orders
Regular   3–9 orders
VIP       10+ orders
```

---

# 18. Service Management

Owner bisa membuat:

```text
Cuci
Rp7.000 / kg

Cuci + Setrika
Rp10.000 / kg

Express
Rp12.000 / kg

Selimut
Rp25.000 / pcs
```

Fields:

* nama
* harga
* unit
* estimasi selesai
* aktif/nonaktif

Unit:

```text
kg
pcs
meter
```

---

# 19. Inventory

Jangan bikin inventory seperti ERP.

Fokus pada barang yang benar-benar diperlukan laundry:

* deterjen
* pewangi
* plastik
* hanger
* tag laundry
* nota

Contoh:

```text
STOCK ALERT

Deterjen
8 liter
⚠ Stok rendah

Plastik 30×40
120 pcs
✓ Aman
```

---

# 20. Finance

## Revenue

```text
TODAY

Rp1.240.000

↑ 12.4% vs yesterday
```

Breakdown:

```text
Cash       Rp420.000
Transfer   Rp620.000
QRIS       Rp200.000
```

---

## Expenses

```text
+ Tambah Pengeluaran

Kategori:
- Supplies
- Electricity
- Salary
- Rent
- Other
```

---

## Profit

Jangan klaim **profit** kalau sistem belum mencatat biaya dengan cukup lengkap.

Tampilkan:

> **Revenue**

dan

> **Recorded expenses**

Kemudian:

> **Estimated net**

dengan label jelas bahwa itu estimasi.

---

# 21. Reports

Owner bisa memilih:

```text
Today
This week
This month
Custom
```

Metrics:

* total order
* revenue
* average order value
* completed orders
* cancelled orders
* unpaid orders

Charts:

### Revenue

Line chart.

### Order volume

Bar chart.

### Services

Donut/bar:

```text
Cuci + Setrika     54%
Cuci               31%
Express            10%
Other                5%
```

---

# 22. Payment

Support:

```text
Cash
Transfer
QRIS
Pay later
```

Payment status:

```text
PAID
PARTIAL
UNPAID
```

Untuk `PARTIAL`:

```text
Total       Rp50.000
Paid        Rp30.000
Remaining   Rp20.000
```

---

# 23. Notification

Notification bukan harus push notification dulu.

MVP:

**WhatsApp message template**

Saat status:

`READY`

system menyediakan:

> Halo Andi, laundry dengan nomor **LD-260825-018** sudah selesai dan siap diambil. Total pembayaran Rp48.000.

Button:

**Kirim WhatsApp**

Jangan otomatis spam customer tanpa consent.

---

# 24. Customer Tracking Page

Ini fitur yang menurut gue **sangat penting**.

Customer tidak perlu login.

Mereka membuka:

```text
laundryos.app/track
```

Masukkan:

```text
Nomor Order

[ LD-260825-018 ]

[ CEK STATUS ]
```

Output:

```text
LD-260825-018

Andi Pratama

✓ Laundry diterima
✓ Sedang dicuci
✓ Sedang disetrika
✓ Siap diambil

STATUS SEKARANG

🟢 SIAP DIAMBIL

Total
Rp48.000
```

Ini memberikan alasan tambahan kenapa bisnis mau menggunakan produk lu.

---

# 25. Authentication

Roles:

```text
OWNER
STAFF
```

### Owner

Bisa:

* melihat finance
* mengubah harga
* mengelola staff
* menghapus order
* melihat reports

### Staff

Bisa:

* create order
* update status
* customer
* payment

Tidak bisa:

* menghapus data penting
* mengubah harga global
* melihat seluruh finance

---

# 26. Permission Matrix

| Action          | Owner |   Staff |
| --------------- | ----: | ------: |
| Create order    |     ✓ |       ✓ |
| Edit order      |     ✓ |       ✓ |
| Change status   |     ✓ |       ✓ |
| Cancel order    |     ✓ |       ✓ |
| Delete order    |     ✓ |       — |
| Manage services |     ✓ |       — |
| Finance         |     ✓ | Limited |
| Reports         |     ✓ |       — |
| Manage staff    |     ✓ |       — |
| Settings        |     ✓ |       — |

---

# 27. Mobile UX

Ini penting.

Staff kemungkinan besar menggunakan HP.

### Bottom navigation

```text
┌──────────────────────────────┐
│                              │
│         CONTENT              │
│                              │
├──────────────────────────────┤
│ Home  Orders  ＋  Customers  More │
└──────────────────────────────┘
```

`+` adalah tombol terbesar.

Klik:

```text
+ Order
```

langsung membuka create order.

---

# 28. Empty States

Jangan:

> No data found.

Lebih manusiawi:

> **Belum ada order hari ini.**

> Mulai dengan membuat order pertama.

**[ + Buat Order ]**

---

# 29. Loading State

Gunakan skeleton:

```text
████████████
██████
████████████████
```

Bukan spinner untuk seluruh halaman.

---

# 30. Error Handling

Contoh:

> **Order gagal disimpan**

> Data belum berhasil tersimpan. Coba lagi.

`[ Coba Lagi ]`

Jangan menampilkan:

> Error 500 Internal Server Error.

Itu informasi developer, bukan user.

---

# 31. Confirmation

Untuk tindakan destructive:

```text
Hapus order LD-260825-018?

Order tidak akan muncul dalam daftar aktif.

[ Batal ]   [ Hapus ]
```

Untuk status biasa:

**Jangan pakai confirmation modal.**

Misalnya:

> “Yakin mengubah status menjadi selesai?”

Itu memperlambat pekerjaan.

---

# 32. Search UX

Search global:

```text
⌕ Cari order, pelanggan, nomor HP...
```

Search harus bisa menemukan:

```text
LD-018
Andi
0812
Cuci + Setrika
```

---

# 33. Keyboard Shortcut

Desktop:

```text
N       New Order
/       Search
Esc     Close modal
Enter   Submit
```

Tidak wajib untuk mobile.

---

# 34. Data Model

Database minimal:

```text
User
 ├── id
 ├── name
 ├── email
 ├── role
 └── outletId

Outlet
 ├── id
 ├── name
 ├── address
 └── phone

Customer
 ├── id
 ├── name
 ├── phone
 └── notes

Order
 ├── id
 ├── orderNumber
 ├── customerId
 ├── status
 ├── subtotal
 ├── discount
 ├── total
 ├── paymentStatus
 ├── paymentMethod
 ├── createdAt
 └── completedAt

OrderItem
 ├── id
 ├── orderId
 ├── serviceId
 ├── quantity
 ├── unit
 └── price

Service
 ├── id
 ├── name
 ├── price
 ├── unit
 └── active

Payment
 ├── id
 ├── orderId
 ├── amount
 ├── method
 └── createdAt

Expense
 ├── id
 ├── category
 ├── amount
 ├── note
 └── createdAt

InventoryItem
 ├── id
 ├── name
 ├── quantity
 ├── unit
 └── minimumStock

OrderStatusHistory
 ├── id
 ├── orderId
 ├── fromStatus
 ├── toStatus
 ├── changedBy
 └── createdAt
```

---

# 35. Technical Architecture

Kalau lu mau membangun sendiri:

```text
Next.js
│
├── App Router
├── TypeScript
├── Tailwind CSS
├── shadcn/ui
│
├── PostgreSQL
├── Prisma
│
├── Auth.js
│
└── Cloudinary / Supabase Storage
```

Deployment:

```text
Vercel
     ↓
Next.js

Supabase
     ↓
PostgreSQL + Storage
```

---

# 36. URL Structure

```text
/login

/dashboard

/orders
/orders/new
/orders/[id]

/customers
/customers/[id]

/services

/inventory

/finance
/finance/expenses

/reports

/staff

/settings

/track
```

Public:

```text
/track/[orderNumber]
```

---

# 37. Responsive Breakpoints

```text
Mobile
< 640px

Tablet
640–1024px

Desktop
> 1024px
```

Desktop:

```text
Sidebar 240px
Content flexible
```

Mobile:

```text
Bottom navigation
Full-width content
Sticky primary action
```

---

# 38. Accessibility

Minimal requirement:

* contrast WCAG AA
* keyboard navigation
* focus state jelas
* button punya label
* jangan hanya menggunakan warna untuk status
* touch target minimal ±44px
* error message dekat field
* form menggunakan label

---

# 39. MVP

**Jangan implement semua fitur di atas sekaligus.**

MVP harus:

```text
✓ Login
✓ Dashboard sederhana
✓ Customer
✓ Create Order
✓ Order List
✓ Order Detail
✓ Status
✓ Payment
✓ Service
✓ Customer tracking
✓ WhatsApp template
```

**Belum perlu:**

```text
✗ AI
✗ Inventory kompleks
✗ Multi-outlet
✗ Loyalty
✗ Payroll
✗ Accounting
✗ Advanced analytics
✗ Marketplace
```

---

# 40. Phase 2

Setelah ada user:

```text
Inventory
↓
Expenses
↓
Reports
↓
Staff permissions
↓
WhatsApp automation
↓
Customer loyalty
```

---

# 41. Phase 3

Kalau sudah terbukti dipakai:

```text
Multi outlet
↓
Subscription
↓
Advanced analytics
↓
Online payment
↓
Automated notification
↓
Customer app/PWA
```

---

# 42. Pricing Model

Jangan gratis selamanya.

Contoh:

### Free

```text
Rp0

50 orders/month
1 staff
Basic reports
```

### Starter

```text
Rp49.000/month

500 orders
3 staff
Customer tracking
Reports
```

### Business

```text
Rp99.000/month

Unlimited orders
10 staff
Advanced reports
Automation
Priority support
```

Harga ini **bukan hasil validasi pasar**; anggap sebagai hipotesis awal yang harus diuji ke pemilik laundry.

---

# 43. North Star Metric

Jangan pakai:

> jumlah user yang daftar.

Lebih relevan:

### **Completed Orders / Active Laundry / Month**

Karena tujuan produk adalah membantu laundry menjalankan operasionalnya.

Secondary:

* orders/day
* active businesses
* 30-day retention
* orders processed through system
* percentage of orders with customer phone
* payment completion rate

---

# 44. Critical Product Rule

Ada satu hal yang menurut gue harus lu pegang:

> **LaundryOS tidak boleh membuat pekerjaan laundry menjadi lebih ribet daripada buku.**

Kalau staff sebelumnya butuh:

**10 detik** mencatat order manual,

aplikasi lu jangan membuatnya menjadi:

**60 detik** karena harus mengisi 14 field.

Form create order harus terasa seperti **kasir**, bukan formulir administrasi.

---

## Prioritas desain

Kalau lu benar-benar mau membangun ini, urutannya:

**1. Create Order UX**
↓
**2. Order Status**
↓
**3. Order Tracking**
↓
**4. Customer**
↓
**5. Payment**
↓
**6. Dashboard**
↓
**7. Reports**
↓
**8. Inventory & Finance**

Karena **order adalah jantung produknya**.

Dan untuk visual, gue akan mengambil arah **modern SaaS yang clean + solid colors + typography kuat**, bukan desain laundry yang penuh ikon mesin cuci, gelembung, pakaian, atau gradient biru. Produk ini harus terasa seperti **software bisnis profesional**, bukan website laundry biasa.

# Domain DNS & Email Security Guide: SPF & DMARC

## 1. Overview
The SEO & Domain Security audit flagged:
> **"This DNS server is not using an SPF record! SPF (Sender Policy Framework) allows administrators to specify which hosts are allowed to send mail from a given domain by creating a specific SPF record or TXT record in the Domain Name System (DNS)."**

Because DNS records exist on your domain nameservers (e.g. Vercel DNS, Cloudflare, Namecheap, GoDaddy), they cannot be modified through website application source code. They must be added directly into your DNS manager.

---

## 2. Recommended SPF Record Configuration

### Option A: If you do NOT send outgoing emails directly from the domain
If `chennairents.in` is purely a web application and does not send marketing/transactional emails through its own mail server:

| Field / Type | Host / Name | Value / Content | TTL |
| :--- | :--- | :--- | :--- |
| **TXT** | `@` (or `chennairents.in`) | `v=spf1 ~all` | 3600 (or Auto) |

*What this does:* Informs all global receiving mail servers that no unauthorized servers are permitted to spoof `@chennairents.in` emails.

---

### Option B: If you use Google Workspace (Gmail)
| Field / Type | Host / Name | Value / Content | TTL |
| :--- | :--- | :--- | :--- |
| **TXT** | `@` | `v=spf1 include:_spf.google.com ~all` | 3600 |

---

### Option C: If you use Zoho Mail
| Field / Type | Host / Name | Value / Content | TTL |
| :--- | :--- | :--- | :--- |
| **TXT** | `@` | `v=spf1 include:zoho.in ~all` | 3600 |

---

## 3. Recommended DMARC Record (Bonus Security)
To complement SPF and achieve a 100% security rating on email spoof prevention:

| Field / Type | Host / Name | Value / Content | TTL |
| :--- | :--- | :--- | :--- |
| **TXT** | `_dmarc` | `v=DMARC1; p=none; rua=mailto:admin@chennairents.in` | 3600 |

---

## 4. How to Apply in Vercel DNS
1. Navigate to **Vercel Dashboard** → **Domains** → Select `chennairents.in`.
2. Under **DNS Records**, click **Add Record**.
3. Choose **TXT**.
4. Set **Name** to `@`.
5. Set **Value** to `v=spf1 ~all` (or your mail provider's SPF value).
6. Click **Save**.

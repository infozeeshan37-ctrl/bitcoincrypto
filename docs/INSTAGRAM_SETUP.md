# 📸 Instagram Reels Auto-Publishing Setup Guide

`BitcoinCrypto.tech` supports automatic cross-posting of the exact same 4K vertical Shorts to **Instagram Reels** via Meta's official Graph API v21.0 Resumable Upload protocol.

---

## 🔑 Required Credentials

Add the following two environment variables to your `.env.local` file:

```env
INSTAGRAM_ACCOUNT_ID=your_instagram_business_account_id
INSTAGRAM_ACCESS_TOKEN=your_meta_graph_api_access_token
```

---

## 🛠️ Step-by-Step 3-Minute Setup

### Step 1: Ensure Your Instagram is a Professional Account
1. Open the **Instagram** app on your phone.
2. Go to **Settings and privacy** &rarr; **Account type and tools** &rarr; **Switch to professional account** (select **Creator** or **Business**).
3. Connect your Instagram account to a **Facebook Page** (if you don't have one, Facebook lets you create one for free in 30 seconds at [facebook.com/pages/create](https://www.facebook.com/pages/create)).

---

### Step 2: Create a Meta Developer App
1. Go to the [Meta for Developers Portal](https://developers.facebook.com/) and log in with your Facebook account.
2. Click **My Apps** &rarr; **Create App**.
3. Select **Other** &rarr; **Business** (or **Consumer** with Instagram Graph API use case).
4. Enter an App Name (e.g., `BitcoinCrypto Publisher`) and click **Create App**.

---

### Step 3: Generate Your Access Token & Account ID
1. In the top navigation, go to **Tools** &rarr; [**Graph API Explorer**](https://developers.facebook.com/tools/explorer/).
2. In the **Meta App** dropdown on the right, select your newly created app.
3. Under **User or Page**, select your Facebook Page linked to your Instagram.
4. In the **Permissions** search bar, add these 3 permissions:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
5. Click **Generate Access Token** and approve the Facebook popup window.
6. In the query bar, run:
   ```text
   GET /me/accounts?fields=instagram_business_account{id,username}
   ```
7. Click **Submit**. You will see:
   ```json
   {
     "data": [
       {
         "instagram_business_account": {
           "id": "17841400000000000",
           "username": "your_handle"
         }
       }
     ]
   }
   ```
   - Copy the `"id"` value &rarr; this is your **`INSTAGRAM_ACCOUNT_ID`**.

---

### Step 4: Get a Long-Lived Token (Does Not Expire in 1 Hour)
1. Go to the [Meta Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/).
2. Paste the token from Step 3 and click **Debug**.
3. Scroll down and click **Extend Access Token** (generates a 60-day or never-expiring Page token).
4. Copy this token &rarr; this is your **`INSTAGRAM_ACCESS_TOKEN`**.

---

## 🧪 Verification & Usage

Once added to `.env.local`, verify your Instagram connection anytime:

```bash
node scripts/instagramUploader.mjs
```

### Automatic Cross-Posting:
Every time you run the daily shorts publisher:
```bash
node scripts/autoPostDailyShort.mjs --schedule --all-slots
```
The exact same 4K vertical video will automatically be posted to **both YouTube Shorts AND Instagram Reels**!

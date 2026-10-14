# Family sharing with Google Drive

Once this is set up, a recording made on one phone appears on every phone you connect.
Recordings are saved in a folder called **Bedtime Stories Recordings** in your Google Drive.
You do this once, on a computer if you can (it's easier than on a phone).

## 1. Create the script

1. Open [Code.gs](Code.gs) and click the **Copy raw file** button (two overlapping squares, top right of the code).
2. Go to [script.google.com](https://script.google.com) and click **New project**.
3. Delete everything in the editor, paste the code, and press **Ctrl+S** (Cmd+S on a Mac) to save.
4. Click **Untitled project** at the top and name it `Bedtime Stories`.

## 2. Deploy it

1. Click **Deploy → New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
4. Click **Deploy**, then **Authorize access**, and pick your Google account.
5. Google shows "Google hasn't verified this app". This is expected for a script you made yourself:
   click **Advanced → Go to Bedtime Stories (unsafe)**, then **Allow**.
6. Copy the **Web app URL** (it starts with `https://script.google.com/macros/s/`).

## 3. Connect the site

1. Open the site, scroll to **Share recordings with family**, paste the link and tap **Connect**.
2. Tap **Copy invite link** and send it to your partner. When they open it on their phone, it's connected too.

Recordings you made on this phone before connecting are uploaded automatically.

## Good to know

- The web app link works like a password. Anyone who has it can listen to, add and delete recordings.
  Share it only through the invite link, and don't post it publicly.
- Deleting a recording on the site deletes it for everyone. Deleted files go to your Drive's Trash first.
- If you edit the script later, use **Deploy → Manage deployments → Edit → New version**, so the link stays the same.

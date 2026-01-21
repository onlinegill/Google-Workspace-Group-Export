# Google Workspace Group Export (Apps Script)

Exports all Google Workspace Groups using the Admin Directory API and saves the results as a CSV file in Google Drive.

This project is designed to run from **Google Apps Script** as a Workspace Admin (or an account with permission to read Groups).

---

## What it exports

Each group row includes:

- Name
- Email
- Description
- DirectMembersCount

Output format: `workspace-groups-YYYYMMDD-HHMMSS.csv`

---

## Prerequisites

1. A **Google Workspace** account
2. You must be:
   - **Super Admin**, OR
   - An admin/user with permission to read Groups (Directory access)
3. Admin SDK API enabled via Apps Script project (steps below)

---

## Step-by-step setup

### 1) Create the Apps Script project
1. Go to https://script.google.com
2. Click **New project**
3. Rename the project (optional) to: `Export groups`

### 2) Add the code
1. In the left panel, open `Code.gs`
2. Replace everything with the contents from `Code.gs` in this repo
3. Click **Save**

### 3) Enable the Admin Directory API (IMPORTANT)
1. In Apps Script editor, left panel: **Services**
2. Click **+ Add a service**
3. Select **Admin Directory API**
4. Click **Add**

If prompted to enable the API in Google Cloud:
1. Click the link it provides (Google Cloud Console)
2. Enable **Admin SDK API**
3. Return to Apps Script

### 4) Run the script
1. In the top toolbar, choose function: **myFunction**
2. Click **Run**
3. Approve permissions when prompted

### 5) Get the exported CSV
1. Open Google Drive
2. Look for a file named like:
   `workspace-groups-20260121-013000.csv`
3. The execution log will also print the Drive URL of the created file.

---

## Common errors & fixes

### "Attempted to execute myFunction, but it was deleted"
Fix: Make sure the function dropdown is set to `myFunction`, and that `myFunction()` exists in `Code.gs`.

### "Not Authorized to access this resource/api"
Fix:
- Confirm **Admin Directory API** is added under **Services**
- Confirm **Admin SDK API** is enabled in Cloud Console
- Confirm the signed-in account has permission to read groups

### No groups returned
Fix:
- Check you’re in the correct Workspace tenant
- Ensure Groups exist and your admin can read them

---

## Notes

- This script uses: `customer: "my_customer"` which refers to the current Workspace customer associated with the executing account.
- Max results per page is 200, and the script paginates until all groups are exported.


/**
 * Entry point (Apps Script expects this).
 * Running myFunction is the easiest way to avoid the "myFunction was deleted" error.
 */
function myFunction() {
  exportAllGroupsToCSV();
}

/**
 * Export all Google Workspace Groups to a CSV in Google Drive.
 *
 * Prereq:
 * - Apps Script: Services -> Add "Admin Directory API"
 * - Cloud Console: Enable "Admin SDK API" if prompted
 *
 * Output:
 * - Creates a CSV file in Google Drive and logs the URL
 */
function exportAllGroupsToCSV() {
  var rows = [];
  rows.push(["Name", "Email", "Description", "DirectMembersCount"]);

  var pageToken = null;

  do {
    var resp = AdminDirectory.Groups.list({
      customer: "my_customer",
      maxResults: 200,
      pageToken: pageToken
    });

    var groups = resp.groups || [];
    groups.forEach(function (g) {
      rows.push([
        g.name || "",
        g.email || "",
        (g.description || "").replace(/\r?\n/g, " "), // keep CSV clean
        g.directMembersCount || ""
      ]);
    });

    pageToken = resp.nextPageToken;
  } while (pageToken);

  // Build CSV
  var csv = rows.map(function (r) {
    return r.map(csvEscape).join(",");
  }).join("\n");

  var filename =
    "workspace-groups-" +
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd-HHmmss") +
    ".csv";

  var file = DriveApp.createFile(filename, csv, MimeType.CSV);

  Logger.log("Created: " + file.getUrl());
}

/**
 * Proper CSV escaping
 */
function csvEscape(value) {
  value = String(value);
  if (/[",\n]/.test(value)) {
    value = '"' + value.replace(/"/g, '""') + '"';
  }
  return value;
}

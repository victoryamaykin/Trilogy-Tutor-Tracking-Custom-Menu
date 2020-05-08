## Trilogy Tutor Tracking Sheet - Custom Menu Items 
**Auto-Weekly Confirmation Emailer**
<hr>
###by Victor Yamaykin, Senior Data Visualization Tutor

**Description:**

This is a script for the Google Tutor Tracking Spreadsheet. It may help some with getting started, however it requires a gmail account.
It will send a separate draft of the weekend email for each student (and CC to Central Support). That way you can verify before sending them out just in case some of them are no longer on your student roster. Using the project triggers, you can have the emails sent automatically to your Drafts folder every week. Please let me know if you have any feedback on the code!

**Requirements:**

* Gmail, Google Sheets **all associated with the same Google Account.**
* A separate sheet named "Student Roster"

**Installation:**

1. Under **Tools > Script Editor** then "Start a New Project"

2. Copy the following code

3. Enter your calendly link for the variable "calendly", then copy the display text of the link inside the message, and lastly add your name. 

4. To set up the automatic email drafts, go to **Edit > Current Project's Triggers** to set up a schedule to run the weekly() function at a time that suits you.

![Current project trigger settings](/images/project-trigger-setup.png)

5. Now you have a custom menu item button to "Send intro email" to a new student on your roster and "Send weekend email" if you prefer sending manually. Thanks for your time! ^_^

```javascript
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Send Emails')
      .addItem('Intro email', 'intro')
      .addItem('Send weekend email', 'weekly')
      .addToUi();
}
function getLastRowSpecial(range){
  var rowNum = 0;
  var blank = false;
  for(var row = 0; row < range.length; row++){
    if(range[row][0] === "" && !blank){
      rowNum = row;
      blank = true;
    }else if(range[row][0] !== ""){
      blank = false;
    };
  };
  return rowNum;
};
// Send intro email to let student know how to schedule sessions
function intro(email) {
  // Select the student roster
var wb = SpreadsheetApp.getActiveSpreadsheet();
var sh1 = wb.getSheetByName("Student Roster");
// Display the input box   
var ui = SpreadsheetApp.getUi();
var response = ui.prompt(
  'Introductory Email Details', 
  'Which student?' + " (row number)", 
   ui.ButtonSet.OK_CANCEL);
// Process the user's response.
if (response.getSelectedButton() == ui.Button.OK) {
  var row = response.getResponseText();
  // Use row number to collect relevant information
  var name = sh1.getRange("C" + row).getValue();
  Logger.log(name)
  var email = sh1.getRange("D" + row).getValue();
  Logger.log(email)
  var calendly = YOUR CALENDLY LINK HERE; 
  var dateTime = sh1.getRange("H" + row).getValues();
  var message = []; 
    message += "Hi "+ name +"!" + 
"<br><br>Nice to meet you! My name is YOUR NAME, and I was assigned to be your tutor. I am a graduate of the YOUR AREA OF STUDY Coding Boot Camp so I understand the challenges you're facing in the boot camp very well!<br>" +
"<br>I just sent you an invite to our tutoring Slack Team, Tutors & Students. This is where we will be communicating through Direct Message (DM).  Let me know if you don't see the invite or have any issues getting signed up.  Please send me a direct message once you create your account there. You can DM me on that Slack by using my Slack name @YOUR SLACK NAME. Make sure to have that Slack available on your mobile phone so that you can message me if there are problems with wifi, etc.<br>" +
"<br>Below, I'll provide you with the link to my calendly.  Let me know which of those time slots works best for you and we can schedule a session. If our availability doesn't sync, let me know and I'll see if we can figure something out.</strong><br>" +
"<br><strong><u>Maximum tutorial sessions per week - our week is Monday - Sunday.</u></strong><br>" +
"<ul><li>Part-time (6 month boot camp) students are entitled to 1 session per week.</li>" +
"<li>Full-time (3 month boot camp) students with an assigned group tutor will receive 1 one-on-one session and 1 group session per week.</li>" +
"<li>Full-time (3 month boot camp) students without a group tutor are entitled to 2 one-on-one sessions per week.</li></ul>" +
"Schedule your session at: <a href='" + calendly + "'>YOUR CALENDLY LINK HERE</a><br>" + 
"<br><mark><strong>On the Calendly page, be sure you have the correct time zone selected in the section labeled 'Times are in'</strong></mark><br>" +
'<br>Each session takes place over Zoom.us (video chat/screen sharing) and lasts about 50 minutes. I\'ll email you the Zoom.us link the day before our scheduled time. (If you have not used zoom before please join the meeting at least 15 minutes early as it may have you download and install some software.)<br>' +  
"<br>Again, all I need from you:" +
"<ul><li>Be on Tutors & Students Slack 5 minutes before your time slot.</li>" +
"<li>Make sure your computer/mic/internet connection are working.</li>" +
"<li>Make sure your work space is quiet and free from interruptions.</li></ul>" +
"At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.<br><br>" +
"Slack or email me with any questions.  I'm looking forward to our meeting!<br><br>" +
"<strong>CC Central Support on all email by always using REPLY ALL.</strong><br><br>" +
"Sincerely,<br>YOUR NAME";
var subject = 'Data Analytics Boot Camp - Tutorial Available';
// Create the email draft
// .createDraft() is for testing and .sendEmail() can be used instead to mail directly 
  GmailApp.createDraft(email, subject, "", {cc: "centraltutorsupport@bootcampspot.com", htmlBody: message});
// Log other responses to input box 
} else if (response.getSelectedButton() == ui.Button.CANCEL) {
  Logger.log('The user didn\'t want to provide a number.');
} else {
  Logger.log('The user clicked the close button in the dialog\'s title bar.');
}
};

// Weekend email for tutorial availability
function weekly(email) {
// Select sheet
  var wb = SpreadsheetApp.getActiveSpreadsheet();
  var sh1 = wb.getSheetByName("Student Roster");
// ENTER YOUR CALENDLY LINK HERE
  var calendly = "   " ; 
// Collect email addresses
  var emailAddressColumn = sh1.getRange("D2:D").getValues();
  var emailLastRow = getLastRowSpecial(emailAddressColumn);
  var emailList = sh1.getRange(2, 4, emailLastRow, 1).getValues();
  Logger.log(emailList);
  // Make lists for each set of data
  var nameColumn = sh1.getRange("C2:C").getValues();
  var nameLastRow = getLastRowSpecial(nameColumn);
  var nameList = sh1.getRange(2, 3, nameLastRow, 1).getValues();
  //  // Send Alert Email to Multiple Email Addresses
  for (var i = 0; i < emailList.length; i++) {
    var message = [];
    message += "Hi "+ nameList[i] +"!" +
      "<br><br>I hope you had a great week! Here's the link to schedule another tutoring session if you wish:<br><br>" +
"<a href='" + calendly + "'>ENTER CALENDLY LINK HERE</a>" + "<br><br><mark><strong>On the Calendly page, be sure you have the correct time zone selected in the section labeled 'Times are in'</strong></mark>" +
"<br><strong>If our availability doesn't sync, let me know and I'll see if we can figure something out.</strong><br>" +
"<br><strong><u>Maximum tutorial sessions per week - our week is Monday - Sunday.</u></strong><br>" +
"<ul><li>Part-time (6 month boot camp) students are entitled to 1 session per week.</li>" +
"<li>Full-time (3 month boot camp) students with an assigned group tutor will receive 1 one-on-one session and 1 group session per week.</li>" +
"<li>Full-time (3 month boot camp) students without a group tutor are entitled to 2 one-on-one sessions per week.</li></ul>" +
"If you have already scheduled a tutoring session for this week please ignore this email.<br><br>" +
"If you have any questions or none of the times available work for you please let me know and I would be happy to help.<br><br>" +
"If you would like to schedule regular, recurring sessions at the same day/time each week, just let me know by REPLY ALL and we can work it out.  This is particularly useful if you have a strict schedule so you won't have to compete for time on my calendar.<br><br>" +
"<strong>CC Central Support on all email by always using REPLY ALL.</strong><br><br>" +
"Sincerely,<br>ENTER YOUR NAME";
  var subject = "Coding Boot Camp - Tutorial Available";
    GmailApp.createDraft(
      emailList[i],
      subject, "",
      {cc: 'centraltutorsupport@bootcampspot.com,htmlBody: message});
  }
  };   


```

**Notes:**

* I haven't tested functionality with a non-gmail account, so please let me know if that would be helpful. 

* You can switch the GmailApp.createDraft() to .sendEmail() instead to skip the drafts folder and send right away.

* If you run ino any issues, Slack me @victoryamaykin or use the issues tab.

**Thanks!**
// Create a new menu item called Send Emails with a dropdown box

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Send Emails')
      .addItem('Send intro email', 'intro')
      .addItem('Send weekend email', 'weekly')
      .addToUi();
}

// A unique function to find out the last row number on your student roster

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

// ENTER YOUR CALENDLY LINK 

  var calendly = " "; 

// Enter your name and the display text for your calendly link in the message below
 
  var message = []; 

    message += "Hi "+ name +"!" + 
"<br><br>Nice to meet you! My name is <!-- ENTER YOUR NAME--> and I was assigned to be your tutor for the duration of the bootcamp. I am a graduate of the YOUR AREA OF STUDY Coding Boot Camp so I understand the challenges you're facing in the boot camp very well!<br>" +
"<br>I just sent you an invite to our tutoring Slack workspace, <u>Tutors & Students</u>. This is a separate Slack workspace (not a channel) where we will be communicating by direct message (DM). Let me know if you don\'t see the invite or have any issues getting signed up.  Please send me a direct message once you create your account there. You can DM me on that Slack by using my Slack name @YOUR SLACK NAME. Make sure to have that Slack available on your mobile phone so that you can message me if there are problems with wifi, etc.<br>" +
"<br><strong><u>Maximum tutorial sessions per week - our week is Monday - Sunday.</u></strong>" +
"<strong><ul><li>Part-time (6 month boot camp) students are entitled to 1 session per week.</li>" +
"<li>Full-time (3 month boot camp) students are entitled to 2 sessions per week.</li></ul></strong><br>" +
"Schedule your weekly session at: <a href= "+ calendly +" ><!--ENTER DISPLAY TEXT OF YOUR CALENDLY LINK HERE--></a>" + 
"<br><span style=\"background-color: rgb(255, 255, 0);\"><strong><u>On the Calendly page, be sure you have the correct time zone selected in the section labeled \"Times are in\"</u></strong></span><br>" +
"<strong>If our availability doesn\’t sync, let me know and I\'ll see if we can figure something out.</strong><br>" +
"<br>Each session takes place over Zoom.us (video chat/screen sharing) and lasts about 50 minutes. I\'ll email you the Zoom.us link the day before our scheduled time. (If you have not used zoom before please join the meeting at least 15 minutes early as it may have you download and install some software.)<br>" +  
"<br>All I need from you:" +
"<ul><li>Be on Slack 5 minutes before your time slot.</li>" +
"<li>Make sure your computer/mic/internet connection are working.</li>" +
"<li>Make sure your workspace is quiet and free from interruptions.</li>" +
"<li>At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.</li></ul><br>" +
"Slack or email me with any questions.  I look forward to our first meeting!<br><br>" +
"<strong>CC Central Support on all email by always using REPLY ALL.</strong><br><br>" +
"Sincerely,<br><!--YOUR NAME-->";


// ENTER THE SPECIFIC COURSE (DV, FSF, etc.) FOR THE SUBJECT LINE

var subject = 'Coding Boot Camp - Tutorial Available';

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

// ENTER YOUR CALENDLY LINK HERE!

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

// Enter your name and the display text for your calendly link in the message below

    var message = [];
    message += "Hi Everyone!" +
      "<br><br>I hope you had a great week! I have attached a link below to schedule another tutoring session if you wish.<strong> If you are already scheduled, please ignore this email.</strong><br><br>" +
"<a href=" + calendly + "><!--ENTER DISPLAY TEXT OF YOUR CALENDLY LINK HERE--></a>" + "<br><br><span style=\"background-color: rgb(255, 255, 0);\"><strong><u>On the Calendly page, be sure you have the correct time zone selected in the section labeled \"Times are in\"</u></strong></span>" +
"<br><strong>If our availability doesn't sync, let me know and I'll see if we can figure something out.</strong><br>" +
"<br><strong><u>Maximum tutorial sessions per week - our week is Monday - Sunday.</u></strong><br>" +
"<strong><ul><li>Part-time (6 month boot camp) students are entitled to 1 session per week.</li>" +
"<li>Full-time (3 month boot camp) students are entitled to 2 sessions per week.</li></ul></strong><br>" +
"If you have any questions or none of the times available work for you please let me know and I would be happy to help.<br><br>" +
"If you would like to schedule regular, recurring sessions at the same day/time each week, just let me know by REPLY ALL and we can work it out.  This is particularly useful if you have a strict schedule so you won't have to compete for time on my calendar.<br><br>" +
"<strong>CC Central Support on all email by always using REPLY ALL.</strong><br><br>" +
"<strong>Boot camp tip! - Our Learning Assistant team is available to help you every day with your curriculum-based questions." +
" We think you’ll find this resource very helpful as a supplement to tutor support, TA office hours, and class time." +   
" If you’re unsure how to utilize that resource, please speak to your TAs, Instructor, or Success Manager (SSM / PSM).</strong><br><br>" +
"Sincerely,<br><!--ENTER YOUR NAME-->";


// ENTER THE SPECIFIC COURSE (DV, FSF, etc.) FOR THE SUBJECT LINE

  var subject = "Coding Boot Camp - Tutorial Available";

// .createDraft() is for testing and .sendEmail() can be used instead to mail directly 

    GmailApp.createDraft(
      emailList[i],
      subject, "",
      {cc: 'centraltutorsupport@bootcampspot.com,htmlBody: message});
  }
  };   


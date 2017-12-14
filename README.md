P&L Smart Pivot, a Qlik Sense Extension for Financial reporting 

=============================
==================================

Available in https://github.com/iviasensio/PLSmartPivot

Current version 2.1. Compatible with QS Sep 2017
(from sep'17 color-picker is no more an integer but an object)

Based on P&LSmart.

Author Ivan Felipe Asensio QlikTech Iberia,s.l.



This extension is useful to create reports where the look&feel is rellevantand and pivot a second dimension is needed.



It's specifically focused on financial reports, trying to solve some common needs of this area:
- smart export to excel
- easy creation of reports
- custom corporate reporting (bold, italic, background color, letter size, headers,...)
- selections inside the reports
- custom external templates
- analytical reports
- ...



You'll find a manual 'P&LSmart Pivot Extension Manual.pdf' and one app example 'P&LSmartPivot_demo.qvf

'.



*Install in Server:
- before import the extension from the server remember to remove all the non functional files.
- remove:
.gitattributes,
.gitignore, P&LSmartPivot_demo.qvf, 'Qlik Sense P&LSmart Pivot Extension Manual.pdf' 


**If the import does not work at first time:
- remove Accounts.csv, Accounts2.csv and Excel.png, zip it again and import.
- Then reintroduce Accounts.csv, Accounts2.csv and Excel.png, zip it again and import.


*Install in Desktop
- unzip and copy the folder in C:\Users\'username'\Documents\Qlik\Sense\Extensions
- copy the example P&LSmartPivot_demo.qvf in C:\Users\'username'\Documents\Qlik\Sense\Apps

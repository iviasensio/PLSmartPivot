P&L Smart Pivot, a Qlik Sense Extension for Financial reporting 

=============================
==================================

Available in https://github.com/iviasensio/PLSmartPivot

Current version 4.0 25-mar-2019. Compatible with QS September 2017 or higher

Author Ivan Felipe Asensio QlikTech Iberia,s.l.


This extension is useful to create reports where the look&feel is rellevant and pivot a second dimension is needed.

### Improvements in 'PLSmartPivot v3.zip'
- Allow to collapse/uncollapse parent-child accounts 
- Option to avoid selecting inside the table
- Allow to add a particular look&feel to each column 
- Allow align accounts name left, center or right

### Improvements in 'PLSmartPivot v4.zip'
- New available tags in header settings - underline 
- New available tags in templates for each row - underlineColor **
- Smarter XLS export icon
- Better control for alerts and background its colors
- Dynamic CSV template name

### Bugs fixed
- Bad cell height alignment when including collapse option and small letter size
- Unable to collapse when uncheck allow select inside the table
- Bad look assignment when working with 2 dimensions + custom look for each measure + uncheck separator columns

** See QlikLook.csv examples about how to underline a P&L Concept, associate parents and how to add particular look&feel to each column


It's specifically focused on financial reports, trying to solve some common needs of this area:
- smart export to excel
- easy creation of reports
- custom corporate reporting (bold, italic, background color, letter size, headers,...)
- selections inside the reports
- custom external templates
- analytical reports
- ...

### Basic Guide
![PLSmartPivot](https://user-images.githubusercontent.com/11334576/153007371-9495a2df-e463-4d92-aba6-d7ce64e6cb7d.png)


You'll find a manual 'P&LSmart Pivot Extension Manual.pdf' and one app example 'P&LDemo4.qvf'.


*Install in Server:
- open the folder PLSmartPivot v4.0
- you'll find a zip to import PLSmartPivot.zip
- Import P&LDemo4.qvf as well, as it's a valid example with the new features 
- There is a PDF manual 'Qlik Sense P&LSmart Pivot Extension Manual.pdf' and a What's new document


*Install in Desktop
- unzip PLSmartPivot.zip and copy the folder in C:\Users\'username'\Documents\Qlik\Sense\Extensions
- copy the example P&LDemo4.qvf in C:\Users\'username'\Documents\Qlik\Sense\Apps

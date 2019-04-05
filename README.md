# P&L Smart Pivot, a Qlik Sense Extension for Financial reporting
[![CircleCI](https://circleci.com/gh/qlik-oss/PLSmartPivot.svg?style=svg)](https://circleci.com/gh/qlik-oss/PLSmartPivot)

This extension is useful to create reports where the look&feel is rellevantand and pivot a second dimension is needed. Based on P&L Smart.

It's specifically focused on financial reports, trying to solve some common needs of this area:
- smart export to excel
- easy creation of reports
- custom corporate reporting (bold, italic, background color, letter size, headers,...)
- selections inside the reports
- custom external templates
- analytical reports


# Manual
You'll find a manual [Qlik Sense P&LSmart Pivot Extension Manual.pdf](resources/Qlik Sense P&LSmart Pivot Extension Manual.pdf) and one app example [P&LSmartPivot_demo.qvf](resources/P&LSmartPivot_demo.qvf).


# Installation

1. Download the extension zip, `qlik-smart-pivot_<version>.zip`, from the latest release(https://github.com/qlik-oss/PLSmartPivot/releases/latest)
2. Install the extension:

   a. **Qlik Sense Desktop**: unzip to a directory under [My Documents]/Qlik/Sense/Extensions.

   b. **Qlik Sense Server**: import the zip file in the QMC.


# Developing the extension

If you want to do code changes to the extension follow these simple steps to get going.

1. Get Qlik Sense Desktop
1. Create a new app and add the extension to a sheet.
2. Clone the repository
3. Run `npm install`
4. Set the environment variable `BUILD_PATH` to your extensions directory. It will be something like `C:/Users/<user>/Documents/Qlik/Sense/Extensions/<extension_name>`.
5. You now have two options. Either run the watch task or the build task. They are explained below. Both of them default to development mode but can be run in production by setting `NODE_ENV=production` before running the npm task.

   a. **Watch**: `npm run watch`. This will start a watcher which will rebuild the extension and output all needed files to the `buildFolder` for each code change you make. See your changes directly in your Qlik Sense app.

   b. **Build**: `npm run build`. If you want to build the extension package. The output zip-file can be found in the `buildFolder`.


# Original authors

[github.com/iviasensio](https://github.com/iviasensio)


# License

Released under the [MIT License](LICENSE).
# createFamilyCareTemplate
Create Care Report and Return as Image

- Role: create template based on HTML document, and convert into image.
- Reason: Base64 encoded image can use in Power Automate, to send email or SMS.
- Input: JSON data from getAzureAccessToken
- Output: Base64 encoded image

> How to use application?

Currently this template supports below data to semi-automatically fill and convert them to image.

| name | Name of patient |
| --- | --- |
| date | Automatically filled out as today. |
| profileImage | encoded as base64, external images are supported |
| bloodPressure | Put Blood Pressure information to template |
| bodyTemperature | Put body temporature information to template |
| weight | Put today’s weight |
| extraComment | Fill extra comment if available. |

This values are similarly used in this function, but some values may different because of changes.

> Tips for output (image)

Output images are encoded as base64, which means you can connect with Power Automate, and **upload report to OneDrive, embed to other pages, etc.** However, because of various limitations, the result can be different with template.

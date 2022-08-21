const htmlToImage = require('html-to-image');
const chartMaker = require('quickchart-js');

module.exports = async function (context, req) {
    
    const name = req.body.fields.name; //string
    const profileImageSourceURL = req.body.fields.profile; //base64 encoded image
    const date = new Date().getFullYear() + "." + (new Date().getMonth() + 1) + "." + new Date().getDate();
    const bloodPressureMin = req.body.fields.bloodPressureMin;
    const bloodPressureMax = req.body.fields.bloodPressureMax;
    const bodyTemporatureCurrent = req.body.fields.bodyTemporatureCurrent;
    const weightCurrent = req.body.fields.weightCurrent;
    const extraComment = req.body.fields.extraComment;

    // Get Template documents
    let template;
    await fetch('template.html').then(response => response.text()).then(data => {
        template = data;
    });

    let domMaker = new DOMParser();
    let finalDocument = domMaker.parseFromString(template, "text/html");
    finalDocument.title = "Mx." + name + " Family Care Report";
    let bodyNode = finalDocument.body;

    let profileImage = finalDocument.getElementById("profileImage");
    profileImage.setAttribute("src", profileImageSourceURL);
    let dateArea = finalDocument.getElementById("date");
    dateArea.textContent = date;
    let nameArea = finalDocument.getElementsByClassName("name");
    nameArea.forEach(function(element) {
        element.textContent = name;
    });

    let bloodPressureArea = finalDocument.getElementById("bloodValue");
    bloodPressureArea.textContent = bloodPressureMax + "/" + bloodPressureMin;
    let bodyTemporatureArea = finalDocument.getElementById("temperatureValue");
    bodyTemporatureArea.textContent = bodyTemporatureCurrent;
    let weightArea = finalDocument.getElementById("weightValue");
    weightArea.textContent = weightCurrent;


    let commentArea = finalDocument.getElementById("commentArea");
    commentArea.textContent = extraComment;
   
    let responseMessage
    await htmlToImage.toPng(bodyNode).then(function (dataUrl) {
        responseMessage = dataUrl;
    });



    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
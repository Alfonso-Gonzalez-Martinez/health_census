/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/health_analysis.ts":
/*!********************************!*\
  !*** ./src/health_analysis.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.patients = void 0;\nexports.addPatient = addPatient;\nexports.resetForm = resetForm;\nexports.generateReport = generateReport;\nexports.searchCondition = searchCondition;\nconst addPatientButton = document.getElementById(\"addPatient\");\nconst report = document.getElementById(\"report\");\nconst btnSearch = document.getElementById('btnSearch');\nexports.patients = [];\nfunction addPatient() {\n    const name = document.getElementById(\"name\").value;\n    const genderElement = document.querySelector('input[name=\"gender\"]:checked');\n    const age = document.getElementById(\"age\").value;\n    const condition = document.getElementById(\"condition\").value;\n    const validGender = genderElement.value;\n    const validCondition = condition;\n    if (name && genderElement && age && condition) {\n        exports.patients.push({ name, gender: validGender, age: Number(age), condition: validCondition });\n        resetForm();\n        generateReport();\n    }\n}\nfunction resetForm() {\n    document.getElementById(\"name\").value = \"\";\n    document.querySelector('input[name=\"gender\"]:checked').checked = false;\n    document.getElementById(\"age\").value = \"\";\n    document.getElementById(\"condition\").value = \"\";\n}\nfunction generateReport() {\n    const numPatients = exports.patients.length;\n    const conditionsCount = {\n        Diabetes: 0,\n        Thyroid: 0,\n        \"High Blood Pressure\": 0,\n    };\n    const genderConditionsCount = {\n        Male: {\n            Diabetes: 0,\n            Thyroid: 0,\n            \"High Blood Pressure\": 0,\n        },\n        Female: {\n            Diabetes: 0,\n            Thyroid: 0,\n            \"High Blood Pressure\": 0,\n        },\n    };\n    for (const patient of exports.patients) {\n        conditionsCount[patient.condition]++;\n        genderConditionsCount[patient.gender][patient.condition]++;\n    }\n    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;\n    report.innerHTML += `Conditions Breakdown:<br>`;\n    for (const condition in conditionsCount) {\n        report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;\n    }\n    report.innerHTML += `<br>Gender-Based Conditions:<br>`;\n    for (const gender in genderConditionsCount) {\n        report.innerHTML += `${gender}:<br>`;\n        for (const condition in genderConditionsCount[gender]) {\n            report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;\n        }\n    }\n}\naddPatientButton === null || addPatientButton === void 0 ? void 0 : addPatientButton.addEventListener(\"click\", addPatient);\nfunction searchCondition() {\n    const input = document.getElementById('conditionInput').value.toLowerCase();\n    const resultDiv = document.getElementById('result');\n    resultDiv.innerHTML = '';\n    fetch('../health_analysis.json')\n        .then(response => response.json())\n        .then((data) => {\n        const condition = data.conditions.find(item => item.name.toLowerCase() === input);\n        if (condition) {\n            const symptoms = condition.symptoms.join(', ');\n            const prevention = condition.prevention.join(', ');\n            const treatment = condition.treatment;\n            resultDiv.innerHTML += `<h2>${condition.name}</h2>`;\n            resultDiv.innerHTML += `<img src=\"${condition.imagesrc}\" alt=\"hjh\">`;\n            resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;\n            resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;\n            resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;\n        }\n        else {\n            resultDiv.innerHTML = 'Condition not found.';\n        }\n    })\n        .catch(error => {\n        console.error('Error:', error);\n        resultDiv.innerHTML = 'An error occurred while fetching data.';\n    });\n}\nbtnSearch === null || btnSearch === void 0 ? void 0 : btnSearch.addEventListener('click', searchCondition);\n\n\n//# sourceURL=webpack://healthanalysis/./src/health_analysis.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/health_analysis.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;
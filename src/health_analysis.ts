const addPatientButton = document.getElementById("addPatient") as HTMLButtonElement;
const report = document.getElementById("report") as HTMLElement;
const btnSearch = document.getElementById('btnSearch') as HTMLButtonElement;
export const patients: Patient[] = [];

interface Patient {
  name: string;
  gender: 'Male' | 'Female';
  age: number;
  condition: 'Diabetes' | 'Thyroid' | 'High Blood Pressure';
}

interface ConditionCount {
  Diabetes: number;
  Thyroid: number;
  "High Blood Pressure": number;
}

interface GenderConditionsCount {
  Male: ConditionCount;
  Female: ConditionCount;
}

interface Condition {
        name: string
        imagesrc: string
        symptoms: string[]
        prevention: string[]
        treatment: string
}

interface Data {
  conditions: Condition[];
}

export function addPatient(): void {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const genderElement = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement);
    const age = (document.getElementById("age") as HTMLInputElement).value;
    const condition = (document.getElementById("condition")as HTMLInputElement).value;

    const validGender: 'Male' | 'Female' = genderElement.value as 'Male' | 'Female';
    const validCondition: 'Diabetes' | 'Thyroid' | 'High Blood Pressure' = condition as 'Diabetes' | 'Thyroid' | 'High Blood Pressure';

    if (name && genderElement && age && condition) {
      patients.push({ name, gender: validGender, age: Number(age), condition: validCondition });
      resetForm();
      generateReport();
    }
  }

  export function resetForm() {
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.querySelector('input[name="gender"]:checked') as HTMLInputElement).checked = false;
    (document.getElementById("age") as HTMLInputElement).value = "";
    (document.getElementById("condition") as HTMLInputElement).value = "";
  }

  export function generateReport() {
    const numPatients = patients.length;
    const conditionsCount: ConditionCount = {
      Diabetes: 0,
      Thyroid: 0,
      "High Blood Pressure": 0,
    };
    const genderConditionsCount: GenderConditionsCount = {
      Male: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
      Female: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
    };

    for (const patient of patients) {
      conditionsCount[patient.condition]++;
      genderConditionsCount[patient.gender][patient.condition]++;
    }

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
      report.innerHTML += `${condition}: ${conditionsCount[condition as keyof ConditionCount]}<br>`;
    }

    report .innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
      report.innerHTML += `${gender}:<br>`;
      for (const condition in genderConditionsCount[gender as keyof GenderConditionsCount]) {
        report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender as keyof GenderConditionsCount][condition  as keyof ConditionCount]}<br>`;
      }
    }
  }

addPatientButton?.addEventListener("click", addPatient);

export function searchCondition() {
    const input = (document.getElementById('conditionInput') as HTMLInputElement).value.toLowerCase();
    const resultDiv = document.getElementById('result') as HTMLElement;
    resultDiv.innerHTML = '';

    fetch('./assets/health_analysis.json')
      .then(response => response.json())
      .then((data: Data) => {
        const condition = data.conditions.find(item => item.name.toLowerCase() === input);

        if (condition) {
          const symptoms = condition.symptoms.join(', ');
          const prevention = condition.prevention.join(', ');
          const treatment = condition.treatment;

          resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
          resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

          resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
          resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
          resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
        } else {
          resultDiv.innerHTML = 'Condition not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch?.addEventListener('click', searchCondition);
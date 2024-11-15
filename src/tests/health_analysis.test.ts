import { addPatient, resetForm, generateReport, searchCondition, patients } from '../health_analysis'; // Assuming app.ts file

// Mock global DOM elements for testing
beforeEach(() => {
  document.body.innerHTML = `
    <input id="name" value="John Doe" />
    <input id="age" value="30" />
    <input type="radio" name="gender" value="Male" checked />
    <input id="condition" value="Diabetes" />
    <button id="addPatient">Add Patient</button>
    <div id="report"></div>
    <input id="conditionInput" />
    <button id="btnSearch">Search Condition</button>
    <div id="result"></div>
  `;
});

describe("addPatient function", () => {
  it("should add a patient when valid inputs are provided", () => {
    const addPatientButton = document.getElementById("addPatient") as HTMLButtonElement;
    addPatientButton.click();

    setTimeout(() => {
        expect(patients.length).toBe(1); 
        expect(patients[0].name).toBe("John Doe");
        expect(patients[0].condition).toBe("Diabetes");
      }, 100);
  });

  it("should not add a patient when required fields are missing", () => {
    (document.getElementById("name") as HTMLInputElement).value = "";
    const addPatientButton = document.getElementById("addPatient") as HTMLButtonElement;
    addPatientButton.click();
    setTimeout(() => {
        expect(patients.length).toBe(0);
      }, 100);
  });

  it("should not add a patient when invalid gender is selected", () => {
    (document.querySelector('input[name="gender"]:checked') as HTMLInputElement).value = "Other"; 
    const addPatientButton = document.getElementById("addPatient") as HTMLButtonElement;
    addPatientButton.click();

    setTimeout(() => {
        expect(patients.length).toBe(0);
      }, 100);
  });

  it("should not add a patient when invalid condition is selected", () => {
    (document.getElementById("condition") as HTMLInputElement).value = "Cancer";
    const addPatientButton = document.getElementById("addPatient") as HTMLButtonElement;
    addPatientButton.click();

    setTimeout(() => {
        expect(patients.length).toBe(0);
      }, 100);
  });
});

describe("resetForm function", () => {
  it("should reset form fields after adding a patient", () => {
    (document.getElementById("name") as HTMLInputElement).value = "John Doe";
    (document.getElementById("age") as HTMLInputElement).value = "30";
    (document.querySelector('input[name="gender"]:checked') as HTMLInputElement).checked = true;
    (document.getElementById("condition") as HTMLInputElement).value = "Diabetes";
    resetForm();

    setTimeout(() => {
        expect((document.getElementById("name") as HTMLInputElement).value).toBe("");
        expect((document.getElementById("age") as HTMLInputElement).value).toBe("");
        expect((document.querySelector('input[name="gender"]:checked') as HTMLInputElement)).toBeNull();
        expect((document.getElementById("condition") as HTMLInputElement).value).toBe("");
      }, 100);
  });
});

describe("generateReport function", () => {
  it("should generate a report when there are multiple patients", () => {
    patients.push({ name: "John Doe", gender: "Male", age: 30, condition: "Diabetes" });
    patients.push({ name: "Jane Smith", gender: "Female", age: 40, condition: "Thyroid" });

    setTimeout(() => {
        generateReport();
        const report = document.getElementById("report") as HTMLElement;
        expect(report?.innerHTML).toContain("Number of patients: 2");
        expect(report?.innerHTML).toContain("Diabetes: 1");
        expect(report?.innerHTML).toContain("Thyroid: 1");
        expect(report?.innerHTML).toContain("Male: <br>&nbsp;&nbsp;Diabetes: 1");
        expect(report?.innerHTML).toContain("Female: <br>&nbsp;&nbsp;Thyroid: 1");
      }, 100);
  });

  it("should show no patients in the report when the patient list is empty", () => {

     setTimeout(() => {
        generateReport();
        const report = document.getElementById("report") as HTMLElement;
        expect(report?.innerHTML).toContain("Number of patients: 0");
      }, 100);
  });
})

describe("searchCondition function", () => {
  it("should display condition details when an existing condition is searched", async () => {
    const condition = { name: "Diabetes", symptoms: ["Thirst", "Frequent Urination"], prevention: ["Exercise", "Diet"], treatment: "Insulin", imagesrc: "diabetes.jpg" };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ conditions: [condition] }),
      })
    ) as jest.Mock;

    (document.getElementById("conditionInput") as HTMLInputElement).value = "Diabetes";
    const btnSearch = document.getElementById("btnSearch") as HTMLButtonElement;
    const resultDiv = document.getElementById("result") as HTMLElement;

    await searchCondition();

    setTimeout(() => {
        expect(resultDiv.innerHTML).toContain("Diabetes");
        expect(resultDiv.innerHTML).toContain("Symptoms: Thirst, Frequent Urination");
        expect(resultDiv.innerHTML).toContain("Prevention: Exercise, Diet");
        expect(resultDiv.innerHTML).toContain("Treatment: Insulin");
        expect(resultDiv.innerHTML).toContain("src=\"diabetes.jpg\"");
        }, 100);
  });

  it("should show 'Condition not found' when a non-existing condition is searched", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ conditions: [] }),
      })
    ) as jest.Mock;

    (document.getElementById("conditionInput") as HTMLInputElement).value = "NonExistentCondition";
    const resultDiv = document.getElementById("result") as HTMLElement;

    await searchCondition();
    setTimeout(() => {
        expect(resultDiv.innerHTML).toBe("Condition not found.");
        }, 100);
  });

  it("should show an error message if the fetch request fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject("API error")
    ) as jest.Mock;

    (document.getElementById("conditionInput") as HTMLInputElement).value = "Diabetes";
    const resultDiv = document.getElementById("result") as HTMLElement;

    await searchCondition();
    setTimeout(() => {
        expect(resultDiv.innerHTML).toBe("An error occurred while fetching data.");
        }, 100);
  });

});